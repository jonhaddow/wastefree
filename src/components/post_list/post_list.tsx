import React from "react";
import PostCard from "../post_card";
import Post from "../../common/post";
import { postList } from "./post_list.module.scss";

export default function PostList(props: { posts: Post[] }): JSX.Element {
	const postCards = props.posts.map(
		(post): JSX.Element => {
			return <PostCard key={post.id} {...post}></PostCard>;
		}
	);
	return <ul className={postList}>{postCards}</ul>;
}
