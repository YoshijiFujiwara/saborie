import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import * as React from "react";
import { Post } from "../generated/graphql";
import PostCard from "./PostCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    postCard: {
      marginBottom: 10
    }
  })
);

type Props = {
  posts: Post[];
};

const PostList: React.FC<Props> = ({ posts }) => {
  const classes = useStyles();

  return (
    <>
      {posts.map((post, index) => (
        <div key={index} className={classes.postCard}>
          <PostCard key={index} post={post} />
        </div>
      ))}
    </>
  );
};

export default PostList;
