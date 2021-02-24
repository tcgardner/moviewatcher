import ytsFeed = require('../src/feeds/yts');
import searchResults = require('../src/resultData');


describe('Search for various YTS movies', function() {
  const foundName = 'Star Wars';
  it(foundName + ' is found', async function () {
    ytsFeed.getMovies(foundName, async (results: searchResults.ResultData[]) => {
      expect(results[0].title).toContain(foundName);
    });
  });
  const notFoundName = 'Stoob Wars';
  it(notFoundName + ' is not found', async function () {
    ytsFeed.getMovies(notFoundName, async (results: searchResults.ResultData[]) => {
      expect(results).toStrictEqual([]);
    });
  });
});