import React from "react";
import { Layout, Pagination, PostList } from "../components";
import Post from "../common/post";
import { GetStaticProps } from "next";
import { getAllPosts } from "../helpers/blogs";
import { useRouter } from "next/dist/client/router";

const PER_PAGE = 6;

interface BlogsProps {
	posts: Post[];
}

export const getStaticProps: GetStaticProps = (): { props: BlogsProps } => {
	const posts = getAllPosts();
	return {
		props: {
			posts,
		},
	};
};

export default function Blogs({ posts }: BlogsProps): JSX.Element {
	const router = useRouter();
	let { page } = router.query;
	page ??= "1";
	if (typeof page === "object") page = page[0];

	const limitedPosts = posts.slice(
		(parseInt(page) - 1) * PER_PAGE,
		parseInt(page) * PER_PAGE
	);
	const totalPages = Math.ceil(posts.length / PER_PAGE);

	const pageTitle = "Blogs";
	const pageDescription = `List of ${pageTitle}. Page ${page} of ${totalPages}`;

	return (
		<Layout pageTitle={pageTitle} pageDescription={pageDescription}>
			<PostList posts={limitedPosts}></PostList>
			<Pagination
				typeOfPage="blogs"
				currentPage={parseInt(page)}
				totalPages={totalPages}
			/>
		</Layout>
	);
}
