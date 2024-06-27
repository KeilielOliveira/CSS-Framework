const path = require('path');
const MiniCssExtrctPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const RemoveEmptyScriptsPlugin   = require('webpack-remove-empty-scripts');

module.exports = {
    mode: 'production',
    entry: {
        'mixins.tests': './scss/tests/_mixins.test.scss',
        'functions.tests': './scss/tests/_functions.test.scss',
    },
    output: {
        path: path.resolve(__dirname, '../tests'),
        clean: true
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtrctPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sourceMap: false,
                            sassOptions: {
                                outputStyle: 'expanded'
                            }
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtrctPlugin({
            filename: '[name].css'
        }),
    ],
    stats: {
        loggingDebug: ["sass-loader"],
    },
};