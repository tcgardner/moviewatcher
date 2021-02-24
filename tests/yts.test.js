"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ytsFeed = require("../src/feeds/yts");
describe('Search for various YTS movies', function () {
    const foundName = 'Star Wars';
    it(foundName + ' is found', async function () {
        ytsFeed.getMovies(foundName, async (results) => {
            expect(results[0].title).toContain(foundName);
        });
    });
    const notFoundName = 'Stoob Wars';
    it(notFoundName + ' is not found', async function () {
        ytsFeed.getMovies(notFoundName, async (results) => {
            expect(results).toStrictEqual([]);
        });
    });
});
