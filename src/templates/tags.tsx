import { graphql } from "gatsby";
import Post from "../common/post";

interface TagProps {
	pageContext: {
		tag: string;
	};
	data: {
		allMarkdownRemark: {
			totalCount: number;
			edges: [
				{
					node: Post;
				}
			];
		};
	};
}

export default function Tags(props: TagProps): JSX.Element {
	return null;
}
export const pageQuery = graphql`
	query($tag: String) {
		allMarkdownRemark(
			limit: 2000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			totalCount
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						title
					}
				}
			}
		}
	}
`;
