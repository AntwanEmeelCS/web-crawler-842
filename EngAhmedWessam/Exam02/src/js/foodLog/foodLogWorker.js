import appLocalStorageWorker from "../localStorageWorkers/appLocalStorageWorker.js";
import recipeEvaluator from "../recipeWorkers/recipeEvaluator.js";
import dateUtilities from "../utilities/dateUtilities.js";

export default class foodLogWorker {
  static setHeaderDateToday() {
    let header = document.getElementById("foodlog-date");
    header.innerText =
      dateUtilities.getDayOfWeekName(new Date(), "long") +
      " " +
      dateUtilities.formatDateToday();
  }

  static fillTodayNutrition() {
    let barContainer = document.getElementById("todayNutritionProgress");
    let todayTotals = appLocalStorageWorker.getOrCreateToday().totalInfo;

    barContainer.innerHTML = `
              <div class="bg-emerald-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Calories</span>
                  <span class="text-sm text-gray-500">${todayTotals.totalCalories.toFixed(2)} / 2000 kcal</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-emerald-500 h-2.5 rounded-full" style="width: ${recipeEvaluator.evaluateCaloriesPercentage(todayTotals.totalCalories)}%"></div>
                </div>
              </div>
              <!-- Protein Progress -->
              <div class="bg-blue-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Protein</span>
                  <span class="text-sm text-gray-500">${todayTotals.totalProtein.toFixed(2)} / 50 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-blue-500 h-2.5 rounded-full" style="width: ${recipeEvaluator.evaluateProteinPercentage(todayTotals.totalProtein)}%"></div>
                </div>
              </div>
              <!-- Carbs Progress -->
              <div class="bg-amber-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Carbs</span>
                  <span class="text-sm text-gray-500">${todayTotals.totalCarbs.toFixed(2)} / 250 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-amber-500 h-2.5 rounded-full" style="width: ${recipeEvaluator.evaluateCarbsPercentage(todayTotals.totalCarbs)}%"></div>
                </div>
              </div>
              <!-- Fat Progress -->
              <div class="bg-purple-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Fat</span>
                  <span class="text-sm text-gray-500">${todayTotals.totalFat.toFixed(2)} / 65 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-purple-500 h-2.5 rounded-full" style="width: ${recipeEvaluator.evaluateFatPercentage(todayTotals.totalFat)}%"></div>
                </div>
              </div>`;
  }

  static fillTodayMealsProducts() {
    let loggedList = document.getElementById("logged-items-list");
    let todayTotals = appLocalStorageWorker.getOrCreateToday().meals;
    if (todayTotals.length == 0) {
      loggedList.innerHTML = `<div class="text-center py-12">
                    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="text-3xl text-gray-300" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils" data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"></path></svg></i>
                    </div>
                    <p class="text-gray-500 font-medium mb-2">No food logged today</p>
                    <p class="text-gray-400 text-sm mb-4">Start tracking your nutrition by logging meals or scanning products</p>
                    
                </div>`;
      return;
    } else {
      let loggedCartoona = ``;
      for (let index = 0; index < todayTotals.length; index++) {
        const element = todayTotals[index];

        //console.log(element);

        if (element.type == "meal") {
          loggedCartoona += `<div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                        <div class="flex items-center gap-4">
                            <img src="${element.thumbnail}" alt="${element.name}" class="w-14 h-14 rounded-xl object-cover">
                            <div>
                                <p class="font-semibold text-gray-900">${element.name}</p>
                                <p class="text-sm text-gray-500">
                                    1 serving
                                    <span class="mx-1">•</span>
                                    <span class="text-emerald-600">Recipe</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-1">${dateUtilities.formatTime(element.loggedAt)}</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">${element.nutrition.calories.toFixed(2)}</p>
                                <p class="text-xs text-gray-500">kcal</p>
                            </div>
                            
                            
                        <div class="text-right">
                                <p class="text-lg font-bold text-blue-600">${element.nutrition.carbs.toFixed(2)}</p>
                                <p class="text-xs text-gray-500">g</p>
                            </div><div class="text-right">
                                <p class="text-lg font-bold text-amber-600">${element.nutrition.fat.toFixed(2)}</p>
                                <p class="text-xs text-gray-500">g</p>
                            </div><div class="text-right">
                                <p class="text-lg font-bold text-purple-600">${element.nutrition.protein.toFixed(2)}</p>
                                <p class="text-xs text-gray-500">g</p>
                            </div></div>
                    </div>`;
        } else {
          loggedCartoona += `<div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <i class="text-blue-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-box" data-prefix="fas" data-icon="box" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"></path></svg></i>
                                </div>
                            <div>
                                <p class="font-semibold text-gray-900">${element.name}</p>
                                <p class="text-sm text-gray-500">
                                    ${element.brand}
                                    <span class="mx-1">•</span>
                                    <span class="text-blue-600">Product</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-1">${dateUtilities.formatTime(element.loggedAt)}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">${element.nutrition.calories.toFixed(2)}</p>
                                <p class="text-xs text-gray-500">kcal</p>
                            </div>
                            
                            
                        <div class="text-right">
                                <p class="text-lg font-bold text-blue-600">${element.nutrition.carbs.toFixed(2)}</p>
                                <p class="text-xs text-gray-500">g</p>
                            </div><div class="text-right">
                                <p class="text-lg font-bold text-amber-600">${element.nutrition.fat.toFixed(2)}</p>
                                <p class="text-xs text-gray-500">g</p>
                            </div><div class="text-right">
                                <p class="text-lg font-bold text-purple-600">${element.nutrition.protein.toFixed(2)}</p>
                                <p class="text-xs text-gray-500">g</p>
                            </div></div>
                    </div>`;
        }
      }
      loggedList.innerHTML = loggedCartoona;
    }
  }

  static fillWeeklyTotals() {
    let overviewGrid = document.getElementById("weeklyOverview");
    let totalGrid = document.getElementById("weeklyTotalInfo");

    let overallCalories = 0;
    let overallItems = 0;

    let perDayCartoona = `<div class="bg-white rounded-2xl p-6 mb-6 border-2 border-gray-200">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">
                        <i class="mr-2 text-indigo-500" data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar-week" data-prefix="fas" data-icon="calendar-week" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-32c0-17.7 14.3-32 32-32zm0 256c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l192 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-192 0z"></path></svg></i>
                        Weekly Overview
                    </h3>
                    
                    <div class="grid grid-cols-7 gap-2">`;
    for (let index = 6; index >= 0; index--) {
      let dt = dateUtilities.subtractDaysFromToday(index);
      let dtDay = dt.getDate();
      let dtName = dateUtilities.getDayOfWeekName(dt, "short");
      let dtInfo = appLocalStorageWorker.getOrCreateByDate(dt);

      overallCalories += dtInfo.totalInfo.totalCalories;
      overallItems = dtInfo.meals.length;

      perDayCartoona += ` <div class="text-center ">
                                <p class="text-xs text-gray-500 mb-1">${dtName}</p>
                                <p class="text-sm font-medium text-gray-900">${dtDay}</p>
                                <div class="mt-2 text-emerald-600">
                                    <p class="text-lg font-bold">${dtInfo.totalInfo.totalCalories}</p>
                                    <p class="text-xs">kcal</p>
                                </div>
                                <p class="text-xs text-gray-400 mt-1">${dtInfo.meals.length} item(s)</p>
                            </div>
`;
    }
    perDayCartoona += `</div>`;
    overviewGrid.innerHTML = perDayCartoona;
    totalGrid.innerHTML = `
                    <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <i class="text-emerald-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-chart-line" data-prefix="fas" data-icon="chart-line" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7 262.6 153.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l73.4-73.4 57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"></path></svg></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Weekly Average</p>
                                <p class="text-xl font-bold text-gray-900">${overallCalories} kcal</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <i class="text-blue-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils" data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"></path></svg></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Total Items This Week</p>
                                <p class="text-xl font-bold text-gray-900">${overallItems} items</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <i class="text-purple-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-bullseye" data-prefix="fas" data-icon="bullseye" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M448 256a192 192 0 1 0 -384 0 192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path></svg></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Days On Goal</p>
                                <p class="text-xl font-bold text-gray-900">0 / 7</p>
                            </div>
                        </div>
                    </div>
                `;
  }
  static prepareFoodLogPage() {
    this.setHeaderDateToday();
    this.fillTodayNutrition();
    this.fillTodayMealsProducts();
    this.fillWeeklyTotals();
  }
}
