// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: false, // or 'media' or 'class',
	theme: {
		extend: {
			colors: {
				primary: "#9c5f00",
				"semi-transparent": "#00000030",
			},
			fontFamily: {
				cursive: ["Kaushan Script", "cursive"],
				sans: ["rubik", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
