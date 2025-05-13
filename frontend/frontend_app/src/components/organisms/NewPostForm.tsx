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
  const [imageFile, setImageFile] = useState<File | null>(null); // 画像用 state
  const addPost = usePostStore((s) => s.addPost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    await addPost({
      title,
      body,
      published: new Date().toISOString(),
      image: imageFile || undefined,
    });

    setTitle("");
    setBody("");
    setImageFile(null);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" shadow="sm" bg="white">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>タイトル</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>本文</FormLabel>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>画像</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" w="full">
            投稿する
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
