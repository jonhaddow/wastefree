import { graphql, useStaticQuery } from "gatsby";

interface Metadata {
	title: string;
	description: string;
	tagLine: string;
	instagramLink: string;
}

export const useMetadata = (): Metadata => {
	const data = useStaticQuery<{ site: { siteMetadata: Metadata } }>(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						tagLine
						instagramLink
					}
				}
			}
		`
	);

	return data.site.siteMetadata;
};
