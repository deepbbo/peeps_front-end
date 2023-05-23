import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import iconWrite from '../images/icon-write-review.svg';
import { Link, useParams } from 'react-router-dom';
import ReviewPlace from './ReviewPlace';
import StarRating from './ReviewStarRating';
import star from '../images/icon-star.svg';

interface ReviewType {
  id: number;
  created_at: number;
  user_nickname: string;
  user_pic: string;
  review_content: string;
  review_img: string;
  star_rating: number;
}

const ReviewList = () => {
  const { location_id } = useParams();
  const [reviewData, setReviewData] = useState<ReviewType[]>([]);

  useEffect(() => {
    (async () => {
      //  API 연결 후 ${location_id}로 변경
      const reviewURL = `http://localhost:9999/reviews`;
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

  return (
    <ReviewContainer>
      <ReviewPlace />

      <ReviewContent>
        <h1>전체 리뷰</h1>
        <ul className="review-wrap">
          {reviewData.map((review: ReviewType) => (
            <li className="review-box" key={review.id}>
              <div className="review-user">
                <div className="user-content">
                  <div className="user-content-profile">
                    <img src={review.user_pic} alt="유저 프로필"></img>
                  </div>
                  <div className="user-content-info">
                    <p>{review.user_nickname}</p>
                    <p>{review.created_at}</p>
                  </div>
                </div>
                <div className="user-rate">
                  <StarRating rating={review.star_rating} />
                </div>
              </div>
              <div className="review-content">
                <Link to={`/review/detail/:${review.id}`}>
                  <div className="review-content-pic">
                    {review.review_img && (
                      <img src={review.review_img} alt="리뷰 이미지" />
                    )}
                  </div>
                  <p className="review-content-text">{review.review_content}</p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </ReviewContent>

      <WriteButton to="/review/write/:user_id">
        <img src={iconWrite} alt="리뷰 작성하기" />
      </WriteButton>
    </ReviewContainer>
  );
};

export default ReviewList;

const ReviewContainer = styled.section`
  position: relative;
  height: calc(100vh - 156px);
  padding: 0 15px;
`;

const ReviewContent = styled.div`
  height: calc(100% - 125px);

  h1 {
    padding: 18px 0;
    font-weight: 700;
    font-size: 18px;
    line-height: 1em;
    color: #eb8d00;
  }

  .review-wrap {
    overflow-y: scroll;
    height: calc(100% - 54px);

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }

  .review-wrap::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }

  .review-box {
    padding-bottom: 32px;

    &:last-child {
      padding-bottom: 60px;
    }
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
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      white-space: normal;
      color: #000;
      padding-top: 4px;
    }
    &-pic {
      img {
        width: 100%;
      }
    }
  }
`;

const WriteButton = styled(Link)`
  position: absolute;
  right: 15px;
  bottom: 15px;
  width: 44px;
  height: 44px;
  border: none;
  background: #eb8d00;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }
`;
