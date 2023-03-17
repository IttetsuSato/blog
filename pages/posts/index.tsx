import { CenteredLayout } from "@/components/Layouts/CenteredLayout";
import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { Card, CardBody } from "@chakra-ui/react";

type Post = Database["public"]["Tables"]["posts"]["Row"];

type Props = {
  posts: Post[];
};

const Posts = ({ posts }: Props) => {
  return (
    <CenteredLayout>
      <Card>
        <CardBody>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.text}</li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </CenteredLayout>
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

export default Posts;
