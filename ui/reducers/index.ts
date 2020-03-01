import { TState, TPayload, User } from "../contexts";

export enum EReducer {
  LOGIN_USER = "LOGIN_USER",
  SIGN_OUT_USER = "SIGN_OUT_USER"
}

const reducer = (state: TState, { type, payload }: TPayload): TState => {
  switch (type) {
    case EReducer.LOGIN_USER:
      return {
        ...state,
        currentUser: payload as User
      };
    case EReducer.SIGN_OUT_USER:
      return {
        ...state,
        currentUser: null
      };
    default:
      return state;
  }
};

export default reducer;
