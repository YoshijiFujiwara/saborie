import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Router from "next/router";
import React, { useState } from "react";
import { useCreatePostMutation } from "../generated/graphql";

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

const PostForm: React.FC = () => {
  const classes = useStyles();

  // state
  const [todo, setTodo] = useState<string>("");
  const [mistake, setMistake] = useState<string>("");
  const [minutes, setMinutes] = useState<number>(0);
  const [excuse, setExcuse] = useState<string>("");

  // graphql
  const [createPost, { loading, error, data }] = useCreatePostMutation({
    onCompleted: () => {
      setTodo("");
      setMistake("");
      setMinutes(0);
      setExcuse("");
      Router.push("/");
    },
    onError: e => {
      console.error(e);
    }
  });

  // functions
  const handleChangeTodo = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setTodo(e.target.value);
  };
  const handleChangeMistake = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setMistake(e.target.value);
  };
  const handleChangeMinutes = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setMinutes(Number(e.target.value));
  };
  const handleChangeExcuse = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setExcuse(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!loading && todo.trim() && mistake.trim() && minutes > 0) {
      createPost({
        variables: {
          input: {
            todo,
            mistake,
            minutes,
            excuse
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
          投稿するっ！
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="todo"
            label="やるべきだった"
            name="todo"
            autoFocus
            value={todo}
            onChange={handleChangeTodo}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="mistake"
            label="やってしまった。。。"
            id="mistake"
            multiline={true}
            value={mistake}
            onChange={handleChangeMistake}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            name="minutes"
            label="どのくらい？"
            id="minutes"
            multiline={true}
            value={minutes}
            onChange={handleChangeMinutes}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="excuse"
            label="言い訳"
            id="excuse"
            multiline={true}
            value={excuse}
            onChange={handleChangeExcuse}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            投稿
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default PostForm;
