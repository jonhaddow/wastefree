import { graphql, useStaticQuery } from "gatsby";

export const useHeaderImage = (): Queries.HeaderImageQuery["header"] => {
	const { header } = useStaticQuery<Queries.HeaderImageQuery>(graphql`
		query HeaderImage {
			header: file(relativePath: { eq: "site_images/header-image.jpg" }) {
				childImageSharp {
					gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
				}
			}
		}
	`);

	return header;
};
