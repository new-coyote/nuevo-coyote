module.exports = conf => {
  require('./redirects')(conf);
  conf.addCollection('categories', api => {
    return api.getFilteredByGlob('site/taxonomy/category/*.md')
  })
}
