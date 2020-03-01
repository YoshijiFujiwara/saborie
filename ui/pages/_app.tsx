import App from "next/app";
import React, { useReducer, useEffect } from "react";
import Context, { InitialState } from "../contexts";
import { useMeQuery, useSignOutMutation } from "../generated/graphql";
import { withApollo } from "../lib/apollo";
import reducer, { EReducer } from "../reducers";

// [FIY] https://github.com/zeit/next.js/issues/7515
const MyFunctionComponent: React.FC = ({ children }) => {
  // context
  const [state, dispatch] = useReducer(reducer, InitialState);
  const value = { state, dispatch };

  // grpahql
  const { error: meError, data: meData } = useMeQuery();
  const [
    signOut,
    { error: signOutError, data: signOutData }
  ] = useSignOutMutation({
    onCompleted: () => {
      console.log("complete signout");
    }
  });

  // effect
  useEffect(() => {
    if (meData && meData.me) {
      const { id, email } = meData.me;
      dispatch({
        type: EReducer.LOGIN_USER,
        payload: {
          id,
          email
        }
      });
    }
    if (meError) {
      // console.error(meError);
      signOut();
      dispatch({
        type: EReducer.SIGN_OUT_USER
      });
    }
    if (signOutData) {
      console.log(signOutData);
    }
  }, [meData, meError, signOutData]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
const MyFunctionComponentWithApollo: React.FC = withApollo(MyFunctionComponent);

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <MyFunctionComponentWithApollo>
        <Component {...pageProps} />
      </MyFunctionComponentWithApollo>
    );
  }
}

export default MyApp;
