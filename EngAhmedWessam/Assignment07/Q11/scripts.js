function isValidNumber(x) {
  if (typeof x == "number" && !Number.isNaN(x)) {
    return true;
  } else {
    return false;
  }
}

var number1 = +prompt("Enter Number 1", 50);
if (isValidNumber(number1)) {
  var number2 = +prompt("Enter Number 2", 100);
  if (isValidNumber(number2)) {
    // console.log(`Number 1: ${number1}`);
    // console.log(`Number 2: ${number2}`);

    console.log(`After Swapping: num1=${number2}, num2=${number1}`);
  } else {
    console.log("Invalid Number 2");
  }
} else {
  console.log("Invalid Number 1");
}
