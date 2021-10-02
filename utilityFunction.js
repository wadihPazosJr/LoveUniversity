const calculateHobbiesOrActivitiesScore = (hobbies1, hobbies2) => {
  let count = 0;

  hobbies1.foreach((hobby) => {
    if (hobbies2.indexOf(hobby) !== -1) {
      count++;
    }
  });
};

const calculateAgeScore = (age1, age2) => {
  const age1tens = Math.floor(age1 / 10);

  const age2tens = Math.floor(age2 / 10);

  const multiplier =
    age1tens === age2tens ? age1tens : Math.floor((age1tens + age2tens) / 2);

  const ageCalculation = (400 / Math.abs(age1 - age2)) * multiplier;

  return ageCalculation > 400 ? 400 : Math.floor(ageCalculation);
};

const calculateBioScore = (string1, string2) => {
  let list1 = string1.split(" ");
  let list2 = string2.split(" ");
  let counter = 0;
  let total = 0;
  for (i = 0; i < list1.length; i++) {
    for (j = 0; j < list2.length; j++) {
      counter = 0;
      while (list1[i] == list2[j]) {
        counter++;
        i++;
        j++;
        if (i >= list1.length || j >= list2.length) {
          break;
        }
      }
      //Summation of the number of elements which are the same
      for (i = 0; i < counter; i++) {
        total += 3 * counter;
      }
    }
  }
  return total;
};

const assignScoresAndSort = (
  arrayOfPeople,
  hobbiesArr,
  activitiesArr,
  age,
  bio,
  major
) => {
  arrayOfPeople.forEach((p1) => {
    arrayOfPeople.forEach((p2) => {
      if (p1 != p2) {
        let compatabilityScore = 0;
        compatabilityScore += calculateHobbiesOrActivitiesScore(
          p1.datingInfo.hobbies,
          p2.datingInfo.hobbies
        );
        compatabilityScore += calculateHobbiesOrActivitiesScore(
          p1.schoolInfo.activities,
          p2.schoolInfo.activities
        );
        compatabilityScore += calculateAgeScore(
          p1.datingInfo.age,
          p2.datingInfo.age
        );
        compatabilityScore += calculateBioScore(
          p1.datingInfo.bio,
          p2.datingInfo.bio
        );
        p2.compatabilityScore = compatabilityScore;
      }
    });
  });
};

module.exports = { assignScoresAndSort };
