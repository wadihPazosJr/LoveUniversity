require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const MONGO_URI = process.env.MONGO_URI;
let userCollection;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ObjectID = require("mongodb").ObjectID;

const hobbies = [
  "3D printing",
  "Amateur radio",
  "Scrapbook",
  "Amateur radio",
  "Acting",
  "Baton twirling",
  "Board games",
  "Book restoration",
  "Cabaret",
  "Calligraphy",
  "Candle making",
  "Computer programming",
  "Coffee roasting",
  "Cooking",
  "Colouring",
  "Cosplaying",
  "Couponing",
  "Creative writing",
  "Crocheting",
  "Cryptography",
  "Dance",
  "Digital arts",
  "Drama",
  "Drawing",
  "Do it yourself",
  "Electronics",
  "Embroidery",
  "Fashion",
  "Flower arranging",
  "Foreign language learning",
  "Gaming",
  "Tabletop games",
  "Role-playing games",
  "Gambling",
  "Genealogy",
  "Glassblowing",
  "Gunsmithing",
  "Homebrewing",
  "Ice skating",
  "Jewelry making",
  "Jigsaw puzzles",
  "Juggling",
  "Knapping",
  "Knitting",
  "Kabaddi",
  "Knife making",
  "Lacemaking",
  "Lapidary",
  "Leather crafting",
  "Lego building",
  "Lockpicking",
  "Machining",
  "Macrame",
  "Metalworking",
  "Magic",
  "Model building",
  "Listening to music",
  "Origami",
  "Painting",
  "Playing musical instruments",
  "Pet",
  "Poi",
  "Pottery",
  "Puzzles",
  "Quilting",
  "Reading",
  "Scrapbooking",
  "Sculpting",
  "Sewing",
  "Singing",
  "Sketching",
  "Soapmaking",
  "Sports",
  "Stand-up comedy",
  "Sudoku",
  "Table tennis",
  "Taxidermy",
  "Video gaming",
  "Watching movies",
  "Web surfing",
  "Whittling",
  "Wood carving",
  "Woodworking",
  "World Building",
  "Writing",
  "Yoga",
  "Yo-yoing",
  "Air sports",
  "Archery",
  "Astronomy",
  "Backpacking",
  "Base jumping",
  "Baseball",
  "Basketball",
  "Beekeeping",
  "Bird watching",
  "Blacksmithing",
  "Board sports",
  "Bodybuilding",
  "Brazilian jiu-jitsu",
  "Community",
  "Cycling",
  "Dowsing",
  "Driving",
  "Fishing",
  "Flag football",
  "Flying",
  "Flying disc",
  "Foraging",
  "Gardening",
  "Geocaching",
  "Ghost hunting",
  "Graffiti",
  "Handball",
  "Hiking",
  "Hooping",
  "Horseback riding",
  "Hunting",
  "Inline skating",
  "Jogging",
  "Kayaking",
  "Kite flying",
  "Kitesurfing",
  "Larping",
  "Letterboxing",
  "Metal detecting",
  "Motor sports",
  "Mountain biking",
  "Mountaineering",
  "Mushroom hunting",
  "Mycology",
  "Netball",
  "Nordic skating",
  "Orienteering",
  "Paintball",
  "Parkour",
  "Photography",
  "Polo",
  "Rafting",
  "Rappelling",
  "Rock climbing",
  "Roller skating",
  "Rugby",
  "Running",
  "Sailing",
  "Sand art",
  "Scouting",
  "Scuba diving",
  "Sculling",
  "Rowing",
  "Shooting",
  "Shopping",
  "Skateboarding",
  "Skiing",
  "Skim Boarding",
  "Skydiving",
  "Slacklining",
  "Snowboarding",
  "Stone skipping",
  "Surfing",
  "Swimming",
  "Taekwondo",
  "Tai chi",
  "Urban exploration",
  "Vacation",
  "Vehicle restoration",
  "Water sports",
];

let randomString =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

let stringArr = randomString.split(" ");

function randomName() {
  var firstname = ["John", "Naruto", "Luffy", "Natasha", "Danny"];
  var lastname = ["Wick", "Uzumaki", "Monkey", "Romanof", "Phantom"];
  var rand_first = Math.floor(Math.random() * firstname.length);
  var rand_last = Math.floor(Math.random() * lastname.length);
  let chosenFirst = firstname[rand_first];
  let chosenLast = lastname[rand_last];

  return `${chosenFirst} ${chosenLast}`;
}

function chooseRandomHobbies() {
  // Shuffle array
  const shuffled = hobbies.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let random = shuffled.slice(0, 10);
  return random;
}

function randomEmail() {
  return `${uuidv4()}@andrew.cmu.edu`;
}

function randomPhone() {
  return Math.floor(Math.random() * 1000000000).toString();
}

function randomMajor() {
  const majors = [
    "Computer Science",
    "Electrical Engineering",
    "Art",
    "English",
    "Mechanical Engineering",
    "Biomedical Engineering",
  ];

  let randomIndex = Math.floor(Math.random() * majors.length);
  return majors[randomIndex];
}

function randomGreek() {
  return Math.floor(Math.random() * 2) === 0 ? "AEPI" : "KAPPA";
}

function randomOrientation() {
  const orientations = ["other", "heterosexual", "homosexual", "bisexual"];

  let randomIndex = Math.floor(Math.random() * orientations.length);

  return orientations[randomIndex];
}

function randomBio() {
  let bio = "";

  let randomWordCount = Math.floor(Math.random() * (stringArr.length / 2));

  for (let i = 0; i < randomWordCount; i++) {
    let randomWordIndex = Math.floor(Math.random() * stringArr.length);
    bio += stringArr[randomWordIndex];
  }

  return bio;
}

function randomGender() {
  let randomNum = Math.floor(Math.random() * 3);

  if (randomNum == 1) return "male";
  else if (randomNum == 2) return "male";
  else return "other";
}

function createRandomPerson() {
  return {
    name: randomName(),
    contactInfo: {
      email: randomEmail(),
      phone: randomPhone(),
    },
    schoolInfo: {
      university: "Carnegie Mellon University",
      major: randomMajor(),
      greek: randomGreek(),
    },
    datingInfo: {
      hobbies: chooseRandomHobbies(),
      bio: randomBio(),
      orientation: randomOrientation(),
      age: (Math.floor(Math.random() * 20) + 18).toString(),
      dob: "2002-12-10",
      gender: randomGender(),
      activeMatches: [],
      rightSwipes: [],
      previousUsers: [],
    },
  };
}

function createRandom500People() {
  let returnVal = [];

  for (let i = 0; i < 500; i++) {
    let randomPerson = createRandomPerson();
    if (i < 5)
      randomPerson.datingInfo.rightSwipes.push(
        new ObjectID("6158e8a6dfbf20e631f08b57")
      );
    returnVal.push(randomPerson);
  }

  return returnVal;
}

function addEveryone() {
  console.log("Starting to create random people");

  let randomPeople = createRandom500People();

  console.log("Adding everyone into the database now");

  userCollection.insertMany(randomPeople, function (err, res) {
    if (err) console.log(err);
    console.log("Number of documents inserted: " + res.insertedCount);
  });
}

function deleteEveryone() {
  userCollection.deleteMany({});
}

const start = async () => {
  await client.connect(async (err) => {
    userCollection = await client.db("love-university").collection("cmu");
    console.log("Connected to MongoDB!");
    addEveryone();
  });
};

start();
