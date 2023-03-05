import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { Textarea } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Post = Database["public"]["Tables"]["posts"]["Row"];

type Props = {
  post: Post;
};

const Edit = ({ post }: Props) => {
  const [text, setText] = useState(post.text);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <Textarea
        value={text}
        onChange={handleInputChange}
        placeholder="Write in Markdown"
      />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </>
  );
};

export const getStaticProps = async () => {
  let { data: post } = await supabase.from("posts").select().eq("id", 1).single();
  return {
    props: {
      post,
    },
  };
};

export default Edit;
