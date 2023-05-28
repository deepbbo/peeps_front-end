import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import location from './location.json';

interface T {
  separate: string;
}

interface MenuType {
  isOpen: boolean;
}
interface LiType {
  id: string;
  key: number;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}

const Location = ({ separate }: T) => {
  const ref = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState(null);

  const onActiveToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const onClick = (e: { target: any }) => {
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isOpen, ref]);

  const onSelectItem = useCallback((event: { target: any }) => {
    const targetId = event.target.id;

    if (targetId === 'item_name') {
      setItem(event.target.parentElement.innerText);
    } else if (targetId === 'item') {
      setItem(event.target.innerText);
    }

    setIsOpen(prev => !prev);
  }, []);

  return (
    <DropdownContainer>
      <DropdownButton onClick={onActiveToggle} ref={ref}>
        {item ? (
          <>
            <ItemName>{item}</ItemName>
          </>
        ) : (
          <>
            <ItemName>선택안함</ItemName>
          </>
        )}
      </DropdownButton>
      <DropdownMenu isOpen={isOpen}>
        <Ul>
          {(() => {
            if (separate === 'si') {
              return location.si.map(item => (
                <Li id="item" key={item.id} onClick={onSelectItem}>
                  <ItemName id="item_name">{item.name}</ItemName>
                </Li>
              ));
            } else {
              return location.do.map(item => (
                <Li id="item" key={item.id} onClick={onSelectItem}>
                  <ItemName id="item_name">{item.name}</ItemName>
                </Li>
              ));
            }
          })()}
        </Ul>
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Location;

const DropdownContainer = styled.ul`
  width: 100%;
  height: 50px;
  list-style: none;
  overflow-y: scroll;
  overflow: visible;
  border-radius: 6px;
  border: 1px solid #eb8d00;
  margin: 10px;
`;

const DropdownButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: 10px auto;
`;

const DropdownMenu = styled.div<MenuType>`
  color: #000000;
  background-color: #ffffff;
  position: relative;
  // top: 52px;
  left: 50%;
  width: 100%;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  // z-index: 9;

  &:after {
    content: '';
    height: 0;
    width: 0;
    // position: absolute;
    // top: -3px;
    // left: 50%;
    // transform: translate(-50%, -50%);
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  overflow-y: scroll;
  max-height: 100px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const Li = styled.li<LiType>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;

  // padding: 9px 14px;
  // border-bottom: 0.5px solid #d2d2d2;
  // border-top: none;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.p`
  font-size: 16px;
  text-decoration: none;
`;

// const Logout = styled.div`
//   cursor: pointer;
//   font-size: 16px;
//   display: block;
//   text-decoration: none;
//   font-size: 19px;
// `;
