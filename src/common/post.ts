import { IFluidObject } from "gatsby-background-image";

export default interface Post {
	frontmatter: {
		featuredImage: {
			childImageSharp: {
				fluid: IFluidObject;
			};
		};
		date: string;
		title: string;
	};
	id: string;
	fields: {
		slug: string;
	};
}
