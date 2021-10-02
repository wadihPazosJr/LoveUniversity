const express = require("express");
require("dotenv").config();

const app = express();
var cors = require("cors");

const PORT = process.env.PORT || 5000;

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const cookieSession = require("cookie-session");
const session = require("express-session");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

let ObjectID = require("mongodb").ObjectID;

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
    "contactInfo.email": profile._json.email,
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

const findUserById = async (id) => {
  console.log(id);
  let searchResult = await userCollection.findOne({
    _id: new ObjectID(id),
  });
  console.log(searchResult);

  if (searchResult) {
    searchResult.exists = true;
    return searchResult;
  } else {
    return { exists: false };
  }
};

const corsOptions = {
  crendentials: true,
  origin: (origin, callback) => {
    return callback(null, true);
  },
};

const isLoggedIn = (req, res, next) => {
  console.log(`req.user: ${req.user}`);
  console.log(req.path);

  if (req.user || req.path === "/login" || req.path === "/register") {
    next();
  } else {
    res.redirect("/login");
  }
};

//A function that checks whether a user is logged in or not, shouldn't be able to access pages if they aren't except exceptions`

//THE COLLECTION SHOULDN'T ONLY BE CMU IT SHOULD BE BASED OFF SCHOOL, IF THE COLLECTION DOESN"T EXIST, IT SHOULD CREATE IT!!!.

//Middleware

app.use(cors(corsOptions));

passport.serializeUser(function (user, done) {
  console.log("Serializing user id: ");
  console.log(user._id);
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  console.log("Deserializing user id: ");
  console.log(id);
  let user = await findUserById(id);
  console.log("Deserializing user: ");
  console.log(user);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      //Have to define this function
      console.log(profile);
      let result = await findOrCreateUser(profile);
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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(passport.initialize());

app.use(passport.session());

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
      res.redirect("http://localhost:3000/match");
    } else {
      res.redirect("/newlogout");
    }
  }
);

app.get("/newlogout", (req, res) => {
  console.log("hit log out call");
  req.logout();
  res.redirect("htpp://localhost:3000/register");
});

start();
