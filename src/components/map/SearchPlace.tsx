import React, { useState, MouseEvent } from 'react';
import styled from 'styled-components';
import MapContainer from './MapContainer';

const SearchPlace: React.FC = () => {
  const [place, setPlace] = useState<string>('');

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    const text = e.currentTarget.textContent || '';
    setPlace(text);
  };

  return (
    <div>
      <Keywords>
        <div onClick={handleClick}>동물병원</div>
        <div onClick={handleClick}>애완용품점</div>
        <div onClick={handleClick}>애완미용</div>
        <div onClick={handleClick}>공원</div>
      </Keywords>

      <MapContainer searchPlace={place} />
    </div>
  );
};

export default SearchPlace;

const Keywords = styled.div`
  display: flex;
  flex-direction: row;
  & div {
    padding: 10px;
    margin-left: 10px;
    border: 1px solid #000;
    border-radius: 40px;
  }
`;
