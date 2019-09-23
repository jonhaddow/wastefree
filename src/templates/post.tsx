import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Styling from "./post.module.scss";
import Img from "gatsby-image";
import Post from "../common/post";
import TagsList from "../components/tags_list";
import RelatedPosts from "../components/related_posts";

interface GraphQLSchema {
	markdownRemark: Post;
}

function PostTemplate(props: { data: GraphQLSchema }): JSX.Element {
	const post = props.data.markdownRemark;
	const {
		html,
		frontmatter: {
			title,
			featuredImage: {
				childImageSharp: { fluid: featuredImgFluid }
			},
			date,
			tags
		}
	} = post;

	return (
		<Layout>
			<section>
				<article className={Styling.post}>
					<div className={Styling.featuredImageWrapper}>
						<Img
							style={{ maxHeight: "100%", maxWidth: "100%" }}
							imgStyle={{ objectFit: "contain" }}
							fluid={featuredImgFluid}
						/>
					</div>
					<h1>{title}</h1>
					<time>{date}</time>
					<div
						dangerouslySetInnerHTML={{
							__html: html
						}}
					/>
					{tags != null ? <TagsList tags={tags}></TagsList> : null}
				</article>
			</section>
			{tags != null ? <RelatedPosts currentPost={post} /> : null}
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
