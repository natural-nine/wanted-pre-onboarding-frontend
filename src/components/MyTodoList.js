import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const MyTodoList = ({
  userMail,
  logOutClick,
  setIsModal,
  isTodoList,
  completedTodo,
  deleteTodo,
  openModal,
}) => {
  const todoScrollRef = useRef();
  const scrollToBottom = () => {
    if (todoScrollRef.current) {
      todoScrollRef.current.scrollTop = todoScrollRef.current.scrollHeight;
    }
  };
  useEffect(()=>{
    scrollToBottom();
  },[isTodoList]);

  return (
    <Wrap>
      <TitleBox>
        <LeftTitle>
          <h1>My Todo</h1>
        </LeftTitle>
        <RightTitle>
          <span>안녕하세요 {userMail} 님</span>
          <span onClick={logOutClick}>로그아웃 &rarr;</span>
        </RightTitle>
      </TitleBox>
      <MainBox ref={todoScrollRef}>
        {isTodoList?.map((i, idx) => (
          <TodoListBox  key={idx}>
            <CheckBox>
              <CheckInput
                onChange={() => {
                  completedTodo(i.id, i.todo, i.isCompleted);
                }}
                type={"checkbox"}
                checked={i.isCompleted}
              />
            </CheckBox>
            <TodoSpanBox>
              <TodoSpan props={i.isCompleted}>{i.todo}</TodoSpan>
            </TodoSpanBox>
            <BtnBox>
              <UpdateBtnBox>
                <UpdateBtn
                  onClick={() => {
                    openModal(i.id, i.todo, i.isCompleted);
                  }}
                  // completed boolean -> display hidden
                  props={i.isCompleted}
                >
                  수정
                </UpdateBtn>
              </UpdateBtnBox>
              <DeleteBtnBox>
                <DeleteBtn
                  onClick={() => {
                    deleteTodo(i.id);
                  }}
                >
                  삭제
                </DeleteBtn>
              </DeleteBtnBox>
            </BtnBox>
          </TodoListBox>
        ))}
      </MainBox>
      <AddButtonBox onClick={() => openModal(setIsModal(true))}>
        <AddButton>+</AddButton>
      </AddButtonBox>
    </Wrap>
  );
};
const Wrap = styled.div`
  width: 60%;
  height: 700px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
  padding: 15px 15px 0px 15px;
  border-radius: 15px;
  box-shadow: 0px 12px 42px rgba(0, 0, 0, 0.2);
`;

const AddButtonBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #3498db;
  position: absolute;
  bottom: -14%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 12px 42px rgba(0, 0, 0, 0.2);
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;
const LeftTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  span {
    margin-top: 5px;
  }
`;

const RightTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  span {
    margin-top: 10px;
  }
  span:last-child {
    cursor: pointer;
  }
`;

const AddButton = styled.button`
  border: none;
  background-color: #3498db;
  font-size: 4.1rem;
  color: #fff;
  cursor: pointer;
`;

const MainBox = styled.div`
  width: 90%;
  height: 75vh;
  overflow-y: auto;
  margin: auto;
  margin-top: 10px;
  padding: 15px 20px 45px 20px;
  box-shadow: 0px 12px 42px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
`;

const TodoListBox = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CheckBox = styled.div`
  width: 5%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckInput = styled.input`
  width: 100%;
  height: 25px;
  cursor: pointer;
`;

const TodoSpanBox = styled.div`
  width: 70%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const TodoSpan = styled.span`
  font-size: 1.3rem;
  text-decoration: ${(props) => props.props && "line-through"};
  opacity: ${(props) => props.props && "0.3"};
`;

const BtnBox = styled.div`
  width: 15%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UpdateBtnBox = styled.div`
  width: 45%;
  height: 40px;
`;

const UpdateBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  color: #fff;
  background-color: #00b894;
  border-radius: 15px;
  cursor: pointer;
  display: ${(props) => props.props && "none"};
`;

const DeleteBtnBox = styled.div`
  width: 45%;
  height: 40px;
`;

const DeleteBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  color: #fff;
  background-color: red;
  border-radius: 15px;
  cursor: pointer;
`;

export default MyTodoList;
