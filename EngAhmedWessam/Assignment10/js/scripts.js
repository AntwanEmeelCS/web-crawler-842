"use strict";

let htmlElement = document.querySelector("html");
let btnToggleMode = document.querySelector(".btnToggleMode");

btnToggleMode.addEventListener("click", function (event) {
  let currentMode = htmlElement.getAttribute("data-bs-theme");

  console.log(currentMode);

  if (currentMode.toLowerCase() === "dark") {
    htmlElement.setAttribute("data-bs-theme", "light");
    console.log("Mode Changed From DARK to LIGHT");
  } else if (currentMode.toLowerCase() === "light") {
    htmlElement.setAttribute("data-bs-theme", "dark");
    console.log("Mode Changed From LIGHT to DARK");
  } else {
    htmlElement.setAttribute("data-bs-theme", "light");
    console.log("Mode Changed to LIGHT as DEFAULT");
  }

  event.stopPropagation();
});
