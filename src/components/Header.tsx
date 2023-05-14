import styled from 'styled-components';

const Header = () => {
  return <StyledHeader>위치</StyledHeader>;
};

export default Header;

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  background: #fefcd9;
  box-sizing: border-box;
  padding: 40px 15px 0 15px;
  font-size: 18px;
  font-weight: 700;
`;
