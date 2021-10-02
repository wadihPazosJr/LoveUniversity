function expectedScore(rating1, rating2) {
  let ratingDiff = rating1 - rating2;

  let exponent = ratingDiff / 400;

  return 1 / (1 + Math.pow(10, exponent));
}

function newRating(oldRating, k, s, expectedScore) {
  return Math.floor(oldRating + k * (s - expectedScore));
}

module.exports = { newRating };
