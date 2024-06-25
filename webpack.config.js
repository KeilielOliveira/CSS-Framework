const path = require('path');
const MiniCssExtrctPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const RemoveEmptyScriptsPlugin   = require('webpack-remove-empty-scripts');

//Pontos de entrada dos arquivos compilados pelo webpack.
const entrys = {
    'style': { import: './scss/style.scss', filename: 'bundle/[name].bundle.js' },
};

module.exports = {
    mode: 'production',
    entry: entrys,
    output: {
        path: path.resolve(__dirname, 'dist'),
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
            filename: (pathData) => {
                if(/\.test$/.test(pathData.chunk.name)) {
                    //Se for um arquivo de testes scss.

                    return '../tests/css/[name].css';
                }else {
                    //Se for um arquivo padrão scss.
                    return 'css/[name].css';
                }
            }
        }),
        new MiniCssExtrctPlugin({
            filename: (pathData) => {
                if(/\.test$/.test(pathData.chunk.name)) {
                    //Se for um arquivo de testes scss.

                    return '../tests/css/[name].css';
                }else {
                    //Se for um arquivo padrão scss.
                    return 'css/[name].min.css';
                }
            }
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