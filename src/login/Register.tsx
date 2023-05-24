import React from 'react';
import styled from 'styled-components';
import Location from './Location';
import RegisterForm from './RegisterForm';
import { Link } from 'react-router-dom';

const Register = (props: any) => {
  return (
    <>
      <Contents>
        {/* <div>
          <Message>동네를 선택해주세요</Message>
        </div>
        <div>
          <Location separate={'si'} />
          <Location separate={'do'} />
        </div> */}
        {/* <div>
          <Message>회원정보 입력</Message>
        </div> */}
        <RegisterForm />
        {/* <BtnRegister>
          <Link to={`/register/pet`}>회원가입</Link>
        </BtnRegister> */}
      </Contents>
    </>
  );
};

export default Register;

const Contents = styled.div`
  min-width: 375px;
  max-width: 425px;
  position: relative;
  background-color: #ffffff;
  // border: 1px solid #000000;

  & > div {
    display: flex;
    text-align: left;
  }
`;

const Message = styled.span`
  font-size: 24px;
  margin: 20px 10px;
  margin-top: 40px;
`;

// const BtnRegister = styled.button`
//   position: relative;
//   width: 100%;
//   background: #eb8d00;
//   border-radius: 500px;
//   display: block;
//   margin: 14px auto;
//   padding: 14px 0 13px;
//   border: solid 1px rgba(0, 0, 0, 0.05);
//   box-sizing: border-box;
//   font-size: 20px;
//   color: #ffffff;

//   & > a {
//     text-decoration: none;
//     color: #ffffff;
//   }
//   & > a:visited {
//     text-decoration: none;
//   }
//   & > a:hover {
//     text-decoration: none;
//   }
//   & > a:focus {
//     text-decoration: none;
//   }
//   & > a:hover,
//   a:active {
//     text-decoration: none;
//   }
// `;
