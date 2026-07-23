function isValidPositiveNumber(x) {
  if (typeof x == "number" && !Number.isNaN(x) && x > 0) {
    return true;
  } else {
    return false;
  }
}

function calculateBMI(weightKG, lengthM) {
  return (weightKG / (lengthM * lengthM)).toFixed(2);
}

function classifyBMI(BMI) {
  if (BMI < 18.5) {
    //underweight
    return "Underweight";
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    //normal weight
    return "Normal weight";
  } else if (BMI >= 25 && BMI <= 29.9) {
    //overweight
    return "Overweight";
  } else {
    return "Obese";
  }
}

function main() {
  var weightKG = +prompt("Enter your weight in KG", 100);
  if (isValidPositiveNumber(weightKG)) {
    var lengthM = +prompt("Enter your length in meters", 1.5);
    if (isValidPositiveNumber(lengthM)) {
      var BMI = calculateBMI(weightKG, lengthM);
      console.log(`BMI: ${BMI} - ${classifyBMI(BMI)}`);
    } else {
      console.log("Invalid input length");
    }
  } else {
    console.log("Invalid input weight!");
  }
}

main();
