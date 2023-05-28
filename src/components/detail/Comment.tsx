import React, { useState } from 'react';
import styled from 'styled-components';
import { CommentTypes } from './types/types';
import axios from 'axios';
import IconMoreInfo from '../../images/more-info.svg';

const Comment = ({
  comment_id,
  user_img,
  user_nickname,
  user_id,
  comment_content,
  created_at
}: CommentTypes) => {
  // if (user_img === null) {
  //   user_img = `/icon/profile.svg`;
  // }
  // console.log('유저아디:', user_id);
  const isMyComment = () => {
    const userToken = localStorage.getItem('userToken');
    const userInfo = userToken ? JSON.parse(userToken).userInfo : null;
    // console.log('토큰 유저아이디:', userInfo.user_id);
    // console.log('댓글 유저아이디', user_id);
    // console.log('닉넴', user_nickname);
    if (user_nickname === userInfo.user_nickname) {
      return true;
    } else return false;
  };
  const [showPopup, setShowPopup] = useState(false);

  const togglePopUpDown = () => {
    setShowPopup(!showPopup);
  };
  const onDeleteComment = async () => {
    try {
      const commentDeleteUrl = `http://localhost:5500/api/v1/comment/${comment_id}`;
      const accessToken = localStorage.getItem('accessToken');
      const header = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true
      };
      await axios.delete(commentDeleteUrl, header);
    } catch (error) {
      console.log('삭제실패:', error);
    }
  };
  return (
    <>
      <CommentBox>
        <CommentHeader>
          <div>
            <img alt="프로필사진" src={process.env.PUBLIC_URL + user_img}></img>
            <span>{user_nickname}</span>
          </div>
          {isMyComment() && (
            <AsideLayer>
              <div onClick={togglePopUpDown}>
                <img alt="더보기아이콘" src={IconMoreInfo}></img>
              </div>
              {showPopup ? (
                <PopUp>
                  <BtnEdit>수정</BtnEdit>
                  <BtnDelete onClick={onDeleteComment}>삭제</BtnDelete>
                </PopUp>
              ) : null}
            </AsideLayer>
          )}
        </CommentHeader>
        <CommentContent>
          <p>{comment_content}</p>
        </CommentContent>
        <CommentFooter>
          <p>{created_at}</p>
        </CommentFooter>
      </CommentBox>
    </>
  );
};

export default Comment;

const CommentBox = styled.div`
  padding: 14px 0 14px;
  border-bottom: 1px solid #000000;
  background: #fefcd9;
`;

const CommentHeader = styled.div`
  display: flex;
  padding-right: 30px;
  justify-content: space-between;

  & div {
    display: flex;
    align-items: center;
  }
`;

const AsideLayer = styled.div`
  top: -3px;
  // right: -50px;
`;

const PopUp = styled.div`
  width: 50px;
  background-color: white;
`;

const BtnEdit = styled.button`
  border: none;
  background: none;
  display: block;
  width: 100%;
  font-size: 16px;
`;

const BtnDelete = styled.button`
  border: none;
  background: none;
  display: block;
  width: 100%;
  font-size: 16px;
`;
const CommentContent = styled.div`
  margin-top: -4px;
  padding-left: 40px;

  & > p {
    overflow: hidden;
    word-break: break-all;
    line-height: 20px;
  }
`;
const CommentFooter = styled.div`
  padding-left: 40px;

  & > p {
    margin-right: 12px;
    font-size: 12px;
  }
`;
