function isValidNumber(x) {
  if (typeof x == "number" && !Number.isNaN(x) && x >= 0 && x <= 170) {
    return true;
  } else {
    return false;
  }
}

function getFactorial(number) {
  if (isValidNumber) {
    if (number == 0) {
      return 1;
    } else {
      var result = 1;
      for (var index = 1; index <= number; index++) {
        result *= index;
      }
      return result;
    }
  } else {
    return -1;
  }
}

var number = 5;
var result = getFactorial(number);

//console.log(result);

if (result > 0) {
  console.log(result);
} else {
  console.log(
    "Invalid Input Value. Should be a positive number less that 170 for the range of type number",
  );
}
