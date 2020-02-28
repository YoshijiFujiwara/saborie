import { Grid } from "@material-ui/core";
import { NextPage } from "next";
import React from "react";
import PostList from "../components/PostList";
import { usePostsQuery, Post } from "../generated/graphql";
import DefaultLayout from "../layouts/default";
import { withApollo } from "../lib/apollo";

const IndexPage: NextPage = () => {
  const { loading, error, data } = usePostsQuery();
  const posts = data?.posts; // TODO: このアサーションが益なのか、害なのか...

  if (loading) {
    return <p>loading...</p>;
  } else if (error) {
    return <p>An error occurred.</p>;
  }

  return (
    <DefaultLayout>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <PostList posts={posts as Post[]} />
        </Grid>
        <Grid item xs={6}>
          右やで
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

const IndexPageWithApollo = withApollo(IndexPage);
export default IndexPageWithApollo;
