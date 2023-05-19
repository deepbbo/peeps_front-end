import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PostTypes } from './types/types';

const PostFeed = () => {
  const [posts, setPosts] = useState<PostTypes | any>([]);

  const postsUrl = 'http://localhost:9999/board';

  useEffect(() => {
    (async () => {
      const response = await axios.get(postsUrl);
      const data = response.data;
      setPosts([...posts, ...data]);
    })();
  }, []);

  return (
    <>
      <Contents>
        {posts.map((post: PostTypes) => (
          <div key={post.id}>
            <Link to={`/board/${post.id}`}>{post.title}</Link>
          </div>
        ))}
      </Contents>
    </>
  );
};

export default PostFeed;

const Contents = styled.div`
  // min-width: 375px;
  // max-width: 425px;
  width: 100%;
  height: calc(100vh - 156px);
  position: absolute;
  background-color: #ffffff;
  // border: solid 1px #979797;
`;
