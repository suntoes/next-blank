const { breakpoints, colors, fonts } = require('./lib/vars/theme')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            ...fonts
        },
        fontSize: {
            ...defaultTheme.fontSize,
        },
        screens: {
            ...breakpoints,
        },
        extend: {
            colors,
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
