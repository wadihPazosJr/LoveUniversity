import { useState } from "react";
import ContactInfo from "../../components/ContactInfo/ContactInfo";
import SchoolInfo from "../../components/SchoolInfo/SchoolInfo";
import DatingInfo from "../../components/DatingInfo/DatingInfo";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

function RegisterPage(props) {
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

  const prevStep = () => {
    const { step } = values;
    setValues({ step: step - 1 });
  };

  const nextStep = () => {
    const { step } = values;
    setValues({ step: step + 1 });
  };

  const handleChange = (input) => (e) => {
    console.log(input);
    console.log(e);

    setValues({ [input]: e.target.value });
  };

  const handleSubmit = () => {};

  switch (values.step) {
    case 1:
      return (
        <ContactInfo
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
        />
      );
    case 2:
      return (
        <SchoolInfo
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
        />
      );
    case 3:
      return (
        <div>
          <DatingInfo
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            values={values}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      );
    default:
  }
}

export default RegisterPage;
