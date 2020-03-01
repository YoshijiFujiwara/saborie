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
import React, { useContext } from "react";
import Context from "../contexts";
import { Post } from "../generated/graphql";
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

  // handlers
  const handleCommentButtonClick = () => {
    dispatch({ type: EReducer.SET_DISPLAY_POST_ID, payload: post.id });
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          onClick={handleCommentButtonClick}
          aria-label="comment"
          color={post.id === state.displayPostId ? "primary" : "default"}
        >
          <ChatBubbleIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
