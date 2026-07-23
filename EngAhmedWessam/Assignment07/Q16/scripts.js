//the following behaviour is found on problem 16 page: https://js-challenges-seven.vercel.app/problem/16
//before running my code it shows three test cases, after i press run, i find two visible cases and two hidden cases
//the message "❌ 3/4 test cases passed. Please review your solution." is not accompanied by the failed test case to correct my code!

var taxRatio = 0.1;
var discountRatio = 0.05;

function isValidPositiveNumber(x) {
  if (typeof x == "number" && !Number.isNaN(x) && x > 0) {
    return true;
  } else {
    return false;
  }
}

function calculateTax(purchaseTotal) {
  return purchaseTotal * taxRatio;
}

function calculateDiscount(purchaseTotal) {
  //the following logic is written by reference to Google Gemini
  //discount should be made based on initial payments, not after adding taxes
  //including discount after taxes could "inflate the tax amount" and/or "cause issues with sales tax compliance"
  if (purchaseTotal >= 100) {
    return purchaseTotal * discountRatio;
  } else {
    return 0;
  }
}

function formatNumberForConsole(number, decimalCount = 2) {
  if (Number.isInteger(number)) {
    return parseInt(number);
  } else {
    return Number(number.toFixed(decimalCount));
  }
}

function main() {
  var purchaseTotal = +prompt("Enter Shopping Cart Subtotal Value", 150);
  if (isValidPositiveNumber(purchaseTotal)) {
    var tax = formatNumberForConsole(calculateTax(purchaseTotal));

    var discount = formatNumberForConsole(calculateDiscount(purchaseTotal));
    var totalValue = formatNumberForConsole(purchaseTotal + tax - discount);

    // console.log(purchaseTotal);
    // console.log(tax);
    // console.log(discount);

    console.log(
      `Subtotal: $${purchaseTotal}, Tax: $${tax}, Discount: $${discount}, Final: $${totalValue}`,
    );
  } else {
    console.log("Invalid Purchase Total!");
  }
}

main();
