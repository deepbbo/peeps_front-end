import React from 'react';
import styled from 'styled-components';

const PostItemBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
  min-height: 78px;
`;
const PostLink = styled.a`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 11px 0;
  text-decoration: none;
  &:visited {
    color: #000;
  }
`;
const PostTitle = styled.span`
  font-size: 14px;
  margin-bottom: 2px;
`;
const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  & > div {
    font-size: 11px;
    color: #979797;
  }
`;
const PostImage = styled.img`
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 4px;
`;

const PostItem = ({ postData }: { postData: any }) => {
  return (
    <PostItemBlock>
      <PostLink href=".">
        <PostInfo>
          <PostTitle>{postData.post_title}</PostTitle>
          <div className="community-posts-info">
            <span>{postData.user_nickname} </span>
            <span>{postData.created_at.substr(0, 10)} </span>
            <span>댓글 {postData.comment_count}</span>
          </div>
        </PostInfo>
        {postData.post_img && (
          <PostImage src={postData.post_img} alt="petImage" />
        )}
      </PostLink>
    </PostItemBlock>
  );
};

export default React.memo(PostItem);
