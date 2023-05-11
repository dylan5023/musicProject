const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 50,
  },

  lastName: {
    type: String,
    maxlength: 50,
  },

  email: {
    type: String,
    trim: true,
    unique: 1,
  },

  password: {
    type: String,
    minlength: 5,
  },

  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },

  role: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    // using bcrypt
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

userSchema.methods.createToken = function (cb) {
  // create token
  var user = this;
  var token = jwt.sign({ _id: user._id.toHexString() }, "secret");

  // user._id + 'secretToken' = token

  user.token = token;
  user
    .save()
    .then((savedUser) => {
      cb(null, savedUser);
    })
    .catch((err) => {
      cb(err);
    });
};

userSchema.statics.findByToken = async function (token) {
  const user = this;
  try {
    const decoded = jwt.verify(token, "secret");
    const foundUser = await user.findOne({ _id: decoded, token: token });
    return foundUser;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
