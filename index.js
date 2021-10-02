const express = require("express");
require("dotenv").config();

const app = express();
var cors = require("cors");

const PORT = process.env.PORT || 5000;

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const cookieSession = require("cookie-session");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const userRoute = require("./userRoute.js");

let userCollection;

const start = () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  client.connect((err) => {
    userCollection = client.db("love-university").collection("cmu");
  });

  console.log("Connected to MongoDB!");
};

const { MongoClient } = require("mongodb");
const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Looks for a user, if it doesn't exist, send them to create an account, if they do log them in.
const findOrCreateUser = async (profile) => {
  console.log(profile);
  console.log(profile._json.email);
  let searchResult = await userCollection.findOne({
    contactInfo: { email: profile._json.email },
  });
  //Search the database, and see if they exist within the db
  //If they don't create a new entry in the database, with their email, and have a value that says that they are new
  console.log(searchResult);
  if (searchResult) {
    searchResult.exists = true;
    return searchResult;
  } else {
    //Happens if they don't exist in the database
    return {
      exists: false,
    };
  }
  //If they do exist, then just return the user.
};

/* const isLoggedIn = (req, res, next) => {
  console.log(`req.user: ${req.user}`);
  console.log(req.path);

  if (
    (req.user !== undefined && req.user.email !== "User not found") ||
    (req.path === "/constituent/family" && req.method === "POST") ||
    req.path === "/constituent/constituentFromEmail" ||
    req.path === "/auth/google" ||
    req.path === "/auth/google/callback" ||
    req.path === "/logout" ||
    req.path === "/auth/facebook" ||
    req.path === "/auth/facebook/callback" ||
    req.path === "/" ||
    req.path === "/constituent/socialWorker/create" ||
    req.path === "/auth/microsoft" ||
    req.path === "/auth/microsoft/callback" ||
    req.path === "/constituent/constituentExists" ||
    req.path === "/test"
  ) {
    next();
  } else {
    console.log("hitting redirect");
    if (req.user !== undefined && req.user.email === "User not found") {
      req.logout();
    }
    res.send({
      redirect: "http://localhost:3000/",
      message: "You must log in to use this service",
    });
  }
}; */

//Middleware

passport.serializeUser((user, done) => {
  console.log("Serializing user..." + JSON.stringify(user));
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //Have to define this function
      console.log(profile);
      let result = findOrCreateUser(profile);
      done(null, result);
    }
  )
);

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(cors());

app.use(express.json());

app.use("/user", userRoute);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: "https://www.googleapis.com/auth/userinfo.email",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    let user = req.user;
    if (user.exists) {
      res.redirect("/match");
    } else {
      res.redirect("/newlogout");
    }
  }
);

app.get("/newlogout", (req, res) => {
  console.log("hit log out call");
  req.logout();
  res.redirect("/register");
});

start();
