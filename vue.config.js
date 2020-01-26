module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/assets/scss/tools/_variables.scss";
                    @import "@/assets/scss/tools/_utils.scss";
                  `
            }
        }
    },
    pwa: {
        name: 'Gloom Companion',
        themeColor: '#b9a78b',
        msTileColor: '#b9a78b'
    }
}