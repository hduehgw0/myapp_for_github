import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { usePostStore } from "../../store/usePostStore";

export const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const addPost = usePostStore((state) => state.addPost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;
    await addPost({ title, body, published: new Date().toISOString() });
    setTitle("");
    setBody("");
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" shadow="sm" bg="white">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>タイトル</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトルを入力"
            />
          </FormControl>
          <FormControl>
            <FormLabel>本文</FormLabel>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="本文を入力"
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" w="full">
            投稿する
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
