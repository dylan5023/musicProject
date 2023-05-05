const fileManager = require("fs");
const cors = require("cors");
const filePath = "../../static/data/user.json";
const trackFile = "../../static/data/tracks.json";
// // require server.js
// require("./server.js");

// let pictureList = fileManager.readFileSync(filePath, "utf-8");

function exportJsonPicture() {
  return fileManager.readFileSync(filePath, "utf-8");
}
function exportTrackList() {
  return fileManager.readFileSync(trackFile, "utf-8");
}
const express = require("express");
const PORT = process.env.PORT;
const app = express();
// const http = require("http");
// const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(cors());

// set middleware to use Post
app.use(express.json());

// set middleware
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`start: ${req.method} ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`end: ${req.method} ${req.baseUrl}${req.url} ${diffTime}ms`);
});

app.get("/users", (req, res) => {
  res.status(200).json(JSON.parse(exportJsonPicture()));
});
// app.post("/users", (req, res) => {});

app.get("/tracks", (req, res) => {
  res.status(200).json(JSON.parse(exportTrackList()));
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
