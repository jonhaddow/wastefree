import React from "react";
import Styles from "./blogs.module.scss";
import PostCard from "../components/post_card";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { IFluidObject } from "gatsby-background-image";

interface PostNode {
	id: string;
	frontmatter: {
		title: string;
		featuredImage: {
			childImageSharp: {
				fluid: IFluidObject;
			};
		};
		date: string;
	};
	fields: {
		slug: string;
	};
}

interface GraphQLSchema {
	allMarkdownRemark: {
		nodes: PostNode[];
	};
}

export default function Blogs(props: { data: GraphQLSchema }): JSX.Element {
	const { nodes } = props.data.allMarkdownRemark;

	const postEls = nodes.map(
		(post): JSX.Element => {
			return (
				<PostCard
					key={post.id}
					title={post.frontmatter.title}
					date={post.frontmatter.date}
					slug={post.fields.slug}
					featuredImage={post.frontmatter.featuredImage}
				/>
			);
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
