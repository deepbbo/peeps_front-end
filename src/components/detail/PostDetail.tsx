import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import Comment from './Comment';
import PostCommentInput from './PostCommentInput';
import { useParams } from 'react-router-dom';
import { PostTypes, CommentTypes } from './types/types';

const PostDetail = () => {
  //무한스크롤 기능
  // const rowRenderer = useCallback(({index, key, style}) => {
  //   const todo = todos[index];
  //   return (
  //     <TodoListItem
  //       todo={todo}
  //       key={key}
  //       onRemove={onRemove}
  //       onToggle={onToggle}
  //       style={style}
  //     />
  //   );
  // }, [onRemove, todos, onToggle])

  //데이터 받아오기

  // console.log(id);
  const [post, setPost] = useState<PostTypes | any>({});
  const { post_id } = useParams();

  useEffect(() => {
    (async () => {
      const postUrl = `http://localhost:5500/api/v1/post/${post_id}`;
      const accessToken = localStorage.getItem('accessToken');
      // console.log('token:', accessToken);
      try {
        const header = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        };
        const response = await axios.get(postUrl, header);
        const data = response.data.data;
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log('postDetail post출력:', post);
  return (
    <>
      <Contents>
        <div key={post.post_id}>
          <PostHeader
            post_id={post.post_id}
            post_category={post.post_category}
            post_title={post.post_title}
            created_at={post.created_at}
            user_nickname={post.user_nickname}
            user_id={post.user_id}
            user_img={post.user_img}
            comment_count={post.comment_count}
          />
          <PostContent
            post_content={post.post_content}
            post_img={post.post_img}
          />
          <CommentHeader>
            <span>댓글 {post.comment_count}</span>
          </CommentHeader>
          {post.comments &&
            post.comments.map((comment: CommentTypes) => (
              <div key={comment.comment_id}>
                {comment.comment_id}
                <Comment
                  comment_id={comment.comment_id}
                  comment_content={comment.comment_content}
                  created_at={comment.created_at}
                  user_nickname={comment.user_nickname}
                  user_id={comment.user_id}
                  user_img={comment.user_img}
                />
              </div>
            ))}
          <PostCommentInput post_id={post.post_id} />
        </div>
      </Contents>
      {/* </List> */}
    </>
  );
};

export default PostDetail;

const Contents = styled.div`
  // min-width: 375px;
  // max-width: 425px;
  width: 100%;
  min-height: calc(100vh - 156px);
  position: relative;
  background-color: #ffffff;
  // border: solid 1px #000000;
`;

const CommentHeader = styled.div`
  position: relative;
  margin-bottom: 14px;
  padding: 18px 16px 0;
`;
