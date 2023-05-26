import React from 'react';
import star from '../images/icon-star.svg';
import styled from 'styled-components';

function StarRating({ rating }: { rating: number }) {
  const MAX_RATING = 5;
  const emptyStars = MAX_RATING - rating;

  return (
    <div className="star-rating">
      {[...Array(rating)].map((_, index) => (
        <StarImg key={index} src={star} alt="별"></StarImg>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <StarImg
          key={index}
          className="empty-star"
          src={star}
          alt="별"
        ></StarImg>
      ))}
    </div>
  );
}

export default StarRating;

const StarImg = styled.img`
  width: 22px;
  height: 22px;

  &.empty-star {
    filter: grayscale(100%);
  }
`;
