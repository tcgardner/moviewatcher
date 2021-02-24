var bodyParser = require('body-parser');

import express = require('express');
import ytsFeed = require('./feeds/yts');
import searchResults = require('./resultData');
import search = require('./searchData');
import db = require('./db')

const version = require('../package.json').version;
const path = require("path");
const router = express.Router();

// Instantiating the Express object.
const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));
//parse requests
app.use(bodyParser.urlencoded({extended: true}));

db.init();

// Handles whenever the root directory of the website is accessed.
router.get("/", async function (req: express.Request, res: express.Response) {
  await ytsFeed.getMovies("Star Wars", async (results: Array<searchResults.ResultData>) => {
    res.render("index", {version: version, items: results});
  });
});

router.post("/", async function (req: express.Request, res: express.Response) {
  await search.addSearchData(req.body.searchTitle, async (rowid: number) => {
    await ytsFeed.getMovies(req.body.searchTitle, async (results: Array<searchResults.ResultData>) => {
      await searchResults.addResults(db, rowid, results);
      res.render("index", {version: version, items: results});
    });
  });
});

app.use('/', router);

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
})

app.use(function (err: any, req: any, res: any, next: any) {
  console.error(err.stack)
  res.status(500).send('Something broke!');
})

// Set app to listen on port 3000
app.listen(3000, function () {
  console.log("server is running on port 3000");
});
