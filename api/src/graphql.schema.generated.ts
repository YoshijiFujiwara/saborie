
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CommentInput {
    postId: string;
    body: string;
}

export class LikeInput {
    postId: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class PostInput {
    todo: string;
    mistake: string;
    minutes: number;
    excuse?: string;
}

export class SignUpInput {
    email: string;
    password: string;
}

export class AuthPayload {
    id: string;
    email: string;
}

export class Comment {
    id: string;
    body: string;
    post: Post;
    author: User;
}

export class Like {
    id: string;
    post: Post;
    author: User;
}

export abstract class IMutation {
    abstract signUp(signUpInput?: SignUpInput): AuthPayload | Promise<AuthPayload>;

    abstract login(loginInput?: LoginInput): AuthPayload | Promise<AuthPayload>;

    abstract signOut(): boolean | Promise<boolean>;

    abstract createPost(postInput?: PostInput): Post | Promise<Post>;

    abstract createComment(commentInput?: CommentInput): Comment | Promise<Comment>;

    abstract switchLike(likeInput?: LikeInput): Like | Promise<Like>;
}

export class Post {
    id: string;
    todo: string;
    mistake: string;
    minutes: number;
    excuse?: string;
    author: User;
    comments?: Comment[];
    likes?: Like[];
}

export abstract class IQuery {
    abstract me(): AuthPayload | Promise<AuthPayload>;

    abstract post(id: string): Post | Promise<Post>;

    abstract posts(): Post[] | Promise<Post[]>;

    abstract myPosts(): Post[] | Promise<Post[]>;

    abstract postsByKeyword(keyword: string): Post[] | Promise<Post[]>;
}

export class User {
    id: string;
    email: string;
    post: Post[];
    createdAt: string;
    updatedAt: string;
}
