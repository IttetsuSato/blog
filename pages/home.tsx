import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Post = Database["public"]["Tables"]["posts"]["Row"];

type Props = {
  posts: Post[];
};

const Home = ({ posts }: Props) => {
  console.log({ posts });
  return (
    <>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
      Just a link: https://reactjs.com.
      </ReactMarkdown>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps = async () => {
  let { data: posts } = await supabase.from("posts").select();
  return {
    props: {
      posts,
    },
  };
};

export default Home;
