import { createContext } from "react";

export type User = {
  id: string;
  email: string;
};
export type TState = {
  currentUser: User;
};
export type TPayload = {
  type: string;
  payload?: string | object;
};
export const InitialState: TState = {
  currentUser: null
};

// [FIY] https://stackoverflow.com/questions/54577865/react-createcontext-issue-in-typescript/54667477
export type TContextProps = {
  state: TState;
  dispatch: ({ type, payload }: TPayload) => void;
};

const Context = createContext({} as TContextProps);

export default Context;
