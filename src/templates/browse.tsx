import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Post from "../common/post";
import PostList from "../components/post_list";
import Pagination from "../components/pagination";

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
		typeOfPage: string;
	};
}): JSX.Element {
	const { nodes } = props.data.allMarkdownRemark;
	const { currentPage, totalPages, typeOfPage } = props.pageContext;

	const pageTitle = typeOfPage === "blogs" ? "Blogs" : "Recipes";
	const pageDescription = `List of ${pageTitle}. Page ${currentPage} of ${totalPages}`;

	return (
		<Layout pageTitle={pageTitle} pageDescription={pageDescription}>
			<PostList posts={nodes}></PostList>
			<Pagination
				typeOfPage={typeOfPage}
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</Layout>
	);
}

export const query = graphql`
	query($filterRegex: String, $limit: Int!, $skip: Int!) {
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: $filterRegex } }
			sort: { fields: frontmatter___date, order: DESC }
			limit: $limit
			skip: $skip
		) {
			nodes {
				...PostFragment
			}
		}
	}
`;
