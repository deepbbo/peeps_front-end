import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import iconGoBack from '../images/icon-go-back.svg';

interface PlaceDataType {
  place_name: number;
  category_group_name: string;
  address_name: string;
  phone: string;
}

const ReviewPlace = () => {
  const [placeData, setPlaceData] = useState<PlaceDataType[]>([]);
  const navigate = useNavigate();

  // 이전페이지로 이동
  const goBack = () => {
    navigate(-1);
  };

  return (
    <PlaceInfo>
      {/* 장소 정보 표시 */}
      <GoBackButton onClick={goBack}>
        <img src={iconGoBack} alt="뒤로 가기" />
      </GoBackButton>

      {/* <div>
          {placeData.place_name}
          <span>{placeData.category_name}</span>
        </div>
        <div>
        {placeData.address_name}
        {placeData.phone}
        </div> */}
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