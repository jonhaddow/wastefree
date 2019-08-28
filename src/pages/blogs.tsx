import React from "react";
import Styles from "./posts.module.scss";
import PostCard from "../components/post_card";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Post from "../common/post";

interface GraphQLSchema {
	allMarkdownRemark: {
		nodes: Post[];
	};
}

export default function Blogs(props: { data: GraphQLSchema }): JSX.Element {
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
	query {
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/blogs/.*\\\\.md$/" } }
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
