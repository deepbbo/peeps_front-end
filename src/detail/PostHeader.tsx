import React, { useState } from 'react';
import styled from 'styled-components';

interface T {
  post_id: number;
  post_category: string;
  post_title: string;
  created_at: string;
  user_nickname: string;
  user_img: string | null;
  user_id: string;
  comment_count: number;
}

const PostHeader = ({
  post_category,
  post_title,
  created_at,
  user_nickname,
  user_img,
  user_id,
  comment_count
}: T) => {
  // if (user_img === null) {
  //   user_img = `/icon/profile.svg`;
  // }
  const isMyPost = () => {
    const userToken = localStorage.getItem('userToken');
    const userInfo = userToken ? JSON.parse(userToken).userInfo : null;
    // console.log('토큰 유저아이디:', userInfo.user_id);
    // console.log('댓글 유저아이디', user_id);
    // console.log('닉넴', user_nickname);
    if (user_id === userInfo.user_id) {
      return true;
    } else return false;
  };
  const [showPopup, setShowPopup] = useState(false);

  const togglePopUpDown = () => {
    setShowPopup(!showPopup);
  };
  return (
    <>
      <TitleComponent>
        <TitMenu>
          <PostCategory>{post_category}</PostCategory>
          {isMyPost() && (
            <AsideLayer>
              <div onClick={togglePopUpDown}>
                <img
                  alt="더보기아이콘"
                  src={`${process.env.PUBLIC_URL}/icon/more-info.svg`}
                ></img>
              </div>
              {showPopup ? (
                <PopUp>
                  <BtnEdit>수정</BtnEdit>
                  <BtnDelete>삭제</BtnDelete>
                </PopUp>
              ) : null}
            </AsideLayer>
          )}
        </TitMenu>
        <UserWrap>
          <ProfilePicture>
            <img alt="프로필사진" src={process.env.PUBLIC_URL + user_img}></img>
          </ProfilePicture>
          <InfoFirst>
            <Nickname>{user_nickname}</Nickname>
          </InfoFirst>
          <Info>
            <Date>{created_at}</Date>
            <CommentCount>댓글 {comment_count}</CommentCount>
          </Info>
          <div>
            <BtnComments>
              <img
                alt="댓글아이콘"
                src={`${process.env.PUBLIC_URL}/icon/comment.svg`}
              ></img>
            </BtnComments>
          </div>
        </UserWrap>

        <PostTitle>{post_title}</PostTitle>
      </TitleComponent>
    </>
  );
};

export default PostHeader;

const TitleComponent = styled.div`
  position: relative;
  margin: 16px;
  padding: 18px 0 20px;
  border-bottom: 1px solid;
`;

const TitMenu = styled.div`
  display: flex;
  position: relative;
  min-height: 24px;
  margin-bottom: 8px;
  padding-right: 80px;
`;

const PostCategory = styled.div`
  color: #979797;
  font-size: 14px;
`;

const PostTitle = styled.div`
  position: relative;
  margin: 9px 0;
  padding-right: 24px;
  font-size: 24px;
  font-weight: 400;
  word-break: break-all;
  word-wrap: break-word;
`;

const AsideLayer = styled.div`
  position: absolute;
  top: -3px;
  right: -10px;
`;

const PopUp = styled.div`
  position: absolute;
  width: 50px;
  top: 20px;
  right: -10px;
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

const UserWrap = styled.div`
  position: relative;
  height: 40px;
`;

const ProfilePicture = styled.div`
  display: inline-block;
  float: left;
  position: relative;
  width: 40px;
  height: 40px;
  margin: 0 6px 0 0;
  border-radius: 35px;
`;

const Info = styled.div`
  padding-right: 70px;
  line-height: 16px;

  & > div {
    padding-right: 20px;
  }
`;

const InfoFirst = styled.div`
  padding-top: 3px;
  padding-right: 70px;
  line-height: 16px;
`;

const Nickname = styled.div`
  display: table-cell;
  padding-right: 2px;
  color: #000000;
  font-size: 16px;
  line-height: 1.2;
  align-items: center;
`;

// const UserImg = styled.div`
//   border-radius: 35px;
//   width: 40px;
//   aspect-ratio: auto 40 / 40;
//   height: 40px;
//   overflow-clip-margin: content-box;
//   overflow: clip;
// `;

const Date = styled.div`
  position: relative;
  display: table-cell;
  font-size: 12px;
`;

const CommentCount = styled.div`
  position: relative;
  display: table-cell;
  font-size: 12px;
`;

const BtnComments = styled.button`
  position: absolute;
  top: 4px;
  right: 10px;
  width: 20px;
  margin-left: auto;
  border: none;
  background: none;
`;
