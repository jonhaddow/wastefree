import React from "react";
import Post from "../../common/post";
import { useStaticQuery, graphql, Link } from "gatsby";
import RelatedPostsBuilder from "./related_posts_builder";

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
		<>
			<h3>You may also like</h3>
			<ul>
				{relatedPosts.map(
					(post): JSX.Element => {
						return (
							<li key={post.id}>
								<Link to={post.fields.slug}>
									{post.frontmatter.title}
								</Link>
							</li>
						);
					}
				)}
			</ul>
		</>
	);
}
