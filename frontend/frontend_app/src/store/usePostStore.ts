import { create } from "zustand";
import { apiClient } from "../api";
import { Post } from "../types/post";

interface PostState {
  posts: Post[];
  editingPost: Post | null;
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: Omit<Post, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updatePost: (post: Post) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  startEdit: (post: Post) => void;
  cancelEdit: () => void;
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

  addPost: async (post) => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient.post<Post>("/posts", post);
      set((state) => ({
        posts: [res.data, ...state.posts],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || "投稿作成に失敗しました", loading: false });
    }
  },

  updatePost: async (post) => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient.put<Post>(`/posts/${post.id}`, post);
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === res.data.id ? res.data : p
        ),
        editingPost: null,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || "投稿更新に失敗しました", loading: false });
    }
  },

  deletePost: async (id) => {
    set({ loading: true, error: null });
    try {
      await apiClient.delete(`/posts/${id}`);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || "投稿削除に失敗しました", loading: false });
    }
  },

  startEdit: (post) => set({ editingPost: post }),
  cancelEdit: () => set({ editingPost: null }),
}));
