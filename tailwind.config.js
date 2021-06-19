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
				sans: ["Oswald", ...defaultTheme.fontFamily.sans],
				serif: ["Amatic SC", ...defaultTheme.fontFamily.serif],
			},
			typography: {
				DEFAULT: {
					css: {
						h2: {
							fontFamily: "Amatic SC",
							fontSize: "2em",
							fontWeight: "bold",
						},
						h3: {
							fontFamily: "Amatic SC",
							fontSize: "1.8em",
							fontWeight: "bold",
						},
						h4: {
							fontFamily: "Amatic SC",
							fontSize: "1.6em",
							fontWeight: "bold",
						},
						h5: {
							fontFamily: "Amatic SC",
							fontSize: "1.5em",
							fontWeight: "bold",
						},
						h6: {
							fontFamily: "Amatic SC",
							fontSize: "1.4em",
							fontWeight: "bold",
						},
					},
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
