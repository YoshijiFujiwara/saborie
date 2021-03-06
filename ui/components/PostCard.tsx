import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import { orange } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useContext, useEffect } from "react";
import Context from "../contexts";
import { Post, useSwitchLikeMutation } from "../generated/graphql";
import { EReducer } from "../reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: orange[300]
    },
    card: {
      boxShadow: "0 0 0 0",
      border: "#808080 solid 2px",
      marginBottom: 10
    }
  })
);

export type Props = {
  post: Post;
  page: "index" | "search";
};

const PostCard: React.FC<Props> = ({ post, page }) => {
  const classes = useStyles();
  // context
  const { state, dispatch } = useContext(Context);

  // graphql
  const [switchLike, { loading, error, data }] = useSwitchLikeMutation();

  useEffect(() => {
    if (!loading && data) {
      if (data.switchLike) {
        dispatch({
          type: EReducer.ADD_LIKE,
          payload: {
            postId: post.id,
            like: data.switchLike
          }
        });
      } else if (data.switchLike === null) {
        dispatch({
          type: EReducer.DELETE_LIKE,
          payload: {
            postId: post.id,
            authorId: state.currentUser.id
          }
        });
      }
    }
    if (error) {
      console.error(error);
    }
  }, [data, loading, error]);

  // handlers
  const handleCommentButtonClick = () => {
    if (page === "index") {
      dispatch({ type: EReducer.SET_DISPLAY_POST_ID, payload: post.id });
    } else if (page === "search") {
      dispatch({
        type: EReducer.SET_DISPLAY_POST_ID_IN_SEARCH,
        payload: post.id
      });
    }
  };
  const handleLikeButtonClick = () => {
    // TODO: ログインしてください、的なメッセージを出すか
    if (!state.currentUser) return;
    switchLike({
      variables: {
        input: {
          postId: post.id
        }
      }
    });
  };

  const hightlightPostId: string | null =
    page === "index"
      ? state.displayPostId
      : page === "search"
      ? state.displayPostIdInSearch
      : null;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.author.email.slice(0, 1)}
          </Avatar>
        }
        title={post.author.email}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography
          variant="h5"
          component="p"
          style={{ color: "#38271d", marginBottom: 10 }}
        >
          <span style={{ fontWeight: "bold" }}>{post.todo}</span>をサボって
          <span style={{ fontWeight: "bold" }}>{post.mistake}</span>を
          <span style={{ fontWeight: "bold" }}>{post.minutes / 60}時間</span>
          やっちゃった
        </Typography>
        <Typography variant="h6" component="p" style={{ color: "#38271d" }}>
          いいわけ：<span style={{ fontWeight: "bold" }}>{post.excuse}</span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          color={
            post.likes?.find(like => like.author.id === state.currentUser?.id)
              ? "secondary"
              : "default"
          }
          onClick={handleLikeButtonClick}
          aria-label="add to favorites"
        >
          <FavoriteIcon />
          &nbsp;{post.likes?.length}
        </IconButton>
        <IconButton
          onClick={handleCommentButtonClick}
          aria-label="comment"
          style={{
            color: post.id === hightlightPostId ? "#4224d6" : "grey"
          }}
        >
          <ChatBubbleIcon />
          &nbsp;{post.comments?.length}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
