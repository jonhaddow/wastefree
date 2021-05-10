import { IGatsbyImageData } from "gatsby-plugin-image";

export default interface Post {
	frontmatter: {
		excerpt?: string;
		featuredImage: {
			childImageSharp: {
				gatsbyImageData: IGatsbyImageData;
			};
		};
		date: string;
		title: string;
		tags: string[];
	};
	id?: string;
	html: string;
	fields: {
		slug: string;
	};
}
