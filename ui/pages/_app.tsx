import Cookie from "js-cookie";
import App from "next/app";
import React from "react";
import Context from "../contexts";

type CurrentUser = {
  id: string;
  email: string;
};

export type State = {
  currentUser: CurrentUser;
};

export enum ECookie {
  CURRENT_USER = "CURRENT_USER",
  TOKEN = "TOKEN"
}

class MyApp extends App {
  state: State = {
    currentUser: null
  };

  componentDidMount() {}

  loginUser = (user: State["currentUser"]): void => {
    this.setState(prevState => ({
      ...prevState,
      currentUser: user
    }));
  };
  signOutUser = (): void => {
    this.setState(prevState => ({
      ...prevState,
      currentUser: null
    }));
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Context.Provider
        value={{
          state: this.state,
          dispatchFunctions: {
            loginUser: this.loginUser,
            signOutUser: this.signOutUser
          }
        }}
      >
        <Component {...pageProps} />
      </Context.Provider>
    );
  }
}

export default MyApp;
