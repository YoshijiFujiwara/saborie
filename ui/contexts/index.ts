import { createContext } from "react";
import { Post } from "../generated/graphql";

export type User = {
  id: string;
  email: string;
};
export type TState = {
  currentUser: User;
  displayPostId: string;
  posts: Post[];
};
export type TPayload = {
  type: string;
  payload?: string | object;
};
export const InitialState: TState = {
  currentUser: null,
  displayPostId: null,
  posts: []
};

// [FIY] https://stackoverflow.com/questions/54577865/react-createcontext-issue-in-typescript/54667477
export type TContextProps = {
  state: TState;
  dispatch: ({ type, payload }: TPayload) => void;
};

const Context = createContext({} as TContextProps);

export default Context;
