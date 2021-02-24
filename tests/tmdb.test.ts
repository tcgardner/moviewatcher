import tmdbFeed = require('../src/feeds/tmdb');
import searchResults = require('../src/resultData');


describe('Search for various TMDB movies', function() {
  const foundName = 'Star Wars';
  it(foundName + ' is found', async function () {
    tmdbFeed.getMovie(foundName, async (results: searchResults.ResultData) => {
      expect(results?.title).toContain(foundName);
    });
  });
  const notFoundName = 'Stoob Wars';
  it(notFoundName + ' is not found', async function () {
    tmdbFeed.getMovie(notFoundName, async (results: searchResults.ResultData) => {
      expect(results?.title).toBe(undefined);
    });
  });
});