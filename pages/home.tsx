import Account from "@/components/Account";
import { Authorization } from "@/components/Auth/Authorization";
import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

type Post = Database["public"]["Tables"]["posts"]["Row"];

type Props = {
  posts: Post[];
};

const Home = ({ posts }: Props) => {
  const session = useSession();

  return (
    <>
      <Authorization>{session && <Account session={session} />}</Authorization>

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
