function isValidNumber(x) {
  if (typeof x == "number" && !Number.isNaN(x)) {
    return true;
  } else {
    return false;
  }
}

function getLargestNumber(number1, number2, number3) {
  if (number1 >= number2) {
    if (number1 >= number3) {
      return number1;
    } else {
      return number3;
    }
  } else {
    //number2>number1
    if (number2 >= number3) {
      return number2;
    } else {
      return number3;
    }
  }
}

//main code
var number1 = +prompt("Enter Number 1", 10);
if (isValidNumber(number1)) {
  var number2 = +prompt("Enter Number 1", 20);
  if (isValidNumber(number2)) {
    var number3 = +prompt("Enter Number 1", 30);
    if (isValidNumber(number3)) {
      var largestNumber = getLargestNumber(number1, number2, number3);
      console.log(`Largest number is: ${largestNumber}`);
    } else {
      console.log("Invalid Number 3");
    }
  } else {
    console.log("Invalid Number 2");
  }
} else {
  console.log("Invalid Number 1");
}
