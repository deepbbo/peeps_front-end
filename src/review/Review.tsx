import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import iconWrite from '../images/icon-write-review.svg';
import ReviewModal from './ReviewModal';

interface ReviewProps {
  placeId: number;
}

// interface PlaceDataType {
//   id: number;
//   name: string;
//   category: string;
//   address: string;
// }

interface ReviewType {
  review_id: number;
  user_id: string;
  review_content: string;
}

const Review = ({ placeId }: ReviewProps) => {
  const [reviewData, setReviewData] = useState<ReviewType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const reviewURL = 'http://localhost:9999/review';
      try {
        const response = await axios.get(reviewURL);
        setReviewData(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!reviewData) {
    return <div>불러오는 중...</div>;
  }
  // 모달창 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {/* 장소 정보 표시 */}
      <button>
        <img src="" alt="뒤로 가기" />
      </button>
      {/* <div className="placeInfo">
        <div>
          {placeData.name}
          <span>{placeData.category}</span>
        </div>
        <div>{placeData.address}</div>
      </div> */}

      {/* 리뷰 목록 표시 */}
      <div className="placeReview">
        <h1>전체 리뷰</h1>
        <div>
          {reviewData.map((review: ReviewType) => (
            <div key={review.review_id}>
              <div>{review.user_id}</div>
              <div>{review.review_content}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 리뷰 작성 버튼 */}
      <WriteBtn onClick={openModal}>
        <img src={iconWrite} alt="리뷰 작성하기" />
      </WriteBtn>
    </>
  );
};

export default Review;

const WriteBtn = styled.button`
  position: absolute;
  width: 44px;
  height: 44px;
  right: 15px;
  bottom: 15;

  background: #eb8d00;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  border: none;
`;
