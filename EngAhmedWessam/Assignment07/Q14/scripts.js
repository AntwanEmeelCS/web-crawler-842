var overtimeMinimumHours = 40;
var overtimeRateMultiplier = 1.5;

function isValidPositiveNumber(x) {
  if (typeof x == "number" && !Number.isNaN(x) && x > 0) {
    return true;
  } else {
    return false;
  }
}

function calculateRegularSalaryPortion(workingHours, hourlyRate) {
  var normalHours =
    workingHours > overtimeMinimumHours ? overtimeMinimumHours : workingHours;
  return normalHours * hourlyRate;
}

function calculateOvertimeSalaryPortion(workingHours, hourlyRate) {
  var overtimeHours =
    workingHours > overtimeMinimumHours
      ? workingHours - overtimeMinimumHours
      : 0;
  return overtimeHours * hourlyRate * overtimeRateMultiplier;
}

function calculateSalary(regularPortion, overtimePortion) {
  return regularPortion + overtimePortion;
}

//just an imitation of other languages
function main() {
  var workingHours = +prompt("Enter working hours", 45);
  if (isValidPositiveNumber(workingHours)) {
    var hourlyRate = +prompt("Enter hourly rate", 20);
    if (isValidPositiveNumber(hourlyRate)) {
      var regularPortion = calculateRegularSalaryPortion(
        workingHours,
        hourlyRate,
      );
      var overtimePOrtion = calculateOvertimeSalaryPortion(
        workingHours,
        hourlyRate,
      );
      console.log(
        `Regular: $${regularPortion}, Overtime: $${overtimePOrtion}, Total: $${calculateSalary(regularPortion, overtimePOrtion)}`,
      );
    } else {
      console.log("Invalid hourly rate!");
    }
  } else {
    console.log("Invalid Working Hours!");
  }
}

//call the main entry
main();
