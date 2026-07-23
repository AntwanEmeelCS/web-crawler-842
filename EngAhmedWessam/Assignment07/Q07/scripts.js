function isValidNumber(x) {
  if (typeof x == "number" && !Number.isNaN(x)) {
    return true;
  } else {
    return false;
  }
}

var number = +prompt("Enter a number to print its multiplication table");
if (isValidNumber(number)) {
  var message = "";
  for (var index = 1; index <= 10; index++) {
    message += `${number} x ${index} = ${number * index}` + "\n";
  }
  console.log(message);
} else {
  console.log("Invalid input number");
}
