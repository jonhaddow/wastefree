import { graphql } from "gatsby";

export const postFragment = graphql`
	fragment PostFragment on MarkdownRemark {
		frontmatter {
			featuredImage {
				childImageSharp {
					gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
				}
			}
			title
			date(formatString: "D MMMM, YYYY")
			tags
		}
		id
		fields {
			slug
		}
		html
	}
`;
