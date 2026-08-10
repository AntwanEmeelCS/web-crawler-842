"use strict";

let htmlElement = document.querySelector("html");
let btnToggleMode = document.querySelector(".btnToggleMode");

function toggleBodyTheme(themeName) {
  htmlElement.setAttribute("data-bs-theme", themeName);
}

function toggleHeroSectionTheme(backColor) {
  /* hero section */
  let hero_sec = document.querySelector("#hero-section");
  hero_sec.style.backgroundColor = backColor;
}

function toggleAchievementsStyle(backColor, textColor) {
  let ach = document.querySelectorAll(
    "#about .container-fluid .aboutMeContent .c2 .achievements .ach",
  );
  ach.forEach((item) => {
    item.style.color = textColor;
    item.style.backgroundColor = backColor;
  });
}

function toggleSocialMediaIconsStyle(backColor, textColor) {
  let ach = document.querySelectorAll(
    "#about .container-fluid .aboutMeContent .c2 .socialMediaIcons .socialMediaIcon",
  );
  ach.forEach((item) => {
    item.style.color = textColor;
    item.style.backgroundColor = backColor;
  });
}

btnToggleMode.addEventListener("click", function (event) {
  /* general change */
  let currentMode = htmlElement.getAttribute("data-bs-theme");

  // console.log(currentMode);

  if (currentMode.toLowerCase() === "dark") {
    toggleBodyTheme("light");
    toggleHeroSectionTheme("#fff");
    toggleAchievementsStyle("#f8fafc", "#212529");
    toggleSocialMediaIconsStyle("#f8fafc", "#212529");
  } else if (currentMode.toLowerCase() === "light") {
    toggleBodyTheme("dark");
    toggleHeroSectionTheme("#44484c");
    toggleAchievementsStyle("#44484C", "#fff");
    toggleSocialMediaIconsStyle("#44484C", "#fff");
  } else {
    toggleBodyTheme("light");
    toggleHeroSectionTheme("#fff");
    toggleAchievementsStyle("#f8fafc", "#212529");
    toggleSocialMediaIconsStyle("#f8fafc", "#212529");
  }

  event.stopPropagation();
});
