import { Grid } from "@material-ui/core";
import { NextPage } from "next";

import React, { useContext, useEffect } from "react";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import PostList from "../components/PostList";
import Context from "../contexts";
import { usePostsQuery, Post } from "../generated/graphql";
import DefaultLayout from "../layouts/default";
import { EReducer } from "../reducers";

const IndexPage: NextPage = () => {
  const { state, dispatch } = useContext(Context);
  const { loading, error, data } = usePostsQuery();

  // effects
  useEffect(() => {
    if (!loading && data.posts) {
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

  return (
    <DefaultLayout>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <PostList posts={state.posts as Post[]} page="index" />
        </Grid>
        <Grid item xs={6}>
          {state.displayPostId && (
            <>
              {state.currentUser && state.displayPostId && <CommentForm />}
              <CommentList comments={displayComments} />
            </>
          )}
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default IndexPage;
