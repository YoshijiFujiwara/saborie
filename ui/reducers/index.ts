import { TState, TPayload, User } from "../contexts";
import { Post, Comment, Like } from "../generated/graphql";

export enum EReducer {
  // auth
  LOGIN_USER = "LOGIN_USER",
  SIGN_OUT_USER = "SIGN_OUT_USER",
  // post
  SET_DISPLAY_POST_ID = "SET_DISPLAY_POST_ID",
  SET_POSTS = "SET_POSTS",
  ADD_POST = "ADD_POST",
  // comment
  ADD_COMMENT = "ADD_COMMENT",
  // like
  ADD_LIKE = "ADD_LIKE",
  DELETE_LIKE = "DELETE_LIKE"
}

export type AddCommentPayload = {
  postId: string;
  comment: Comment;
};
export type AddLikePayload = {
  postId: string;
  like: Like;
};
export type DeleteLikePayload = {
  postId: string;
  authorId: string;
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

    // comment
    case EReducer.ADD_COMMENT:
      return (function() {
        const { postId, comment } = payload as AddCommentPayload;
        const posts = state.posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, comment]
            };
          }
          return post;
        });
        return { ...state, posts };
      })();

    // like
    case EReducer.ADD_LIKE:
      return (function() {
        const { postId, like } = payload as AddLikePayload;
        const posts = state.posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes: [...post.likes, like]
            };
          }
          return post;
        });
        return { ...state, posts };
      })();
    case EReducer.DELETE_LIKE:
      return (function() {
        const { postId, authorId } = payload as DeleteLikePayload;
        const posts = state.posts.map(post => {
          if (post.id === postId) {
            const likes = post.likes.filter(
              item => !(item.post.id == postId && item.author.id === authorId)
            );
            return {
              ...post,
              likes
            };
          }
          return post;
        });
        return { ...state, posts };
      })();
    default:
      return state;
  }
};

export default reducer;
