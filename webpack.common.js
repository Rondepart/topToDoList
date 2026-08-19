import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
   entry: {
    main: './src/index.js',
   },
   plugins: [
    new HtmlWebpackPlugin({
        template: './src/template.html',
    }),
   ],
   output: {
    filename: '[name].js',
    path: path.resolve(import.meta.dirname, 'dist'),
    clean: true,
   },
   module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};