import { graphql, useStaticQuery } from "gatsby";
import { getImage, IGatsbyImageData } from "gatsby-plugin-image";

export const useHeaderImage = (): IGatsbyImageData | undefined => {
	const { header } = useStaticQuery(
		graphql`
			query {
				header: file(
					relativePath: { eq: "site_images/header-image.jpg" }
				) {
					childImageSharp {
						gatsbyImageData(
							layout: FULL_WIDTH
							placeholder: BLURRED
						)
					}
				}
			}
		`
	);

	return getImage(header);
};
