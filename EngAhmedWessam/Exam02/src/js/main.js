"use strict";
import Utils from "./utils.js";
import environment from "./environment.js";
import recipeWorker from "./recipeWorkers/recipeWorker.js";
import sidebarWorker from "./sidebarWorker.js";
import router from "./router.js";
import recipeDetailsWorker from "./recipeWorkers/recipeDetailsWorker.js";
import productWorker from "./productWorkers/productWorker.js";

//welcome screen
function showWelcomeScreen() {
  let loadingOverlay = document.querySelector("#app-loading-overlay");
  loadingOverlay.classList.remove("loading");
  setTimeout(() => {
    loadingOverlay.classList.add("loading");
  }, 500);
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
}

//initiating app
async function initiateApp() {
  showWelcomeScreen();
  await doPreparations();
}

await initiateApp();
