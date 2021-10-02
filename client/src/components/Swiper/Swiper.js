function Swiper(props) {
  const listActivitiesOrHobbies = (arr) => {
    let returnVal = "";
    arr.forEach((word) => (returnVal += `${word}, `));
    return returnVal;
  };

  return (
    <div>
      <h1>{props.name}</h1>
      <h1>{props.university}</h1>
      <h1>{props.major}</h1>
      <h1>{listActivitiesOrHobbies(props.hobbies)}</h1>
      <h1>{props.greek}</h1>
      <h1>{props.orientation}</h1>
      <h1>{props.age}</h1>
      <p>{props.bio}</p>
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
