import {
  Box,
  Button,
  Heading,
  Text,
  Input,
  Textarea,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePostStore } from "../../store/usePostStore";
import { Post } from "../../types/post";

const MotionBox = motion(Box);

export const PostsList: React.FC = () => {
  const posts = usePostStore((s) => s.posts);
  const fetchPosts = usePostStore((s) => s.fetchPosts);
  const editingPost = usePostStore((s) => s.editingPost);
  const startEdit = usePostStore((s) => s.startEdit);
  const cancelEdit = usePostStore((s) => s.cancelEdit);
  const updatePost = usePostStore((s) => s.updatePost);
  const deletePost = usePostStore((s) => s.deletePost);
  const loading = usePostStore((s) => s.loading);
  const error = usePostStore((s) => s.error);

  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (editingPost) {
      setTitleInput(editingPost.title);
      setBodyInput(editingPost.body);
    } else {
      setTitleInput("");
      setBodyInput("");
    }
  }, [editingPost]);

  if (loading) return <Spinner color="blue.500" size="xl" />;
  if (error) return <Text color="red.500">エラーが発生しました: {error}</Text>;

  return (
    <Stack spacing={4}>
      {Array.isArray(posts) &&
        posts.map((post: Post) => (
          <Box key={post.id} borderWidth="1px" borderRadius="lg" p={4}>
            <AnimatePresence mode="wait" initial={false}>
              {editingPost?.id === post.id ? (
                <MotionBox
                  key="form"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    placeholder="タイトルを入力"
                    mb={2}
                  />
                  <Textarea
                    value={bodyInput}
                    onChange={(e) => setBodyInput(e.target.value)}
                    placeholder="本文を入力"
                    mb={2}
                  />
                  <Button
                    colorScheme="blue"
                    onClick={() =>
                      updatePost({
                        ...post,
                        title: titleInput,
                        body: bodyInput,
                      })
                    }
                    mr={2}
                  >
                    更新する
                  </Button>
                  <Button onClick={cancelEdit}>キャンセル</Button>
                </MotionBox>
              ) : (
                <MotionBox
                  key="view"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heading size="md">{post.title}</Heading>
                  <Text mb={2}>{post.body}</Text>
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    投稿日: {new Date(post.createdAt).toLocaleString()}
                  </Text>
                  <Button
                    colorScheme="red"
                    onClick={() => deletePost(post.id)}
                    mr={2}
                  >
                    削除
                  </Button>
                  <Button onClick={() => startEdit(post)}>編集</Button>
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>
        ))}
    </Stack>
  );
};
