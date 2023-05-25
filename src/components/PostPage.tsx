import React, { useState } from 'react';
import PostList from './PostList';
import Category from './Category';

const PostPage = () => {
  const [nowCategory, setNowCategory] = useState('일상');

  return (
    <>
      <Category nowCategory={nowCategory} setNowCategory={setNowCategory} />
      <PostList nowCategory={nowCategory} />
    </>
  );
};

export default PostPage;
