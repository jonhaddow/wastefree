import { graphql } from "gatsby";

export const postFragment = graphql`
	fragment PostFragment on MarkdownRemark {
		frontmatter {
			featuredImage {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid
					}
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
