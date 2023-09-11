module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: ["jonhaddow", "jonhaddow/react"],
	parserOptions: {
		sourceType: "module",

		// The include property on this file is used to determine
		// the files to lint.
		project: "./tsconfig.json",
	},
	rules: {
		"@typescript-eslint/explicit-function-return-type": "off",
	},
};
