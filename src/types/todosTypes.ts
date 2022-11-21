import { Dispatch, SetStateAction } from "react";

export interface TodoListTypes {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface MyTodoTypes {
  userMail: string;
  logOutClick: () => void;
  setIsModal: Dispatch<SetStateAction<Boolean>>;
  isTodoList: TodoListTypes[];
  completedTodo: (id: number, todo: string, completed: boolean) => void;
  deleteTodo: (id: number) => void;
  openModal: (id?: number, todo?: string, completed?: boolean) => void;
}

export interface UpdateTodoTypes{
    id?: number;
    todo?: string;
    isCompleted?: boolean;
}

export interface MyTodoModalTypes {
  closeModal: () => void;
  todoRef: React.RefObject<HTMLInputElement>;
  createTodo: () => void;
  isTodoUpdate:UpdateTodoTypes
  updateTodo: (id: number, completed: boolean) => void;
}
