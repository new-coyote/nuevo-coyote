module.exports = {
    purge: [
        './content/**/*.njk',
        './content/**/*.html',
        './assets/scripts/**/*.js',
    ],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                gold: '#f6ae2d',
                lavender: 'rgba(174, 138, 174, 0.35)',
            },
            fontFamily: {
                heading: "'Texturina', serif",
                body: "'Nunito Sans', sans-serif",
            },
            fontSize: {
                homeHeading: '6rem',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
