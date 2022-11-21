import { Dispatch, SetStateAction } from "react";

export type UserTypes = {
  email: string;
  password: string;
};

export interface SignTypes {
  setIsLogin: Dispatch<SetStateAction<Boolean>>;
  idRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  passwordConfirmRef?: React.RefObject<HTMLInputElement>;
  SignInSubmit?: (event: React.ChangeEvent<HTMLFormElement>) => void;
  SignUpSubmit?: (event: React.ChangeEvent<HTMLFormElement>) => void;
  isErrorMsg: string;
  emailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isMailActive: Boolean;
  isPwActive: Boolean;
}
