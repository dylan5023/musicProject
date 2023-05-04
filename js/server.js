const fileManager = require("fs");
const cors = require("cors");
const filePath = "../static/data/user.json";
// // require server.js
// require("./server.js");

// let pictureList = fileManager.readFileSync(filePath, "utf-8");

function exportJsonPicture() {
  return fileManager.readFileSync(filePath, "utf-8");
}
const express = require("express");
const PORT = 8080;
const app = express();
const http = require("http");
const { createProxyMiddleware } = require("http-proxy-middleware");

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

const webpackProxy = createProxyMiddleware({
  target: "http://localhost:8080",
  changeOrigin: true,
  ws: true,
});
app.use(webpackProxy);
const server = http.createServer(app);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
