module.exports = conf => {
    conf.addPlugin(require('@11ty/eleventy-navigation'))
    conf.addPlugin(require("eleventy-plugin-youtube-embed"))
    require('./scribe')(conf)
    require('./cloudinary')(conf)
}
