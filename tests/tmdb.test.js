"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tmdbFeed = require("../src/feeds/tmdb");
describe('Search for various TMDB movies', function () {
    const foundName = 'Star Wars';
    it(foundName + ' is found', async function () {
        tmdbFeed.getMovie(foundName, async (results) => {
            expect(results === null || results === void 0 ? void 0 : results.title).toContain(foundName);
        });
    });
    const notFoundName = 'Stoob Wars';
    it(notFoundName + ' is not found', async function () {
        tmdbFeed.getMovie(notFoundName, async (results) => {
            expect(results === null || results === void 0 ? void 0 : results.title).toBe(undefined);
        });
    });
});
