import { TState, TPayload, User } from "../contexts";
import { Post, Comment } from "../generated/graphql";

export enum EReducer {
  // auth
  LOGIN_USER = "LOGIN_USER",
  SIGN_OUT_USER = "SIGN_OUT_USER",
  // post
  SET_DISPLAY_POST_ID = "SET_DISPLAY_POST_ID",
  SET_POSTS = "SET_POSTS",
  ADD_POST = "ADD_POST",
  // comment
  SET_COMMENTS = "SET_COMMENTS",
  ADD_COMMENT = "ADD_COMMENT"
}

export type AddCommentPayload = {
  postId: string;
  comment: Comment;
};

const reducer = (state: TState, { type, payload }: TPayload): TState => {
  switch (type) {
    // auth
    case EReducer.LOGIN_USER:
      return {
        ...state,
        currentUser: payload as User
      };
    case EReducer.SIGN_OUT_USER:
      return {
        ...state,
        currentUser: null
      };
    // post
    case EReducer.SET_DISPLAY_POST_ID:
      return {
        ...state,
        displayPostId: payload as string
      };
    case EReducer.SET_POSTS:
      return {
        ...state,
        posts: payload as Post[]
      };
    case EReducer.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload as Post]
      };
    case EReducer.ADD_COMMENT:
      // eslint-disable-next-line no-case-declarations
      const { postId, comment } = payload as AddCommentPayload;
      // eslint-disable-next-line no-case-declarations
      const posts = state.posts.map(post => {
        if (post.id === postId) {
          const comments = [...post.comments, comment];
          return {
            ...post,
            comments
          };
        }
        return post;
      });
      return {
        ...state,
        posts
      };
    default:
      return state;
  }
};

export default reducer;
