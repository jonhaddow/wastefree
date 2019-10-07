/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	siteMetadata: {
		title: "Waste Free Mama",
		description:
			"Here are my attempts to share how to become zero waste and eco friendly, one step at a time. From plain jane to eco warrior, give it a go!",
		tagLine: "My journey to waste free living",
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

		// SEO
		"gatsby-plugin-react-helmet",
		{
			resolve: "gatsby-plugin-html-attributes",
			options: {
				lang: "en"
			}
		},
		{
			resolve: "gatsby-plugin-canonical-urls",
			options: {
				siteUrl: "https://headless.wastefreemama.com"
			}
		}
	]
};
