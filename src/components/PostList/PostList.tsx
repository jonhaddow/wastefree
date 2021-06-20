import React, { ReactElement } from "react";
import { PostCard } from "..";
import Post from "../../common/post";

export const PostList = ({ posts }: { posts: Post[] }): ReactElement => {
	return (
		<ul className="mt-6 grid lg:grid-cols-2 xl:grid-cols-3 md:mx-12">
			{posts.map((post) => {
				return <PostCard key={post.id} {...post}></PostCard>;
			})}
		</ul>
	);
};
