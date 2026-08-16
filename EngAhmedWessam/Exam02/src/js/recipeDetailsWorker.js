import router from "./router.js";
import Utils from "./utils.js";
import recipeEvaluator from "./recipeEvaluator.js";

export default class recipeDetailsWorker {
  static async addBackButtonEventListener() {
    let btn = document.getElementById("back-to-meals-btn");
    btn.addEventListener("click", async function (e) {
      await router.routeToAppPage("Meals & Recipes");
    });
  }

  static addLogThatMealEventListener() {
    let btn = document.getElementById("log-meal-btn");
    btn.addEventListener("click", function (e) {
      alert("Feature under development!");
    });
  }
  static async prepareMealDetailsPage() {
    await this.addBackButtonEventListener();
    this.addLogThatMealEventListener();
  }

  static mapIngredientListCheckBox(recipeMainInfoIngredients) {
    let ingredientsCartoona = ``;
    let ingredientsArray = Array.from(recipeMainInfoIngredients);
    for (let index = 0; index < ingredientsArray.length; index++) {
      const element = ingredientsArray[index];
      ingredientsCartoona += `<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                                        <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300">
                                        <span class="text-gray-700">
                                            <span class="font-medium text-gray-900"> ${element.measure}</span> ${element.ingredient}
                                        </span>
                                    </div>`;
    }
    return ingredientsCartoona;
  }

  static mapIngredientListAPI(recipeMainInfoIngredients) {
    return recipeMainInfoIngredients.map(
      ({ measure, ingredient }) => `"${measure} ${ingredient}"`,
    );
  }
  static async getRecipeFacts(recipeMainInfo) {
    let body = `{
    "recipeName": "${recipeMainInfo.result.name}",
  "ingredients": [
  ${this.mapIngredientListAPI(recipeMainInfo.result.ingredients)}
  ]
    }`;
    return await Utils.postData(`nutrition/analyze`, body);
  }

  static fillHeroSection(recipeMainInfo, recipeFacts) {
    let heroSectionDiv = document.querySelector(
      "#meal-details .max-w-7xl .bg-white ",
    );
    //console.log(heroSectionDiv);

    heroSectionDiv.innerHTML = `<div class="relative h-80 md:h-96">
              <img src="${recipeMainInfo.result.thumbnail}" alt="${recipeMainInfo.result.name}" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${recipeMainInfo.result.category}</span>
                  ${recipeMainInfo.result.area == null || recipeMainInfo.result.area.trim().length > 0 ? `<span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${recipeMainInfo.result.area}</span>` : ``}
                  
                 
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${recipeMainInfo.result.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i data-fa-i2svg=""><svg class="svg-inline--fa fa-clock" data-prefix="fas" data-icon="clock" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils" data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"></path></svg></i>
                    <span id="hero-servings">${recipeFacts.data.servings} serving(s)</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i data-fa-i2svg=""><svg class="svg-inline--fa fa-fire" data-prefix="fas" data-icon="fire" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"></path></svg></i>
                    <span id="hero-calories">${recipeFacts.data.perServing.calories} cal/serving</span>
                  </span>
                </div>
              </div>
            </div>`;
  }

  static fillIngredientsList(recipeMainInfoIngredients) {
    let ingredientsBox = document.querySelector("#ingredientsBox");
    //console.log(this.mapIngredientListCheckBox(recipeMainInfoIngredients));

    ingredientsBox.innerHTML = this.mapIngredientListCheckBox(
      recipeMainInfoIngredients,
    );
  }

  static fillInstructionList(recipeMainInfo) {
    let instructionBox = document.getElementById("instructionsBox");
    let instructionsCartoona = ``;
    for (
      let index = 0;
      index < recipeMainInfo.result.instructions.length;
      index++
    ) {
      const element = recipeMainInfo.result.instructions[index];
      instructionsCartoona += `<div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                                            ${index + 1}
                                        </div>
                                        <p class="text-gray-700 leading-relaxed pt-2">${element}</p>
                                    </div>`;
    }
    instructionBox.innerHTML = instructionsCartoona;
  }

  static fillYoutubeBox(recipeMainInfo) {
    let ytBox = document.getElementById("ytVideo");
    let ytContentRef = recipeMainInfo.result.youtube;
    //console.log(ytBox, ytContentRef);

    if (
      ytContentRef == null ||
      ytContentRef == undefined ||
      ytContentRef.trim().length == 0
    ) {
      Utils.setElementDisplay(ytBox, "none");
    } else {
      Utils.setElementDisplay(ytBox, "block");

      let videoBox = ytBox.querySelector("iframe");
      videoBox.setAttribute(
        "src",
        recipeMainInfo.result.youtube.replace("watch?v=", "embed/"),
      );
    }
  }

  static fillRecipeFacts(recipeFacts) {
    let factContainer = document.getElementById("nutrition-facts-container");
    let totalCalories = recipeFacts.data.totals.calories;
    let perServingValues = recipeFacts.data.perServing;
    factContainer.innerHTML = `
            <p class="text-sm text-gray-500 mb-4">Per serving</p>
            
            <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
                <p class="text-sm text-gray-600">Calories per serving</p>
                <p class="text-4xl font-bold text-emerald-600">${perServingValues.calories}</p>
                <p class="text-xs text-gray-500 mt-1">Total: ${totalCalories} cal</p>
            </div>
            
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                    </div>
                    <span class="font-bold text-gray-900">${perServingValues.protein}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-emerald-500 h-2 rounded-full" style="width: ${recipeEvaluator.evaluateProteinPercentage(perServingValues.protein)}%"></div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                    </div>
                    <span class="font-bold text-gray-900">${perServingValues.carbs}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${recipeEvaluator.evaluateCarbsPercentage(perServingValues.carbs)}%"></div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${perServingValues.fat}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: ${recipeEvaluator.evaluateFatPercentage(perServingValues.fat)}%"></div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                    </div>
                    <span class="font-bold text-gray-900">${perServingValues.fiber}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: ${recipeEvaluator.evaluateFiberPercentage(perServingValues.fiber)}%"></div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                    </div>
                    <span class="font-bold text-gray-900">${perServingValues.sugar}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-pink-500 h-2 rounded-full" style="width: ${recipeEvaluator.evaluateSugarPercentage(perServingValues.sugar)}%"></div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-gray-700">Saturated Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${perServingValues.saturatedFat}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-red-500 h-2 rounded-full" style="width: ${recipeEvaluator.evaluateSaturatedFatPercentage(perServingValues.saturatedFat)}%"></div>
                </div>
            </div>
            

            
            <div class="mt-6 pt-6 border-t border-gray-100">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Cholesterol</span>
                        <span class="font-medium">${perServingValues.cholesterol}mg</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Sodium</span>
                        <span class="font-medium">${perServingValues.sodium}mg</span>
                    </div>
                </div>
            </div>
        `;
  }
  static async fillRecipeInfo(recipeID) {
    if (
      recipeID != undefined &&
      recipeID != null &&
      recipeID.trim().length > 0
    ) {
      //load api info
      let recipeMainInfo = await Utils.fetchData(`meals/${recipeID}`);
      setTimeout(() => {}, 500); //just wait
      let recipeFacts = await this.getRecipeFacts(recipeMainInfo);
      //fill elements
      this.fillHeroSection(recipeMainInfo, recipeFacts);
      this.fillIngredientsList(recipeMainInfo.result.ingredients);
      this.fillInstructionList(recipeMainInfo);
      this.fillYoutubeBox(recipeMainInfo);
      this.fillRecipeFacts(recipeFacts);
    }
  }
}
