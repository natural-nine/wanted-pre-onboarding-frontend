import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import instance from "../shared/axios";

const Home = () => {
  const navigate = useNavigate();

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const localUserToken = localStorage.getItem("userToken");
  
  const [isErrorMsg, isSetErrorMsg] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const idRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const SignUpSubmit = (e) => {
    e.preventDefault();
    let userInfo = {
      email: idRef.current.value,
      password: passwordRef.current.value,
    };
    if (!emailRegEx.test(userInfo.email)) {
      isSetErrorMsg("이메일 형식을 맞춰주세요.");
    }
    else if(userInfo.password.match(passwordRegEx)===null){
      isSetErrorMsg("비밀번호는 최소 8자 이상입니다.");
    } 
    else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      isSetErrorMsg("비밀번호가 서로 다릅니다.");
    } else {
      instance
        .post("/auth/signup", userInfo)
        .then((res) => {
          localStorage.setItem("userToken", res.data.access_token);
          localStorage.setItem("userMail", userInfo.email);
          navigate("/todo")
        })
        .catch((err) => {
          isSetErrorMsg(err.response.data.message)
        });
    }
  };

  const SignInSubmit = (e) => {
    e.preventDefault();
    let userInfo = {
      email: idRef.current.value,
      password: passwordRef.current.value,
    };
    if (!emailRegEx.test(userInfo.email)) {
      isSetErrorMsg("이메일 형식을 맞춰주세요.");
    }
    else if(userInfo.password.match(passwordRegEx)===null){
      isSetErrorMsg("비밀번호는 최소 8자 이상입니다.");
    } 
    else {
      instance
        .post("/auth/signin", userInfo)
        .then((res) => {
          localStorage.setItem("userToken", res.data.access_token);
          localStorage.setItem("userMail", userInfo.email);
          navigate("/todo")
        })
        .catch((err) => {
          if(err.response.data.message === "Unauthorized"){
            isSetErrorMsg("비밀번호가 맞지 않습니다.");
          }else{
            isSetErrorMsg(err.response.data.message);
          }
        });
    }
  };

  useEffect(() => {
    if (localUserToken) {
      navigate("/todo");
    }
  }, [localUserToken]);

  
  return (
    <Wrap>
      {isLogin ? (
        <SignIn
          idRef={idRef}
          passwordRef={passwordRef}
          setIsLogin={setIsLogin}
          SignInSubmit={SignInSubmit}
          isErrorMsg={isErrorMsg}
        />
      ) : (
        <SignUp
          idRef={idRef}
          passwordRef={passwordRef}
          passwordConfirmRef={passwordConfirmRef}
          SignUpSubmit={SignUpSubmit}
          setIsLogin={setIsLogin}
          isErrorMsg={isErrorMsg}
        />
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #2c3e50; */
`;

export default Home;
