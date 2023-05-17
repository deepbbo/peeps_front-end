import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface ReviewProps {
  placeId: number;
}

const ReviewModal = ({ placeId }: ReviewProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    content: ''
    //photo: null
  });

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
      ...formData
      //photo: file
    });
  };

  // 폼 데이터 변경 이벤트 처리 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append('content', formData.content);
    //formData.photo && data.append('photo', formData.photo);

    try {
      const response = await axios.post(`review/${placeId}`, data);
      console.log(response);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
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

export default ReviewModal;
