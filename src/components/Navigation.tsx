import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = () => {
  return (
    <Nav>
      <ul>
        <li>
          <NavLink to="/map">지도</NavLink>
        </li>
        <li>
          <NavLink to="/board">커뮤니티</NavLink>
        </li>
        <li>
          <NavLink to="/chat">채팅</NavLink>
        </li>
        <li>
          <NavLink to="/my">마이페이지</NavLink>
        </li>
      </ul>
    </Nav>
  );
};

export default Navigation;

const Nav = styled.nav`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 76px;
  background: #fefcd9;
  padding: 6px 15px 30px 15px;
  box-sizing: border-box;
`;
