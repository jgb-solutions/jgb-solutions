import { tanstackConfig } from "@tanstack/eslint-config"
import pluginRouter from "@tanstack/eslint-plugin-router"
import pluginQuery from "@tanstack/eslint-plugin-query"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import pluginPrettier from "eslint-plugin-prettier"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsparser from "@typescript-eslint/parser"
import js from "@eslint/js"
import globals from "globals"

export default [
	...tanstackConfig,
	js.configs.recommended,
	{
		files: ["**/*.{js,mjs,cjs,ts,tsx}"],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: { jsx: true },
				project: "./tsconfig.json",
			},
			globals: {
				...globals.browser,
				...globals.node,
				console: "readonly",
				process: "readonly",
				Buffer: "readonly",
				__dirname: "readonly",
				__filename: "readonly",
				React: "readonly",
			},
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		plugins: {
			"@typescript-eslint": tseslint,
			react: pluginReact,
			"react-hooks": pluginReactHooks,
			"@tanstack/router": pluginRouter,
			"@tanstack/query": pluginQuery,
			prettier: pluginPrettier,
		},
		rules: {
			...tseslint.configs.recommended.rules,
			...pluginReact.configs.recommended.rules,
			...pluginReactHooks.configs.recommended.rules,
			...pluginQuery.configs.recommended.rules,
			"prettier/prettier": "error",

			// TanStack Router rules
			"@tanstack/router/create-route-property-order": "error",

			// React rules
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
			"react/jsx-uses-react": "off",
			"react/no-unescaped-entities": "off",
			"react-hooks/static-components": "off",
			"react-hooks/set-state-in-effect": "off",
			"react-hooks/purity": "off",
			"react/no-unknown-property": "off",

			// TypeScript rules
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unnecessary-condition": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"no-redeclare": "off",

			// General rules
			"no-console": "warn",
			"prefer-const": "error",
			"no-var": "error",
		},
	},
	{
		files: ["**/*.js"],
		languageOptions: {
			sourceType: "commonjs",
		},
	},
	{
		ignores: [
			"node_modules/**",
			"build/**",
			"dist/**",
			".tanstack/**",
			".vercel/**",
			"src/routeTree.gen.ts",
			".content-collections/**",
			"*.config.js",
			"*.config.ts",
			".output/**",
		],
	},
]
