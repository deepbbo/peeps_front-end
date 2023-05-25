import React from 'react';
import styled from 'styled-components';

interface CategoryNameProps {
  name: string;
  key: string;
}

const categories = [
  {
    name: 'daily',
    text: '일상'
  },
  {
    name: 'infoShare',
    text: '정보공유'
  },
  {
    name: 'bragPet',
    text: '내 새꾸 자랑'
  }
];
const categoryHeight = '50px';

const CategoryBlock = styled.div`
  display: flex;
  height: ${categoryHeight};
  justify-content: start;
  gap: 22px;
  padding: 0 16px;
  border-bottom: 1px solid #e6e6e6;
`;
const CategoryName = styled.div<CategoryNameProps>`
  font-size: 16px;
  height: calc(100% - 1px);
  line-height: ${categoryHeight};

  &.nowCategory {
    border-bottom: 2px solid #000;
    font-weight: bold;
    cursor: pointer;
  }
`;

interface CategoryProps {
  nowCategory: string;
  setNowCategory: (category: string) => void;
}

const Category: React.FC<CategoryProps> = ({ nowCategory, setNowCategory }) => {
  const handleClickCategory = (e: any) => {
    const { innerText } = e.target;
    setNowCategory(innerText);
  };

  return (
    <CategoryBlock>
      {categories.map((category, index) => {
        return (
          <CategoryName
            name={category.name}
            key={category.name + category.text + index}
            className={category.text === nowCategory ? 'nowCategory' : ''}
            onClick={handleClickCategory}
          >
            {category.text}
          </CategoryName>
        );
      })}
    </CategoryBlock>
  );
};

export default React.memo(Category);
