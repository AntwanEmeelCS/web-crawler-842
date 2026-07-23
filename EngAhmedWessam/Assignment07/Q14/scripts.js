var overtimeMinimumHours = 40;
var overtimeRateMultiplier = 1.5;

function isValidPositiveNumber(x) {
  if (typeof x == "number" && !Number.isNaN(x) && x > 0) {
    return true;
  } else {
    return false;
  }
}

function calculateSalary(workingHours, hourlyRate) {
  var normalHours = 0;
  var overtimeHours = 0;
  if (workingHours > overtimeMinimumHours) {
    normalHours = overtimeMinimumHours;
    overtimeHours = workingHours - overtimeMinimumHours;
  } else {
    normalHours = workingHours;
    overtimeHours = 0;
  }
  return (
    normalHours * hourlyRate +
    overtimeHours * hourlyRate * overtimeRateMultiplier
  );
}

//just an imitation of other languages
function main() {
  var workingHours = +prompt("Enter working hours", 45);
  if (isValidPositiveNumber(workingHours)) {
  } else {
    console.log("Invalid Working Hours!");
  }
}

main();
