import React, { ReactElement } from "react";
import { PostCard } from "..";
import Post from "../../common/post";

export const PostList = (props: { posts: Post[] }): ReactElement => {
	const postCards = props.posts.map(
		(post): JSX.Element => {
			return <PostCard key={post.id} {...post}></PostCard>;
		}
	);
	return <ul className="mx-auto w-full max-w-5xl">{postCards}</ul>;
};
