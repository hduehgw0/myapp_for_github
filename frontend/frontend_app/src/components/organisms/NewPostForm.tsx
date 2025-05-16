import { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
  // useTheme,
} from "@chakra-ui/react";
import { usePostStore } from "../../store/usePostStore";

export const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addPost = usePostStore((state) => state.addPost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[body]", body);
    formData.append("post[published]", new Date().toISOString());
    if (image) {
      formData.append("post[image]", image);
    }

    await addPost(formData);
    setTitle("");
    setBody("");
    setImage(null);
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

          <FormControl>
            <FormLabel>画像</FormLabel>
            <Box
              border="2px dashed #CBD5E0"
              borderRadius="md"
              p={6}
              textAlign="center"
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Text color="gray.500">
                {image ? image.name : "クリックして画像を選択"}
              </Text>
              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setImage(file || null);
                }}
                display="none"
              />
            </Box>
          </FormControl>

          <Button colorScheme="blue" type="submit" w="full">
            投稿する
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
