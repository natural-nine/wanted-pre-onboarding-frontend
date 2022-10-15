import React from "react";
import styled from "styled-components";

const MyTodoList = ({
  userMail,
  logOutClick,
  setIsModal,
  isTodoList,
  todoCompleted,
  deleteTodo,
  openModal
}) => {
  return (
    <Wrap>
      <TitleBox>
        <LeftTitle>
          <h1>My Todo</h1>
          <span>time</span>
        </LeftTitle>
        <RightTitle>
          <span>Hello {userMail} 님!</span>
          <span onClick={logOutClick}>로그아웃 &rarr;</span>
        </RightTitle>
      </TitleBox>
      <MainBox>
        {isTodoList?.map((i, idx) => (
          <TodoListBox key={idx}>
            <CheckBox>
              <CheckInput
                onChange={() => {
                  todoCompleted(i.id, i.todo, i.isCompleted);
                }}
                type={"checkbox"}
                checked={i.isCompleted}
              />
            </CheckBox>
            <TodoSpanBox>
              <TodoSpan props={i.isCompleted}>{i.todo}</TodoSpan>
            </TodoSpanBox>
            <BtnBox>
              <UpdateBtn
                onClick={() => {
                  openModal(i.id, i.todo, i.isCompleted);
                }}
                props={i.isCompleted}
              >
                수정
              </UpdateBtn>
              <DeleteBtn
                onClick={() => {
                  deleteTodo(i.id);
                }}
              >
                삭제
              </DeleteBtn>
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
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
`;

const AddButtonBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #3498db;
  position: absolute;
  bottom: -13%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border: 1px solid red;
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
  border: 1px solid red;
  margin: auto;
  padding: 15px 20px 45px 20px;
`;

const TodoListBox = styled.div`
  width: 100%;
  height: 70px;
  /* border: 1px solid red; */
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
  /* border: 1px solid red; */
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

const UpdateBtn = styled.button`
  width: 45%;
  height: 40px;
  border: none;
  color: #fff;
  background-color: #00b894;
  border-radius: 15px;
  cursor: pointer;
  visibility: ${(props) => props.props && "hidden"};
`;

const DeleteBtn = styled.button`
  width: 45%;
  height: 40px;
  border: none;
  color: #fff;
  background-color: red;
  border-radius: 15px;
  cursor: pointer;
`;

export default MyTodoList;
