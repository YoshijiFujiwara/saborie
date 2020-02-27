import { createContext } from "react";

export type TContext = {
  currentUser?: {
    id: string;
    email: string;
  };
  isAuth: boolean;
};

const Context = createContext<TContext>({
  currentUser: null,
  isAuth: false
});

export default Context;
