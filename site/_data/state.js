module.exports = {
    preview: process.env.PREVIEW_ENV, // is this a "preview" environment, i.e. forestry
    production: process.env.NODE_ENV === 'production',
}
