import { create } from "zustand";
import { apiClient } from "../api";
import { Post, PostInput } from "../types/post"; // PostInput 型を使う

interface PostState {
  posts: Post[];
  editingPost: Post | null;
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: PostInput) => Promise<void>;
  updatePost: (post: PostInput & { id: number }) => Promise<void>; // ID付き
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

  updatePost: async (post) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("post[title]", post.title);
      formData.append("post[body]", post.body);
      formData.append("post[published]", post.published);
      if (post.image) {
        formData.append("post[image]", post.image); // 画像があれば差し替え
      }

      const res = await apiClient.put<Post>(`/posts/${post.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
