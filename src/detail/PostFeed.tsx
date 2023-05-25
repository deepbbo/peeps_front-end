import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PostTypes } from './types/types';

const PostFeed = () => {
  const [posts, setPosts] = useState<PostTypes | any>([]);

  useEffect(() => {
    (async () => {
      const post_category = '일상'; //일상
      const postCategoryUrl = `http://localhost:5500/api/v1/post/category/${post_category}`;
      const accessToken = localStorage.getItem('accessToken');
      console.log('token:', accessToken);
      try {
        const header = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        };
        const response = await axios.get(postCategoryUrl, header);
        const data = response.data.data;
        setPosts([...data]);
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Contents>
        <ul>
          {posts.map((post: PostTypes) => (
            <li key={post.post_id}>
              <Link to={`/post/${post.post_id}`}>{post.post_title}</Link>
            </li>
          ))}
        </ul>
      </Contents>
    </>
  );
};

export default PostFeed;

const Contents = styled.div`
  // min-width: 375px;
  // max-width: 425px;
  width: 100%;
  min-height: calc(100vh - 156px);
  position: relative;
  background-color: #ffffff;
  // border: solid 1px #979797;
`;
