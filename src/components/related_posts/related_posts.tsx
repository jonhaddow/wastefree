import React from "react";
import Post from "../../common/post";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import RelatedPostsBuilder from "./related_posts_builder";
import Styling from "./related_posts.module.scss";

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
		<section className={Styling.relatedPosts}>
			<h3>You may also like</h3>
			<ul>
				{relatedPosts.map(
					(post): JSX.Element => {
						return (
							<li key={post.id}>
								<Link to={post.fields.slug}>
									<Img
										className={Styling.imgWrapper}
										fluid={
											post.frontmatter.featuredImage
												.childImageSharp.fluid
										}
										alt=""
									></Img>
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
