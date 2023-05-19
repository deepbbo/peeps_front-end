import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { List } from 'react-virtualized';
import axios from 'axios';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostComments from './PostComments';
import { useParams } from 'react-router-dom';
import { PostTypes } from './types/types';

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
  const { id } = useParams();
  const [post, setPost] = useState<PostTypes | any>([]);

  const postUrl = `http://localhost:9999/board/${id}`;

  useEffect(() => {
    (async () => {
      const response = await axios.get(postUrl);
      const data = response.data;
      setPost([...post, data]);
    })();
  }, []);
  return (
    <>
      {/* <List
      className='TodoList'
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{outline: 'none'}} // List에 기본 적용되는 outline 스타일 제거
    /> */}
      <Contents>
        {post.map((post: PostTypes) => (
          <div key={post.id}>
            <PostHeader
              category={post.category}
              title={post.title}
              date={post.date}
              user_nickname={post.user_nickname}
            />
            <PostContent text={post.text} />
            <PostComments post_id={post.id} />
          </div>
        ))}
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
  height: calc(100vh - 156px);
  background-color: #ffffff;
  // border: solid 1px #000000;
`;
