import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewPlace from './ReviewPlace';
import { useNavigate, useLocation } from 'react-router-dom';
import IconImgUpload from '../../images/icon-upload-img.svg';
import IconPreviewEmpty from '../../images/icon-image-preview-empty.svg';

const ReviewWrite = () => {
  const [textData, setTextData] = useState('');
  const [imageData, setImageData] = useState<File[]>([]);
  const [starData, setStarData] = useState('5');

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationId = searchParams.get('location_id');

  // 리뷰 텍스트 업로드
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 165) {
      setTextData(inputValue);
    } else {
      alert('리뷰를 165자 이하로 작성해주세요!');
    }
  };

  // 이미지 업로드
  const handleFileSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as any;
    setImageData([...files]);
  };

  // 이미지 삭제
  const handleFileDelete = () => {
    setImageData([]);
  };

  const handleStarRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStarData(e.target.value);
  };

  // 폼 데이터 변경 이벤트 처리
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textData) {
      alert('리뷰를 작성해주세요✍️');
      return;
    }

    const user_id = 'user1';

    const formData = new FormData();
    formData.append('user_id', user_id);
    if (locationId !== null) {
      formData.append('location_id', locationId);
    }
    formData.append('star_rating', starData);
    formData.append('review_content', textData);
    formData.append('post_img', imageData[0]);

    try {
      await axios.post(`http://localhost:5500/api/v1/review`, formData);
      navigate(`/review/location/${locationId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WriteContainer>
      <ReviewPlace />

      <WriteContent>
        <form onSubmit={handleSubmit}>
          <div className="text-content">
            <div className="write-top">
              <p className="write-title">나의 리뷰</p>
              <div className="select-box">
                <select
                  name="star"
                  value={starData}
                  onChange={handleStarRating}
                >
                  <option value="1">⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
              </div>
            </div>
            <textarea
              placeholder="리뷰 내용을 입력해주세요"
              value={textData}
              onChange={handleChange}
            />
          </div>
          <div className="image-content">
            <div className="write-top">
              <p className="write-title">사진</p>
              <label htmlFor="image-input">
                <p>업로드</p>
                <img src={IconImgUpload} alt="" />
              </label>
              <input
                type="file"
                accept="image/*"
                id="image-input"
                onChange={handleFileSave}
              />
            </div>
            {imageData.length > 0 ? (
              imageData.map(image => {
                return (
                  <div className="image-preview" key={image.name + image.size}>
                    <img src={URL.createObjectURL(image)} alt={image.name} />
                    <button onClick={handleFileDelete}>❌</button>
                  </div>
                );
              })
            ) : (
              <div className="image-preview-empty">
                <img src={IconPreviewEmpty} alt="미리보기" />
                <span>미리보기</span>
              </div>
            )}
          </div>

          <button className="write-button" type="submit">
            리뷰 작성하기
          </button>
        </form>
      </WriteContent>
    </WriteContainer>
  );
};

export default ReviewWrite;

const WriteContainer = styled.section`
  position: relative;
  height: calc(100vh - 156px);
  padding: 0 15px;
`;

const WriteContent = styled.div`
  overflow-y: scroll;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
  height: calc(100% - 125px);

  .write-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .write-title {
    font-weight: 700;
    font-size: 18px;
    color: #eb8d00;
    padding: 18px 0;
  }

  .select-box {
    position: relative;
    height: 24px;

    select {
      padding: 0 2px;
      height: inherit;
      border: 1px solid #bfbfbf;
      border-radius: 6px;
      outline: 0 none;
      z-index: 3;
    }
  }

  textarea {
    background: none;
    border-radius: 10px;
    border: 1px solid #e8e8e8;
    width: 100%;
    height: 130px;
    padding: 11px;
    box-sizing: border-box;
    resize: none;
    outline: none;
    font-size: 14px;
  }

  textarea::placeholder {
    color: #cdcdcd;
  }

  .image-content {
    label {
      display: flex;
      align-items: center;
      height: 24px;
      border: 1px solid #bfbfbf;
      border-radius: 4px;
      padding: 2px 7px 2px 10px;
      box-sizing: border-box;
      cursor: pointer;

      p {
        padding-right: 4px;
      }
    }

    #image-input {
      display: none;
    }

    .image-preview,
    .image-preview-empty {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 260px;
      border-radius: 10px;
      border: 1px solid #e8e8e8;
      padding: 11px;
      margin-bottom: 74px;
    }

    .image-preview {
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      button {
        position: absolute;
        top: 2px;
        right: 2px;

        display: block;
        padding: 8px;
        font-size: 14px;
        border-radius: 4px;
        background-color: #fff;
      }
    }

    .image-preview-empty {
      span {
        color: #cdcdcd;
        font-size: 14px;
        margin-left: 6px;
      }
    }
  }

  .write-button {
    position: absolute;
    left: 0;
    bottom: 15px;
    font-size: 18px;
    color: #fff;
    font-weight: 700;
    width: calc(100% - 30px);
    height: 44px;
    margin: 0 15px;
    background-color: #eb8d00;
    border-radius: 80px;
    border: none;
    cursor: pointer;
  }
`;
