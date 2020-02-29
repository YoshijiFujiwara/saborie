import React from "react";
import PostForm from "../components/PostForm";
import DefaultLayout from "../layouts/default";
import { withApollo } from "../lib/apollo";

const CreatePage: React.FC = () => {
  return (
    <DefaultLayout>
      <PostForm />
    </DefaultLayout>
  );
};

const CreatePageWithApollo = withApollo(CreatePage);
export default CreatePageWithApollo;
