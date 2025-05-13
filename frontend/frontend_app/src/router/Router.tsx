import { memo, FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PostsPage } from '../components/pages/PostsPage';



export const Router: FC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<PostsPage />} />
    </Routes>
  );
});
