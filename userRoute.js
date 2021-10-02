require("dotenv").config();
const express = require("express");
const app = express();
let userCollection;

const { MongoClient } = require("mongodb");
let ObjectID = require("mongodb").ObjectID;
const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

const { newRating, assignScoresAndSort } = require("./utilityFunction");

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  userCollection = client.db("love-university").collection("cmu");
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

//swipe
app.put("/swipe", async (req, res) => {
  //assign to variables whether it was a left or right swipe, and get the id of the swiper and the swiped
  //If it was a right swipe, check if the other person already swiped right. if they did,
  //Then it should be taken off potential matches, moved to matches. and put on list of previous matches.
  //If the other person didn't right swipe on them, it should be added to their potential matches.

  // If it was a left swipe, check whether it came from a potential match, if it did take it off that and add to previous matches.
  // If it didn't come from a potential match, just add to previous people.

  //WHAT IF THEY GO THROUGH THE WHOLE TEAM?

  //ASIDE WHAT HAPPENS WHEN MATCHES ARE DONE W EACHOTHER?

  let rightSwipe = req.query.params.rightSwipe === "true";
  let swiperId = req.user._id;
  let swipedId = req.query.params.swipedId;

  let swiperToChange = { ...req.user };

  let swipedUser = await userCollection.findOne({
    _id: swipedId,
  });

  if (rightSwipe) {
    if (swipedUser.datingInfo.rightSwipes.indexOf(swiperId) !== -1) {
      //Add them to matches, take off from rightSwipes, Put them on the list of seen users.
      let indexOfRightSwipe =
        swipedUser.datingInfo.rightSwipes.indexOf(swiperId);

      swipedUser.datingInfo.rightSwipes.splice(indexOfRightSwipe, 1);

      swiperToChange.datingInfo.activeMatches.push(swipedId);
      swipedUser.datingInfo.activeMatches.push(swiperId);

      swiperToChange.datingInfo.previousUsers.push(swipedId);
      swipedUser.datingInfo.previousUsers.push(swiperId);
    } else {
      //add them to rightswipes for the swiper.
      swiperToChange.datingInfo.rightSwipes.push(swipedId);
    }
  } else {
    if (swipedUser.datingInfo.rightSwipes.indexOf(swiperId) !== -1) {
      //Take them off the swiped potential, and add to seen users.
      let indexOfRightSwipe =
        swipedUser.datingInfo.rightSwipes.indexOf(swiperId);
      swipedUser.datingInfo.rightSwipes.splice(indexOfRightSwipe, 1);
    }
    swiperToChange.datingInfo.previousUsers.push(swipedId);
    swipedUser.datingInfo.previousUsers.push(swiperId);
  }

  await userCollection.findOneAndUpdate({ _id: swiperId }, swiperToChange);
  await userCollection.findOneAndUpdate({ _id: swipedId }, swipedUser);

  res.send({ success: true });
});

app.get("/top10", async (req, res) => {
  //Two separate queryies.
  try {
    const userId = req.user._id;

    let top10 = [];

    //Get people who have potential matches with said person. 5

    const potentialMatchResults = await userCollection.find({
      "datingInfo.rightSwipes": { $in: [userId] },
    });

    let potentialLength = potentialMatchResults
      ? potentialMatchResults.length
      : 0;

    let fiveCount = 0;
    let index = 0;

    while (fiveCount < 5 && index < potentialLength) {
      top10.push(potentialMatchResults[index]);

      fiveCount++;
      index++;
    }

    let numOfElementsLeft = 10 - top10.length;

    //db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
    //DON'T FORGET TO GET SEXUAL ORIENTATION ONLY!!!!!!

    //Lets literally just query everyone idgaf

    let newPotentialMatches;

    if (req.user.datingInfo.orientation === "other") {
      newPotentialMatches = userCollection.find();
    } else {
      newPotentialMatches = userCollection.find({
        "datingInfo.orientation": req.user.datingInfo.orientation,
      });
    }

    //DO ALGORITHM HERE, SORT, from least to greatest, and just get that bitch

    let newPotentialMatchesScoresSorted = newPotentialMatches
      ? assignScoresAndSort(newPotentialMatches)
      : [];

    //Search for the element with the same id, and remove it so you don't always show up fist.

    let newPotentialLength = newPotentialMatchesScoresSorted.length;

    let userOreintation = req.user.datingInfo.orientation;
    let userGender = req.user.datingInfo.orientation;
    let userUndesiredGender = [];
    let userUndesiredOrientation = [];

    if (userOreintation === "homosexual") {
      if (userGender === "male") {
        userUndesiredGender = ["female", "other"];
        userUndesiredOrientation = ["heterosexual"];
      }
      if (userGender === "female") {
        userUndesiredGender = ["male", "other"];
        userUndesiredOrientation = ["hetersexual"];
      }
    }
    if (userOreintation === "hetersexual") {
      if (userGender === "male") {
        userUndesiredGender = ["male"];
      }
      if (userGender === "female") {
        userUndesiredGender = ["female"];
      }
    }
    if (userOreintation === "bisexual") {
      if (userGender === "male")
        userUndesiredOrientation = [["female", "homosexual"]];
      if (userGender === "female") {
        userUndesiredOrientation = [["male", "homosexual"]];
      }
    }

    //Finds a users desired gender and sexual orientation
    //BACKUKP ALGORITHM (DOESN'T REALLY WORK)
    /*
    let userOrientation = req.user.orientation;
    let userTargetGender = "both";
    let userTargetOrientation = "both";
    if (userOrientation === "homosexual") {
      userTargetOrientation = userOrientation;
      userTargetGender = req.user.gender;
    }
    if (userOrientation === "heterosexual") {
      userTargetOrientation = "heterosexual";
      if (req.user.datingInfo.gender === "male") {
        userTargetGender = "female";
      } else if (req.user.datingInfo.gender === "female") {
        userTargetGender = "male";
      }
      if (userOrientation === "bisexual") {
        //ADD FOR BISEXUAL DESIRED ORIENTATION AND GENDER

      }
    }
  */

    //Removes all users who dont match the desired gender and sexual orientation
    index = 0;
    newPotentialMatchesScoresSorted.forEach((person) => {
      if (
        userUndesiredGender.indcludes(person.datingInfo.gender) ||
        userUndesiredOrientation.includes(person.datingInfo.orientation) ||
        userUndesiredOrientation.includes([
          person.datingInfo.gender,
          person.datingInfo.orientation,
        ])
      ) {
        newPotentialMatchesScoresSorted.splice(index, 1);
      } else {
        index++;
      }
    });
    // let index2 = 0;
    // let index3 = 0;
    // while (index2 < numOfElementsLeft && index3 < newPotentialLength) {
    //   top10.push(newPotentialMatchesScoresSorted[index3]);
    //   index2++;
    //   index3++;
    // }

    res.send({ success: true, top10 });
  } catch (err) {
    res.send({ success: false });
  }
});

module.exports = app;
