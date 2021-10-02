import axios from "axios";
import { useEffect, useState } from "react";
import Swiper from "../../components/Swiper/Swiper";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
axios.defaults.baseURL = "http://localhost:5000";
// import logo from "./loveUniLogo.jpg";

function SwipePage(props) {
  const [state, setState] = useState({
    counter: 0,
    candidatesArr: [],
    loading: false,
  });

  const getTop10 = async () => {
    setState({ ...state, loading: true });
    await axios
      .get("/user/top10", { withCredentials: true })
      .then((res) => {
        setState({ candidatesArr: res.data.top10, loading: false, counter: 0 });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getTop10();
  }, []);

  const handleLeftSwipe = () => {
    //Make api call to swipe

    console.log(state.candidatesArr[state.counter]._id);
    axios
      .put("/user/swipe", null, {
        params: {
          rightSwipe: "false",
          swipedId: state.candidatesArr[state.counter]._id,
        },
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    //if counter is 10, update for the next 10, and get a loading animation or wtv.
    if (state.counter == 9) {
      getTop10();
      //update candidatesArr
    } else {
      setState({ ...state, counter: state.counter + 1 });
    }

    //otherwise just increment the counter
  };

  const handleRightSwipe = () => {
    //Make api call to swipe
    axios
      .put("/user/swipe", null, {
        params: {
          rightSwipe: "true",
          swipedId: state.candidatesArr[state.counter]._id,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.matched) {
          alert(
            `Congratulations, you matched! You should text them ;) \n\nPhone Number: ${res.data.number}`
          );
        }
      })
      .catch((err) => console.log(err));
    //if counter is 10, update for the next 10, and get a loading animation or wtv.
    if (state.counter == 9) {
      getTop10();
      //update candidatesArr
    } else {
      setState({ ...state, counter: state.counter + 1 });
    }

    //otherwise just increment the counter
  };

  if (state.candidatesArr.length === 0) {
    return <h1>Sorry you hvae no more people to swipe on</h1>;
  }

  return (
    <div className="matchContainer">
      <h1 className="fancyLogo text-center .fs-3 mt-5 text-danger">
        Love University
      </h1>

      <div className="matchContainer d-flex flex-row align-items-center">
        <Button
          variant="danger"
          onClick={handleLeftSwipe}
          className="mx-5 text-center"
        >
          Left Swipe
        </Button>

        {state.loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Swiper
            name={state.candidatesArr[state.counter].name}
            university={
              state.candidatesArr[state.counter].schoolInfo.university
            }
            major={state.candidatesArr[state.counter].schoolInfo.major}
            hobbies={state.candidatesArr[state.counter].datingInfo.hobbies}
            greek={state.candidatesArr[state.counter].schoolInfo.greek}
            orientation={
              state.candidatesArr[state.counter].datingInfo.orientation
            }
            age={state.candidatesArr[state.counter].datingInfo.age}
            bio={state.candidatesArr[state.counter].datingInfo.bio}
          />
        )}

        <Button
          variant="danger"
          onClick={handleRightSwipe}
          className="mx-5 text-center"
        >
          Right Swipe
        </Button>
      </div>
    </div>
  );
}

export default SwipePage;
