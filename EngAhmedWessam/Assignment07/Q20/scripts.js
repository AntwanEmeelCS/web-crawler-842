function isValidPositiveNumber(x) {
  if (typeof x == "number" && !Number.isNaN(x) && x > 0) {
    return true;
  } else {
    return false;
  }
}

function printRightHandTriangle(numberOfRows) {
  for (var rowNumber = 1; rowNumber <= numberOfRows; rowNumber++) {
    for (
      var spaceTurnNumber = 0;
      spaceTurnNumber < numberOfRows - rowNumber;
      spaceTurnNumber++
    ) {
      console.log(" ");
    }

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
    printRightHandTriangle(numberOfRows);
  } else {
    console.log("Invalid Number of Rows!");
  }
}

main();
