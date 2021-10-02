import axios from "axios";
import { useState } from "react";
import Swiper from "../../components/Swiper/Swiper";

function SwipePage(props) {
  const [state, setState] = useState({
    counter: 0,
    candidatesArr: [],
  });

  const handleLeftSwipe = () => {
    //Make api call to swipe
    axios.put("/user/swipe", {
      params: {
        rightSwipe: "false",
        swipedId: state.candidatesArr[state.counter]._id,
      },
    });
    //if counter is 10, update for the next 10, and get a loading animation or wtv.
    if (this.state.counter == 9) {
      this.setState({ counter: 0 });
      //update candidatesArr
    } else {
      let nextCounter = this.state.counter++;
      this.setState({ counter: nextCounter });
    }

    //otherwise just increment the counter
  };

  return (
    <>
      <Swiper
        name={this.state.candidatesArr[counter].name}
        university={this.state.candidatesArr[counter].schoolInfo.university}
        major={this.state.candidatesArr[counter].schoolInfo.major}
        hobbies={this.state.candidatesArr[counter].datingInfo.hobbies}
        greek={this.state.candidatesArr[counter].schoolInfo.greek}
        orientation={this.state.candidatesArr[counter].datingInfo.orientation}
        age={this.state.candidatesArr[counter].datingInfo.age}
        bio={this.state.candidatesArr[counter].datingInfo.bio}
      />
      <button onClick={handleLeftSwipe}>Left Swipe</button>
      <button onClick={handleRightSwipe}>Right Swipe</button>
    </>
  );
}

export default SwipePage;
