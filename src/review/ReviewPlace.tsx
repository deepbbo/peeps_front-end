import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import iconGoBack from '../images/icon-go-back.svg';
import { useSelector } from 'react-redux';

interface PlaceDataType {
  place_name: number;
  category_name: string;
  address_name: string;
  phone: string;
}

const ReviewPlace = () => {
  const navigate = useNavigate();
  const placeData = useSelector((state: any) => {
    console.log(state);
    return state.place;
  });

  // 이전페이지로 이동
  const goBack = () => {
    navigate(-1);
  };

  return (
    <PlaceInfo>
      <GoBackButton onClick={goBack}>
        <img src={iconGoBack} alt="뒤로 가기" />
      </GoBackButton>

      <div>
        {placeData.place_name}
        <span>{placeData.category_name}</span>
      </div>
      <div>
        {placeData.address_name}
        {placeData.phone}
      </div>
    </PlaceInfo>
  );
};

export default ReviewPlace;

const GoBackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 15px;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
`;

const PlaceInfo = styled.div`
  height: 124px;
  border-bottom: 1px solid #e0e0e0;
`;
