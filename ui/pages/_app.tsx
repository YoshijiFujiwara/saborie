import Cookie from "js-cookie";
import App, { Container } from "next/app";
import React, { createContext } from "react";
import Context from "../contexts";

type CurrentUser = {
  id: string;
  email: string;
};

export type State = {
  currentUser: CurrentUser;
  token: string;
};

export enum ECookie {
  CURRENT_USER = "CURRENT_USER",
  TOKEN = "TOKEN"
}

class MyApp extends App {
  state: State = {
    currentUser: null,
    token: null
  };

  componentDidMount() {
    const cookieCurrentUser = Cookie.get(ECookie.CURRENT_USER);
    const cookieToken = Cookie.get(ECookie.TOKEN);

    this.setState({
      currentUser: cookieCurrentUser ? cookieCurrentUser : null,
      token: cookieToken ? cookieToken : null
    });
  }

  loginUser = (user: State["currentUser"], token: State["token"]) => {
    this.setState(prevState => ({
      ...prevState,
      currentUser: user,
      token
    }));
    Cookie.set(ECookie.CURRENT_USER, user, { expires: 7 });
    Cookie.set(ECookie.TOKEN, token, { expires: 1 });
  };
  signOutUser = () => {
    this.setState(prevState => ({
      ...prevState,
      currentUser: null,
      token: null
    }));
    Cookie.remove(ECookie.CURRENT_USER);
    Cookie.remove(ECookie.TOKEN);
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
