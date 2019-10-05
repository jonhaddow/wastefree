/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	siteMetadata: {
		title: "Waste Free Mama",
		description: "My journey to waste free living",
		instagramLink: "https://www.instagram.com/waste_free_mama/"
	},
	plugins: [
		// typescript plugins
		"gatsby-plugin-typescript",
		"gatsby-plugin-scss-typescript",
		{
			resolve: "gatsby-plugin-typography",
			options: {
				pathToConfigModule: "src/utils/typography"
			}
		},

		// load markdown files
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: `${__dirname}/content/`
			}
		},

		// needed for gatsby-image
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",

		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-relative-images`
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
							withWebp: true
						}
					}
				]
			}
		},

		"gatsby-plugin-netlify-cms",
		{
			resolve: "gatsby-plugin-html-attributes",
			options: {
				lang: "en"
			}
		}
	]
};
