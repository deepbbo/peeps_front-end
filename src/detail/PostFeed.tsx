import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PostTypes } from './types/types';

const PostFeed = () => {
  const [posts, setPosts] = useState<PostTypes | any>([]);

  const postsUrl = 'http://localhost:9999/posts';

  useEffect(() => {
    (async () => {
      const response = await axios.get(postsUrl);
      const data = response.data;
      console.log('Data:', data);
      setPosts([...posts, ...data]);
    })();
  }, []);

  return (
    <>
      <Contents>
        {posts.map((post: PostTypes) => (
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </div>
        ))}
      </Contents>
    </>
  );
};

export default PostFeed;

const Contents = styled.div`
  min-width: 375px;
  max-width: 425px;
  position: absolute;
  background-color: #ffffff;
  border: solid #979797;
`;
