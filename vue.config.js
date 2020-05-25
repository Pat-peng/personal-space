/**
 * @file Vue.config.js
 * @reference https://cli.vuejs.org/zh/config/
 */

module.exports = {
    /**
     * 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
     *
     * @refs https://cli.vuejs.org/zh/config/#outputdir
     */
    outputDir: 'static/personal-space/',

    /**
     * 部署应用包时的基本 URL
     *
     * @refs https://cli.vuejs.org/zh/config/#publicpath
     */
    publicPath: './',

    /**
     * Vue-cli 插件配置
     * @refs https://cli.vuejs.org/zh/config/#pluginoptions
     */
    pluginOptions: {
        mock: {
            entry: './mock/mock.js',
            debug: true
        }
    },
    css: {
        extract      : true,
        loaderOptions: {
            postcss: {
                plugins: [
                    require('autoprefixer'),
                    require('postcss-px2rem')({
                        remUnit: 32
                    })
                ]
            }
        }
    },
    /**
     * html页面配置，在 multi-page 模式下构建应用。
     */
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            meta: {}
        }
    }
};