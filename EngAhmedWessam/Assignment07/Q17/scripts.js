function isValidPositiveNumber(x) {
  if (typeof x == "number" && !Number.isNaN(x) && x > 0) {
    return true;
  } else {
    return false;
  }
}

function main() {
  var operationID = +prompt(`Enter a number that represent your transaction:
        1 - Check My Balance
        2 - Withdraw
        3 - Deposit`);

  //console.log(operationID);

  if (operationID == 1 || operationID == 2 || operationID == 3) {
    switch (operationID) {
      case 1:
        var customerBalance = +prompt("Please Enter Your Balance", 1000); //replaced by customerID or card number, then ask backend for the balance
        console.log(`Your balance is: $${customerBalance}`);
        break;
      case 2:
        var withdrawAmount = +prompt("Enter withdraw amount", 200);
        var customerBalance = +prompt("Please Enter Your Balance", 1000); //replaced by customerID or card number, then ask backend for the balance
        if (isValidPositiveNumber(customerBalance)) {
          if (
            isValidPositiveNumber(withdrawAmount) &&
            withdrawAmount <= customerBalance
          ) {
            var finalAmount = customerBalance - withdrawAmount;
            console.log(
              `Withdrew $${withdrawAmount}. New balance: $${finalAmount}`,
            );
          } else {
            console.log("Invalid Withdraw Amount!");
          }
        } else {
          console.log("Your Balance is already Negative!");
        }

        break;
      case 3:
        var depositAmount = +prompt("Enter deposit amount", 200);
        var customerBalance = +prompt("Please Enter Your Balance", 1000); //replaced by customerID or card number, then ask backend for the balance

        if (isValidPositiveNumber(depositAmount)) {
          var finalAmount = customerBalance + depositAmount;
          console.log(
            `Deposited $${depositAmount}. New balance: $${finalAmount}`,
          );
        } else {
          console.log("Invalid Deposit Amount!");
        }
        break;
      default: // no need for this part for being checked earlier
        console.log("default!");

        break;
    }
  } else {
    console.log("Invalid Operation ID");
  }
}

main();
