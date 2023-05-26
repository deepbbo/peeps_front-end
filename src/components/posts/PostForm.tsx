import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HeaderPostForm = styled.header`
  max-width: 100%;
  height: 51px;
  top: 0;
  padding: 0 16px;
  text-align: center;
  line-height: 51px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #ebebeb;
`;
const SelectDiv = styled.div`
  max-width: 100%;
  height: 45px;
  padding: 0 16px;
  line-height: 45px;
  font-size: 15px;
  border-bottom: 1px solid #ebebeb;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 230px;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  & > p {
    max-width: 100%;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin: 0;
    padding: 4px 0;
  }
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  min-width: 100%;
  padding: 0 0 11px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  & > p {
    max-width: 100%;
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }
`;
const ModalList = styled.ul`
  text-align: center;
  list-style: none;
  padding: 0;
  border-bottom: 1px solid #ccc;
  min-width: 100%;
  & > li {
    font-size: 14px;
    padding-bottom: 12px;
  }
  & > li:last-child {
    margin-bottom: 24px;
  }
`;
const InputTitleContainer = styled.div`
  max-width: 100%;
  padding: 13px 16px;
  border-bottom: 1px solid #ebebeb;
`;
const InputTitle = styled.input`
  border: none;
  font-size: 15px;
  font-weight: bold;
  max-width: 100%;
  &::placeholder {
    color: #a7a7a7;
  }
  &:focus {
    outline: none;
  }
`;
const IconContainer = styled.div`
  max-width: 100%;
  padding: 4px 16px;
  border-bottom: 1px solid #ebebeb;
`;
const IconEachContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 39px;
  min-height: 39px;
  padding-top: 5px;
`;
const SelectImageButton = styled.input`
  display: none;
`;
const ContentTextArea = styled.textarea`
  box-sizing: border-box;
  min-width: 100%;
  min-height: 270px;
  padding: 15px 16px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #ebebeb;
  resize: none;
  &::placeholder {
    color: #b2b2b2;
  }
  &:focus {
    outline: none;
  }
`;
const ImagesUl = styled.ul`
  display: flex;
  gap: 15px;
  padding: 15px 16px;
  list-style: none;
  margin: 0;
  max-width: 100%;
`;
const ImageImg = styled.img`
  border-radius: 4px;
  max-width: 100px;
  max-height: 80px;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 18px 16px 14px 16px;
  max-width: 100%;
  bottom: 0;
`;
const ButtonCancel = styled.button`
  display: block;
  height: 40px;
  margin: 0 5px;
  background-color: #f5f6f8;
  color: #676767;
  line-height: 40px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  text-align: center;
  width: 50%;
`;
const ButtonSubmit = styled(ButtonCancel)`
  background-color: #e8f8eb;
  color: #009f47;
`;

const PostForm = () => {
  const [showImage, setShowImage] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '카테고리를 선택해주세요.',
    title: '',
    content: ''
  });
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imagesArray = e.target.files as any;

    setShowImage(true);
    setImages([...imagesArray]);
  };

  const handleModalOpenClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCategoryChange = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    setFormData({ ...formData, category: target.innerText });
    setIsModalOpen(false);
  };

  const onChangeFormData = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === 'content' && e.target.value.length > 255) {
      return;
    }
    const nextForm = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(nextForm);
  };

  const handleCancel = () => {
    const check = window.confirm('취소하시겠습니까?');
    if (!check) return;
    navigate('/posts');
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formData.category === '카테고리를 선택해주세요.') {
      alert('카테고리를 선택해주세요.');
      return;
    } else if (formData.title === '') {
      alert('제목을 입력해주세요.');
      return;
    } else if (formData.content === '') {
      alert('내용을 입력해주세요.');
      return;
    } else {
      const check = window.confirm('게시글을 등록하시겠습니까?');
      if (!check) return;
    }
    const url = 'http://localhost:5500/api/v1/post/user10';
    const totalFormData = new FormData();
    const headers = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    totalFormData.append('post_category', formData.category);
    totalFormData.append('post_title', formData.title);
    totalFormData.append('post_content', formData.content);
    totalFormData.append('post_img', images[0]);

    try {
      const response = await axios.post(url, totalFormData, headers);
      navigate('/posts');
      if (response.data) console.log('게시글 작성에 성공했습니다.');
    } catch (error) {
      console.log('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <>
      <HeaderPostForm>게시글 작성</HeaderPostForm>
      <div>
        <SelectDiv>
          <div onClick={handleModalOpenClose}>{formData.category}</div>
        </SelectDiv>
        {isModalOpen && (
          <ModalOverlay>
            <ModalContent ref={modalRef}>
              <ModalHeader>
                <p>카테고리 선택</p>
              </ModalHeader>
              <ModalList>
                <li onClick={handleCategoryChange}>일상</li>
                <li onClick={handleCategoryChange}>정보공유</li>
                <li onClick={handleCategoryChange}>내 새꾸 자랑</li>
              </ModalList>
              <p onClick={handleModalOpenClose}>닫기</p>
            </ModalContent>
          </ModalOverlay>
        )}
        <InputTitleContainer>
          <InputTitle
            type="text"
            placeholder="제목"
            name="title"
            value={formData.title}
            onChange={onChangeFormData}
          />
        </InputTitleContainer>
      </div>
      <div>
        <IconContainer>
          <IconEachContainer>
            <label htmlFor="image-upload-button">
              <svg
                width="26px"
                height="26px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8482 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5865L15.7901 12.4679C16.4651 11.9279 17.4053 11.8856 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5302L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z"
                    stroke="#000000"
                  ></path>{' '}
                </g>
              </svg>
            </label>
            <SelectImageButton
              type="file"
              id="image-upload-button"
              name="image-upload-button"
              onChange={handleInputFileChange}
              accept="image/*"
              multiple
            />
          </IconEachContainer>
        </IconContainer>
      </div>
      <ContentTextArea
        name="content"
        placeholder="내용을 입력하세요."
        value={formData.content}
        onChange={onChangeFormData}
        maxLength={255}
      ></ContentTextArea>
      <div className="images-preview">
        <ImagesUl>
          {showImage &&
            images.map(image => {
              return (
                <li key={image.name + image.size}>
                  <ImageImg src={URL.createObjectURL(image)} alt={image.name} />
                </li>
              );
            })}
        </ImagesUl>
      </div>
      <ButtonBox>
        <ButtonCancel onClick={handleCancel}>취소</ButtonCancel>
        <ButtonSubmit className="submit" onClick={handleSubmit}>
          등록
        </ButtonSubmit>
      </ButtonBox>
    </>
  );
};

export default React.memo(PostForm);
