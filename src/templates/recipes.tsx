import React from "react";
import { graphql } from "gatsby";
import { Layout, Pagination, PostList } from "../components";
import Post from "../common/post";

interface GraphQLSchema {
	allMarkdownRemark: {
		nodes: Post[];
	};
}

export default function Recipes(props: {
	data: GraphQLSchema;
	pageContext: {
		totalPages: number;
		currentPage: number;
	};
}): JSX.Element {
	const { nodes } = props.data.allMarkdownRemark;
	const { currentPage, totalPages } = props.pageContext;

	const pageTitle = "Recipes";
	const pageDescription = `List of ${pageTitle}. Page ${currentPage} of ${totalPages}`;

	return (
		<Layout pageTitle={pageTitle} pageDescription={pageDescription}>
			<PostList
				items={nodes.map((x) => ({
					title: x.frontmatter.title,
					url: x.fields.slug,
					date: x.frontmatter.date,
					image: x.frontmatter.featuredImage,
				}))}
			></PostList>
			<Pagination
				typeOfPage="recipes"
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</Layout>
	);
}

export const query = graphql`
	query ($limit: Int!, $skip: Int!) {
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/recipes/" } }
			sort: { frontmatter: { date: DESC } }
			limit: $limit
			skip: $skip
		) {
			nodes {
				...PostFragment
			}
		}
	}
`;
