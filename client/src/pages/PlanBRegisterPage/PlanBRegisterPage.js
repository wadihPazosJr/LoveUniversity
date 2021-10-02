import { useState } from "react";
import ContactInfo from "../../components/ContactInfo/ContactInfo";
import SchoolInfo from "../../components/SchoolInfo/SchoolInfo";
import DatingInfo from "../../components/DatingInfo/DatingInfo";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Multiselect from "multiselect-react-dropdown";
import "./PlanBRegisterPage.css";

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
    age: 0,
    dob: "",
    gender: "",
  });

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

  const handleSubmit = () => {
    console.log(values);
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
    console.log(reqBody);
    axios
      .post("/user/create", reqBody)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          alert("Your application was approved! Please log in!");
          window.location.href = "/login";
        } else {
          if (res.data.exists) {
            alert(
              "You are already enrolled! Please log in with your existing account!"
            );
            window.location.href = "/login";
          } else {
            alert("Something went wrong, please try again.");
            window.location.reload();
          }
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="registerContainer">
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
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>email</Form.Label>
          <Form.Control
            required
            className="mb-4"
            type="email"
            placeholder="example@gmail.com"
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
        />

        <Form.Group className="mt-4" controlId="formBasicBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            required
            className="mb-4"
            type="textarea"
            placeholder="e.g. Hi, my name is John Doe. I love skateboarding!"
            className="mb-4"
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
            onChange={handleChange("dob")}
          />
        </Form.Group>

        <Button variant="danger" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default PlanBRegisterPage;
