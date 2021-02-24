export interface ResultData {
  searchKey?: number,
  title: string,
  url: string,
  torrentUrl?: string
}

export async function addResults(db: typeof import("./db"), keywordId: number, results: ResultData[]): Promise<void> {
  results.forEach(async function (item) {
    await db.addSearchResult(keywordId, item.title, item.url, item.torrentUrl);
  });
}