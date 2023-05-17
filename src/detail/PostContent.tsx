import React from 'react';
import styled from 'styled-components';

interface T {
  text: string;
}
function PostContent({ text }: T) {
  // const [content, setContent] = useState();

  return (
    <>
      <PostBody>{text}</PostBody>
    </>
  );
}

export default PostContent;

const PostBody = styled.div`
  margin: 10px;
  min-height: 400px;
  border-bottom: 1px solid;
`;
