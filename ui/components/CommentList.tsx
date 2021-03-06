import Avatar from "@material-ui/core/Avatar";
import { orange } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Comment } from "../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      border: "#808080 1.5px solid"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: orange[300]
    },
    inline: {
      display: "inline"
    }
  })
);

export type Props = {
  comments: Comment[];
};

const CommentList: React.FC<Props> = ({ comments }) => {
  const classes = useStyles();

  return (
    <>
      {comments.length > 0 && (
        <List className={classes.root}>
          {comments.map((comment, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {comment.author.email.slice(0, 1)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={comment.body}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {comment.author.email}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index !== comments.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );
};

export default CommentList;
