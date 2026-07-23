var input = +prompt("Plese enter a number to check if it's odd or even", 5); //odd for default value

if (typeof input == "number" && !Number.isNaN(input)) {
  //odd and even is applied only for integers
  if (Number.isInteger(input)) {
    var result = "";
    if (input % 2 == 0) {
      result = "even";
    } else {
      result = "odd";
    }
    console.log(`${input} is an ${result} number`);
  } else {
    console.log("Only input Integer Values to Evaluate.");
  }
} else {
  console.log("Invalid Input!");
}
