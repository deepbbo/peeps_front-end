import React from 'react';
import Comment from './Comment';
import PostCommentInput from './PostCommentInput';
import styled from 'styled-components';

function PostComments() {
  return (
    <>
      <div>
        <CommentHeader>
          <span>댓글 N</span>
        </CommentHeader>
        <Comment />
      </div>
      <PostCommentInput />
    </>
  );
}

export default PostComments;

const CommentHeader = styled.div`
  position: relative;
  margin-bottom: 14px;
  padding: 18px 16px 0;
`;
