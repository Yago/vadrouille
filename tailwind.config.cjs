/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			black: '#000',
			white: '#fff',
			beige: {
				100: '#FFFADE',
				200: '#E6E1C8',
			},
			green: {
				500: '#698000',
				800: '#272E00'
			},
			braun: {
				800: '#44291A'
			}
		},
		fontFamily: {
			sans: ['Pangea Afrikan', ...defaultTheme.fontFamily.sans],
			serif: ['Recia', ...defaultTheme.fontFamily.serif],
		},
		extend: {},
	},
	plugins: [],
}
