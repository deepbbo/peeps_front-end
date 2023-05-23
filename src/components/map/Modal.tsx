import React from 'react';

interface Place {
  place_name: string;
  category_name: string;
  address_name: string;
  phone: string;
}

interface ModalProps {
  place: Place;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ place, closeModal }) => {
  return (
    <div>
      <h2>{place.place_name}</h2>
      <p>카테고리: {place.category_name}</p>
      <p>주소: {place.address_name}</p>
      <p>전화번호: {place.phone}</p>
      <button onClick={closeModal}>닫기</button>
    </div>
  );
};

export default Modal;
