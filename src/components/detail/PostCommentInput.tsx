import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface T {
  post_id: number;
}
function PostCommentInput({ post_id }: T) {
  const [inputValue, setInputValue] = useState('');
  const userToken = localStorage.getItem('userToken');
  const userInfo = userToken ? JSON.parse(userToken).userInfo : null;
  const user_id = userInfo.user_id;
  const accessToken = localStorage.getItem('accessToken');

  const commentsUrl = `http://localhost:5500/api/v1/comment/${user_id}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    axios
      .post(
        commentsUrl,
        { comment_content: inputValue, post_id: post_id, user_id: user_id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(response => {
        console.log(response);
      });

    setInputValue('');
  };

  return (
    <>
      <CommentInputBox>
        <div>
          <img
            alt="프로필사진"
            src={process.env.PUBLIC_URL + userInfo.user_img}
          ></img>
        </div>
        <form onSubmit={handleSubmit}>
          <InputText
            type="text"
            name="inputValue"
            value={inputValue}
            onChange={handleChange}
          />
          <button>등록</button>
        </form>
      </CommentInputBox>
    </>
  );
}

export default PostCommentInput;

const CommentInputBox = styled.div`
  clear: both;
  display: flex;
  height: 34px;
  padding: 12px 0;
  font-size: 15px;
`;

const InputText = styled.input`
  box-sizing: border-box;
  position: relative;
  color: #000000;
  font-size: 1em;
  border: 0px solid #eb8d00;
  margin: ${props => props.size};
  padding: ${props => props.size};
  vertical-align: top;
`;
