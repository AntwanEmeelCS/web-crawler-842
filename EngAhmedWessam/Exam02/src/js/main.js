"use strict";
//import apiUtils from "./utilities/apiUtils.js";
import environment from "./environment.js";
import recipeWorker from "./recipeWorkers/recipeWorker.js";
import sidebarWorker from "./sidebarWorker.js";
import router from "./router.js";
import recipeDetailsWorker from "./recipeWorkers/recipeDetailsWorker.js";
import productWorker from "./productWorkers/productWorker.js";
import appLocalStorageWorker from "./localStorageWorkers/appLocalStorageWorker.js";

//welcome screen
function showWelcomeScreen() {
  let loadingOverlay = document.querySelector("#app-loading-overlay");
  loadingOverlay.classList.remove("loading");
}

function hideWelcomeScreen() {
  let loadingOverlay = document.querySelector("#app-loading-overlay");

  loadingOverlay.classList.add("loading");
}
async function doPreparations() {
  //activate side bar routing
  sidebarWorker.activateSidebarFunctionality();
  //route to the default page: meals
  //and view random recipes
  router.routeToAppPage("default");
  await recipeWorker.prepareMealsPage();
  //recipe details
  await recipeDetailsWorker.prepareMealDetailsPage();
  //product scanner page
  await productWorker.prepareProductPage();
  //local storage
  appLocalStorageWorker.initializeNutritionData();
}

//initiating app
async function initiateApp() {
  showWelcomeScreen();
  await doPreparations();
  hideWelcomeScreen();
}

await initiateApp();
