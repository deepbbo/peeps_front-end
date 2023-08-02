import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostListBlock = styled.div`
  margin: 0 auto;
  padding: 0 16px;
  height: calc(100vh - 76px);
`;
const PostFormLink = styled(Link)`
  position: fixed;
  text-decoration: none;
  padding: 10px;
  border: none;
  border-radius: 40px;
  background-color: #009f47;
  bottom: 15px;
  right: 15px;
  font-size: 26px;
  font-weight: bold;
  color: #e8f7eb;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 29px;
`;

const PostList = ({ nowCategory }: { nowCategory: string }) => {
  const [posts, setPosts] = useState<any>([]);
  const postsUrl = `http://localhost:5500/api/v1/post/category/${nowCategory}`;

  useEffect(() => {
    (async () => {
      const response = await axios.get(postsUrl);
      const data = response.data.data;
      setPosts([...data]);
    })();
  }, [postsUrl]);

  return (
    <>
      <PostListBlock className="dd">
        {posts.map((postData: any, index: number) => (
          <PostItem
            postData={postData}
            key={postData.postId + postData.created_at + index}
          />
        ))}
      </PostListBlock>
      <PostFormLink to="/posts/form">+</PostFormLink>
    </>
  );
};

export default React.memo(PostList);
