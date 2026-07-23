var name = prompt("Please Enter Your Name:", "Ali");
var age = +prompt("Please Enter Your Age:", 21);
var currentYear = 2026;

// console.log(name);
// console.log(age);
// console.log(currentYear);
// console.log(typeof age);

if (typeof age == "number" && age > 0) {
  console.log(
    `Hello ${name}! You are ${age} years old and you were born around ${currentYear - +age}`,
  );
} else {
  console.log("Invalid Input Age!");
}
