import React from "react";
import { graphql } from "gatsby";
import Styles from "./browse.module.scss";
import PostCard from "../components/post_card";
import Layout from "../components/layout";
import Post from "../common/post";

interface GraphQLSchema {
	allMarkdownRemark: {
		nodes: Post[];
	};
}

export default function Recipes(props: { data: GraphQLSchema }): JSX.Element {
	const { nodes } = props.data.allMarkdownRemark;

	const postEls = nodes.map(
		(post): JSX.Element => {
			return <PostCard key={post.id} {...post} />;
		}
	);

	return (
		<Layout>
			<div className={Styles.posts}>
				<ul>{postEls}</ul>
			</div>
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
