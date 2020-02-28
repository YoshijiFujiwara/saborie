import { NextPage } from "next";
import React from "react";
import { usePostsQuery } from "../generated/graphql";
import DefaultLayout from "../layouts/default";
import { withApollo } from "../lib/apollo";

const IndexPage: NextPage = () => {
  const { loading, error, data } = usePostsQuery();
  const posts = data?.posts;

  if (loading) {
    return <p>loading...</p>;
  } else if (error) {
    return <p>An error occurred.</p>;
  }

  const renderPosts = posts ? (
    <ul>
      {posts.map((post, index) => {
        return <li key={index}>{post.title}</li>;
      })}
    </ul>
  ) : (
    <p>There are no posts here.</p>
  );

  return <DefaultLayout>{renderPosts}</DefaultLayout>;
};

const IndexPageWithApollo = withApollo(IndexPage);
export default IndexPageWithApollo;
