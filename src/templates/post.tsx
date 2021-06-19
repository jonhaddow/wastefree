import React from "react";
import { graphql } from "gatsby";
import { Layout, RelatedPosts, TagsList } from "../components";
import { GatsbyImage } from "gatsby-plugin-image";
import Post from "../common/post";

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
			<section className="flex items-center flex-col">
				<article className="max-w-2xl w-11/12 sm:w-3/4 lg:w-2/3 inline-block mt-5">
					<div className="w-full flex justify-center max-h-96 mb-7">
						<GatsbyImage
							style={{
								maxHeight: "100%",
								maxWidth: "100%",
								width: "100%",
							}}
							imgStyle={{ objectFit: "contain" }}
							image={gatsbyImageData}
							alt=""
						/>
					</div>
					<h1 className="font-serif font-bold text-5xl m-4 text-center">
						{title}
					</h1>
					<time className="text-center block mb-4">{date}</time>
					<div
						dangerouslySetInnerHTML={{
							__html: html,
						}}
						className="prose m-auto"
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
