import { PreviewCard } from "@/components/Card/PreviewCard";
import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import {
  Button,
  Card,
  CardBody,
  HStack,
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
        <Card w="2xl" minH="2xl">
          <CardBody>
            <Textarea
              value={text}
              onChange={handleInputChange}
              placeholder="Write in Markdown"
            />
          </CardBody>
        </Card>
        <PreviewCard text={text} />
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
