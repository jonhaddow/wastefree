/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	siteMetadata: {
		title: "Waste Free Mama",
		description: "My journey to waste free living"
	},
	plugins: [
		"gatsby-plugin-typescript",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: `${__dirname}/src/markdown/`
			}
		},
		"gatsby-plugin-scss-typescript",
		{
			resolve: "gatsby-plugin-typography",
			options: {
				pathToConfigModule: "src/utils/typography"
			}
		}
	]
};
