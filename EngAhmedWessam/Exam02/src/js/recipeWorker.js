import Utils from "./utils.js";
import environment from "./environment.js";
import router from "./router.js";
export default class recipeWorker {
  //variables
  static lastChosenName = "";
  static lastChosenArea = "";
  static lastChosenCatagory = "";
  //objects
  static recipeText = document.getElementById("search-input");
  //functions
  static async prepareMealAreas() {
    let areaDiv = document.querySelector("#search-filters-section div .flex");
    let areaInfo = await Utils.fetchData("meals/areas");
    //console.log(areaInfo);
    //include all first
    let areaCartoona = `<button class="area-filter-btn px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 hover:text-white transition-all" data-area="">
                All Cuisines
            </button>`;
    //include individuals
    for (let index = 0; index < areaInfo.results.length; index++) {
      const element = areaInfo.results[index];
      areaCartoona += `<button class="area-filter-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all" data-area="${element.name}">
                    ${element.name}
                </button>`;
    }
    areaDiv.innerHTML = areaCartoona;
  }

  static async prepareMealsCatagories() {
    let catagoriesGrid = document.getElementById("categories-grid");
    let catagoriesInfo = await Utils.fetchData("meals/categories");
    let catagoriesCartoona = ``;
    for (let index = 0; index < catagoriesInfo.results.length; index++) {
      const element = catagoriesInfo.results[index];
      catagoriesCartoona += `<div class="category-card bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-3 border border-red-200 hover:border-red-400 hover:shadow-md cursor-pointer transition-all group" data-category="${element.name}">
            <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <img src="${element.thumbnail}" alt="${element.name}" />
                </div>
                <div>
                    <h3 class="text-sm font-bold text-gray-900">${element.name}</h3>
                </div>
            </div>
        </div>`;
    }
    catagoriesGrid.innerHTML = catagoriesCartoona;
  }

  static setRecipeCount(recipeCount, catagoryName = "") {
    let recipeCountID = document.getElementById("recipes-count");
    recipeCountID.innerText = `Showing ${recipeCount} ${catagoryName} recipes`;
  }

  static addRecipeListner() {
    let recipeCards = document.querySelectorAll("#recipes-grid .recipe-card");
    for (let index = 0; index < recipeCards.length; index++) {
      const element = recipeCards[index];
      let recipeID = element.getAttribute("data-meal-id");
      element.addEventListener("click", function (e) {
        router.routeToAppPage("Recipe Details", recipeID);
        e.stopPropagation();
      });
    }
  }
  static fillRecipeGrid(recipeInfo) {
    let recipeGrid = document.getElementById("recipes-grid");
    let recipeCartoona = ``;
    if (recipeInfo.results.length == 0) {
      recipeCartoona = `<div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-magnifying-glass" data-prefix="fas" data-icon="magnifying-glass" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
        </div>`;
    } else {
      for (let index = 0; index < recipeInfo.results.length; index++) {
        const element = recipeInfo.results[index];
        recipeCartoona += `<div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="${element.id}">
              <div class="relative h-48 overflow-hidden">
                <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${element.thumbnail}" alt="${element.name}" loading="lazy">
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                    ${element.category}
                  </span>
                  ${
                    element.area != null
                      ? `<span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                    ${element.area}
                  </span>`
                      : ``
                  }
                  
                </div>
              </div>
              <div class="p-4">
                <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  ${element.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${element.instructions[0].substring(0, 100)}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="mr-1 text-emerald-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils" data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"></path></svg></i>
                    ${element.category}
                  </span>
                  ${
                    element.area != null
                      ? `<span class="font-semibold text-gray-500">
                    <i class="mr-1 text-blue-500" data-fa-i2svg=""><svg class="svg-inline--fa fa-globe" data-prefix="fas" data-icon="globe" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"></path></svg></i>
                    
                    ${element.area}
                  </span>`
                      : ``
                  }
                  
                </div>
              </div>
            </div>`;
      }
    }

    recipeGrid.innerHTML = recipeCartoona;
  }

  static async loadRandomRecipes(recipeCount = environment.recipeCountMax) {
    this.setRecipeCount(recipeCount, "");

    let recipeInfo = await Utils.fetchData(`meals/random?count=${recipeCount}`);
    this.fillRecipeGrid(recipeInfo);
    this.addRecipeListner();
  }
  //search by name
  static async loadRecipesByName(filterString) {
    if (this.lastChosenArea.trim().length > 0) {
      this.clearAreaElements();
    }
    if (this.lastChosenCatagory.trim().length > 0) {
      this.clearCatagoryElements();
    }
    let recipeInfo = await Utils.fetchData(`meals/search?q=${filterString}`);
    this.setRecipeCount(recipeInfo.results.length, filterString);
    this.fillRecipeGrid(recipeInfo);
    this.addRecipeListner();
    this.lastChosenName = filterString;
  }

  static async addSearchTextListener() {
    this.recipeText.addEventListener("input", async (e) => {
      this.lastChosenName = this.recipeText.value;
      await this.loadRecipesByName(this.recipeText.value);
      e.stopPropagation();
    });
  }

  static clearNameElements() {
    this.recipeText.value = "";
    this.lastChosenName = "";
  }
  //search by area

  static async loadRecipesByArea(
    filterString,
    recipeCount = environment.recipeCountMax,
  ) {
    if (filterString.trim().length > 0) {
      if (this.lastChosenName.trim().length > 0) {
        this.clearNameElements();
      }
      if (this.lastChosenCatagory.trim().length > 0) {
        this.clearCatagoryElements();
      }
      let recipeInfo = await Utils.fetchData(
        `meals/filter?area=${filterString}&limit=${recipeCount}`,
      );
      this.setRecipeCount(recipeInfo.results.length, filterString);
      this.fillRecipeGrid(recipeInfo);
      this.addRecipeListner();
    }
  }
  static async addAreaListeners() {
    let button_list = document.querySelectorAll(
      "#search-filters-section .mx-auto .flex button",
    );
    for (let index = 0; index < button_list.length; index++) {
      const element = button_list[index];
      element.addEventListener("click", async (e) => {
        //last element
        let lastChosenAreaButton = document.querySelector(
          `#search-filters-section div .flex [data-area="${this.lastChosenArea}"]`,
        );
        lastChosenAreaButton.classList.remove("bg-emerald-600", "text-white");
        lastChosenAreaButton.classList.add("bg-gray-100", "text-gray-700");
        //last cuisine clear at choosing other values
        let lastCuisineElement = document.querySelector(
          `#search-filters-section div .flex [data-area=""]`,
        );
        lastCuisineElement.classList.remove("bg-emerald-600", "text-white");
        lastCuisineElement.classList.add("bg-gray-100", "text-gray-700");

        //current element
        element.classList.remove("bg-gray-100", "text-gray-700");
        element.classList.add("bg-emerald-600", "text-white");
        const area_name = element.getAttribute("data-area");
        if (area_name == null || area_name.trim().length == 0) {
          await this.loadRandomRecipes();
          this.lastChosenArea = "";
        } else {
          await this.loadRecipesByArea(area_name);
          this.lastChosenArea = area_name;
        }
      });
    }
  }
  static clearAreaElements() {
    //last element
    let lastChosenAreaButton = document.querySelector(
      `#search-filters-section div .flex [data-area="${this.lastChosenArea}"]`,
    );
    lastChosenAreaButton.classList.remove("bg-emerald-600", "text-white");
    lastChosenAreaButton.classList.add("bg-gray-100", "text-gray-700");
    //all cuisine element
    let element = document.querySelector(
      `#search-filters-section div .flex [data-area=""]`,
    );
    element.classList.remove("bg-gray-100", "text-gray-700");
    element.classList.add("bg-emerald-600", "text-white");

    this.lastChosenName = "";
  }

  //search by catagory
  static async loadRecipesByCatagory(
    filterString,
    recipeCount = environment.recipeCountMax,
  ) {
    if (filterString.trim().length > 0) {
      if (this.lastChosenName.trim.length > 0) {
        this.clearNameElements();
      }
      if (this.lastChosenArea.trim().length > 0) {
        this.clearAreaElements();
      }
      let recipeInfo = await Utils.fetchData(
        `meals/filter?category=${filterString}&limit=${recipeCount}`,
      );
      this.setRecipeCount(recipeInfo.results.length, filterString);
      this.fillRecipeGrid(recipeInfo);
      this.addRecipeListner();
    }
  }

  static async addCatagoryListners() {
    let catagory_cards = document.querySelectorAll(
      "#categories-grid .category-card",
    );
    for (let index = 0; index < catagory_cards.length; index++) {
      const element = catagory_cards[index];
      element.addEventListener("click", async (e) => {
        let catagory_name = element.querySelector("h3").innerText;
        await this.loadRecipesByCatagory(catagory_name);
        this.lastChosenCatagory = catagory_name;
      });
    }
  }

  static clearCatagoryElements() {
    this.lastChosenCatagory = "";
  }
  //initialization
  static async prepareMealsPage() {
    //search text
    this.clearNameElements();
    await this.addSearchTextListener();
    //text area
    this.lastChosenArea = "";
    await this.prepareMealAreas();
    await this.addAreaListeners();
    this.clearAreaElements();
    //catagories
    this.clearCatagoryElements();
    await this.prepareMealsCatagories();
    await this.addCatagoryListners();
    //fill recipe pan
    await this.loadRandomRecipes();
  }
}
