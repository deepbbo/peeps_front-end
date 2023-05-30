import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import iconNav1 from '../images/icon-nav1.svg';
import iconNav2 from '../images/icon-nav2.svg';
import iconNav3 from '../images/icon-nav3.svg';
import iconNav4 from '../images/icon-nav4.svg';
import iconNav1Active from '../images/icon-nav1-active.svg';
import iconNav2Active from '../images/icon-nav2-active.svg';
import iconNav3Active from '../images/icon-nav3-active.svg';
import iconNav4Active from '../images/icon-nav4-active.svg';

const Navigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Nav>
      <NavList>
        <li>
          <NavLink to="/" onClick={() => handleNavClick(0)}>
            <img
              src={activeIndex === 0 ? iconNav1Active : iconNav1}
              alt="지도"
            />
            <p>지도</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/board" onClick={() => handleNavClick(1)}>
            <img
              src={activeIndex === 1 ? iconNav2Active : iconNav2}
              alt="커뮤니티"
            />
            <p>커뮤니티</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat" onClick={() => handleNavClick(2)}>
            <img
              src={activeIndex === 2 ? iconNav3Active : iconNav3}
              alt="채팅"
            />
            <p>채팅</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/my" onClick={() => handleNavClick(3)}>
            <img
              src={activeIndex === 3 ? iconNav4Active : iconNav4}
              alt="마이페이지"
            />
            <p>마이페이지</p>
          </NavLink>
        </li>
      </NavList>
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
  background: #ffffff;
  border-top: 1px solid #bbbbbb;
  padding: 8px 15px 30px 15px;
  box-sizing: border-box;
`;

const NavList = styled.ul`
  display: flex;

  li {
    width: 25%;
    text-align: center;

    p {
      font-size: 14px;
      margin-top: 2px;
      color: #0f0f0f;
    }
  }
`;
