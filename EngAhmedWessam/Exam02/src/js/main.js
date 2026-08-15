"use strict";
import Utils from "./utils.js";
import environment from "./environment.js";
import recipeWorker from "./recipeWorker.js";
import sidebarWorker from "./sidebarWorker.js";
import router from "./router.js";

let lastRecipeName = "";
let lastAreaName = "";
let lastCatagoryName = "";

//welcome screen
function showWelcomeScreen() {
  let loadingOverlay = document.querySelector("#app-loading-overlay");
  loadingOverlay.classList.remove("loading");
  setTimeout(() => {
    loadingOverlay.classList.add("loading");
  }, 500);
}

//initiating app
async function initiateApp() {
  showWelcomeScreen();
  sidebarWorker.activateSidebarFunctionality();
  //route to the default page: meals
  router.routeToAppPage("default");
  await recipeWorker.prepareMealsPage();
}

initiateApp();
