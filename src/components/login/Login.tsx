import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageLogo from '../../images/logoSample.jpg';
import IconId from '../../images/login_id.svg';
import IconPassword from '../../images/login_pw.svg';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const loginUrl = `http://localhost:5500/api/v1/user/logIn`;
      const body = {
        user_id: id,
        user_password: password
      };
      const response = await axios.post(loginUrl, body);
      const userToken = response.data.data.userToken;
      localStorage.setItem('userToken', JSON.stringify(userToken));
      localStorage.setItem('accessToken', userToken.accessToken);
      localStorage.setItem('refreshToken', userToken.refreshToken);
      navigate('/my');
      // 로그인 성공 또는 실패에 따른 처리
    } catch (e) {
      alert('Failed to login');
      setId('');
      setPassword('');
    }
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Contents>
      <Logo>
        <img alt="로고" src={ImageLogo}></img>
      </Logo>
      <LoginBox>
        <form>
          <div>
            <img alt="id아이콘" src={IconId}></img>
            <InputId
              placeholder="id"
              value={id}
              onChange={e => onChangeId(e)}
            ></InputId>
          </div>
          <div>
            <img alt="pw아이콘" src={IconPassword}></img>
            <InputPw
              placeholder="password"
              value={password}
              onChange={e => onChangePassword(e)}
              type="password"
            ></InputPw>
          </div>
        </form>
      </LoginBox>
      <BtnLogin onClick={handleLoginClick}>
        로그인
        {/* <Link to={`/my`}>로그인</Link> */}
      </BtnLogin>
      <Register>
        <Link to={`/register`}>회원가입</Link>
      </Register>
    </Contents>
  );
};

export default Login;

const Contents = styled.div`
  min-width: 375px;
  max-width: 425px;
  position: relative;
  background-color: #ffffff;
  height: calc(100vh - 156px);
`;

const Logo = styled.div`
  vertical-align: top;
  // background-position: 0 -70px;
  background-repeat: no-repeat;
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
`;

const LoginBox = styled.div`
  position: relative;
  width: 100%;
  // margin-top: 50px;
  display: flex;
  justify-content: center;
  padding: 1em;
  box-sizing: border-box;
  background: #fffaf3;
  border-radius: 10px;
`;

const InputId = styled.input`
  box-sizing: border-box;
  position: relative;
  color: #000000;
  font-size: 1em;
  border: 1px solid #eb8d00;
  border-radius: 10px;
  margin: 1em;
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
  margin: 1em;
  padding: 1em;
`;

const BtnLogin = styled.button`
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

const Register = styled.div`
  position: relative;
  display: flex;
  margin: 10px auto;
  text-decoration-line: underline;
  color: gray;
  justify-content: center;
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
