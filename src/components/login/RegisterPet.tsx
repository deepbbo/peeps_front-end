import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import IconProfile from '../../images/profile_gray.svg';

const RegisterPet = (props: any) => {
  const { handleSubmit } = useForm({ mode: 'onChange' });

  return (
    <Contents>
      <Message>우리아이 등록</Message>
      <FormBox>
        <form onSubmit={handleSubmit(props.onSubmit)}>
          <div>
            <img alt="프로필사진" src={IconProfile}></img>
          </div>
          <div>
            <LabelText>이름</LabelText>
            <Input placeholder="이름"></Input>
          </div>
          <div>
            <LabelText>반려동물 종류</LabelText>
            <Select name="펫종류" id="펫종류">
              <Option key="" value="">
                선택안함
              </Option>
              <Option key="dog" value="dog">
                Dog
              </Option>
              <Option key="cat" value="cat">
                Cat
              </Option>
              <Option key="hamster" value="hamster">
                Hamster
              </Option>
            </Select>
          </div>
          <div>
            <LabelText>성별</LabelText>
            <Select name="성별" id="성별">
              <Option key="" value="">
                선택안함
              </Option>
              <Option key="남" value="남">
                남
              </Option>
              <Option key="여" value="여">
                여
              </Option>
            </Select>
          </div>
          <div>
            <LabelText>생년월일</LabelText>
            <Date type="date"></Date>
          </div>
          <div>
            <LabelText>반려동물 소개</LabelText>
            <Input placeholder="소개글을 작성해주세요!"></Input>
          </div>
        </form>
      </FormBox>
      <BtnRegisterPet>등록하기</BtnRegisterPet>
      <Later>
        <Link to={`/login`}>다음에 할게요</Link>
      </Later>
    </Contents>
  );
};

export default RegisterPet;

const Contents = styled.div`
  min-width: 375px;
  max-width: 425px;
  position: relative;
  background-color: #ffffff;
`;

const Message = styled.span`
  font-size: 24px;
  margin: 20px 10px;
  padding: 20px 0;
`;

const FormBox = styled.div`
  position: relative;
  width: 100%;
  margin: 50px auto;
  padding: 1em;
  box-sizing: border-box;
  background: #fffaf3;
  border-radius: 10px;

  & > form {
    display: block;
    text-align: left;
  }
  & > form > div {
    display: flex;
    align-items: center;
  }
  & > form > div:first-child {
    display: flex;
    justify-content: center;
    margin: 10px;
  }
`;

const LabelText = styled.span`
  position: relative;
  min-width: 70px;
  text-align: center;
`;

const Input = styled.input`
  box-sizing: border-box;
  position: relative;
  color: #000000;
  font-size: 1em;
  width: 100%;
  border: 1px solid #eb8d00;
  border-radius: 10px;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

const Select = styled.select`
  box-sizing: border-box;
  position: relative;
  color: #000000;
  font-size: 1em;
  height: 50px;
  width: 100%;
  border: 1px solid #eb8d00;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
`;

const Date = styled.input`
  box-sizing: border-box;
  position: relative;
  color: #000000;
  font-size: 1em;
  width: 100%;
  border: 1px solid #eb8d00;
  border-radius: 10px;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

const Option = styled.option`
  margin: 10px;
  font-size: 1em;
  padding: 10px;
`;

const BtnRegisterPet = styled.button`
  position: relative;
  width: 100%;
  background: #eb8d00;
  border-radius: 500px;
  display: block;
  margin-top: 14px;
  padding: 14px 0 13px;
  border: solid 1px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  font-size: 20px;
  color: #ffffff;
`;

const Later = styled.div`
  position: relative;
  display: flex;
  margin: 10px auto;
  justify-content: center;
  color: gray;
  font-size: 20px;

  & > a {
    text-decoration: none;
    color: gray;
  }
  & > a:visited {
    text-decoration: none;
  }
  & > a:hover {
    text-decoration: none;
  }
  & > a:focus {
    text-decoration: none;
  }
  & > a:hover,
  a:active {
    text-decoration: none;
  }
`;
