import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Styling from "./post.module.scss";
import Img from "gatsby-image";
import { IFluidObject } from "gatsby-background-image";

interface GraphQLSchema {
	markdownRemark: {
		html: string;
		frontmatter: {
			title: string;
			featuredImage: {
				childImageSharp: {
					fluid: IFluidObject;
				};
			};
		};
	};
}

function BlogPost(props: { data: GraphQLSchema }): JSX.Element {
	const {
		html,
		frontmatter: { title, featuredImage }
	} = props.data.markdownRemark;
	const featuredImgFluid = featuredImage.childImageSharp.fluid;
	const aspectRatio = featuredImgFluid.aspectRatio;
	const ratioClass = aspectRatio <= 0.8 ? Styling.portrait : "";
	return (
		<Layout>
			<section>
				<article className={Styling.post}>
					<div
						className={`${Styling.featuredImageWrapper} ${ratioClass}`}
					>
						<Img
							style={{ maxHeight: "100%", maxWidth: "100%" }}
							imgStyle={{ objectFit: "contain" }}
							fluid={featuredImgFluid}
						/>
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
					childImageSharp {
						fluid {
							...GatsbyImageSharpFluid
						}
					}
				}
				title
			}
		}
	}
`;

export default BlogPost;
