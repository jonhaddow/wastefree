require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

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
		instagramLink: "https://www.instagram.com/waste_free_mama/",
	},
	graphqlTypegen: {
		// Move the typegen path out of the src folder - it creates an issue with tailwindCSS
		typesOutputPath: `gatsby-types.d.ts`,
	},
	plugins: [
		// typescript plugins
		"gatsby-plugin-typescript",

		"gatsby-plugin-netlify",

		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,

		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: `${__dirname}/content`,
			},
		},

		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
						},
					},
					`gatsby-remark-copy-linked-files`,
				],
			},
		},

		"gatsby-plugin-postcss",

		"gatsby-plugin-typescript-checker",
		"gatsby-plugin-eslint",

		{
			resolve: "gatsby-plugin-html-attributes",
			options: {
				lang: "en",
			},
		},
		{
			resolve: "gatsby-plugin-canonical-urls",
			options: {
				siteUrl: "https://wastefreemama.com",
			},
		},

		// PWA
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Waste Free Mama`,
				short_name: `Waste Free Mama`,
				start_url: `/`,
				background_color: `#6b37bf`,
				theme_color: `#6b37bf`,
				// Enables "Add to Homescreen" prompt and disables browser UI (including back button)
				// see https://developers.google.com/web/fundamentals/web-app-manifest/#display
				display: `standalone`,
				icon: `src/assets/favicon.png`, // This path is relative to the root of the site.
			},
		},
	],
};
