module.exports = conf => {
  /**
   * Note that this expects `date` to be a JS Date object (which is what
   * 11ty returns for a page's date). If you pass it something else (i.e.
   * a simple string) you may get odd results.
   */
  conf.addNunjucksFilter('date', function(date, format) {
    const { DateTime } = require('luxon');
    const dateObj = DateTime.fromISO(date.toISOString());
    switch (format) {
      // Basic human string
      case 'human':
        return dateObj.toLocaleString(DateTime.DATE_MED);

      case 'html':
        return dateObj.toFormat('yyyy-LL-dd');

      case 'year':
        return dateObj.toFormat('yyyy');

      default:
        return dateObj.toISODate();
    }
  })

  let markdownIt = require("markdown-it");
  let markdownItImplicitFigures = require("markdown-it-implicit-figures");
  let options = {
    html: true
  };
  let markdownLib = markdownIt(options)
    .use(markdownItImplicitFigures);

  conf.setLibrary("md", markdownLib);

  conf.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- excerpt -->"
  });

  conf.addNunjucksFilter('markdownify', function(string) {
    return (new markdownIt).render(string);
  })

  /**
   * Turn something into a JSON string
   */
  conf.addNunjucksFilter('to_json', function (arg) {
    return JSON.stringify(arg)
  })

  /**
   * Removes separator pipes from the title.
   */
  conf.addNunjucksFilter('title_clean', function (title) {
    if (typeof title == 'undefined') {
      return ''
    }
    return title.replace(/\s*\|\s*/gm, ' ')
  })

  conf.addNunjucksFilter('truncate', (string, len) => {
    const chunked = string.split(' ');
    if (chunked.length <= len) {
      return chunked.join(' ');
    }
    // The regex removes any last-character punctuation
    return `${chunked.slice(0, len).join(' ').replace(/\W$/gm,``)}...`;
  })


}
