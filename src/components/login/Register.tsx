import React from 'react';
import styled from 'styled-components';
import RegisterForm from './RegisterForm';

const Register = (props: any) => {
  return (
    <>
      <Contents>
        <RegisterForm />
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
  padding: 20px;

  & > div {
    display: flex;
    text-align: left;
  }
`;
