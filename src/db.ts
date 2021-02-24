const sqlite3 = require('sqlite3').verbose();
import {Database, open} from 'sqlite'
import search = require('./searchData');

let database: Database;

// this is a top-level await
export async function init() {
  //open the database
  open({
    filename: './moviewatcher.sqlite3',
    driver: sqlite3.Database
  }).then(async (db) => {
    // do your thing
    await db.exec("CREATE TABLE if not exists search_info (title TEXT, tmdb_id INTEGER, last_run TEXT)");
    await db.exec("CREATE TABLE if not exists results_info (search_id INTEGER, title TEXT, url TEXT, torrent_url TEXT)");

    //await db.close();  // TODO: need to close db in index
    database = db;
  })

}

export async function addSearchTitle(searchData: search.SearchData): Promise<number> {
  const result = await database.run(
    'INSERT INTO search_info (title, tmdb_id, last_run) VALUES (?,?,?)',
    searchData.title, searchData.tmdbId, searchData.lastRun
  )
  return Promise.resolve(<number>result.lastID)
}


export async function addSearchResult(keywordRowId: number, title: string | undefined, url: string | undefined, torrentUrl: string | undefined): Promise<any> {
  const result = await database.run(
    'INSERT INTO results_info (search_id, title, url, torrent_url) VALUES (?,?,?,?)',
    keywordRowId, title, url, torrentUrl
  )
}

