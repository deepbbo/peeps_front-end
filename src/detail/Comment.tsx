import React from 'react';
import styled from 'styled-components';

interface T {
  user_nickname: string;
  text: string;
  date: string;
}

const Comment = ({ user_nickname, text, date }: T) => {
  return (
    <>
      <CommentBox>
        <CommentHeader>
          <img
            alt="프로필사진"
            src={process.env.PUBLIC_URL + '/icon/profile.svg'}
          ></img>
          <span>{user_nickname}</span>
          <AsideLayer>
            <img
              alt="더보기아이콘"
              src={process.env.PUBLIC_URL + '/icon/more-info.svg'}
            ></img>
          </AsideLayer>
        </CommentHeader>
        <CommentContent>
          <p>{text}</p>
        </CommentContent>
        <CommentFooter>
          <p>{date}</p>
        </CommentFooter>
      </CommentBox>
    </>
  );
};

export default Comment;

const CommentBox = styled.div`
  padding: 14px 0 14px;
  border-bottom: 1px solid #000000;
`;

const CommentHeader = styled.div`
  display: flex;
  padding-right: 30px;
`;

const AsideLayer = styled.div`
  position: absolute;
  top: -3px;
  right: -10px;
`;

const CommentContent = styled.div``;
const CommentFooter = styled.div``;
