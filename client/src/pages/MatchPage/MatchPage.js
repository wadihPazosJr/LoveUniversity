import axios from "axios";
import { useEffect, useState } from "react";
import Swiper from "../../components/Swiper/Swiper";
import Spinner from "react-bootstrap/Spinner";

axios.defaults.baseURL = "http://localhost:5000";

function SwipePage(props) {
  const [state, setState] = useState({
    counter: 0,
    candidatesArr: [],
    loading: false,
  });

  const getTop10 = async () => {
    setState({ loading: true });
    await axios("/top10", { withCredentials: true }).then((res) => {
      setState({ candidatesArr: res.data.top10 });
      setState({ loading: false });
    });
  };

  useEffect(() => {
    getTop10();
  }, []);

  const handleLeftSwipe = () => {
    //Make api call to swipe
    axios
      .put(
        "/user/swipe",
        {
          params: {
            rightSwipe: "false",
            swipedId: state.candidatesArr[state.counter]._id,
          },
        },
        { withCredentials: true }
      )
      .catch((err) => console.log(err));
    //if counter is 10, update for the next 10, and get a loading animation or wtv.
    if (state.counter == 9) {
      setState({ counter: 0 });
      //update candidatesArr
    } else {
      let nextCounter = state.counter++;
      setState({ counter: nextCounter });
    }

    //otherwise just increment the counter
  };

  const handleRightSwipe = () => {
    //Make api call to swipe
    axios
      .put(
        "/user/swipe",
        {
          params: {
            rightSwipe: "true",
            swipedId: state.candidatesArr[state.counter]._id,
          },
        },
        { withCredentials: true }
      )
      .catch((err) => console.log(err));
    //if counter is 10, update for the next 10, and get a loading animation or wtv.
    if (state.counter == 9) {
      setState({ counter: 0 });
      //update candidatesArr
    } else {
      let nextCounter = state.counter++;
      setState({ counter: nextCounter });
    }

    //otherwise just increment the counter
  };

  return (
    <div>
      {/* <NavBar /> */}
      <Swiper
        name={state.candidatesArr[state.counter].name}
        university={state.candidatesArr[state.counter].schoolInfo.university}
        major={state.candidatesArr[state.counter].schoolInfo.major}
        hobbies={state.candidatesArr[state.counter].datingInfo.hobbies}
        greek={state.candidatesArr[state.counter].schoolInfo.greek}
        orientation={state.candidatesArr[state.counter].datingInfo.orientation}
        age={state.candidatesArr[state.counter].datingInfo.age}
        bio={state.candidatesArr[state.counter].datingInfo.bio}
      />
      <button onClick={handleLeftSwipe}>Left Swipe</button>
      <button onClick={handleRightSwipe}>Right Swipe</button>
    </div>
  );
}

export default SwipePage;
