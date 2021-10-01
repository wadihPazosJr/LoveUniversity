const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuthStrategy;

passport.use(
  new GoogleStrategy(
    {
      consumerKey: GOOGLE_CONSUMER_KEY,
      consumerSecret: GOOGLE_CONSUMER_SECRET,
      callbackURL: "http://www.example.com/auth/google/callback",
    },
    function (token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: "https://www.google.com/m8/feeds" })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
