//DOES THIS EVEN WORK?
const calculateHobbiesOrActivitiesScore = (hobbies1, hobbies2) => {
  let count = 0;

  hobbies1.forEach((hobby) => {
    if (hobbies2.indexOf(hobby) !== -1) {
      count++;
    }
  });

  return count * 200;
};
//DOES THIS EVEN WORK?
const calculateAgeScore = (age1, age2) => {
  const age1tens = Math.floor(age1 / 10);

  const age2tens = Math.floor(age2 / 10);

  const multiplier =
    age1tens === age2tens ? age1tens : Math.floor((age1tens + age2tens) / 2);

  const ageCalculation = (400 / Math.abs(age1 - age2)) * multiplier;

  return ageCalculation > 400 ? 400 : Math.floor(ageCalculation);
};

//DOES THIS EVEN WORK?
const calculateBioScore = (string1, string2) => {
  let list1 = string1.split(" ");
  let list2 = string2.split(" ");
  let count = 0;
  list2.forEach((word) => {
    if (list1.indexOf(word) !== -1) {
      count += 5;
    }
  });
  return count;
};

const assignScores = (subject, newPotentialMatches) => {
  let clone = [...newPotentialMatches];

  clone.forEach((match) => {
    let ageScore = calculateAgeScore(
      subject.datingInfo.age,
      match.datingInfo.age
    );
    let bioScore = calculateBioScore(
      subject.datingInfo.bio,
      match.datingInfo.bio
    );
    let hobbiesScore = calculateHobbiesOrActivitiesScore(
      subject.datingInfo.hobbies,
      match.datingInfo.hobbies
    );

    match.compatibilityScore = ageScore + bioScore + hobbiesScore;
  });

  return clone;
};

module.exports = { assignScores };
