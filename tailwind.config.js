/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
			  system: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '.SFNSText-Regular', 'sans-serif'],
			  mono: ['Menlo', 'Consolas', 'Monaco', 'monospace'],
			},
		},
	},
	plugins: [],
  }