import React from "react";
import PostForm from "../components/PostForm";
import DefaultLayout from "../layouts/default";

const CreatePage: React.FC = () => {
  return (
    <DefaultLayout>
      <PostForm />
    </DefaultLayout>
  );
};

export default CreatePage;
