import { MarkdownBox } from "@/components/Box/MarkdownBox";
import { CardBox } from "@/components/Box/CardBox";
import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import {
  Button,
  HStack,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, ReactElement, useCallback, useState } from "react";
import { CenteredLayout } from "@/components/Layouts/CenteredLayout";
import { NormalHeader } from "@/components/Header/NormalHeader";

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
    <>
      <NormalHeader />
      <CenteredLayout>
        <VStack>
          <HStack w="full" justifyContent="space-between">
            <Input
              size="lg"
              variant="flushed"
              value={title}
              onChange={handleInputChange}
              placeholder="タイトル"
              fontSize="3xl"
              fontWeight="semibold"
            />
            <Button onClick={handleSaveClick}>下書き保存</Button>
          </HStack>

          <HStack>
            <VStack>
              <CardBox>
                <Textarea
                  variant="unstyled"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="マークダウンで記述してください"
                />
              </CardBox>
            </VStack>

            <VStack>
              <MarkdownBox text={text} />
            </VStack>
          </HStack>
        </VStack>
      </CenteredLayout>
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
