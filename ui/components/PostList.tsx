import { makeStyles, createStyles } from "@material-ui/core/styles";
import React from "react";
import { Post } from "../generated/graphql";
import PostCard from "./PostCard";
import { Props as PostCardProps } from "./PostCard";

const useStyles = makeStyles(() =>
  createStyles({
    postCard: {
      marginBottom: -1
    }
  })
);

type Props = {
  posts: Post[];
  page: PostCardProps["page"];
};

const PostList: React.FC<Props> = ({ posts, page }) => {
  const classes = useStyles();

  return (
    <>
      {posts.map((post, index) => (
        <div key={index} className={classes.postCard}>
          <PostCard key={index} post={post} page={page} />
        </div>
      ))}
    </>
  );
};

export default PostList;
