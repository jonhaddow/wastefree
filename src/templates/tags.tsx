import React from "react";
import Post from "../common/post";
import { graphql } from "gatsby";
import { Layout, PostList } from "../components";

interface TagProps {
	pageContext: {
		tag: string;
	};
	data: {
		allMarkdownRemark: {
			totalCount: number;
			edges: [
				{
					node: Post;
				}
			];
		};
	};
}

export default function Tags(props: TagProps): JSX.Element {
	const { tag } = props.pageContext;
	const { totalCount } = props.data.allMarkdownRemark;
	const tagHeader = `${totalCount} post${
		totalCount === 1 ? "" : "s"
	} tagged with "${tag}"`;
	const posts = props.data.allMarkdownRemark.edges.map((x): Post => x.node);

	return (
		<Layout
			pageTitle={`Tags matching "${tag}`}
			pageDescription="List of blogs or recipes with the matching tag."
		>
			<h2 className="text-center text-2xl mt-4 mb-6 text-gray-600 leading-10">
				{tagHeader}
			</h2>
			<PostList posts={posts}></PostList>
		</Layout>
	);
}
export const pageQuery = graphql`
	query($tag: String) {
		allMarkdownRemark(
			limit: 2000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			totalCount
			edges {
				node {
					...PostFragment
				}
			}
		}
	}
`;
