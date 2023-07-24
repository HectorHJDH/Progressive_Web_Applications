const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",       // Entry point for the main application code
      install: "./src/js/install.js",  // Entry point for the installation code
    },
    output: {
      filename: "[name].bundle.js",    // Output filenames will be based on entry names (main.bundle.js, install.bundle.js)
      path: path.resolve(__dirname, "dist"),  // Output directory for the bundled files
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",   // Template file for generating the HTML file in the output directory
        title: "J.A.T.E",              // Title to be used in the generated HTML file
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",       // Source file for service worker configuration
        swDest: "src-sw.js",        // Destination path for the generated service worker
      }),
      new WebpackPwaManifest({
        fingerprints: false,        // Disable fingerprinting for the generated manifest
        inject: true,               // Inject the manifest into the generated HTML file
        name: "Just Another Text Editor",    // Name of the Progressive Web App
        short_name: "JATE",         // Short name of the app for limited space display
        description: "This app installs JATE",   // Description of the app
        background_color: "#225ca3",    // Background color for the splash screen
        theme_color: "#225ca3",         // Theme color for the address bar and task switcher
        start_url: "/",               // Start URL of the app when launched
        publicPath: "/",             // Public path to serve the assets
        icons: [
          {
            src: path.resolve("src/images/logo.png"),  // Source file for the app icon
            sizes: [96, 128, 192, 256, 384, 512],      // Image sizes for different devices
            destination: path.join("assets", "icons"), // Destination directory for the generated icons
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,        // Rule for processing CSS files
          use: ["style-loader", "css-loader"],  // Use style-loader and css-loader to process CSS
        },
        {
          test: /\.m?js$/,        // Rule for processing JavaScript files
          exclude: /node_modules/,    // Exclude node_modules from processing
          use: {
            loader: "babel-loader",   // Use babel-loader to transpile JavaScript code
            options: {
              presets: ["@babel/preset-env"],   // Babel preset for handling modern JavaScript features
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",   // Babel plugin for object rest spread syntax
                "@babel/transform-runtime",    // Babel plugin for async/await and generators
              ],
            },
          },
        },
      ],
    },
  };
};
