import React, { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import instance from "../shared/axios";
import { UserTypes } from "../types/userTypes";

const Home = () => {
  const navigate = useNavigate();

  // 이메일 패스워드 정규식
  const emailRegEx: RegExp =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const localUserToken = localStorage.getItem("userToken");

  // 에러메세지 핸들링 state
  const [isErrorMsg, isSetErrorMsg] = useState<string>("");

  // email 정규식 버튼 활성화
  const [isMailActive, setIsMailActive] = useState<Boolean>(false);
  // password 정규식 버튼 활성화
  const [isPwActive, setIsPwActive] = useState<Boolean>(false);
  // boolean 으로 회원가입, 로그인 컴포넌트 보여주기
  const [isLogin, setIsLogin] = useState<Boolean>(false);

  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  // 회원가입
  const SignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfo: UserTypes = {
      email: idRef.current!.value,
      password: passwordRef.current!.value,
    };
    if (!new RegExp(emailRegEx).test(userInfo.email)) {
      isSetErrorMsg("이메일 형식을 맞춰주세요.");
    } else if (userInfo?.password?.match(passwordRegEx) === null) {
      isSetErrorMsg("비밀번호는 최소 8자 이상입니다.");
    } else if (
      passwordRef.current?.value !== passwordConfirmRef.current?.value
    ) {
      isSetErrorMsg("비밀번호가 서로 다릅니다.");
    } else {
      instance
        .post("/auth/signup", userInfo)
        .then(() => {
          isSetErrorMsg("");
          alert("회원가입 완료되었습니다.");
          setIsLogin(true);
        })
        .catch((err) => {
          isSetErrorMsg(err.response.data.message);
        });
    }
  };

  // 로그인
  const SignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfo: UserTypes = {
      email: idRef.current!.value,
      password: passwordRef.current!.value,
    };

    if (!emailRegEx.test(userInfo.email)) {
      isSetErrorMsg("이메일 형식을 맞춰주세요.");
    } else if (userInfo.password?.match(passwordRegEx) === null) {
      isSetErrorMsg("비밀번호는 최소 8자 이상입니다.");
    } else {
      instance
        .post("/auth/signin", userInfo)
        .then((res) => {
          localStorage.setItem("userMail", userInfo.email);
          localStorage.setItem("userToken", res.data.access_token);
          navigate("/todo");
          console.log("ha");
        })
        .catch((err) => {
          if (err.response.data.message === "Unauthorized") {
            isSetErrorMsg("비밀번호가 맞지 않습니다.");
          } else {
            isSetErrorMsg(err.response.data.message);
          }
        });
    }
  };

  // 토큰 있을 시 /todo 페이지로 이동
  useEffect(() => {
    if (localUserToken) {
      navigate("/todo");
    }
  }, [localUserToken]);

  // email 정규식 버튼 활성화
  const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (emailRegEx.test(event.target.value)) {
      setIsMailActive(true);
    } else {
      setIsPwActive(false);
    }
  };

  // password 정규식 버튼 활성화
  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(passwordRegEx) !== null) {
      setIsPwActive(true);
    } else {
      setIsPwActive(false);
    }
  };
  return (
    <Wrap>
      {isLogin ? (
        <SignIn
          idRef={idRef}
          passwordRef={passwordRef}
          setIsLogin={setIsLogin}
          SignInSubmit={SignInSubmit}
          isErrorMsg={isErrorMsg}
          emailChange={emailChange}
          passwordChange={passwordChange}
          isPwActive={isPwActive}
          isMailActive={isMailActive}
        />
      ) : (
        <SignUp
          idRef={idRef}
          passwordRef={passwordRef}
          passwordConfirmRef={passwordConfirmRef}
          SignUpSubmit={SignUpSubmit}
          setIsLogin={setIsLogin}
          isErrorMsg={isErrorMsg}
          emailChange={emailChange}
          passwordChange={passwordChange}
          isPwActive={isPwActive}
          isMailActive={isMailActive}
        />
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ecf0f1;
`;

export default Home;
