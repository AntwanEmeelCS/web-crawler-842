var maxScore = 100; //assumed based on the pass criteria is being half of max score

function isValidScore(x) {
  if (typeof x == "number" && !Number.isNaN(x) && x >= 0 && x <= maxScore) {
    return true;
  } else {
    return false;
  }
}

var score1 = +prompt(`Enter Score #1`, 63.94);
if (isValidScore(score1)) {
  var score2 = +prompt(`Enter Score #2`, 32.5);
  if (isValidScore(score2)) {
    var score3 = +prompt(`Enter Score #3`, 57.5);
    if (isValidScore(score3)) {
      var avg = ((score1 + score2 + score3) / 3).toFixed(2);
      var result = avg >= maxScore / 2 ? "Pass" : "Fail";
      console.log(`Average: ${avg}, Status: ${result}`);
    } else {
      console.log("Invalid Score #3");
    }
  } else {
    console.log("Invalid Score #2");
  }
} else {
  console.log("Invalid Score #1");
}
