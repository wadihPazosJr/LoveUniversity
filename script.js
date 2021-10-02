require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const MONGO_URI = process.env.MONGO_URI;
let userCollection;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  userCollection = client.db("love-university").collection("cmu");
});

console.log("Connected to MongoDB!");

const hobbies = [
  { name: "3D printing" },
  { name: "Amateur radio" },
  { name: "Scrapbook" },
  { name: "Amateur radio" },
  { name: "Acting" },
  { name: "Baton twirling" },
  { name: "Board games" },
  { name: "Book restoration" },
  { name: "Cabaret" },
  { name: "Calligraphy" },
  { name: "Candle making" },
  { name: "Computer programming" },
  { name: "Coffee roasting" },
  { name: "Cooking" },
  { name: "Colouring" },
  { name: "Cosplaying" },
  { name: "Couponing" },
  { name: "Creative writing" },
  { name: "Crocheting" },
  { name: "Cryptography" },
  { name: "Dance" },
  { name: "Digital arts" },
  { name: "Drama" },
  { name: "Drawing" },
  { name: "Do it yourself" },
  { name: "Electronics" },
  { name: "Embroidery" },
  { name: "Fashion" },
  { name: "Flower arranging" },
  { name: "Foreign language learning" },
  { name: "Gaming" },
  { name: "Tabletop games" },
  { name: "Role-playing games" },
  { name: "Gambling" },
  { name: "Genealogy" },
  { name: "Glassblowing" },
  { name: "Gunsmithing" },
  { name: "Homebrewing" },
  { name: "Ice skating" },
  { name: "Jewelry making" },
  { name: "Jigsaw puzzles" },
  { name: "Juggling" },
  { name: "Knapping" },
  { name: "Knitting" },
  { name: "Kabaddi" },
  { name: "Knife making" },
  { name: "Lacemaking" },
  { name: "Lapidary" },
  { name: "Leather crafting" },
  { name: "Lego building" },
  { name: "Lockpicking" },
  { name: "Machining" },
  { name: "Macrame" },
  { name: "Metalworking" },
  { name: "Magic" },
  { name: "Model building" },
  { name: "Listening to music" },
  { name: "Origami" },
  { name: "Painting" },
  { name: "Playing musical instruments" },
  { name: "Pet" },
  { name: "Poi" },
  { name: "Pottery" },
  { name: "Puzzles" },
  { name: "Quilting" },
  { name: "Reading" },
  { name: "Scrapbooking" },
  { name: "Sculpting" },
  { name: "Sewing" },
  { name: "Singing" },
  { name: "Sketching" },
  { name: "Soapmaking" },
  { name: "Sports" },
  { name: "Stand-up comedy" },
  { name: "Sudoku" },
  { name: "Table tennis" },
  { name: "Taxidermy" },
  { name: "Video gaming" },
  { name: "Watching movies" },
  { name: "Web surfing" },
  { name: "Whittling" },
  { name: "Wood carving" },
  { name: "Woodworking" },
  { name: "World Building" },
  { name: "Writing" },
  { name: "Yoga" },
  { name: "Yo-yoing" },
  { name: "Air sports" },
  { name: "Archery" },
  { name: "Astronomy" },
  { name: "Backpacking" },
  { name: "Base jumping" },
  { name: "Baseball" },
  { name: "Basketball" },
  { name: "Beekeeping" },
  { name: "Bird watching" },
  { name: "Blacksmithing" },
  { name: "Board sports" },
  { name: "Bodybuilding" },
  { name: "Brazilian jiu-jitsu" },
  { name: "Community" },
  { name: "Cycling" },
  { name: "Dowsing" },
  { name: "Driving" },
  { name: "Fishing" },
  { name: "Flag football" },
  { name: "Flying" },
  { name: "Flying disc" },
  { name: "Foraging" },
  { name: "Gardening" },
  { name: "Geocaching" },
  { name: "Ghost hunting" },
  { name: "Graffiti" },
  { name: "Handball" },
  { name: "Hiking" },
  { name: "Hooping" },
  { name: "Horseback riding" },
  { name: "Hunting" },
  { name: "Inline skating" },
  { name: "Jogging" },
  { name: "Kayaking" },
  { name: "Kite flying" },
  { name: "Kitesurfing" },
  { name: "Larping" },
  { name: "Letterboxing" },
  { name: "Metal detecting" },
  { name: "Motor sports" },
  { name: "Mountain biking" },
  { name: "Mountaineering" },
  { name: "Mushroom hunting" },
  { name: "Mycology" },
  { name: "Netball" },
  { name: "Nordic skating" },
  { name: "Orienteering" },
  { name: "Paintball" },
  { name: "Parkour" },
  { name: "Photography" },
  { name: "Polo" },
  { name: "Rafting" },
  { name: "Rappelling" },
  { name: "Rock climbing" },
  { name: "Roller skating" },
  { name: "Rugby" },
  { name: "Running" },
  { name: "Sailing" },
  { name: "Sand art" },
  { name: "Scouting" },
  { name: "Scuba diving" },
  { name: "Sculling" },
  { name: "Rowing" },
  { name: "Shooting" },
  { name: "Shopping" },
  { name: "Skateboarding" },
  { name: "Skiing" },
  { name: "Skim Boarding" },
  { name: "Skydiving" },
  { name: "Slacklining" },
  { name: "Snowboarding" },
  { name: "Stone skipping" },
  { name: "Surfing" },
  { name: "Swimming" },
  { name: "Taekwondo" },
  { name: "Tai chi" },
  { name: "Urban exploration" },
  { name: "Vacation" },
  { name: "Vehicle restoration" },
  { name: "Water sports" },
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
  let returnVal = [];

  let numberOfHobbies = Math.floor(Math.random() * 11);

  for (let i = 0; i < numberOfHobbies; i++);
  {
    let randomHobby = Math.floor(Math.random() * hobbies.length);

    while (returnVal.indexOf(hobbies[randomHobby]) !== -1) {
      randomHobby = Math.floor(Math.random() * hobbies.length);
    }

    returnVal.push(hobbies[randomHobby]);
  }

  return returnVal;
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
    returnVal.push(createRandomPerson());
  }

  return returnVal;
}

function addEveryone() {
  console.log("Starting to create random people");

  let randomPeople = createRandom500People();

  console.log("Adding everyone into the database now");

  userCollection.inserMany(randomPeople, function (err, res) {
    if (err) console.log(err);
    console.log("Number of documents inserted: " + res.insertedCount);
  });
}

function deleteEveryone() {
  userCollection.deleteMany({});
}

deleteEveryone();
