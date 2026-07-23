function isValidPositiveNumber(x) {
  if (typeof x == "number" && !Number.isNaN(x) && x > 0) {
    return true;
  } else {
    return false;
  }
}

function printLeftHandTriangle(numberOfRows) {
  for (var rowNumber = 1; rowNumber <= numberOfRows; rowNumber++) {
    for (
      var starTurnNumber = 1;
      starTurnNumber <= rowNumber;
      starTurnNumber++
    ) {
      console.log("*");
    }
    console.log("\n");
  }
}

function main() {
  var numberOfRows = +prompt("Enter Triangle's Number of Rows");
  if (isValidPositiveNumber(numberOfRows)) {
    printLeftHandTriangle(numberOfRows);
  } else {
    console.log("Invalid Number of Rows!");
  }
}

main();
