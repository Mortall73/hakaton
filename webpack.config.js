const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const paths = {
  // Source files
  src: path.resolve(__dirname, 'src'),

  // Production build files
  build: path.resolve(__dirname, 'dist'),

  // Static files that get copied to build folder
  public: path.join(__dirname, './public'),
}

module.exports = (env, args) => {
  console.log(__dirname, env, args);
  const devMode = args.mode !== 'production';
  console.log(devMode)
  const config = {
    mode: args.mode,
    entry: `${paths.src}/index.js`,
    output: {
      path: paths.build,
      filename: '[name].bundle.js',
      //clean: true,
      //publicPath: paths.public,
      // assetModuleFilename: 'images/[hash][ext][query]'
      //assetModuleFilename: 'assets/images/[name][ext]'
      //assetModuleFilename: 'assets/[name][ext]'
    },
    devServer: {
      port: 8000,
      historyApiFallback: true,
      hot: false,
      watchFiles: ['src/**/*'],
      liveReload: true,
    },
    devtool: 'source-map',
    optimization: {
      minimize: false
    },
    module: {
      rules: [
          {
          test: /\.js?$/ ,
          exclude: /(node_modules|bower_components)/,
          use: {
              // `.swcrc` in the root can be used to configure swc
              loader: "swc-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { 
                minimize: false,
              }
            },
          ]
        },
        {
          test: /\.css/i,
          use: [
            'style-loader',
            'css-loader',
          ]
        },
        {
          test: /\.scss/i,
          use: [
            // devMode ? "style-loader" : {
            //   loader: MiniCssExtractPlugin.loader,
            //   options: {
            //     // you can specify a publicPath here
            //     // by default it uses publicPath in webpackOptions.output
            //     //publicPath: '/resources'
            //   },
            // },
            // {
            //   loader: MiniCssExtractPlugin.loader,
            //   options: {
            //     // you can specify a publicPath here
            //     // by default it uses publicPath in webpackOptions.output
            //     //publicPath: '/',
            //     //hmr: process.env.NODE_ENV === 'development',
            //   },
            // },
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                //publicPath: '/',
                //hmr: process.env.NODE_ENV === 'development',
              },
            },
            "css-loader",
            //'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [autoprefixer]
                }
                
              }
            },
            'sass-loader',
          ]
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i, 
          //loader: 'url-loader',
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]'
          },
          // options: {
          //   publicPath: paths.build
          // },
          
          // options: {
          //   publicPath: '/',
          //   name: 'images/[name].[ext]',
          // }
        },
        {
          test: /\.(?:ttf)$/i, 
          //loader: 'url-loader',
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          },
        }

        // Fonts and SVGs: Inline files
        //{test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},
      ]
    },
    plugins: [
      //new CleanWebpackPlugin,
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: true,
        cache: false,
      }),
      new HtmlWebpackPlugin({
        filename: 'analytics.html',
        template: 'src/pages/analytics.html',
        inject: true,
        cache: false,
      }),
      new HtmlWebpackPlugin({
        filename: 'signup.html',
        template: 'src/pages/signup.html',
        inject: true,
        cache: false,
      }),
      new HtmlWebpackPlugin({
        filename: 'map.html',
        template: 'src/pages/map.html',
        inject: true,
        cache: false,
      }),
      new HtmlWebpackPlugin({
        filename: 'questions.html',
        template: 'src/pages/questions.html',
        inject: true,
        cache: false,
      }),
      // new HtmlWebpackPlugin({
      //   filename: 'team.html',
      //   template: 'src/pages/team.html',
      //   inject: true,
      //   cache: false,
      // }),
      // new HtmlWebpackPlugin({
      //   filename: 'tasks.html',
      //   template: 'src/pages/tasks.html',
      //   inject: true,
      //   cache: false,
      // }),
      // new HtmlWebpackPlugin({
      //   filename: 'handbook.html',
      //   template: 'src/pages/handbook.html',
      //   inject: true,
      //   cache: false,
      // }),
      // new HtmlWebpackPlugin({
      //   filename: 'aboutCompany.html',
      //   template: 'src/pages/aboutCompany.html',
      //   inject: true,
      //   cache: false,
      // }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: paths.public,
      //       to: 'assets',
      //       globOptions: {
      //         ignore: ['*.DS_Store'],
      //       },
      //     },
      //   ],
      // }),
      // new ExtractTextPlugin('bundle.css')
      //new webpack.HotModuleReplacementPlugin(),
    ],
    // resolve: {
    //   extensions: ['.png', '.svg', '.jpg', '.jpeg', '.gif'],
    //   alias: {
    //     root: __dirname,
    //     src: '/public',
    //   },
    // },
  };

  if (!devMode) {
    config.output.clean = true;
    config.plugins.push(new CleanWebpackPlugin);
    // config.module.rules.push({
    //   test: /\.jpe?g$|\.gif$|\.png$|\.PNG$|\.svg$|\.woff(2)?$|\.ttf$|\.eot$/,
    //   loader: 'file-loader',
    //   options: {
    //     name: '[name].[ext]',
    //     outputPath: 'assets/',
    //     publicPath: 'assets/',
    //   },
    // });
    // config.plugins.push(
    //   new CopyWebpackPlugin({
    //     patterns: [
    //       {
    //         from: __dirname + '/src/public/*',
    //         to: __dirname + '/dist/public'
    //       }
    //     ]
    //   })
    // )
  }

  return config
};