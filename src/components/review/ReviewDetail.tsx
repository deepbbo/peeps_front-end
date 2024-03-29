import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewPlace from './ReviewPlace';
import StarRating from './ReviewStarRating';
import { ReviewType } from './types/ReviewType';
import iconProfileEmpty from '../../images/icon-user-profile-empty.svg';

const ReviewDetail = () => {
  const { review_id } = useParams();
  const [reviewDetail, setReviewDetail] = useState<ReviewType | null>(null);

  useEffect(() => {
    (async () => {
      const reviewURL = `http://localhost:5500/api/v1/review/${review_id}`;
      try {
        const response = await axios.get(reviewURL);
        setReviewDetail(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [review_id]);

  const getDate = (date: string) => {
    const newDate: string = date.split('T')[0];
    return newDate;
  };

  if (!reviewDetail) {
    return <div>불러오는 중...</div>;
  }

  return (
    <DetailContainer>
      <ReviewPlace />

      <DetailContent>
        <h1>리뷰 상세</h1>
        <div className="review-box" key={reviewDetail.review_id}>
          <div className="review-user">
            <div className="user-content">
              <div className="user-content-profile">
                {reviewDetail.user_pic ? (
                  <img src={reviewDetail.user_pic} alt="유저 프로필"></img>
                ) : (
                  <img src={iconProfileEmpty} alt="유저 프로필"></img>
                )}
              </div>
              <div className="user-content-info">
                <p>{reviewDetail.user_nickname}</p>
                <p>{getDate(reviewDetail.created_at)}</p>
              </div>
            </div>
            <div className="user-rate">
              <StarRating rating={reviewDetail.star_rating} />
            </div>
          </div>
          <div className="review-content">
            <p className="review-content-text">{reviewDetail.review_content}</p>
            {reviewDetail.review_img && (
              <div className="review-content-pic">
                <img src={reviewDetail.review_img} alt="리뷰 이미지" />
              </div>
            )}
          </div>
        </div>
      </DetailContent>
    </DetailContainer>
  );
};

export default ReviewDetail;

const DetailContainer = styled.section`
  position: relative;
  height: calc(100vh - 156px);
  padding: 0 15px;
`;

const DetailContent = styled.div`
  height: calc(100% - 125px);

  h1 {
    padding: 18px 0;
    font-weight: 700;
    font-size: 18px;
    line-height: 1em;
    color: #eb8d00;
  }

  .review-box {
    overflow-y: scroll;
    height: calc(100% - 114px);

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
    padding-bottom: 60px;
  }

  .review-box::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }

  .review-user,
  .user-content {
    display: flex;
    align-items: center;
  }

  .review-user {
    justify-content: space-between;
    padding-bottom: 22px;
  }

  .user-content {
    &-profile {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 8px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-info {
      p:nth-child(1) {
        line-height: 22px;
      }
      p:nth-child(2) {
        font-size: 13px;
        color: #949494;
      }
    }
  }

  .review-content {
    &-text {
      line-height: 1.2em;
      color: #000;
      padding-bottom: 18px;
    }
    &-pic {
      img {
        width: 100%;
      }
    }
  }
`;
