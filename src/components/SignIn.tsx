import React from "react";
import styled from "styled-components";
import { SignTypes } from "../types/userTypes";

const SignIn = ({
  setIsLogin,
  idRef,
  passwordRef,
  SignInSubmit,
  isErrorMsg,
  emailChange,
  passwordChange,
  isMailActive,
  isPwActive,
}:SignTypes) => {
  return (
    <Wrap>
      <TitleBox>
        <h1>로그인</h1>
        <span
          onClick={() => {
            setIsLogin(false);
          }}
        >
          회원가입 &rarr;
        </span>
      </TitleBox>
      <UserForm onSubmit={SignInSubmit}>
        <InputBox>
          <span>이메일</span>
          <input type={"text"} ref={idRef} onChange={emailChange} />
          {!isMailActive && <span>이메일 형식을 맞춰 입력해주세요.</span>}
        </InputBox>
        <InputBox>
          <span>비밀번호</span>
          <input
            type={"password"}
            ref={passwordRef}
            onChange={passwordChange}
          />
          {!isPwActive && <span>비밀번호는 최소 8자 이상입니다.</span>}
        </InputBox>
        <ErrorBox>
          <span>{isErrorMsg}</span>   
        </ErrorBox>
        <SubmitBox>
          {isMailActive && isPwActive ? (
            <SubmitButton>로그인</SubmitButton>
          ) : (
            <FakeBox>
              <span>로그인</span>
            </FakeBox>
          )}
        </SubmitBox>
      </UserForm>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 60%;
  height: 700px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0px 12px 42px rgba(0, 0, 0, 0.2);
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  span {
    cursor: pointer;
  }
`;

const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 30%;
  margin-top: 20px;
  span {
    margin: 3px 0px 3px 0px;
  }
  input {
    width: 70%;
    height: 55px;
    border-radius: 15px;
    padding: 5px 20px;
    font-size: 1.3rem;
    border: 1px solid;
  }
  span:last-child {
    color: red;
    font-size: 0.8rem;
  }
`;
const SubmitBox = styled.div`
  margin-top: 5px;
  width: 70%;
`;
const SubmitButton = styled.button`
  width: 100%;
  height: 55px;
  border-radius: 15px;
  border: none;
  background-color: #3498db;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
`;
const ErrorBox = styled.div`
  width: 70%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  span {
    color: red;
  }
`;

const FakeBox = styled.div`
  width: 100%;
  height: 55px;
  border-radius: 15px;
  border: none;
  background-color: #3498db;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  span {
    font-size: 1.5rem;
    color: #fff;
  }
`;
export default SignIn;
