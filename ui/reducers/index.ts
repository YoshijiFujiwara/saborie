import { TState } from "../contexts";

export enum ReducerType {
  LOGIN_USER = "LOGIN_USER",
  SET_TOKEN = "SET_TOKEN",
  IS_AUTH = "IS_AUTH",
  SIGN_OUT_USER = "SIGN_OUT_USER"
}

const { LOGIN_USER, SET_TOKEN, IS_AUTH, SIGN_OUT_USER } = ReducerType;

const reducer = (state, { type, payload }): TState => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: payload
      };
    case SET_TOKEN:
      return {
        ...state,
        token: payload
      };
    case IS_AUTH:
      return {
        ...state,
        isAuth: payload
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        currentUser: null,
        isAuth: false
      };
    default:
      return state;
  }
};

export default reducer;
