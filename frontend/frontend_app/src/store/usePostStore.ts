import { create } from "zustand";
import { apiClient } from "../api";
import { Post, PostInput } from "../types/post";

interface PostState {
  posts: Post[];
  editingPost: Post | null;
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: PostInput) => Promise<void>;
  // 他の関数は省略（後で画像対応するならupdatePostも）
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  editingPost: null,
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient.get<Post[]>("/posts");
      set({ posts: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "投稿取得に失敗しました", loading: false });
    }
  },

  addPost: async (post: PostInput) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("post[title]", post.title);
      formData.append("post[body]", post.body);
      formData.append("post[published]", post.published);
      if (post.image) {
        formData.append("post[image]", post.image);
      }

      const res = await apiClient.post<Post>("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set((state) => ({
        posts: [res.data, ...state.posts],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || "投稿作成に失敗しました", loading: false });
    }
  },
}));
