import { NextPage } from "next";
import React from "react";

interface InitialProps {
  greeting: string;
}

type Props = InitialProps;

const IndexPage: NextPage<Props, InitialProps> = props => {
  return <div>{props.greeting}</div>;
};

IndexPage.getInitialProps = async () => ({
  greeting: "Hello worldsss"
});

export default IndexPage;
