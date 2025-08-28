const colors = require('tailwindcss/colors')
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gray: colors.coolGray,
                blue: colors.lightBlue,
                red: colors.rose,
                pink: colors.fuchsia,
            },
            borderRadius: {
                xl: "1rem",
                percent50: "50%"
            },
        },
    },
    plugins: [],
}