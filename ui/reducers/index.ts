import { TContext } from "../contexts";

export enum ReducerType {
  LOGIN_USER = "LOGIN_USER",
  IS_AUTH = "IS_AUTH",
  SIGN_OUT_USER = "SIGN_OUT_USER"
}
const { LOGIN_USER, IS_AUTH, SIGN_OUT_USER } = ReducerType;

const reducer = (state, { type, payload }): TContext => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: payload
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
