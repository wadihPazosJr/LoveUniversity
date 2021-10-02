import { useState, useEffect } from "react";
import ContactInfo from "../../components/ContactInfo/ContactInfo";
import SchoolInfo from "../../components/SchoolInfo/SchoolInfo";
import DatingInfo from "../../components/DatingInfo/DatingInfo";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Multiselect from "multiselect-react-dropdown";
import "./ProfilePage.css";

axios.defaults.baseURL = "http://localhost:5000";

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

hobbies.map((el, i) => (el.id = i));

function PlanBRegisterPage(props) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    major: "",
    greek: "",
    hobbies: [],
    bio: "",
    orientation: "",
    age: "",
    dob: "",
    gender: "",
  });

  const getData = async () => {
    await axios
      .get("/user/currentUser", { withCredentials: true })
      .then((res) => {
        console.log("got a response");
        console.log(res);
        setValues({
          name: res.data.name,
          email: res.data.contactInfo.email,
          phone: res.data.contactInfo.phone,
          university: res.data.schoolInfo.university,
          major: res.data.schoolInfo.major,
          greek: res.data.schoolInfo.greek,
          hobbies: res.data.datingInfo.hobbies,
          bio: res.data.datingInfo.bio,
          orientation: res.data.datingInfo.orientation,
          age: res.data.datingInfo.age,
          dob: res.data.datingInfo.dob,
          gender: res.data.datingInfo.gender,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("hit use effect");
    getData();
    console.log("finished response");
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (input) => (e) => {
    let oldValues = { ...values };
    oldValues[input] = e.target.value;
    setValues(oldValues, console.log(values));
  };
  const onSelect = (selectedList, selectedItem) => {
    const hobbiesList = selectedList.map((el) => el.name);
    let oldValues = { ...values };
    oldValues.hobbies = hobbiesList;
    setValues(oldValues, console.log(values));
  };

  const onRemove = (selectedList, selectedItem) => {
    const hobbiesList = selectedList.map((el) => el.name);
    let oldValues = { ...values };
    oldValues.hobbies = hobbiesList;
    setValues(oldValues, console.log(values));
  };

  const displayHobbies = () => {
    let result = [];
    for (let userHobby of values.hobbies) {
      result.push(
        hobbies.find((el) => {
          return el.name === userHobby;
        })
      );
    }

    return result;

    // let arrOfIndex = []

    // values.hobbies.forEach(hobby => {
    //   let possibleFind = hobbies.find(element => element.)
    // })
  };

  const handleEditButton = () => {
    setIsEditing(!isEditing);
    console.log(displayHobbies());
  };

  const handleSubmit = () => {
    let reqBody = {
      name: values.name,
      contactInfo: {
        email: values.email,
        phone: values.phone,
      },
      schoolInfo: {
        university: values.university,
        major: values.major,
        greek: values.greek,
      },
      datingInfo: {
        hobbies: values.hobbies,
        bio: values.bio,
        orientation: values.orientation,
        age: values.age,
        dob: values.dob,
        gender: values.gender,
      },
    };
    axios
      .put("/user/update", reqBody, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          window.location.reload();
        } else {
          alert("Something went wrong, please try again later.");
          window.location.reload();
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="registerContainer">
      {isEditing ? (
        <Form className="card w-75">
          <p className="text-center fs-3 fw-bold">Registration Form</p>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              onChange={handleChange("name")}
              type="name"
              className="mb-4"
              placeholder="John Doe"
              value={values.name}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              className="mb-4"
              type="email"
              placeholder="example@gmail.com"
              value={values.email}
              onChange={handleChange("email")}
            />
          </Form.Group>

          <Form.Group controlId="formBasicNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              className="mb-4"
              type="text"
              placeholder="e.g. 123-123-1234"
              value={values.phone}
              onChange={handleChange("phone")}
            />
          </Form.Group>

          <Form.Group controlId="formBasicUni">
            <Form.Label>University</Form.Label>
            <Form.Select
              aria-label="University"
              className="mb-4"
              required
              onChange={handleChange("university")}
              value={values.university}
            >
              <option>Select your university</option>
              <option value="cmu">Carnegie Mellon University</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formBasicMajor">
            <Form.Label>Major</Form.Label>
            <Form.Control
              required
              className="mb-4"
              type="text"
              placeholder="e.g. Biochemistry"
              value={values.major}
              onChange={handleChange("major")}
            />
          </Form.Group>

          <Form.Group controlId="formBasicGreek">
            <Form.Label>Greek Life</Form.Label>
            <Form.Control
              className="mb-4"
              type="text"
              placeholder="e.g. Sigma Alpha Epsilon"
              onChange={handleChange("greek")}
              value={values.greek}
            />
          </Form.Group>

          {/* Hobbies search bar goes here */}
          <Form.Label>Hobbies</Form.Label>
          <Multiselect
            required
            options={hobbies}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            selectedValues={displayHobbies()}
          />

          <Form.Group className="mt-4" controlId="formBasicBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              required
              className="mb-4"
              type="textarea"
              placeholder="e.g. Hi, my name is John Doe. I love skateboarding!"
              className="mb-4"
              value={values.bio}
              onChange={handleChange("bio")}
            />
          </Form.Group>

          <Form.Group controlId="formBasicGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              required
              onChange={handleChange("gender")}
              className="mb-4"
              aria-label="gender"
              value={values.gender}
              onChange={handleChange("gender")}
            >
              <option>What gender do you identify as?</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option className="mb-4" value="other">
                Other
              </option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formBasicOrientation">
            <Form.Label>Sexual Orientation</Form.Label>
            <Form.Select
              required
              onChange={handleChange("orientation")}
              className="mb-4"
              value={values.orientation}
              aria-label="orientation"
            >
              <option>What sexual orientation do you identify with?</option>
              <option value="heterosexual">Hetersexual</option>
              <option value="homosexual">Homosexual</option>
              <option value="bisexual">Bisexual</option>
              <option className="mb-4" value="other">
                Other
              </option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              required
              className="mb-4"
              type="number"
              placeholder="18"
              className="mb-4"
              value={values.age}
              onChange={handleChange("age")}
            />
          </Form.Group>

          <Form.Group controlId="formBasicAge">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              required
              className="mb-4"
              type="date"
              placeholder="01/01/2002"
              className="mb-4"
              value={values.dob}
              onChange={handleChange("dob")}
            />
          </Form.Group>

          <Button variant="danger" onClick={handleSubmit}>
            Update
          </Button>
        </Form>
      ) : (
        <div className="staticForm card w-75 mt-3">
          <p className="text-center fs-3 my-3 fw-bold">Your Profile</p>
          <Button
            variant="danger"
            className="w-100 text-center"
            onClick={handleEditButton}
          >
            Edit
          </Button>
          <Form.Label className="mt-5">Name</Form.Label>
          <div className="rounded card-body text-white bg-secondary">
            {values.name}
          </div>

          <Form.Label className="mt-4">Email</Form.Label>
          <div className="rounded card-body text-white bg-secondary">
            {values.email}
          </div>

          <Form.Label className="mt-4">Phone Number</Form.Label>
          <div className="rounded card-body text-white bg-secondary">
            {values.phone}
          </div>

          <Form.Label className="mt-4">University</Form.Label>
          <div className="rounded card-body text-white bg-secondary">
            {values.university}
          </div>

          <Form.Label className="mt-4">Major</Form.Label>
          <div className="rounded card-body text-white bg-secondary">
            {values.major}
          </div>

          <Form.Label className="mt-4">Greek Life</Form.Label>
          <div className="rounded card-body text-white bg-secondary">
            {values.greek}
          </div>

          <Form.Label className="mt-4">Hobbies</Form.Label>
          <div className="rounded card-body text-white bg-secondary">
            <ul>
              {values.hobbies.map((el, i) => {
                return <li key={i}>{el}</li>;
              })}
            </ul>
          </div>

          <Form.Label className="mt-4">Bio</Form.Label>
          <div className="rounded card-body text-white bg-secondary">
            {values.bio}
          </div>

          <Form.Label className="mt-4">Gender</Form.Label>
          <div className="rounded card-body text-white bg-secondary">
            {values.gender}
          </div>

          <Form.Label className="mt-4">Sexual Orientation</Form.Label>
          <div className="rounded card-body text-white bg-secondary">
            {values.orientation}
          </div>

          <Form.Label className="mt-4">Age</Form.Label>
          <div className="rounded card-body text-white bg-secondary">
            {values.age}
          </div>

          <Form.Label className="mt-4">Date of Birth</Form.Label>
          <div className="rounded card-body text-white bg-secondary">
            {values.dob}
          </div>
        </div>
      )}
    </div>
  );
}
export default PlanBRegisterPage;
