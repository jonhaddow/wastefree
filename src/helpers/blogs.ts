import matter from "gray-matter";
import { parseISO, compareDesc } from "date-fns";
import fs from "fs";
import { join } from "path";
import Post from "../common/post";

// Add markdown files in `content/blogs`
const postsDirectory = join(process.cwd(), "content", "blogs");

export function getPostBySlug(slug: string): Post {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(postsDirectory, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return {
		frontmatter: {
			featuredImage: data.featuredImage,
			date: (data.date as Date).toISOString(),
			tags: data.tags,
			title: data.title,
		},
		html: content,
		fields: {
			slug: realSlug,
		},
	};
}

export const getAllPosts = (): Post[] => {
	const slugs = fs.readdirSync(postsDirectory);
	const posts = slugs
		.map((slug) => getPostBySlug(slug))
		.sort((a, b) =>
			compareDesc(
				parseISO(a.frontmatter.date),
				parseISO(b.frontmatter.date)
			)
		);

	return posts;
};

export const getFeaturedPosts = (): Post[] => {
	const posts = getAllPosts();

	return posts.slice(0, 3);
};
