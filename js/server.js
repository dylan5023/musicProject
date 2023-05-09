const fileManager = require("fs");
const filePath = "../static/data/user.json";
const trackFile = "../static/data/tracks.json";
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const PORT = 8070;
// // require server.js
// require("./server.js");

// let pictureList = fileManager.readFileSync(filePath, "utf-8");

function exportJsonPicture() {
  return fileManager.readFileSync(filePath, "utf-8");
}
function exportTrackList() {
  return fileManager.readFileSync(trackFile, "utf-8");
}

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

app.get("/tracks", (req, res) => {
  res.status(200).json(JSON.parse(exportTrackList()));
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api/users", (req, res) => res.send("hello world!"));

app.post("/api/users/signup", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then((userInfo) => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

app.post("/api/users/login", (req, res) => {
  // finding email address
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json({ loginSuccess: false, message: "can not find email" });
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "not match password",
          });
        }
        user.createToken((err, user) => {
          if (err) {
            return res.status(400).send(err);
          }
          const newLocal = "x_auth";
          // restore cookies
          res
            .cookie(newLocal, user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user.id });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ loginSuccess: false, message: "server error" });
    });
});

// role  0 -> user role 1 -> admin
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdim: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    firtsName: req.user.firtsName,
    lastName: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
  });
});

// logout
app.get("/api/users/logout", auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" }
    );
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
