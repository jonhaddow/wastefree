const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");
const _ = require("lodash");

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

	// Blogs browse page
	createPage({
		path: "/blogs",
		component: path.resolve("./src/templates/browse.tsx"),
		context: {
			filterRegex: "/blogs/.*\\\\.md$/"
		}
	});

	// Recipes browse page
	createPage({
		path: "/recipes",
		component: path.resolve("./src/templates/browse.tsx"),
		context: {
			filterRegex: "/recipes/.*\\\\.md$/"
		}
	});

	// Create page for each markdown blog, recipe or post
	["blogs", "pages", "recipes"].forEach(async type => {
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
					slug: slug
				}
			});
		});
	});

	// Create page for each tag
	const tagTemplate = path.resolve("src/templates/tags.tsx");
	const tagsQuery = await graphql(`
		{
			postsRemark: allMarkdownRemark(
				sort: { order: DESC, fields: [frontmatter___date] }
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
				group(field: frontmatter___tags) {
					fieldValue
				}
			}
		}
	`);

	const tags = tagsQuery.data.tagsGroup.group;
	tags.forEach(tag => {
		createPage({
			path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
			component: tagTemplate,
			context: {
				tag: tag.fieldValue
			}
		});
	});
};
