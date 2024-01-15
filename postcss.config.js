module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano'),
    require('postcss-assets')({
      loadPaths: ['public/assets'],
      baseUrl: 'https://hassaneljebyly.github.io/Bookmark-landing-page',
    }),
  ],
};
