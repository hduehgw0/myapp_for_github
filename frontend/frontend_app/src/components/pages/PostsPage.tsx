import { Box, Heading, Stack } from "@chakra-ui/react";
import { NewPostForm } from "../organisms/NewPostForm";
import { PostsList } from "../organisms/PostsList";

export const PostsPage = () => {
  return (
    <Box maxW="600px" mx="auto" p={6}>
      <Stack spacing={8}>
        <Heading textAlign="center" size="lg">記事一覧</Heading>
        <NewPostForm />
        <PostsList />
      </Stack>
    </Box>
  );
};
