import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { NextPage } from "next";
import NextLink from "next/link";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Context from "../contexts";
import { useLoginMutation } from "../generated/graphql";
import { EReducer } from "../reducers";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Websit
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const LoginPage: NextPage = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Context);

  // state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // graphql
  const [login, { loading, error, data }] = useLoginMutation({
    onCompleted: () => {
      setEmail("");
      setPassword("");
    }
  });

  // effect
  useEffect(() => {
    if (data && data.login) {
      const { id, email } = data.login;
      dispatch({
        type: EReducer.LOGIN_USER,
        payload: {
          id,
          email
        }
      });
      Router.push("/");
    }
    if (error) {
      console.error(error);
    }
    // もしログイン済みならリダイレクト
    if (state.currentUser) {
      Router.push("/");
    }
  }, [data, error, state]);

  // functions
  const handleChangeEmail = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!loading && email.trim() && password.trim()) {
      login({
        variables: {
          input: {
            email,
            password
          }
        }
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChangePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!email.trim() || !password.trim()}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <NextLink href="/sign_up">
                <a>まだアカウントを持ってない？登録はこちら</a>
              </NextLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default LoginPage;
