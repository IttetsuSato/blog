import { CardBox } from "@/components/Box/CardBox";
import { AdminHeader } from "@/components/Header/AdminHeader";
import { CenteredLayout } from "@/components/Layouts/CenteredLayout";
import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import {
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import NextLink from "next/link";

type Post = Database["public"]["Tables"]["posts"]["Row"];

type Props = {
  posts: Post[];
};

const Posts = ({ posts }: Props) => {
  console.log({ posts });
  return (
    <>
      <AdminHeader />
      <CenteredLayout>
        <CardBox>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>記事</Th>
                </Tr>
              </Thead>
              <Tbody>
                {posts.map((post) => (
                  <Tr key={post.id}>
                    <Td>
                      <Link as={NextLink} href={`/posts/${post.id}/edit`}>
                        {post.title}
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBox>
      </CenteredLayout>
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

export default Posts;
