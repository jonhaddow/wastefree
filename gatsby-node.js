/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const _ = require("lodash");

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;
	if (node.internal.type === `MarkdownRemark`) {
		const pageRegex = new RegExp("/pages/.*\\.md$");
		const isPage = node.fileAbsolutePath.match(pageRegex);

		// Add slug field to node
		const slug = createFilePath({
			node,
			getNode,
			basePath: isPage ? "pages" : "content",
		});
		createNodeField({
			node,
			name: `slug`,
			value: slug,
		});
	}
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	// Create listing pages
	[
		{
			type: "blogs",
			template: "./src/templates/blogs.tsx",
		},
		{
			type: "recipes",
			template: "./src/templates/recipes.tsx",
		},
	].forEach(async ({ type, template }) => {
		const result = await graphql(
			`
				{
					allMarkdownRemark(
						filter: { fileAbsolutePath: { regex: "/${type}/.*.md/" } }
						sort: { frontmatter: { date: DESC } }
						limit: 1000
					) {
						edges {
							node {
								fields {
									slug
								}
							}
						}
					}
				}
			`,
		);
		const posts = result.data.allMarkdownRemark.edges;
		const postsPerPage = 6;
		const totalPages = Math.ceil(posts.length / postsPerPage);
		Array.from({
			length: totalPages,
		}).forEach((_, i) => {
			createPage({
				path: i === 0 ? `/${type}` : `/${type}/${i + 1}`,
				component: path.resolve(template),
				context: {
					limit: postsPerPage,
					skip: i * postsPerPage,
					totalPages,
					currentPage: i + 1,
				},
			});
		});
	});

	// Create page for each markdown blog, recipe or post
	["blogs", "pages", "recipes"].forEach(async (type) => {
		var query = await graphql(`
			{
				allMarkdownRemark(
					filter: { fileAbsolutePath: { regex: "/${type}/.*\\\\.md$/" } }
				) {
					edges {
						node {
							fields {
								slug
							}
						}
					}
				}
			}
		`);
		query.data.allMarkdownRemark.edges.forEach(({ node }) => {
			const { slug } = node.fields;
			createPage({
				path: slug,
				component: path.resolve("./src/templates/post.tsx"),
				context: {
					slug: slug,
				},
			});
		});
	});

	// Create page for each tag
	const tagTemplate = path.resolve("src/templates/tags.tsx");
	const tagsQuery = await graphql(`
		{
			postsRemark: allMarkdownRemark(
				sort: { frontmatter: { date: DESC } }
				limit: 2000
			) {
				edges {
					node {
						fields {
							slug
						}
						frontmatter {
							tags
						}
					}
				}
			}
			tagsGroup: allMarkdownRemark(limit: 2000) {
				group(field: { frontmatter: { tags: SELECT } }) {
					fieldValue
				}
			}
		}
	`);

	const tags = tagsQuery.data.tagsGroup.group;
	tags.forEach((tag) => {
		createPage({
			path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
			component: tagTemplate,
			context: {
				tag: tag.fieldValue,
			},
		});
	});

	// Generate search page
	createPage({
		path: "/search",
		component: path.resolve("src/templates/search.tsx"),
	});
};
