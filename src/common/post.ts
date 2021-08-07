export default interface Post {
	frontmatter: {
		featuredImage: string;
		date: string;
		title: string;
		tags: string[];
	};
	html: string;
	fields: {
		slug: string;
	};
}
