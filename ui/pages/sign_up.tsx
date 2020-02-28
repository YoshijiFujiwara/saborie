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
import NextLink from "next/link";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Context from "../contexts";
import { useSignUpMutation } from "../generated/graphql";
import { withApollo } from "../lib/apollo";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUpPage: React.FC = () => {
  const classes = useStyles();
  const { state, dispatchFunctions } = useContext(Context);

  // state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // graphql
  const [signUp, { loading, error, data }] = useSignUpMutation({
    onCompleted: () => {
      setEmail("");
      setPassword("");
    }
  });

  // effect
  useEffect(() => {
    if (data && data.signUp) {
      const { id, email, token } = data.signUp;
      dispatchFunctions.loginUser(
        {
          id,
          email
        },
        token
      );
      Router.push("/");
    }
    if (error) {
      console.error(error);
    }
    // もしログイン済みならリダイレクト
    if (state.currentUser && state.token) {
      Router.push("/");
    }
  }, [data, error, state]);

  // functions
  const handleChangeEmail = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading && email.trim() && password.trim()) {
      signUp({
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
          Sign up
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChangePassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!email.trim() || !password.trim()}
            className={classes.submit}
          >
            ユーザー登録
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NextLink href="/login">
                <a>すでにアカウントをお持ちですか？ログインはこちら</a>
              </NextLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const SignUpPageWithApollo = withApollo(SignUpPage);
export default SignUpPageWithApollo;
