import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import iconGoBack from '../../images/icon-go-back.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ReviewPlace = () => {
  const navigate = useNavigate();
  const placeData = useSelector((state: RootState) => {
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

      <div className="place-title">
        {placeData.place_name}
        <span>{placeData.category_name}</span>
      </div>
      <div className="place-detail">
        <p className="place-detail-address">{placeData.address_name}</p>
        <p className="place-detail-phone">{placeData.phone}</p>
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
  padding-top: 44px;
  border-bottom: 1px solid #e0e0e0;
  box-sizing: border-box;

  .place-title {
    font-weight: 700;
    font-size: 18px;
    color: #0f0f0f;
    padding-bottom: 6px;

    span {
      font-weight: 400;
      font-size: 12px;
      color: #888;
      margin-left: 8px;
    }
  }
  .place-detail {
    &-address,
    &-phone {
      padding: 2px 0;
    }

    &-phone {
      font-size: 14px;
    }
  }
`;
