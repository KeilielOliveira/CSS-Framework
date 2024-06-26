const path = require('path');
const MiniCssExtrctPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const RemoveEmptyScriptsPlugin   = require('webpack-remove-empty-scripts');

module.exports = {
    mode: 'production',
    entry: {
        'style': { import: './scss/style.scss', filename: '[name].bundle.js' }
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
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
        new MiniCssExtrctPlugin({
            filename: '[name].min.css'
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin({
                test: /\.min\.css$/,
                minimizerOptions: {
                    preset: [
                        'default', 
                        { discardComments: { allComments: true } }
                    ]
                }
            })
        ]
    },
    stats: {
        loggingDebug: ["sass-loader"],
    },
};