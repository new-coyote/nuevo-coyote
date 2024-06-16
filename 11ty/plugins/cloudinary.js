module.exports = conf => {
    conf.namespace('cl_', () => {
        const config = {
            name: "marinaforhire",
            transforms: [{
                quality: "auto",
                fetch_format: "auto",
            }],
            defaults: {
                width: 684
            }
        }
        conf.addPlugin(require('@11in/cloudinary'), config)
    });
}
