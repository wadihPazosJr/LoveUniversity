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
  let totalScore = 0;
  for (i = 0; i < list1.length; i++) {
    for (j = 0; j < list2.length; j++) {
      counter = 0;
      while (list1[i] == list2[j]) {
        counter++;
        i++;
      }
      //Summation of the number of elements which are the same
      for (i = 0; i < counter; i++) {
        total += 3 * counter;
      }
    }
  }
};

const assignScoresAndSort = (
  arrayOfPeople,
  hobbiesArr,
  activitiesArr,
  age,
  bio,
  major
) => {
  arrayOfPeople.forEach((person) => {});
};

module.exports = { assignScoresAndSort };
