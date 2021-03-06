import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  id: Scalars['ID'],
  email: Scalars['String'],
};

export type Comment = {
   __typename?: 'Comment',
  id: Scalars['ID'],
  body: Scalars['String'],
  post: Post,
  author: User,
};

export type CommentInput = {
  postId: Scalars['ID'],
  body: Scalars['String'],
};

export type Like = {
   __typename?: 'Like',
  id: Scalars['ID'],
  post: Post,
  author: User,
};

export type LikeInput = {
  postId: Scalars['ID'],
};

export type LoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  signUp: AuthPayload,
  login: AuthPayload,
  signOut: Scalars['Boolean'],
  createPost: Post,
  createComment: Comment,
  switchLike?: Maybe<Like>,
};


export type MutationSignUpArgs = {
  signUpInput?: Maybe<SignUpInput>
};


export type MutationLoginArgs = {
  loginInput?: Maybe<LoginInput>
};


export type MutationCreatePostArgs = {
  postInput?: Maybe<PostInput>
};


export type MutationCreateCommentArgs = {
  commentInput?: Maybe<CommentInput>
};


export type MutationSwitchLikeArgs = {
  likeInput?: Maybe<LikeInput>
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  todo: Scalars['String'],
  mistake: Scalars['String'],
  minutes: Scalars['Int'],
  excuse?: Maybe<Scalars['String']>,
  author: User,
  comments?: Maybe<Array<Maybe<Comment>>>,
  likes?: Maybe<Array<Maybe<Like>>>,
};

export type PostInput = {
  todo: Scalars['String'],
  mistake: Scalars['String'],
  minutes: Scalars['Int'],
  excuse?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  me: AuthPayload,
  post: Post,
  posts: Array<Post>,
  myPosts: Array<Post>,
  postsByKeyword: Array<Post>,
};


export type QueryPostArgs = {
  id: Scalars['ID']
};


export type QueryPostsByKeywordArgs = {
  keyword: Scalars['String']
};

export type SignUpInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  post: Array<Post>,
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
};

export type CreateCommentMutationVariables = {
  input?: Maybe<CommentInput>
};


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'body'>
    & { post: (
      { __typename?: 'Post' }
      & Pick<Post, 'id'>
    ), author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ) }
  ) }
);

export type CreatePostMutationVariables = {
  input?: Maybe<PostInput>
};


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'todo' | 'mistake' | 'minutes' | 'excuse'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ) }
  ) }
);

export type LoginMutationVariables = {
  input: LoginInput
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'id' | 'email'>
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'id' | 'email'>
  ) }
);

export type MyPostsQueryVariables = {};


export type MyPostsQuery = (
  { __typename?: 'Query' }
  & { myPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'todo' | 'mistake' | 'minutes' | 'excuse'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ), comments: Maybe<Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'body'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email'>
      ) }
    )>>>, likes: Maybe<Array<Maybe<(
      { __typename?: 'Like' }
      & Pick<Like, 'id'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email'>
      ), post: (
        { __typename?: 'Post' }
        & Pick<Post, 'id'>
      ) }
    )>>> }
  )> }
);

export type PostsQueryVariables = {};


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'todo' | 'mistake' | 'minutes' | 'excuse'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ), comments: Maybe<Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'body'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email'>
      ) }
    )>>>, likes: Maybe<Array<Maybe<(
      { __typename?: 'Like' }
      & Pick<Like, 'id'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email'>
      ), post: (
        { __typename?: 'Post' }
        & Pick<Post, 'id'>
      ) }
    )>>> }
  )> }
);

export type SearchPostsQueryVariables = {
  input: Scalars['String']
};


export type SearchPostsQuery = (
  { __typename?: 'Query' }
  & { postsByKeyword: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'todo' | 'mistake' | 'minutes' | 'excuse'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ), comments: Maybe<Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'body'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email'>
      ) }
    )>>>, likes: Maybe<Array<Maybe<(
      { __typename?: 'Like' }
      & Pick<Like, 'id'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email'>
      ), post: (
        { __typename?: 'Post' }
        & Pick<Post, 'id'>
      ) }
    )>>> }
  )> }
);

export type SignOutMutationVariables = {};


export type SignOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signOut'>
);

export type SignUpMutationVariables = {
  input: SignUpInput
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'id' | 'email'>
  ) }
);

export type SwitchLikeMutationVariables = {
  input: LikeInput
};


export type SwitchLikeMutation = (
  { __typename?: 'Mutation' }
  & { switchLike: Maybe<(
    { __typename?: 'Like' }
    & Pick<Like, 'id'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ), post: (
      { __typename?: 'Post' }
      & Pick<Post, 'id'>
    ) }
  )> }
);


export const CreateCommentDocument = gql`
    mutation CreateComment($input: CommentInput) {
  createComment(commentInput: $input) {
    id
    body
    post {
      id
    }
    author {
      id
      email
    }
  }
}
    `;
export type CreateCommentMutationFn = ApolloReactCommon.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = ApolloReactCommon.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput) {
  createPost(postInput: $input) {
    id
    todo
    mistake
    minutes
    excuse
    author {
      id
      email
    }
  }
}
    `;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(loginInput: $input) {
    id
    email
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const MyPostsDocument = gql`
    query MyPosts {
  myPosts {
    id
    todo
    mistake
    minutes
    excuse
    author {
      id
      email
    }
    comments {
      id
      body
      author {
        id
        email
      }
    }
    likes {
      id
      author {
        id
        email
      }
      post {
        id
      }
    }
  }
}
    `;

/**
 * __useMyPostsQuery__
 *
 * To run a query within a React component, call `useMyPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyPostsQuery, MyPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<MyPostsQuery, MyPostsQueryVariables>(MyPostsDocument, baseOptions);
      }
export function useMyPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyPostsQuery, MyPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyPostsQuery, MyPostsQueryVariables>(MyPostsDocument, baseOptions);
        }
export type MyPostsQueryHookResult = ReturnType<typeof useMyPostsQuery>;
export type MyPostsLazyQueryHookResult = ReturnType<typeof useMyPostsLazyQuery>;
export type MyPostsQueryResult = ApolloReactCommon.QueryResult<MyPostsQuery, MyPostsQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    todo
    mistake
    minutes
    excuse
    author {
      id
      email
    }
    comments {
      id
      body
      author {
        id
        email
      }
    }
    likes {
      id
      author {
        id
        email
      }
      post {
        id
      }
    }
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
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;
export const SearchPostsDocument = gql`
    query SearchPosts($input: String!) {
  postsByKeyword(keyword: $input) {
    id
    todo
    mistake
    minutes
    excuse
    author {
      id
      email
    }
    comments {
      id
      body
      author {
        id
        email
      }
    }
    likes {
      id
      author {
        id
        email
      }
      post {
        id
      }
    }
  }
}
    `;

/**
 * __useSearchPostsQuery__
 *
 * To run a query within a React component, call `useSearchPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPostsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchPostsQuery, SearchPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchPostsQuery, SearchPostsQueryVariables>(SearchPostsDocument, baseOptions);
      }
export function useSearchPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchPostsQuery, SearchPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchPostsQuery, SearchPostsQueryVariables>(SearchPostsDocument, baseOptions);
        }
export type SearchPostsQueryHookResult = ReturnType<typeof useSearchPostsQuery>;
export type SearchPostsLazyQueryHookResult = ReturnType<typeof useSearchPostsLazyQuery>;
export type SearchPostsQueryResult = ApolloReactCommon.QueryResult<SearchPostsQuery, SearchPostsQueryVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;
export type SignOutMutationFn = ApolloReactCommon.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        return ApolloReactHooks.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, baseOptions);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = ApolloReactCommon.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(signUpInput: $input) {
    id
    email
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;

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
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SwitchLikeDocument = gql`
    mutation SwitchLike($input: LikeInput!) {
  switchLike(likeInput: $input) {
    id
    author {
      id
      email
    }
    post {
      id
    }
  }
}
    `;
export type SwitchLikeMutationFn = ApolloReactCommon.MutationFunction<SwitchLikeMutation, SwitchLikeMutationVariables>;

/**
 * __useSwitchLikeMutation__
 *
 * To run a mutation, you first call `useSwitchLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwitchLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [switchLikeMutation, { data, loading, error }] = useSwitchLikeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSwitchLikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SwitchLikeMutation, SwitchLikeMutationVariables>) {
        return ApolloReactHooks.useMutation<SwitchLikeMutation, SwitchLikeMutationVariables>(SwitchLikeDocument, baseOptions);
      }
export type SwitchLikeMutationHookResult = ReturnType<typeof useSwitchLikeMutation>;
export type SwitchLikeMutationResult = ApolloReactCommon.MutationResult<SwitchLikeMutation>;
export type SwitchLikeMutationOptions = ApolloReactCommon.BaseMutationOptions<SwitchLikeMutation, SwitchLikeMutationVariables>;