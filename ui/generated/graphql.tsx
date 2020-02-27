import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  id: Scalars["ID"];
  email: Scalars["String"];
  token: Scalars["String"];
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  signUp: AuthPayload;
  login: AuthPayload;
  createPost: Post;
};

export type MutationSignUpArgs = {
  signUpInput?: Maybe<SignUpInput>;
};

export type MutationLoginArgs = {
  loginInput?: Maybe<LoginInput>;
};

export type MutationCreatePostArgs = {
  postInput?: Maybe<PostInput>;
};

export type Post = {
  __typename?: "Post";
  id: Scalars["ID"];
  title: Scalars["String"];
  body?: Maybe<Scalars["String"]>;
  author: User;
};

export type PostInput = {
  title: Scalars["String"];
  body?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  post: Post;
  posts: Array<Post>;
};

export type QueryPostArgs = {
  id: Scalars["ID"];
};

export type SignUpInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  post: Array<Post>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type LoginMutationVariables = {
  input: LoginInput;
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthPayload" } & Pick<
    AuthPayload,
    "id" | "email" | "token"
  >;
};

export type PostsQueryVariables = {};

export type PostsQuery = { __typename?: "Query" } & {
  posts: Array<{ __typename?: "Post" } & Pick<Post, "id" | "title" | "body">>;
};

export type SignUpMutationVariables = {
  input: SignUpInput;
};

export type SignUpMutation = { __typename?: "Mutation" } & {
  signUp: { __typename?: "AuthPayload" } & Pick<
    AuthPayload,
    "id" | "email" | "token"
  >;
};

export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(loginInput: $input) {
      id
      email
      token
    }
  }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const PostsDocument = gql`
  query Posts {
    posts {
      id
      title
      body
    }
  }
`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PostsQuery,
    PostsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    baseOptions
  );
}
export function usePostsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PostsQuery,
    PostsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    baseOptions
  );
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<
  PostsQuery,
  PostsQueryVariables
>;
export const SignUpDocument = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(signUpInput: $input) {
      id
      email
      token
    }
  }
`;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    baseOptions
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<
  SignUpMutation
>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
