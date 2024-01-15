module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano'),
    require('postcss-assets')({
      loadPaths: ['public/assets'],
    }),
  ],
};
