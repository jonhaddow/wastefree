import React, { ReactElement } from "react";
import Post from "../../common/post";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import RelatedPostsBuilder from "./related_posts_builder";

interface RelatedPostsProps {
	currentPost: Post;
}

export const RelatedPosts = (props: RelatedPostsProps): ReactElement => {
	const allPosts = useStaticQuery(
		graphql`
			query {
				allMarkdownRemark(limit: 1000) {
					edges {
						node {
							...PostFragment
						}
					}
				}
			}
		`
	);

	const posts = allPosts.allMarkdownRemark.edges.map(
		(x: { node: Post }): Post => x.node
	);

	const relatedPosts = new RelatedPostsBuilder(posts, props.currentPost)
		.setTags(props.currentPost.frontmatter.tags)
		.setLimit(3)
		.generate();

	return (
		<section className="flex flex-col items-center">
			<h3 className="uppercase text-gray-900 text-lg mb-6">
				You may also like
			</h3>
			<ul className="mx-4 max-w-4xl w-10/12 justify-evenly sm:w-2/3 sm:flex">
				{relatedPosts.map((post) => (
					<li key={post.id} className="sm:w-full mx-4 flex-grow mb-5">
						<Link to={post.fields.slug}>
							<GatsbyImage
								className="h-40"
								image={
									post.frontmatter.featuredImage
										.childImageSharp.gatsbyImageData
								}
								alt=""
							></GatsbyImage>
							<h4 className="font-serif font-bold text-3xl py-2 text-gray-900">
								{post.frontmatter.title}
							</h4>
						</Link>
						<time className="text-gray-500">
							{post.frontmatter.date}
						</time>
					</li>
				))}
			</ul>
		</section>
	);
};
