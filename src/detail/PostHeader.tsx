import React from 'react';
import styled from 'styled-components';

interface T {
  category: string;
  title: string;
  date: string;
  user_nickname: string;
}
const PostHeader = ({ category, title, date, user_nickname }: T) => {
  return (
    <>
      <TitleComponent>
        <TitMenu>
          <PostCategory>{category}</PostCategory>
          <AsideLayer>
            <img
              alt="더보기아이콘"
              src={process.env.PUBLIC_URL + '/icon/more-info.svg'}
            ></img>
          </AsideLayer>
        </TitMenu>
        <UserWrap>
          <ProfilePicture>
            <img
              alt="프로필사진"
              src={process.env.PUBLIC_URL + '/icon/profile.svg'}
            ></img>
          </ProfilePicture>
          <InfoFirst>
            <Nickname>{user_nickname}</Nickname>
          </InfoFirst>
          <Info>
            <Date>{date}</Date>
            <CommentCount>댓글수</CommentCount>
          </Info>
          <div>
            <BtnComments>
              <img
                alt="댓글아이콘"
                src={process.env.PUBLIC_URL + '/icon/comment.svg'}
              ></img>
            </BtnComments>
          </div>
        </UserWrap>

        <PostTitle>
          {/* <Tit> */}
          {title}
          {/* </Tit> */}
        </PostTitle>
      </TitleComponent>
    </>
  );
};

export default PostHeader;

const TitleComponent = styled.div`
  position: relative;
  margin: 0 16px;
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
  margin-bottom: 18px;
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
  font-size: 14px;
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
`;

const CommentCount = styled.div`
  position: relative;
  display: table-cell;
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
