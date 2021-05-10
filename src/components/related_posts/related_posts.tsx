import React from "react";
import Post from "../../common/post";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import RelatedPostsBuilder from "./related_posts_builder";
import {
	relatedPosts as relatedPostsClass,
	imgWrapper,
} from "./related_posts.module.scss";

interface RelatedPostsProps {
	currentPost: Post;
}

export default function RelatedPosts(props: RelatedPostsProps): JSX.Element {
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
		<section className={relatedPostsClass}>
			<h3>You may also like</h3>
			<ul>
				{relatedPosts.map(
					(post): JSX.Element => {
						return (
							<li key={post.id}>
								<Link to={post.fields.slug}>
									<GatsbyImage
										className={imgWrapper}
										image={
											post.frontmatter.featuredImage
												.childImageSharp.gatsbyImageData
										}
										alt=""
									></GatsbyImage>
									<h4>{post.frontmatter.title}</h4>
								</Link>
								<time>{post.frontmatter.date}</time>
							</li>
						);
					}
				)}
			</ul>
		</section>
	);
}
