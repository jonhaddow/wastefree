import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components";
import { featuredImageWrapper, post as postClass } from "./post.module.scss";
import { GatsbyImage } from "gatsby-plugin-image";
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
			excerpt,
			featuredImage: {
				childImageSharp: { gatsbyImageData },
			},
			date,
			tags,
		},
	} = post;

	return (
		<Layout pageTitle={title} pageDescription={excerpt}>
			<section>
				<article className={postClass}>
					<div className={featuredImageWrapper}>
						<GatsbyImage
							style={{ maxHeight: "100%", maxWidth: "100%" }}
							imgStyle={{ objectFit: "contain" }}
							image={gatsbyImageData}
							alt=""
						/>
					</div>
					<h1>{title}</h1>
					<time>{date}</time>
					<div
						dangerouslySetInnerHTML={{
							__html: html,
						}}
					/>
					{tags != null ? <TagsList tags={tags}></TagsList> : null}
				</article>
			</section>
			{tags && <RelatedPosts currentPost={post} />}
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
