import { Grid } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { NextPage } from "next";
import React, { useContext, useEffect, createRef, useState } from "react";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import PostCard from "../components/PostCard";
import PostList from "../components/PostList";
import Context from "../contexts";
import { usePostsQuery, Post } from "../generated/graphql";
import DefaultLayout from "../layouts/default";
import { EReducer } from "../reducers";

const useStyles = makeStyles(() =>
  createStyles({
    selectedPost: {
      marginBottom: 10
    },
    posts: {
      maxHeight: "100vh",
      overflow: "auto",
      borderRight: "solid 1px white"
    },
    comments: { overflow: "auto" }
  })
);

const IndexPage: NextPage = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Context);
  const { loading, error, data } = usePostsQuery();

  const [commentListHeight, setCommentListHeight] = useState<number>(0);

  // effects
  useEffect(() => {
    const offsetTop = document
      .getElementById("comment-list")
      ?.getBoundingClientRect().top;
    setCommentListHeight(window.innerHeight - offsetTop);
  });
  useEffect(() => {
    if (!loading && data?.posts) {
      dispatch({ type: EReducer.SET_POSTS, payload: data.posts });
    }
    if (error) {
      console.error(error);
    }
  }, [data, loading, error]);

  // 選択された投稿のコメント一覧
  const displayComments =
    !state.displayPostId || state.posts.length < 1
      ? []
      : state.posts.find(post => post.id === state.displayPostId).comments;
  const displayPost = state.posts.find(post => post.id === state.displayPostId);

  return (
    <DefaultLayout>
      <Grid container spacing={3}>
        <Grid item xs={6} className={classes.posts}>
          <PostList posts={state.posts as Post[]} page="index" />
        </Grid>
        <Grid item xs={6}>
          {state.displayPostId && (
            <>
              <div className={classes.selectedPost}>
                {displayPost && <PostCard post={displayPost} page="index" />}
              </div>
              {state.currentUser && state.displayPostId && <CommentForm />}
              <div
                id="comment-list"
                className={classes.comments}
                style={{
                  maxHeight: commentListHeight ? commentListHeight : 500
                }}
              >
                <CommentList comments={displayComments} />
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default IndexPage;
