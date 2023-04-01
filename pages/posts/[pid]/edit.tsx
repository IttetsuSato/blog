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

  const router = useRouter();
  const { pid } = router.query;

  const toast = useToast();

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const filePath = `${file.name}`; // 画像の保存先
    const { data, error } = await supabase.storage
      .from("images")
      .download("raimu.jpeg")
      console.log({data});
      // .upload(filePath, file);

    if (error) {
      toast({
        title: "保存失敗",
        description: error.message,
        status: "error",
      });
    } else {
      toast({
        title: "サムネイル保存成功",
        status: "success",
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

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
    <VStack>
      {/* サムネイル画像アップロード */}
      <Input type="file" onChange={handleImageChange} />

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
  );
};

Edit.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <NormalHeader />
      <CenteredLayout>{page}</CenteredLayout>
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
