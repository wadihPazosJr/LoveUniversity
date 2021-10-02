require("dotenv").config();
const express = require("express");
const app = express();
let userCollection;

const { MongoClient } = require("mongodb");
let ObjectID = require("mongodb").ObjectID;
const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

const { assignScores } = require("./utilityFunction");

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("Connected to MongoDB!");

app.get("/currentUser", (req, res) => {
  console.log("hit this");
  console.log(req.user);
  res.send(req.user);
});

//Dis call works
app.post("/create", async (req, res) => {
  let body = req.body;

  try {
    let result = await userCollection.findOne({
      "contactInfo.email": body.contactInfo.email,
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
          greek: body.schoolInfo.greek,
        },
        datingInfo: {
          hobbies: body.datingInfo.hobbies,
          bio: body.datingInfo.bio,
          orientation: body.datingInfo.orientation,
          age: body.datingInfo.age,
          dob: body.datingInfo.dob,
          gender: body.datingInfo.gender,
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
//NEEDS REVIEW FIX THIS
app.put("/update", async (req, res) => {
  try {
    await userCollection.findOneAndReplace(
      { _id: new ObjectID(req.user._id) },
      req.body
    );
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.send({
      sucess: false,
    });
  }
});

app.put("/swipe", async (req, res) => {
  let rightSwipe = req.query.rightSwipe === "true";
  let swiperId = req.user._id;
  let swipedId = req.query.swipedId;

  let swiperToChange = { ...req.user };

  let swipedUser = await userCollection.findOne({
    _id: new ObjectID(swipedId),
  });

  let matched = false;
  if (rightSwipe) {
    if (
      swipedUser.datingInfo.rightSwipes.filter(
        (id) => id.toString() === swiperId.toString()
      ).length > 0
    ) {
      //Add them to matches, take off from rightSwipes, Put them on the list of seen users.
      let indexOfRightSwipe = swipedUser.datingInfo.rightSwipes.findIndex(
        (id) => id.toString() === swiperId.toString()
      );

      swipedUser.datingInfo.rightSwipes.splice(indexOfRightSwipe, 1);

      if (!swiperToChange.datingInfo.activeMatches) {
        swiperToChange.datingInfo.activeMatches = [];
      }

      swiperToChange.datingInfo.activeMatches.push(swipedId);
      swipedUser.datingInfo.activeMatches.push(swiperId);

      if (!swiperToChange.datingInfo.previousUsers) {
        swiperToChange.datingInfo.previousUsers = [];
      }
      swiperToChange.datingInfo.previousUsers.push(swipedId);
      swipedUser.datingInfo.previousUsers.push(swiperId);

      matched = true;
    } else {
      //add them to rightswipes for the swiper.
      if (!swiperToChange.datingInfo.rightSwipes) {
        swiperToChange.datingInfo.rightSwipes = [];
      }
      swiperToChange.datingInfo.rightSwipes.push(swipedId);
    }
  } else {
    if (
      swipedUser.datingInfo.rightSwipes.filter(
        (id) => id.toString() === swiperId.toString()
      ).length > 0
    ) {
      //Take them off the swiped potential, and add to seen users.
      let indexOfRightSwipe = swipedUser.datingInfo.rightSwipes.findIndex(
        (id) => id.toString() === swiperId.toString()
      );
      swipedUser.datingInfo.rightSwipes.splice(indexOfRightSwipe, 1);
    }
    if (!swiperToChange.datingInfo.previousUsers) {
      swiperToChange.datingInfo.previousUsers = [];
    }
    if (!swipedUser.datingInfo.previousUsers) {
      swipedUser.datingInfo.previousUsers = [];
    }
    swiperToChange.datingInfo.previousUsers.push(swipedId);
    swipedUser.datingInfo.previousUsers.push(swiperId);
  }

  await userCollection.updateOne(
    { _id: swiperId },
    {
      $set: {
        datingInfo: swiperToChange.datingInfo,
      },
    }
  );
  await userCollection.updateOne(
    { _id: new ObjectID(swipedId) },
    {
      $set: {
        datingInfo: swipedUser.datingInfo,
      },
    }
  );

  if (matched) {
    res.send({
      success: true,
      matched,
      number: swipedUser.contactInfo.phone,
    });
  } else {
    res.send({
      success: true,
      matched: false,
    });
  }
});

app.get("/top10", async (req, res) => {
  // First to check to see if anyone has any matches with people and add them to list. Add to completion up to 10.

  let returnVal = [];

  let peopleWhoRightSwipe = await userCollection
    .find({
      "datingInfo.rightSwipes": req.user._id,
    })
    .toArray();

  // Based on orientation, pull a specific list of data and gender (filling in the rest)

  let countOfPeopleWhoRightSwipeInserted = 0;

  while (
    countOfPeopleWhoRightSwipeInserted < 10 &&
    countOfPeopleWhoRightSwipeInserted < peopleWhoRightSwipe.length
  ) {
    returnVal.push(peopleWhoRightSwipe[countOfPeopleWhoRightSwipeInserted]);
    countOfPeopleWhoRightSwipeInserted++;
  }

  let potentialOtherMatches = [];
  if (req.user.datingInfo.orientation === "homosexual") {
    // CASE 1) GAY -> SAME GENDER AND GAY
    try {
      potentialOtherMatches = await userCollection
        .find({
          $and: [
            { "datingInfo.gender": req.user.datingInfo.gender },
            { "datingInfo.orientation": req.user.datingInfo.orientation },
            { _id: { $nin: req.user.datingInfo.previousUsers } },
            { _id: { $ne: req.user._id } },
          ],
        })
        .toArray();
    } catch (error) {
      console.error(error);
    }
  } else if (req.user.datingInfo.orientation === "heterosexual") {
    // CASE 2) STRAIGHT -> NOT GENDER AND (STRAIGHT OR BI)
    try {
      potentialOtherMatches = await userCollection
        .find({
          $and: [
            { "datingInfo.gender": { $ne: req.user.datingInfo.gender } },
            { _id: { $nin: req.user.datingInfo.previousUsers } },
            {
              $or: [
                { "datingInfo.orientation": req.user.datingInfo.orientation },
                { "datingInfo.orientation": "bisexual" },
              ],
            },
          ],
        })
        .toArray();
    } catch (err) {
      console.error(err);
    }
  } else {
    // CASE 3) BI -> EVERYONE
    potentialOtherMatches = await userCollection
      .find({
        $and: [
          { _id: { $ne: req.user._id } },
          { _id: { $nin: req.user.datingInfo.previousUsers } },
        ],
      })
      .toArray();
  }

  // Alter the array of that people, add a field called compatability score to all of them, so calulate for all.
  let potentialMatchesScores = assignScores(req.user, potentialOtherMatches);

  // Order from greatest to least
  let sortedArr = potentialMatchesScores.sort(
    (firstItem, secondItem) =>
      secondItem.compatibilityScore - firstItem.compatibilityScore
  );
  let newSlice = sortedArr.slice(0, 10 - returnVal.length);
  newSlice.forEach((slice) => returnVal.push(slice));
  // Return top 10
  res.send({ success: true, top10: returnVal });
});

client.connect((err) => {
  userCollection = client.db("love-university").collection("cmu");
});

module.exports = app;
