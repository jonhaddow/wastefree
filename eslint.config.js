// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("eslint-config-jonhaddow");

module.exports = [
	...config.base,
	...config.react,
	{
		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: __dirname,
			},
		},
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
		},
	},
];
