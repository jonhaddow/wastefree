import { graphql, useStaticQuery } from "gatsby";
import Post from "../common/post";

export const usePosts = (): Post[] => {
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

	return allPosts.allMarkdownRemark.edges.map(
		(x: { node: Post }): Post => x.node
	) as Post[];
};
