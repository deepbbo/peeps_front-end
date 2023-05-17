import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ReviewProps {
  placeId: number;
}

interface PlaceDataType {
  id: number;
  name: string;
  category: string;
  address: string;
  reviews: ReviewType[];
}

interface ReviewType {
  id: number;
  author: string;
  content: string;
}

const Review = ({ placeId }: ReviewProps) => {
  const [placeData, setPlaceData] = useState<PlaceDataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    photo: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`review/${placeId}`);
        setPlaceData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [placeId]);

  // 모달창 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달창 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 폼 데이터 업로드 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 파일 업로드 함수
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    setFormData({
      ...formData,
      photo: file
    });
  };

  // 폼 데이터 변경 이벤트 처리 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append('content', formData.content);
    formData.photo && data.append('photo', formData.photo);

    try {
      const response = await axios.post(`review/${placeId}`, data);
      console.log(response);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (!placeData) {
    return <div>불러오는 중...</div>;
  }

  return (
    <>
      {/* 장소 정보 표시 */}
      <button className="back-btn">
        <img src="" alt="뒤로 가기" />
      </button>
      <div className="placeInfo">
        <div>
          {placeData.name}
          <span>{placeData.category}</span>
        </div>
        <div>{placeData.address}</div>
      </div>

      {/* 리뷰 목록 표시 */}
      <div className="placeReview">
        <h1>전체 리뷰</h1>
        {placeData.reviews.map((review: ReviewType) => (
          <div key={review.id}>
            <div>{review.author}</div>
            <div>{review.content}</div>
          </div>
        ))}
      </div>

      {/* 리뷰 작성 버튼 */}
      <button className="write-btn" onClick={openModal}>
        <img src="" alt="리뷰 작성하기" />
      </button>

      {/* 리뷰 작성 모달창 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <label>
                <p>나의 리뷰</p>
                <input
                  type="text"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>사진</p>
                <input type="file" name="photo" onChange={handleFileUpload} />
              </label>
              <button type="submit">리뷰 작성하기</button>
            </form>
            <button className="close-btn" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
