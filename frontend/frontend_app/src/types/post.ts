// APIから取得する投稿データ
export interface Post {
  id: number;
  title: string;
  body: string;
  published: string | null;
  imageUrl?: string; // ← Railsから返る画像URL
  createdAt: string;
  updatedAt: string;
}

// フォーム送信用の入力型
export type PostInput = {
  title: string;
  body: string;
  published: string;
  image?: File; // ← Fileオブジェクト（画像）
};

  