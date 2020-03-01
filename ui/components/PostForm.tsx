import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  // graphql
  const [createPost, { loading, error, data }] = useCreatePostMutation({
    onCompleted: () => {
      console.log("complete create post");
    },
    onError: e => {
      console.error(e);
    }
  });

  // functions
  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setTitle(e.target.value);
  };
  const handleChangeBody = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setBody(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!loading && title.trim() && body.trim()) {
      createPost({
        variables: {
          input: {
            title,
            body
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
            id="title"
            label="タイトル"
            name="title"
            autoFocus
            value={title}
            onChange={handleChangeTitle}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="body"
            label="本文"
            id="body"
            multiline={true}
            value={body}
            onChange={handleChangeBody}
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
