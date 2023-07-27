import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Header = () => {
  const header = useSelector((state: RootState) => {
    return state.header;
  });

  return <StyledHeader>{header}</StyledHeader>;
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
