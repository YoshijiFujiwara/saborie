import { Grid } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import PostCard from "../components/PostCard";
import PostList from "../components/PostList";
import SearchForm from "../components/SearchForm";
import VerticalDivider from "../components/VerticalDivider";
import Context from "../contexts";
import { Post } from "../generated/graphql";
import DefaultLayout from "../layouts/default";

const useStyles = makeStyles(() =>
  createStyles({
    selectedPost: {
      marginBottom: 10
    },
    posts: {
      overflow: "auto"
    },
    comments: {
      overflow: "auto"
    }
  })
);

const SearchPage: NextPage = () => {
  const classes = useStyles();
  const { state } = useContext(Context);

  const [dividerLeft, setDividerLeft] = useState<number>(0);
  const [dividerHeight, setDividerHeight] = useState<number>(0);
  const [postListHeight, setPostListHeight] = useState<number>(0);
  const [commentListHeight, setCommentListHeight] = useState<number>(0);

  // effects
  useEffect(() => {
    // 投稿一覧の高さ調整
    const postListOffsetTop = document
      .getElementById("post-list")
      ?.getBoundingClientRect().top;
    setPostListHeight(window.innerHeight - postListOffsetTop);

    // コメント覧の高さ調整
    const commentListOffsetTop = document
      .getElementById("comment-list")
      ?.getBoundingClientRect().top;
    setCommentListHeight(window.innerHeight - commentListOffsetTop);

    // Dividerの位置調節
    const postListOffsetLeft = document
      .getElementById("post-list")
      ?.getBoundingClientRect().left;
    // TODO: なんとなくで決めた - 10
    setDividerLeft((window.innerWidth + postListOffsetLeft - 20) / 2);

    // dividerの高さ
    const dividerOffsetTop = document
      .getElementById("vertical-divider")
      ?.getBoundingClientRect().top;
    setDividerHeight(window.innerHeight - dividerOffsetTop - 40);
  });

  // 選択された投稿のコメント一覧
  const displayComments =
    !state.displayPostIdInSearch || state.searchedPosts.length < 1
      ? []
      : state.searchedPosts.find(
          post => post.id === state.displayPostIdInSearch
        ).comments;
  const displayPost = state.searchedPosts.find(
    post => post.id === state.displayPostIdInSearch
  );

  return (
    <DefaultLayout>
      <SearchForm />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div
            id="post-list"
            className={classes.posts}
            style={{ height: postListHeight ? postListHeight : 500 }}
          >
            <PostList posts={state.searchedPosts as Post[]} page="search" />
          </div>
        </Grid>
        <div id="vertical-divider">
          <VerticalDivider
            height={dividerHeight}
            left={dividerLeft}
            border="0.5px solid white"
            marginTop={20}
          />
        </div>
        <Grid item xs={6}>
          {state.displayPostIdInSearch && (
            <>
              <div className={classes.selectedPost}>
                {displayPost && <PostCard post={displayPost} page="search" />}
              </div>
              {state.currentUser && state.displayPostIdInSearch && (
                <CommentForm />
              )}
              <div
                id="comment-list"
                className={classes.comments}
                style={{
                  height: commentListHeight ? commentListHeight : 500
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

export default SearchPage;
