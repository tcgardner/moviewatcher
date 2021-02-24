import search = require('../searchData');

const tmdb = require('tmdbv3').init('TMDB API Key');

export function getMovie(searchString: string, callback: Function): void {
  tmdb.search.movie(searchString, (err: any, res: any) => {
    const searchResult: search.SearchData = {
      title: res.results[0]?.title,
      tmdbId: res.results[0]?.id
    };
    callback(searchResult);
  });
}

interface TMDB {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
};
