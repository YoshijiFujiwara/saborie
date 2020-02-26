import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import React from "react";
import { withApollo } from "../lib/apollo";

const postsQuery = gql`
  query {
    posts {
      title
    }
  }
`;

interface PostsQuery {
  posts: {
    title: string;
  }[];
}

interface InitialProps {
  greeting: string;
}

type Props = InitialProps;

const IndexPage: NextPage<Props, InitialProps> = props => {
  const { loading, error, data } = useQuery<PostsQuery>(postsQuery);
  const posts = data?.posts;

  if (loading) {
    return <p>loading...</p>;
  } else if (error) {
    return <p>An error occurred.</p>;
  }

  return posts ? (
    <ul>
      {posts.map((post, index) => {
        return <li key={index}>{post.title}</li>;
      })}
    </ul>
  ) : (
    <p>There are no posts here.</p>
  );
};

IndexPage.getInitialProps = async () => ({
  greeting: "Hello world"
});

const IndexPageWithApollo = withApollo(IndexPage);

export default IndexPageWithApollo;
