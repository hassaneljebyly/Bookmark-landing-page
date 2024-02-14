module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano'),
    require('postcss-combine-media-query'),
    require('postcss-assets')({
      loadPaths: ['public/assets'],
      baseUrl: 'https://hassaneljebyly.github.io/Bookmark-landing-page',
    }),
    require('@fullhuman/postcss-purgecss')({
      content: ['./**/*.html'],
    }),
  ],
};
