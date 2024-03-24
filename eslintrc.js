module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true,
		},
	},
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	plugins: ['@typescript-eslint', 'react', 'react-hooks', 'unused-imports'],
	extends: [
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'plugin:react/recommended',
		'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		'prettier/prettier': ['warn', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': ['off'],
		'react/display-name': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'@typescript-eslint/no-angle-bracket-type-assertion': 'off',
		'@typescript-eslint/no-angle-bracket-type-assertion': 0,
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-unused-expressions': 'off',
		'no-useless-escape': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/no-unused-expressions': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'unused-imports/no-unused-imports': 'warn',
		'@typescript-eslint/no-empty-function': 'warn',
		'react/no-unescaped-entities': 'warn',
		'react/jsx-no-duplicate-props': 'warn',
		// "react/jsx-no-bind": ["error", { ignoreDOMComponents: true }],
		// 'sort-imports': [
		//   'error',
		//   {
		//     allowSeparatedGroups: true,
		//   },
		// ],
	},
	settings: {
		react: {
			version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
		},
	},
};
