module.exports = conf => {
    const {CLOUDINARY_NAME} = process.env
    conf.namespace('cl_', () => {
        const config = {
            transforms: [{
                quality: "auto",
                fetch_format: "auto",
            }],
            defaults: {
                width: 684
            }
        }
        if (CLOUDINARY_NAME) {
            config.name = CLOUDINARY_NAME
        }
        conf.addPlugin(require('@11in/cloudinary'), config)
    });
}
