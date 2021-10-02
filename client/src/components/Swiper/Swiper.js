function Swiper(props) {
  const listActivitiesOrHobbies = (arr) => {
    let returnVal = "";
    arr.forEach((word) => (returnVal += `${word}, `));
    for (let i = 0; i < arr.length; i++) {
      if (i !== arr.length - 1) {
        returnVal += `${arr[i]}, `;
      } else {
        returnVal += arr[i];
      }
    }
    return returnVal;
  };

  return (
    <div className="card w-75 mt-5">
      <p className="card-title">{props.name}</p>
      <p className="card-text">{props.age} years old</p>
      <p className="card-text">Gender: {props.gender}</p>
      <p className="card-text">attends {props.university}</p>
      <p className="card-text">majors in {props.major}</p>
      <p className="card-text">
        Hobbies: {listActivitiesOrHobbies(props.hobbies)}
      </p>
      <p className="card-text">is a memeber of {props.greek}</p>
      <p className="card-text">Sexual orientation: {props.orientation}</p>
      <p className="card-text">Bio: {props.bio}</p>
    </div>
  );
}

export default Swiper;
// userCollection.insertOne({
//   name: body.name,
//   contactInfo: {
//     email: body.contactInfo.email,
//     phone: body.contactInfo.phone,
//   },
//   schoolInfo: {
//     university: body.schoolInfo.university,
//     major: body.schoolInfo.major,
//     activities: body.schoolInfo.activities,
//     greek: body.schoolInfo.greek,
//   },
//   datingInfo: {
//     elo: 1000,
//     swipes: 0,
//     hobbies: body.datingInfo.hobbies,
//     bio: body.datingInfo.bio,
//     orientation: body.datingInfo.orientation,
//     age: body.datingInfo.age,
//     dob: body.datingInfo.dob,
//     activeMatches: [],
//     rightSwipes: [],
//     previousUsers: [],
//   },
// });
