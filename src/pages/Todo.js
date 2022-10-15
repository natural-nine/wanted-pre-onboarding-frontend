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
  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (!localUserToken) {
      navigate("/");
    }
  }, [localUserToken, navigate]);

  const todoCompleted = (id, todo, completed) => {
    let isCompleted = !completed;
    instance
      .put(`/todos/${id}`, { isCompleted, todo })
      .then((res) => {
        setIsTodoList((todos) =>
          todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: isCompleted } : todo
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const todoCreate = () => {
    const todo = todoRef.current.value;
    instance
      .post("/todos", { todo })
      .then((res) => {
        setIsTodoList((prev) => [res.data, ...prev]);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModal(!isModal);
  };
  const deleteTodo = (id) => {
    instance.delete(`/todos/${id}`).then((res) => {
      setIsTodoList((todo) => todo.filter((todo) => todo.id !== id));
    });
  };

  const logOutClick = () => {
    localStorage.removeItem("userMail");
    localStorage.removeItem("userToken");
    navigate("/");
  };

  const openModal = (id, todo, isCompleted) => {
    setIsModal(true);
    setIsTodoUpdate({
      id: id,
      todo: todo,
      isCompleted: isCompleted,
    });
  };

  // const todoSubmit = () => {

  // }

  const testFn = (id, todo, completed) => {
    const todoText = todoRef.current.value;
    // console.log(todos, istodo, completed);
    console.log(todoText);
    instance
      .put(`/todos/${id}`, { isCompleted: completed, todo: todoText })
      .then((res) => {
        setIsTodoList((todos) =>
          todos.map((v) =>
            v.id === id
              ? { ...v, ...{ isCompleted: completed }, ...{ todo: todoText } }
              : v
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModal(!isModal);
  };
  console.log(isTodoList, "todo list!!!!!");
  return (
    <Wrap>
      {isTodoList && (
        <MyTodoList
          isTodoList={isTodoList}
          setIsModal={setIsModal}
          userMail={userMail}
          logOutClick={logOutClick}
          todoCompleted={todoCompleted}
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
          todoCreate={todoCreate}
          isTodoUpdate={isTodoUpdate}
          testFn={testFn}
        ></MyTodoModal>
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
  justify-content: center;
  align-items: center;
  /* background-color: #2c3e50; */
`;

export default Todo;
