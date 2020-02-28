import { createContext } from "react";
import { State } from "../pages/_app";

// [FIY] https://stackoverflow.com/questions/54577865/react-createcontext-issue-in-typescript/54667477
export type TContextProps = {
  state: State;
  dispatchFunctions: {
    loginUser: Function;
    signOutUser: Function;
  };
};

const Context = createContext({} as TContextProps);

export default Context;
