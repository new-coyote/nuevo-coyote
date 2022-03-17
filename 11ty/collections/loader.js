module.exports = conf => {
  require('./redirects')(conf);
  conf.addCollection('workshop', (api) => {
    return api.getFilteredByGlob('site/workshop/*.md').sort((a, b) => {
      return a.data.page.date > b.data.page.date ? -1 : 1;
    })
    .filter(workshop => {
      // We don't want the index as a workshop.
      return workshop.data.layout !== 'workshop/index.njk'
    })
  });

  conf.addCollection('categories', api => {
    return api.getFilteredByGlob('site/taxonomy/category/*.md')
  })
}
