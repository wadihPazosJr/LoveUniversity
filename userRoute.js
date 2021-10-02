require("dotenv").config();
const express = require("express");
const app = express();
let userCollection;

const { MongoClient } = require("mongodb");
const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

const { newRating } = require("./utilityFunction");

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  userCollection = client.db("love-university").collection("cmu");
});

console.log("Connected to MongoDB!");

app.post("/create", (req, res) => {
  let body = req.body;

  try {
    let result = userCollection.findOne({
      contactInfo: { email: profile._json.email },
    });
    if (!result) {
      userCollection.insertOne({
        name: body.name,
        contactInfo: {
          email: body.contactInfo.email,
          phone: body.contactInfo.phone,
        },
        schoolInfo: {
          university: body.schoolInfo.university,
          major: body.schoolInfo.major,
          activities: body.schoolInfo.activities,
          greek: body.schoolInfo.greek,
        },
        datingInfo: {
          elo: 1000,
          swipes: 0,
          hobbies: body.datingInfo.hobbies,
          bio: body.datingInfo.bio,
          orientation: body.datingInfo.orientation,
          age: body.datingInfo.age,
          dob: body.datingInfo.dob,
          activeMatches: [],
          rightSwipes: [],
          previousUsers: [],
        },
      });
      res.send({ success: true });
    } else {
      res.send({ success: false, exists: true });
    }
  } catch (err) {
    res.send({ success: false });
  }
});

//Update the user.
// app.patch("/update", (req, res) => {
//   try {
//     db.collection.findOneAndReplace(
//       { user_id: req.user_id },
//       { user: req.user }
//     );
//   } catch (err) {
//     console.log(err);
//     res.send({
//       sucess: false,
//     });
//   }
// });

//swipe
// app.patch("/swipe", (req, res) => {
//   //First determine the new ratings
//   let swiperId = req.user._id;

//   let swipedId = req.query.params.swipedId;

//   let rightSwipe = req.query.params.rightSwipe === "true";

//   let swiper = "";

//   let swiped = "";

//   let newSwiperRating = newRating(swiper.datingInfo.elo, "", rightSwipe ? k)

//   //Then determine if it is an official match and handle accordingly

//   // Tell client whether it is a new match or not and whether everything was a success or not
// });

module.exports = app;
