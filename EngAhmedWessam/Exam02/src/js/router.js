import foodLogWorker from "./foodLog/foodLogWorker.js";
import recipeDetailsWorker from "./recipeWorkers/recipeDetailsWorker.js";
import apiUtils from "./utilities/apiUtils.js";
import uiUtilities from "./utilities/uiUtilities.js";

export default class router {
  static setHeaderInfo(mainText, subText) {
    let headerH1 = document.querySelector("#header h1");
    let headerP = document.querySelector("#header p");

    headerH1.innerText = mainText;
    headerP.innerText = subText;
  }

  static async prepareAppPage(funcName, data = "") {
    let meals_searchFilter = document.getElementById("search-filters-section");
    let meals_categoriesSection = document.getElementById(
      "meal-categories-section",
    );
    let meals_allRecipes = document.getElementById("all-recipes-section");

    let mealDetails = document.getElementById("meal-details");
    //recipe-detail-modal doesn't change by clicking any of the three buttons!
    let productsSection = document.getElementById("products-section");
    let foodlogSection = document.getElementById("foodlog-section");

    switch (funcName) {
      case "Meals & Recipes":
        uiUtilities.setElementDisplay(meals_searchFilter, "");
        uiUtilities.setElementDisplay(meals_categoriesSection, "");
        uiUtilities.setElementDisplay(meals_allRecipes, "");
        uiUtilities.setElementDisplay(mealDetails, "none");
        uiUtilities.setElementDisplay(productsSection, "none");
        uiUtilities.setElementDisplay(foodlogSection, "none");
        break;
      case "Product Scanner":
        uiUtilities.setElementDisplay(meals_searchFilter, "none");
        uiUtilities.setElementDisplay(meals_categoriesSection, "none");
        uiUtilities.setElementDisplay(meals_allRecipes, "none");
        uiUtilities.setElementDisplay(mealDetails, "none");
        uiUtilities.setElementDisplay(productsSection, "");
        uiUtilities.setElementDisplay(foodlogSection, "none");

        break;
      case "Food Log":
        foodLogWorker.prepareFoodLogPage();

        uiUtilities.setElementDisplay(meals_searchFilter, "none");
        uiUtilities.setElementDisplay(meals_categoriesSection, "none");
        uiUtilities.setElementDisplay(meals_allRecipes, "none");
        uiUtilities.setElementDisplay(mealDetails, "none");
        uiUtilities.setElementDisplay(productsSection, "none");
        uiUtilities.setElementDisplay(foodlogSection, "");
        break;
      case "Recipe Details":
        await recipeDetailsWorker.fillRecipeInfo(data);

        uiUtilities.setElementDisplay(meals_searchFilter, "none");
        uiUtilities.setElementDisplay(meals_categoriesSection, "none");
        uiUtilities.setElementDisplay(meals_allRecipes, "none");
        uiUtilities.setElementDisplay(mealDetails, "");
        uiUtilities.setElementDisplay(productsSection, "none");
        uiUtilities.setElementDisplay(foodlogSection, "none");

        break;
      default:
        break;
    }
  }

  static async routeToAppPage(funcName, data = "") {
    switch (funcName) {
      case "Meals & Recipes":
        this.setHeaderInfo(
          "Meals & Recipes",
          "Discover delicious and nutritious recipes tailored for you",
        );
        await this.prepareAppPage(funcName);
        break;
      case "Product Scanner":
        this.setHeaderInfo(
          "Product Scanner",
          "Search packaged foods by name or barcode",
        );
        await this.prepareAppPage(funcName);
        break;
      case "Food Log":
        this.setHeaderInfo(
          "Food Log",
          "Track your daily nutrition and food intake",
        );
        await this.prepareAppPage(funcName);
        break;
      case "Recipe Details":
        this.setHeaderInfo(
          "Recipe Details",
          "View full recipe information and nutrition facts",
        );
        await this.prepareAppPage(funcName, data);
        break;
      default:
        //set default to meals and recipes
        this.setHeaderInfo(
          "Meals & Recipes",
          "Discover delicious and nutritious recipes tailored for you",
        );
        await this.prepareAppPage("Meals & Recipes");
        break;
    }
  }
}
