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
    }
}