import * as httpm from 'typed-rest-client/HttpClient';
import searchResults = require('../resultData');

export function getMovies(searchString: string, callback: Function): void {
  let results: Array<searchResults.ResultData> = []
  const httpc = new httpm.HttpClient('vsts-node-api');
  const response = httpc.get('https://yts.mx/api/v2/list_movies.jsonp?query_term=' + encodeURIComponent(searchString));
  response.then((res) => {
    const bodyPromise = res.readBody();
    bodyPromise.then((body) => {
      const ytsData = <YTS>JSON.parse(body).data;
      ytsData.movies?.forEach(function (movie) {
        let newResult = <searchResults.ResultData>{
          title: movie.title,
          url: movie.url,
          torrentUrl: movie.torrents[0].url
        }
        results.push(newResult);
      })
      callback(results);
    }, (reason) => {
      console.log(reason);
    });
  }, (reason) => {
    console.log(reason);
  });
  response.catch((reason) => {
    console.log(reason);
  });
}

interface YTS {
  "movie_count": number,
  "limit": number,
  "page_number": number,
  "movies": [
    {
      "id": number,
      "url": string,
      "imdb_code": string,
      "title": string,
      "title_english": string,
      "title_long": string,
      "slug": string,
      "year": number,
      "rating": number,
      "runtime": number,
      "genres": string[],
      "summary": string,
      "description_full": string,
      "synopsis": string,
      "yt_trailer_code": string,
      "language": string,
      "mpa_rating": string,
      "background_image": string,
      "background_image_original": string,
      "small_cover_image": string,
      "medium_cover_image": string,
      "large_cover_image": string,
      "state": string,
      "torrents": [{
        "url": string,
        "hash": string,
        "quality": string,
        "type": string,
        "seeds": number,
        "peers": number,
        "size": string,
        "size_bytes": number,
        "date_uploaded": string,
        "date_uploaded_unix": number
      }],
      "date_uploaded": string,
      "date_uploaded_unix": number
    }]
}