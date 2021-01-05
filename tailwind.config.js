module.exports = {
    purge: [
        './site/**/*.njk',
        './site/**/*.html',
        './assets/scripts/**/*.js',
    ],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                /** These are the "Brand Colors" chosen by Marina */
                teal: {
                    DEFAULT: '#027da6',
                    light: '#439ebb',
                    lighter: '#81bed1',
                    lightest: '#bfdde8',
                },
                clay: {
                    DEFAULT: '#c19da7',
                    light: '#d0b5bc',
                    lighter: '#e0cfd5',
                    lightest: '#f1e8eb',
                },
                orange: {
                    DEFAULT: '#e99569',
                    light: '#efb08f',
                    lighter: '#f5ccb8',
                    lightest: '#fae6db',
                },
            },
            fontFamily: {
                heading: "'Texturina', serif",
                body: "'Nunito Sans', sans-serif",
            },
            fontSize: {
                homeHeading: '6rem',
            },
            gridTemplateColumns: {
                'page-content': '1fr minmax(500px, 768px) 1fr',
            },
            minHeight: {
                'page-content': '600px',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ]
}
