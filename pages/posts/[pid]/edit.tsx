import { MarkdownBox } from "@/components/Box/MarkdownBox";
import { CardBox } from "@/components/Box/CardBox";
import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useState } from "react";
import { CenteredLayout } from "@/components/Layouts/CenteredLayout";

type Post = Database["public"]["Tables"]["posts"]["Row"];

type Props = {
  post: Post;
};

const Edit = ({ post }: Props) => {
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const router = useRouter();
  const { pid } = router.query;

  const toast = useToast();

  const handleSaveClick = useCallback(async () => {
    const { error } = await supabase
      .from("posts")
      .update({
        title,
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
  }, [pid, text, title, toast]);

  return (
    <CenteredLayout>
      <Box>
        <Button onClick={handleSaveClick}>下書き保存</Button>
        <HStack>
          <Box>
            <Input
              value={title}
              onChange={handleInputChange}
              placeholder="タイトル"
            />
            <CardBox>
              <Textarea
                value={text}
                onChange={handleTextChange}
                placeholder="マークダウンで記述してください"
              />
            </CardBox>
          </Box>

          <Box>
            <Heading as="h1">{title}</Heading>
            <MarkdownBox text={text} />
          </Box>
        </HStack>
      </Box>
    </CenteredLayout>
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
