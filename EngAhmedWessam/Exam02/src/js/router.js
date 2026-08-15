export default class router {
  static setHeaderInfo(mainText, subText) {
    let headerH1 = document.querySelector("#header h1");
    let headerP = document.querySelector("#header p");

    headerH1.innerText = mainText;
    headerP.innerText = subText;
  }

  static setElementDisplay(element, displayName) {
    element.style.display = displayName;
  }

  static prepareAppPage(funcName) {
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
        this.setElementDisplay(meals_searchFilter, "");
        this.setElementDisplay(meals_categoriesSection, "");
        this.setElementDisplay(meals_allRecipes, "");
        this.setElementDisplay(mealDetails, "none");
        this.setElementDisplay(productsSection, "none");
        this.setElementDisplay(foodlogSection, "none");
        break;
      case "Product Scanner":
        this.setElementDisplay(meals_searchFilter, "none");
        this.setElementDisplay(meals_categoriesSection, "none");
        this.setElementDisplay(meals_allRecipes, "none");
        this.setElementDisplay(mealDetails, "none");
        this.setElementDisplay(productsSection, "");
        this.setElementDisplay(foodlogSection, "none");

        break;
      case "Food Log":
        this.setElementDisplay(meals_searchFilter, "none");
        this.setElementDisplay(meals_categoriesSection, "none");
        this.setElementDisplay(meals_allRecipes, "none");
        this.setElementDisplay(mealDetails, "none");
        this.setElementDisplay(productsSection, "none");
        this.setElementDisplay(foodlogSection, "");
        break;
      case "Recipe Details":
        this.setHeaderInfo(
          "Recipe Details",
          "View full recipe information and nutrition facts",
        );

        break;
      default:
        break;
    }
  }

  static routeToAppPage(funcName) {
    switch (funcName) {
      case "Meals & Recipes":
        this.setHeaderInfo(
          "Meals & Recipes",
          "Discover delicious and nutritious recipes tailored for you",
        );
        this.prepareAppPage(funcName);
        break;
      case "Product Scanner":
        this.setHeaderInfo(
          "Product Scanner",
          "Search packaged foods by name or barcode",
        );
        this.prepareAppPage(funcName);
        break;
      case "Food Log":
        this.setHeaderInfo(
          "Food Log",
          "Track your daily nutrition and food intake",
        );
        this.prepareAppPage(funcName);
        break;
      case "Recipe Details":
        this.setHeaderInfo(
          "Recipe Details",
          "View full recipe information and nutrition facts",
        );
        this.prepareAppPage(funcName);
        break;
      default:
        //set default to meals and recipes
        this.setHeaderInfo(
          "Meals & Recipes",
          "Discover delicious and nutritious recipes tailored for you",
        );
        this.prepareAppPage("Meals & Recipes");
        break;
    }
  }
}
