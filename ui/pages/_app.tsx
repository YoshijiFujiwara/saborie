import App from "next/app";
import React, { useReducer, useEffect } from "react";
import Context, { InitialState } from "../contexts";
import { useMeQuery } from "../generated/graphql";
import { withApollo } from "../lib/apollo";
import reducer, { EReducer } from "../reducers";

// [FIY] https://github.com/zeit/next.js/issues/7515
const MyFunctionComponent: React.FC = ({ children }) => {
  // context
  const [state, dispatch] = useReducer(reducer, InitialState);
  const value = { state, dispatch };

  // grpahql
  const { data: meData } = useMeQuery({
    onError: () => null // graphqlErrorのuncaughtが発生するのを防止
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
  }, [meData]);

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
