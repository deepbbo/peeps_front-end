import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import location from './location.json';
import axios from 'axios';
import IconProfile from '../../images/profile_gray.svg';

const RegisterForm = (props: any) => {
  const [addressSi, setAddressSi] = useState('서울시');
  const [addressDo, setAddressDo] = useState('강남구');

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [profileImg, setProfileImg] = useState<File[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);

  // 오류메세지 상태 저장
  const [idMessage, setIdMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const onChangeAddressSi = (e: { target: { value: any } }) => {
    setAddressSi(e.target.value);
  };
  const onChangeAddressDo = (e: { target: { value: any } }) => {
    setAddressDo(e.target.value);
  };
  const onChangeId = (e: { target: { value: any } }) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage('4-12사이 대소문자 또는 숫자만 입력해 주세요!');
      setIsId(false);
    } else {
      setIdMessage('사용가능한 아이디 입니다.');
      setIsId(true);
    }
  };

  const onChangeNickname = (e: { target: { value: any } }) => {
    const currentName = e.target.value;
    setNickname(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setNicknameMessage('닉네임은 2글자 이상 5글자 이하로 입력해주세요!');
      setIsNickname(false);
    } else {
      setNicknameMessage('사용가능한 닉네임 입니다.');
      setIsNickname(true);
    }
  };
  const onChangeName = (e: { target: { value: any } }) => {
    const currentName = e.target.value;
    setName(currentName);
    setIsName(true);
  };
  const onChangePassword = (e: { target: { value: any } }) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage('숫자+영문자+특수문자 조합, 8자리 이상 입력해주세요!');
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호 입니다.');
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e: { target: { value: any } }) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage('비밀번호 불일치');
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage('');
      setIsPasswordConfirm(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as any;
    setProfileImg([...files]);
  };
  const onClick = async (e: { preventDefault: () => void }) => {
    if (isId && isPassword && isPasswordConfirm && isName && isNickname) {
      const user_location = [addressSi, addressDo].join(' ');
      try {
        const registerUrl = 'http://localhost:5500/api/v1/user/register';
        // const filePath =
        //   '/Users/chaeyeon/Desktop/elice/Study2/peeps_backend/peeps_back-end/public';
        const formData = new FormData();
        formData.append('user_id', id);
        formData.append('user_password', password);
        formData.append('user_name', name);
        formData.append('user_nickname', nickname);
        formData.append('user_location', user_location);
        formData.append('post_img', profileImg[0]);
        const response = await axios.post(registerUrl, formData);
        console.log(response);
        // 회원가입 성공 또는 실패에 따른 처리
      } catch (e) {
        alert('Failed to register');
      }
    } else {
      e.preventDefault();
      console.log('못넘어갑니다..');
    }
  };
  return (
    <>
      <form>
        <Message>동네를 선택해주세요</Message>
        <Wrapper>
          <div>
            <Select
              name="시"
              id="시"
              onChange={onChangeAddressSi}
              value={addressSi}
            >
              <Option key="서울시" value="서울시">
                서울시
              </Option>
            </Select>
          </div>
          <div>
            <Select
              name="도"
              id="도"
              onChange={onChangeAddressDo}
              value={addressDo}
            >
              {location.do.map(item => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
              ;
            </Select>
          </div>
        </Wrapper>
        <Message>회원정보 입력</Message>
        <Wrapper>
          <div>
            <InputArea>
              <LabelText htmlFor="profileImg">프로필사진</LabelText>
              {profileImg.length > 0 ? (
                profileImg.map(image => {
                  return (
                    <div
                      className="image-preview"
                      key={image.name + image.size}
                    >
                      <ProfileImg
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                      />
                    </div>
                  );
                })
              ) : (
                <ProfileImg src={IconProfile} alt="프로필 이미지"></ProfileImg>
              )}
              <UserImgInput
                id="profileImg"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={imgRef}
              ></UserImgInput>
            </InputArea>
          </div>
          <div>
            <InputArea>
              <LabelText htmlFor="id">아이디</LabelText>
              <InputValue id="id" name="id" value={id} onChange={onChangeId} />
            </InputArea>
            <p className="message"> {idMessage} </p>
          </div>
          <div>
            <InputArea>
              <LabelText htmlFor="password">비밀번호</LabelText>
              <InputPw
                id="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                type="password"
              />
            </InputArea>
            <p className="message"> {passwordMessage} </p>
          </div>
          <div>
            <InputArea>
              <LabelText htmlFor="passwordConfirm"></LabelText>
              <InputPw
                id="passwordConfirm"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
                type="password"
              />
            </InputArea>
            <p className="message"> {passwordConfirmMessage} </p>
          </div>
          <div>
            <InputArea>
              <LabelText htmlFor="nickname">닉네임</LabelText>
              <InputValue
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={onChangeNickname}
              />
            </InputArea>
            <p className="message"> {nicknameMessage} </p>
          </div>
          <div>
            <InputArea>
              <LabelText htmlFor="name">이름</LabelText>
              <InputValue
                id="name"
                name="name"
                value={name}
                onChange={onChangeName}
              />
            </InputArea>
            <p className="message"> {nameMessage} </p>
          </div>
        </Wrapper>
        <div>
          <BtnRegister type="submit" onClick={onClick}>
            <Link to={`/register/pet`}>회원가입</Link>
          </BtnRegister>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 1em;
  box-sizing: border-box;
  background: #fffaf3;
  border-radius: 10px;
  margin: 10px auto;
  padding: 20px;

  & > form {
    display: block;
    text-align: center;
    justify-content: flex-start;
    width: 100%;
  }
  & > div {
    // padding: 10px;
  }
  & > div > p {
    padding: 5px 0;
    font-size: 10px;
    margin-left: 80px;
  }
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
  margin: 10px auto;
  padding: 10px;
`;

const Option = styled.option`
  margin: 10px;
  font-size: 1em;
  padding: 10px;
`;

const Message = styled.div`
  font-size: 24px;
  margin: 20px 10px;
  margin-top: 40px;
`;

const LabelText = styled.label`
  position: relative;
  min-width: 80px;
  text-align: center;
`;

const InputArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputValue = styled.input`
  box-sizing: border-box;
  position: relative;
  color: #000000;
  font-size: 1em;
  border: 1px solid #eb8d00;
  border-radius: 10px;
  margin: 10px auto;
  width: 100%;
  padding: 1em;
`;

const InputPw = styled.input`
  border: 1px solid #eb8d00;
  box-sizing: border-box;
  position: relative;
  color: #000000;
  font-size: 1em;
  border: 1px solid #eb8d00;
  border-radius: 10px;
  margin: 10px auto;
  width: 100%;
  padding: 1em;
`;

const UserImgInput = styled.input`
  // display: none;
`;
const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 500px;
`;
const BtnRegister = styled.button`
  position: relative;
  width: 100%;
  background: #eb8d00;
  border-radius: 500px;
  display: block;
  margin: 14px auto;
  padding: 14px 0 13px;
  border: solid 1px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  font-size: 20px;
  color: #ffffff;

  & > a {
    text-decoration: none;
    color: #ffffff;
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
