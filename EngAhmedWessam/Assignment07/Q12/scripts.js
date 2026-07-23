function isValidAge(x) {
  if (typeof x == "number" && !Number.isNaN(x) && (x > 0) & (x <= 120)) {
    return true;
  } else {
    return false;
  }
}

//console.log("yes".toLowerCase() == "222");

var age = +prompt("Enter audience age");

if (isValidAge(age)) {
  var ticketStatus = prompt("Enter Ticket Status:"); //should come from backend in production
  if (ticketStatus.toLowerCase() == "yes" || age >= 18) {
    //the given logic of this question is totally absurd!
    //it allows under-age people to attend movies that are not for general audience if tickets are available
    //plus, it allows people older than 18 years old to attend even if no tickets are available!
    console.log("Access granted: true");
  } else if (ticketStatus.toLowerCase() == "no" && age < 18) {
    console.log("Access granted: false");
  } else {
    console.log("Invalid Ticket Status!");
  }
} else {
  console.log("Invalid audience age!");
}
