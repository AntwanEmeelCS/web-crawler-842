var egp = +prompt(
  "Enter the cash amount in EGP to convert to USD, EUR, GBP",
  1000,
);

// console.log(typeof NaN);

if (typeof egp == "number" && !Number.isNaN(egp)) //omit NaN values
{
  //negative values were accepted for debt/credit operations
  var dollars = (egp / 47.22).toFixed(2); //format to two digits after division
  var euros = (egp / 54.35).toFixed(2);
  var gbp = (egp / 61.95).toFixed(2);
  console.log(`${egp} EGP = $${dollars} USD, €${euros} EUR, £${gbp} GBP`);
} else {
  console.log("Invalid Cash Value!");
}
