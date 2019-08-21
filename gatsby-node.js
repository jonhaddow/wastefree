const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.onCreateNode = ({ node, getNode, actions }) => {
	// Ensure markdown images are converted to relative for processing
	fmImagesToRelative(node);

	const { createNodeField } = actions;
	if (node.internal.type === `MarkdownRemark`) {
		const pageRegex = new RegExp("/pages/.*\\.md$");
		const isPage = node.fileAbsolutePath.match(pageRegex);

		const slug = createFilePath({
			node,
			getNode,
			basePath: isPage ? "pages" : "content"
		});
		createNodeField({
			node,
			name: `slug`,
			value: slug
		});
	}
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const blogsQuery = await graphql(`
		{
			allMarkdownRemark(
				filter: { fileAbsolutePath: { regex: "/blogs/.*\\\\.md$/" } }
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

	blogsQuery.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.fields.slug,
			component: path.resolve("./src/templates/blog_post.tsx"),
			context: {
				slug: node.fields.slug
			}
		});
	});

	const pagesQuery = await graphql(`
		{
			allMarkdownRemark(
				filter: { fileAbsolutePath: { regex: "/pages/.*\\\\.md$/" } }
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

	pagesQuery.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.fields.slug,
			component: path.resolve(`./src/templates/blog_post.tsx`),
			context: {
				// Data passed to context is available
				// in page queries as GraphQL variables.
				slug: node.fields.slug
			}
		});
	});

	const recipesQuery = await graphql(`
		{
			allMarkdownRemark(
				filter: { fileAbsolutePath: { regex: "/recipes/.*\\\\.md$/" } }
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

	recipesQuery.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.fields.slug,
			component: path.resolve("./src/templates/blog_post.tsx"),
			context: {
				slug: node.fields.slug
			}
		});
	});
};
