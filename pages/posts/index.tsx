import { CenteredLayout } from "@/components/Layouts/CenteredLayout";
import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { Box, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

type Post = Database["public"]["Tables"]["posts"]["Row"];

type Props = {
  posts: Post[];
};

const Posts = ({ posts }: Props) => {
  console.log({posts});
  return (
    <CenteredLayout>
      <Card>
        <CardHeader>
          <Heading as="h1">記事</Heading>
        </CardHeader>
        <CardBody>
          {posts.map((post) => (
            <Box key={post.id}>
              <Heading>{post.title}</Heading>
            </Box>
          ))}
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
