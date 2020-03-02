import { Grid } from "@material-ui/core";
import { NextPage } from "next";
import React, { useContext } from "react";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import PostList from "../components/PostList";
import SearchForm from "../components/SearchForm";
import Context from "../contexts";
import { Post } from "../generated/graphql";
import DefaultLayout from "../layouts/default";

const SearchPage: NextPage = () => {
  const { state } = useContext(Context);

  // 選択された投稿のコメント一覧
  const displayComments =
    !state.displayPostIdInSearch || state.posts.length < 1
      ? []
      : state.posts.find(post => post.id === state.displayPostIdInSearch)
          .comments;

  return (
    <DefaultLayout>
      <SearchForm />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <PostList posts={state.searchedPosts as Post[]} page="search" />
        </Grid>
        <Grid item xs={6}>
          {state.displayPostId && (
            <>
              {state.currentUser && <CommentForm />}
              <CommentList comments={displayComments} />
            </>
          )}
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default SearchPage;
