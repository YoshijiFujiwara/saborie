import { NextPage } from "next";
import React from "react";
import { withApollo } from "../lib/apollo";

interface InitialProps {
  greeting: string;
}

type Props = InitialProps;

const IndexPage: NextPage<Props, InitialProps> = props => {
  return <div>{props.greeting}</div>;
};

IndexPage.getInitialProps = async () => ({
  greeting: "Hello world"
});

const IndexPageWithApollo = withApollo(IndexPage);

export default IndexPageWithApollo;
