import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostComments from './PostComments';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PostTypes } from './types/types';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostTypes | any>([]);

  const postUrl = `http://localhost:9999/posts/${id}`;

  useEffect(() => {
    (async () => {
      const response = await axios.get(postUrl);
      const data = response.data;
      setPost([...post, data]);
    })();
  }, []);
  return (
    <Contents>
      <StyledHeader>위치</StyledHeader>
      {post.map((post: PostTypes) => (
        <div key={post.id}>
          <PostHeader
            category={post.category}
            title={post.title}
            date={post.date}
            user_nickname={post.user_nickname}
          />
          <PostContent text={post.text} />
          <PostComments />
        </div>
      ))}
    </Contents>
  );
};

export default PostDetail;

const Contents = styled.div`
  min-width: 375px;
  max-width: 425px;
  position: absolute;
  background-color: #ffffff;
  border: solid #979797;
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  background: #fefcd9;
  box-sizing: border-box;
  padding: 40px 15px 0 15px;
  font-size: 18px;
  font-weight: 700;
`;
