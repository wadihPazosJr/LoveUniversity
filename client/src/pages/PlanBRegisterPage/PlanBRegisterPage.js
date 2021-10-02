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
    step: 1,
    name: "",
    email: "",
    phone: "",
    university: "cmu",
    major: "",
    greek: "",
    hobbies: [],
    bio: "",
    orientation: "",
    age: 0,
    dob: "",
  });

  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedList, selectedItem);
    setValues({ hobbies: selectedList });
  };

  const onRemove = (selectedList, selectedItem) => {
    setValues({ hobbies: selectedList });
  };

  return (
    <div className="registerContainer">
      <Form className="card w-75">
        <p className="text-center fs-3 fw-bold">Registration Form</p>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" className="mb-4" placeholder="John Doe" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>email</Form.Label>
          <Form.Control
            className="mb-4"
            type="email"
            placeholder="example@gmail.com"
          />
        </Form.Group>

        <Form.Group controlId="formBasicNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            className="mb-4"
            type="text"
            placeholder="e.g. 123-123-1234"
          />
        </Form.Group>

        <Form.Group controlId="formBasicUni">
          <Form.Label>University</Form.Label>
          <Form.Control
            type="text"
            className="mb-4"
            placeholder="e.g. Carnegie Mellon University"
          />
        </Form.Group>

        <Form.Group controlId="formBasicMajor">
          <Form.Label>Major</Form.Label>
          <Form.Control
            className="mb-4"
            type="text"
            placeholder="e.g. Biochemistry"
          />
        </Form.Group>

        <Form.Group controlId="formBasicGreek">
          <Form.Label>Greek Life</Form.Label>
          <Form.Select className="mb-4" aria-label="greek">
            <option>Are you involved in greek life?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Form.Select>
        </Form.Group>

        {/* Hobbies search bar goes here */}
        <Form.Label>Hobbies</Form.Label>
        <Multiselect
          options={hobbies}
          // onSelect={onSelect}
          // onRemove={onRemove}
          displayValue="name"
        />

        <Form.Group className="mt-4" controlId="formBasicBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            className="mb-4"
            type="textarea"
            placeholder="e.g. Hi, my name is John Doe. I love skateboarding!"
            className="mb-4"
          />
        </Form.Group>

        <Form.Group controlId="formBasicOrientation">
          <Form.Label>Sexual Orientation</Form.Label>
          <Form.Select className="mb-4" aria-label="orientation">
            <option>What sexual orientation do you identify with?</option>
            <option value="heterosexual">Hetersexual</option>
            <option value="homoseual">Homosexual</option>
            <option value="bisexual">Bisexual</option>
            <option className="mb-4" value="other">
              Other
            </option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            className="mb-4"
            type="number"
            placeholder="18"
            className="mb-4"
          />
        </Form.Group>

        <Form.Group controlId="formBasicAge">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            className="mb-4"
            type="date"
            placeholder="01/01/2002"
            className="mb-4"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default PlanBRegisterPage;
