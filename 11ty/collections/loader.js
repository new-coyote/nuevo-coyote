module.exports = conf => {
  require('./redirects')(conf);
  conf.addCollection('workshop', (api) => {
    return api.getFilteredByGlob('site/workshop/*.md').sort((a, b) => {
      return a.data.page.date > b.data.page.date ? -1 : 1;
    })
  });
}
