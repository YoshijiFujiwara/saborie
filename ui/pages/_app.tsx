import { createMuiTheme, Theme } from "@material-ui/core";
import { purple, orange } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import App from "next/app";
import React, { useReducer, useEffect } from "react";
import Context, { InitialState } from "../contexts";
import { useMeQuery } from "../generated/graphql";
import { withApollo } from "../lib/apollo";
import reducer, { EReducer } from "../reducers";

const theme: Theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#99633d"
      // dark: "#d1632c",
      // contrastText: "#fff"
    },
    // secondary: {
    //   main: "#64B42D",
    //   dark: "#008732",
    //   contrastText: "#fff"
    // },
    // error: {
    //   main: "#BD0043",
    //   contrastText: "#fff"
    // },
    // divider: "#D7D6D5",
    background: {
      paper: "#fff5d4",
      default: "#fff5d4"
    }
  },
  typography: {
    fontFamily: 'Avenir Next, Roboto,"Helvetica Neue",Arial,sans-serif',
    htmlFontSize: 16
  }
});

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

  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={value}>{children}</Context.Provider>
    </ThemeProvider>
  );
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
