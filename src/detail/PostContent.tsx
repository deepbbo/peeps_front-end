import React from 'react';
import styled from 'styled-components';

interface T {
  post_content: string;
  post_img: null | string;
}
function PostContent({ post_content, post_img }: T) {
  return (
    <>
      <PostBody>
        <div>{post_content}</div>
        <div>{post_img}</div>
      </PostBody>
    </>
  );
}

export default PostContent;

const PostBody = styled.div`
  margin: 10px;
  min-height: 400px;
  border-bottom: 1px solid;
  line-height: 1.6em;
`;
