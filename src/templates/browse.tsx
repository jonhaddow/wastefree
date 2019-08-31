import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Post from "../common/post";
import PostList from "../components/post_list/post_list";

interface GraphQLSchema {
	allMarkdownRemark: {
		nodes: Post[];
	};
}

export default function Recipes(props: { data: GraphQLSchema }): JSX.Element {
	const { nodes } = props.data.allMarkdownRemark;
	return (
		<Layout>
			<PostList posts={nodes}></PostList>
		</Layout>
	);
}

export const query = graphql`
	query($filterRegex: String) {
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: $filterRegex } }
			sort: { fields: frontmatter___date, order: DESC }
		) {
			nodes {
				frontmatter {
					featuredImage {
						childImageSharp {
							fluid {
								...GatsbyImageSharpFluid
							}
						}
					}
					date
					title
				}
				id
				fields {
					slug
				}
			}
		}
	}
`;
