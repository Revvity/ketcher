import webpack from 'webpack';
import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const config = (env) => {
  const isProduction = env.NODE_ENV === 'production';
  const mode = isProduction ? 'production' : 'development';

  return {
    mode,
    devtool: 'source-map',
    entry: './src/index.tsx',
    output: {
      path: path.resolve('./dist'),
      filename: 'acd-ketcher-web-component.js',
      clean: true,
      publicPath: '',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
          },
        },
        {
          test: /\.s?css$/i,
          use: [
            'style-loader',
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
              },
            },
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          NODE_ENV: mode,
          NODE_DEBUG: env.NODE_DEBUG,
          ...process.env,
        }),
      }),
      new CopyPlugin({
        patterns: [
          { from: 'assets', to: './' },
          { from: 'package.json', to: './' },
          { from: 'README.md', to: './' },
          { from: 'CHANGELOG.md', to: './' },
          { from: 'src/kc-types.d.ts', to: './' },
        ],
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin()],
    },
  };
};

export default config;
