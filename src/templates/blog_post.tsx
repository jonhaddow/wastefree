import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Styling from "./post.module.scss";
import Img, { FixedObject } from "gatsby-image";

interface GraphQLSchema {
	markdownRemark: {
		html: string;
		frontmatter: {
			title: string;
			featuredImage: {
				childImageSharp: {
					fixed: FixedObject | FixedObject[];
				};
				publicURL: string;
			};
		};
	};
}

function BlogPost(props: { data: GraphQLSchema }): JSX.Element {
	const {
		html,
		frontmatter: { title, featuredImage }
	} = props.data.markdownRemark;
	const featuredImgFluid = featuredImage.childImageSharp.fixed;
	return (
		<Layout>
			<section>
				<article className={Styling.post}>
					<div className={Styling.featuredImageWrapper}>
						<Img fixed={featuredImgFluid} />
					</div>
					<h1>{title}</h1>
					<div
						dangerouslySetInnerHTML={{
							__html: html
						}}
					/>
				</article>
			</section>
		</Layout>
	);
}

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				featuredImage {
					publicURL
					childImageSharp {
						fixed(height: 500) {
							...GatsbyImageSharpFixed
						}
					}
				}
				title
			}
		}
	}
`;

export default BlogPost;
