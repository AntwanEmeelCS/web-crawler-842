function isValidNumber(x) {
  if (typeof x == "number" && !Number.isNaN(x)) {
    return true;
  } else {
    return false;
  }
}

var number1 = +prompt("Enter Number 1");

if (isValidNumber(number1)) {
  var number2 = +prompt("Enter Number 2");
  if (isValidNumber(number2)) {
    var operation = prompt("Enter Operation Literal");
    var result;
    var isDefaultTriggered = false;
    switch (operation) {
      case "+":
        result = number1 + number2;
        break;
      case "-":
        result = number1 - number2;
        break;
      case "*":
        result = number1 * number2;
        break;
      case "/":
        result = number1 / number2;
        break;
      case "%": //extended solution
        result = number1 % number2;
        break;
      default: //sum numbers as default
        isDefaultTriggered = true;
        result = number1 + number2;
        break;
    }
    if (isDefaultTriggered) {
      console.log(
        `${number1} + ${number2} = ${result}, Default Operation Triggered!`,
      );
    } else {
      console.log(`${number1} ${operation} ${number2} = ${result}`);
    }
  } else {
    console.log("Invalid Number 2");
  }
} else {
  console.log("Invalid Number 1");
}
