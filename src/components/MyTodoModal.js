import React from "react";
import styled from "styled-components";

const MyTodoModal = ({
  closeModal,
  todoRef,
  createTodo,
  isTodoUpdate,
  updateTodo,
}) => {
  const closeClick = () => {
    closeModal();
  };
  return (
    <Modal onClick={closeClick}>
      <ModalMainBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={closeClick}>x</CloseBtn>
        <TodoBox>
          <TodoInput defaultValue={isTodoUpdate.todo} ref={todoRef} />
          {isTodoUpdate.id ? (
            <TodoBtn
              onClick={() => {
                updateTodo(
                  isTodoUpdate.id,
                  isTodoUpdate.isCompleted
                );
              }}
            >
              수정
            </TodoBtn>
          ) : (
            <TodoBtn
              onClick={() => {
                createTodo();
              }}
            >
              등록
            </TodoBtn>
          )}
        </TodoBox>
      </ModalMainBox>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalMainBox = styled.div`
  position: absolute;
  width: 50%;
  height: 25%;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  color: rgba(0, 0, 0, 0.7);
  background-color: transparent;
  font-size: 2rem;
  cursor: pointer;
`;

const TodoBox = styled.div`
  width: 100%;
  height: 50%;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TodoInput = styled.input`
  width: 70%;
  height: 90%;
  padding: 5px 15px;
  font-size: 1.5rem;
  border-radius: 15px;
  border: 0.5px solid #3498db; ;
`;

const TodoBtn = styled.button`
  width: 20%;
  height: 90%;
  font-size: 1.2rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 15px;
`;
export default MyTodoModal;
