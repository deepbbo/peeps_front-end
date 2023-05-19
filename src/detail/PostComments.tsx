import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCommentInput from './PostCommentInput';
import styled from 'styled-components';
import { CommentTypes } from './types/types';
import Comment from './Comment';

interface T {
  post_id: number;
}

function PostComments({ post_id }: T) {
  const [comments, setComments] = useState<CommentTypes[] | any>([]);
  const commentsUrl = `http://localhost:9999/comments`;

  useEffect(() => {
    (async () => {
      const response = await axios.get(commentsUrl);
      const data = response.data.filter(
        (comment: CommentTypes | any) => comment.postId === post_id
      );
      setComments([...comments, data]);
    })();
  }, []);
  return (
    <>
      <div>
        <CommentHeader>
          <span>댓글 N</span>
        </CommentHeader>
        <div>
          {comments.map((comment: CommentTypes) => (
            <div key={comment.id}>
              <Comment
                text={comment.text}
                date={comment.date}
                user_nickname={comment.user_nickname}
              />
            </div>
          ))}
        </div>
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
