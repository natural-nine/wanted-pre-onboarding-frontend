import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyTodoList from "../components/MyTodoList";
import MyTodoModal from "../components/MyTodoModal";
import instance from "../shared/axios";

const Todo = () => {
  const navigate = useNavigate();
  const localUserToken = localStorage.getItem("userToken");
  const userMail = localStorage.getItem("userMail");

  const todoRef = useRef();
  const [isModal, setIsModal] = useState(false);
  const [isTodoUpdate, setIsTodoUpdate] = useState({});
  const [isTodoList, setIsTodoList] = useState("");
  // todoList 가져오기
  const getTodos = () => {
    instance
      .get("/todos", {
        headers: {
          Authorization: `Bearer ${localUserToken}`,
        },
      })
      .then((res) => {
        setIsTodoList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // todoList 가져오기
  useEffect(() => {
    getTodos();
  }, []);

  // 로컬스토리지에 유저토큰 없을 시 "/" 페이지 이동
  useEffect(() => {
    if (!localUserToken) {
      navigate("/");
    }
  }, [localUserToken]);

  // todoList 등록
  const createTodo = () => {
    const todoText = todoRef.current.value;
    console.log(todoText);
    console.log(localUserToken);
    instance
      .post(
        "/todos",
        { todo: todoText },
        {
          headers: {
            Authorization: `Bearer ${localUserToken}`,
          },
        }
      )
      .then((res) => {
        setIsTodoList((prev) => [...prev, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModal(!isModal);
  };

  // todoList 완료
  const completedTodo = (id, todo, completed) => {
    let isCompleted = !completed;
    instance
      .put(
        `/todos/${id}`,
        { isCompleted, todo },
        {
          headers: {
            Authorization: `Bearer ${localUserToken}`,
          },
        }
      )
      .then(() => {
        setIsTodoList((todos) =>
          todos.map((i) =>
            i.id === id ? { ...i, isCompleted: isCompleted } : i
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // todoList 수정
  const updateTodo = (id, completed) => {
    const todoText = todoRef.current.value;
    instance
      .put(
        `/todos/${id}`,
        { isCompleted: completed, todo: todoText },
        {
          headers: {
            Authorization: `Bearer ${localUserToken}`,
          },
        }
      )
      .then(() => {
        setIsTodoList((todos) =>
          todos.map((i) =>
            i.id === id
              ? { ...i, ...{ isCompleted: completed }, ...{ todo: todoText } }
              : i
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModal(!isModal);
  };

  // todoList 삭제
  const deleteTodo = (id) => {
    instance
      .delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localUserToken}`,
        },
      })
      .then(() => {
        setIsTodoList((todo) => todo.filter((todo) => todo.id !== id));
      });
  };

  // 로그아웃 로컬스토리지 삭제 -> "/" 페이지 이동
  const logOutClick = () => {
    localStorage.removeItem("userMail");
    localStorage.removeItem("userToken");
    navigate("/");
  };

  // 모달 오픈
  const openModal = (id, todo, isCompleted) => {
    setIsModal(true);
    setIsTodoUpdate({
      id: id,
      todo: todo,
      isCompleted: isCompleted,
    });
  };

  return (
    <Wrap>
      {isTodoList && (
        <MyTodoList
          isTodoList={isTodoList}
          setIsModal={setIsModal}
          userMail={userMail}
          logOutClick={logOutClick}
          completedTodo={completedTodo}
          deleteTodo={deleteTodo}
          openModal={openModal}
        ></MyTodoList>
      )}
      {isModal && (
        <MyTodoModal
          closeModal={() => {
            setIsModal(!isModal);
          }}
          todoRef={todoRef}
          createTodo={createTodo}
          isTodoUpdate={isTodoUpdate}
          updateTodo={updateTodo}
        ></MyTodoModal>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ecf0f1;
`;

export default Todo;
