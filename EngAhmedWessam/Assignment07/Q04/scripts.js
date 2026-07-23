var hour = +prompt("Enter current hour in 24 hour format");

if (typeof hour == "number" && !Number.isNaN(hour)) {
  if (hour >= 0 && hour < 24) {
    if (hour >= 0 && hour <= 11) {
      console.log("Good morning!");
    } else if (hour > 11 && hour <= 17) {
      console.log("Good afternoon!");
    } else {
      console.log("Good evening!");
    }
  } else {
    console.log("Invalid input hour");
  }
} else {
  console.log("Invalid input number");
}
