import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Styling from "./post.module.scss";
import Img from "gatsby-image";
import Post from "../common/post";
import TagsList from "../components/tags_list";

interface GraphQLSchema {
	markdownRemark: Post;
}

function PostTemplate(props: { data: GraphQLSchema }): JSX.Element {
	const {
		html,
		frontmatter: { title, featuredImage, date, tags }
	} = props.data.markdownRemark;

	const featuredImgFluid = featuredImage.childImageSharp.fluid;
	const aspectRatio = featuredImgFluid.aspectRatio;
	const ratioClass = aspectRatio <= 0.8 ? Styling.portrait : "";

	const articleElements: JSX.Element[] = [];

	articleElements.push(
		<div
			key="featuredImage"
			className={`${Styling.featuredImageWrapper} ${ratioClass}`}
		>
			<Img
				style={{ maxHeight: "100%", maxWidth: "100%" }}
				imgStyle={{ objectFit: "contain" }}
				fluid={featuredImgFluid}
			/>
		</div>,
		<h1 key="title">{title}</h1>
	);

	articleElements.push(<time key="datetime">{date}</time>);

	articleElements.push(
		<div
			key="html"
			dangerouslySetInnerHTML={{
				__html: html
			}}
		/>
	);

	if (tags != null) {
		articleElements.push(<TagsList tags={tags}></TagsList>);
	}

	return (
		<Layout>
			<section>
				<article className={Styling.post}>{articleElements}</article>
			</section>
		</Layout>
	);
}

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			...PostFragment
		}
	}
`;

export default PostTemplate;
