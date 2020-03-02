import { openStdin } from "process";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useContext, useEffect } from "react";
import Context from "../contexts";
import { Post, useSwitchLikeMutation, Like } from "../generated/graphql";
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
      backgroundColor: red[500]
    }
  })
);

export type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  const classes = useStyles();
  // context
  const { state, dispatch } = useContext(Context);

  // graphql
  const [switchLike, { loading, error, data }] = useSwitchLikeMutation();

  // effect
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
  }, [data]);

  // handlers
  const handleCommentButtonClick = () => {
    dispatch({ type: EReducer.SET_DISPLAY_POST_ID, payload: post.id });
  };
  const handleLikeButtonClick = () => {
    switchLike({
      variables: {
        input: {
          postId: post.id
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            ほ
          </Avatar>
        }
        title={post.author.email}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="h5" color="textSecondary" component="p">
          {post.todo}をサボって{post.mistake}を{post.minutes / 60}
          時間やっちゃった
        </Typography>
        <Typography variant="h6" color="textSecondary" component="p">
          いいわけ：{post.excuse}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          color={
            post.likes?.find(like => like.author.id === state.currentUser.id)
              ? "secondary"
              : "default"
          }
          onClick={handleLikeButtonClick}
          aria-label="add to favorites"
        >
          <FavoriteIcon />
          {post.likes?.length}
        </IconButton>
        <IconButton
          onClick={handleCommentButtonClick}
          aria-label="comment"
          color={post.id === state.displayPostId ? "primary" : "default"}
        >
          <ChatBubbleIcon />
          {post.comments?.length}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
