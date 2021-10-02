import axios from "axios";

function ProfilePage(props) {
  const getProfileData = async () => {
    const data = await axios.get("/user/currentUser");
    console.log(data);
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
          options={hobbies} // Don't hit enter
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

export default ProfilePage;
