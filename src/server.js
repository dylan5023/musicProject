const express = require("express");
const usersRouter = require("./routes/users.router");
const tracksRouter = require("./routes/tracks.router");
const PORT = process.env.PORT;
const app = express();

const { default: mongoose } = require("mongoose");
mongoose
  .connect(`process.env.MONGODB_URI`)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.error(err));

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`start: ${req.method} ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`end: ${req.method} ${req.baseUrl}${req.url} ${diffTime}ms`);
});

app.use("/users", usersRouter);
app.use("/tracks", tracksRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
