import { BlogBox } from "@/components/Box/BlogBox";
import { CardBox } from "@/components/Box/CardBox";
import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useState } from "react";

type Post = Database["public"]["Tables"]["posts"]["Row"];

type Props = {
  post: Post;
};

const Edit = ({ post }: Props) => {
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const router = useRouter();
  const { pid } = router.query;

  const toast = useToast();

  const handleSaveClick = useCallback(async () => {
    const { error } = await supabase
      .from("posts")
      .update({
        text,
      })
      .eq("id", pid);

    if (error) {
      toast({
        title: "保存失敗",
        status: "error",
      });
    } else {
      toast({
        title: "下書き保存成功",
        status: "success",
      });
    }
  }, [pid, text, toast]);

  return (
    <>
      <Button onClick={handleSaveClick}>保存</Button>
      <HStack>
        <CardBox>
          <Input value={title} />

          <Textarea
            value={text}
            onChange={handleInputChange}
            placeholder="Write in Markdown"
          />
        </CardBox>

        <BlogBox text={text} />
      </HStack>
    </>
  );
};

type PathParams = {
  pid: string;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { pid } = params as PathParams;
  const { data: post } = await supabase
    .from("posts")
    .select()
    .eq("id", pid)
    .single();

  return {
    props: {
      post,
    },
  };
};

export default Edit;
