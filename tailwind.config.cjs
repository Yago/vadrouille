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
		fontSize: {
			'2xl': [
				'var(--step-2xl)',
				{
					lineHeight: '1.2em',
				},
			],
			lg: [
				'var(--step-lg)',
				{
					lineHeight: '1.5em',
				},
			],
			base: [
				'var(--step-base)',
				{
					lineHeight: '1.5em',
				},
			],
			sm: [
				'var(--step-sm)',
				{
					lineHeight: '1.4em',
				},
			],
			xs: [
				'var(--step-xs)',
				{
					lineHeight: '1.4em',
				},
			],
			'2xs': [
				'var(--step-2xs)',
				{
					lineHeight: '1.4em',
				},
			],
		},
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
