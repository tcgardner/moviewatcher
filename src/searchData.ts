import tmdb = require('./feeds/tmdb');
import db = require('./db')

export interface SearchData {
  rowId?: number,
  title: string,
  tmdbId: number,
  lastRun?: string
}

export function addSearchData(searchTerm: string, callback: Function): void {
  tmdb.getMovie(searchTerm, async (results: SearchData) => {
    await db.addSearchTitle(results)
      .then((rowId) => {
        callback(rowId);
      });
  });
}
