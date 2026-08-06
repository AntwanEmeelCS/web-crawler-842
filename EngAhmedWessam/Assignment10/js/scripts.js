"use strict";

let htmlElement = document.querySelector("html");
let btnToggleMode = document.querySelector(".btnToggleMode");

btnToggleMode.addEventListener("click", function (event) {
  /* general change */
  let currentMode = htmlElement.getAttribute("data-bs-theme");
  /* hero section */
  let hero_sec = document.querySelector("#hero-section");
  console.log(currentMode);

  if (currentMode.toLowerCase() === "dark") {
    htmlElement.setAttribute("data-bs-theme", "light");
    hero_sec.style.backgroundColor = "#fff";
  } else if (currentMode.toLowerCase() === "light") {
    htmlElement.setAttribute("data-bs-theme", "dark");
    hero_sec.style.backgroundColor = "#2B3035";
  } else {
    htmlElement.setAttribute("data-bs-theme", "light");
    hero_sec.style.backgroundColor = "#fff";
  }

  event.stopPropagation();
});
