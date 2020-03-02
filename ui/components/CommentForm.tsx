import { TextField, InputAdornment } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import React, { useState, useEffect, useContext } from "react";
import Context from "../contexts";
import { useCreateCommentMutation } from "../generated/graphql";
import { EReducer } from "../reducers";

const CommentForm: React.FC = () => {
  const { state, dispatch } = useContext(Context);

  // hooks
  const [comment, setComment] = useState<string>("");

  // graphql
  const [createComment, { loading, error, data }] = useCreateCommentMutation({
    onCompleted: () => {
      setComment("");
    },
    onError: e => {
      console.error(e);
    }
  });

  // effect
  useEffect(() => {
    if (!loading && data?.createComment) {
      dispatch({
        type: EReducer.ADD_COMMENT,
        payload: {
          postId: data.createComment.post.id,
          comment: data.createComment
        }
      });
    }
    if (error) {
      console.error(error);
    }
  }, [data, loading, error]);

  // handlers
  const handleChangeComment = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setComment(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!loading && comment.trim()) {
      createComment({
        variables: {
          input: {
            postId: state.displayPostId,
            body: comment
          }
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="コメント"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendIcon />
              </InputAdornment>
            )
          }}
          value={comment}
          onChange={handleChangeComment}
        />
      </form>
    </>
  );
};

export default CommentForm;
