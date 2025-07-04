/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'discord-blue': "#5865f2",
				'javascript': "#FFE873",
				'python': "#4B8BBE",
				'nodejs': "#53a54b",
				'yxn': "#ff50f0",
				'online': "#57F287",
				'offline': "#808080",
				'idle': "#F0B232",
				'dnd': "#ED4245"
			},
			keyframes: {
				wave: {
					'0%, 100%': { color: "#ff50f0", textDecorationColor: '#ff50f0'},
					'50%': { color: "#bf10b0", textDecorationColor: 'bf10b0'}
				}
			},
			animation: {
				wave: 'wave 1s infinite'
			}
		},
	},
	plugins: [
		require('tailgrids/plugin'),
	],
}
