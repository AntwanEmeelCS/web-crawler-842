import localStorageWorker from "./localStorageWorker.js";
import environment from "../environment.js";
import dateUtilities from "../utilities/dateUtilities.js";

export default class appLocalStorageWorker {
  static nutritionData = { nutritionInfo: [] };
  static nutritionDataDefault = { nutritionInfo: [] };
  static initializeNutritionData() {
    let info = localStorageWorker.getVariableContent(
      environment.localStorageVarName,
    );
    if (info === null) {
      localStorageWorker.addUpdateVariable(
        environment.localStorageVarName,
        this.nutritionDataDefault,
        true,
      );
    } else {
      this.nutritionData = info;
    }
  }
  static updateNutritionData() {
    localStorageWorker.addUpdateVariable(
      environment.localStorageVarName,
      this.nutritionData,
      true,
    );
  }
  static getOrCreateToday() {
    const today = dateUtilities.formatDateToday();

    let todayInfo = this.nutritionData.nutritionInfo.find(
      (item) => item.date === today,
    );

    // 1.1) Today doesn't exist
    if (!todayInfo) {
      todayInfo = {
        date: today,

        totalInfo: {
          totalCalories: 0,
          totalProtein: 0,
          totalCarbs: 0,
          totalFat: 0,
        },

        meals: [],
      };

      this.nutritionData.nutritionInfo.push(todayInfo);
    }

    // 1.2) Today already exists
    return todayInfo;
  }

  static getOrCreateByDate(date) {
    const dt = dateUtilities.formatDate(date);

    let dtInfo = this.nutritionData.nutritionInfo.find(
      (item) => item.date === dt,
    );

    // 1.1) Today doesn't exist
    if (!dtInfo) {
      dtInfo = {
        date: dt,

        totalInfo: {
          totalCalories: 0,
          totalProtein: 0,
          totalCarbs: 0,
          totalFat: 0,
        },

        meals: [],
      };

      this.nutritionData.nutritionInfo.push(dtInfo);
    }

    // 1.2) Today already exists
    return dtInfo;
  }
  static updateDailyTotals(todayInfo) {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    for (const entry of todayInfo.meals) {
      //fallback to zero for invalid values
      totalCalories += Number(entry.nutrition.calories) || 0;
      totalProtein += Number(entry.nutrition.protein) || 0;
      totalCarbs += Number(entry.nutrition.carbs) || 0;
      totalFat += Number(entry.nutrition.fat) || 0;
    }

    todayInfo.totalInfo = {
      totalCalories: totalCalories,
      totalProtein: totalProtein,
      totalCarbs: totalCarbs,
      totalFat: totalFat,
    };
  }

  static recordMeal(meal) {
    const todayInfo = this.getOrCreateToday();

    todayInfo.meals.push({
      type: "meal",
      name: meal.name,
      mealId: meal.mealId,
      category: meal.category,
      thumbnail: meal.thumbnail,
      servings: meal.servings,
      loggedAt: meal.loggedAt ?? new Date().toISOString(),
      nutrition: {
        calories: meal.nutrition.calories,
        protein: meal.nutrition.protein,
        carbs: meal.nutrition.carbs,
        fat: meal.nutrition.fat,
      },
    });

    this.updateDailyTotals(todayInfo);

    this.updateNutritionData();

    alert(`Meal "${meal.name}" was recorded successfully.`);
  }

  static recordProduct(product) {
    console.log(product);

    const todayInfo = this.getOrCreateToday();

    todayInfo.meals.push({
      type: "product",
      name: product.result.name,
      brand: product.result.brand,
      barcode: product.result.barcode,
      serving: product.result.serving ?? 0,
      loggedAt: product.loggedAt ?? new Date().toISOString(),
      nutrition: {
        calories: product.result.nutrients.calories,
        protein: product.result.nutrients.protein,
        carbs: product.result.nutrients.carbs,
        fat: product.result.nutrients.fat,
        saturatedFat:
          product.result.nutrients.saturatedFat == undefined
            ? 0
            : product.result.nutrients.saturatedFat,
        sugar:
          product.result.nutrients.sugar == undefined
            ? 0
            : product.result.nutrients.sugar,
        fiber:
          product.result.nutrients.fiber == undefined
            ? 0
            : product.result.nutrients.fiber,
        salt:
          product.result.nutrients.salt == undefined
            ? 0
            : product.result.nutrients.salt,
        sodium:
          product.result.nutrients.sodium == undefined
            ? 0
            : product.result.nutrients.sodium,
      },
    });

    this.updateDailyTotals(todayInfo);

    this.updateNutritionData();

    alert(`Product "${product.result.name}" was recorded successfully.`);
  }

  static clearTodayMeals() {
    const today = this.getTodayDate();

    const todayInfo = this.nutritionData.nutritionInfo.find(
      (item) => item.date === today,
    );

    if (!todayInfo) {
      alert("There are no nutrition records for today.");
      return;
    }
    todayInfo.meals = [];

    // Reset totals.
    todayInfo.totalInfo = {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
    };

    this.updateNutritionData();

    alert("Today's nutrition records were cleared successfully.");
  }

  static getLastWeekCalculations() {
    const dailyInfo = [];

    let totalWeekCalories = 0;
    let totalWeekItems = 0;

    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const currentDate = new Date(today);

      currentDate.setDate(today.getDate() - i);

      const dateString = this.formatDate(currentDate);

      const dayInfo = this.nutritionData.nutritionInfo.find(
        (item) => item.date === dateString,
      );

      let totalItems = 0;
      let totalCalories = 0;

      if (dayInfo) {
        totalItems = dayInfo.meals.length;

        totalCalories = Number(dayInfo.totalInfo.totalCalories) || 0;
      }

      dailyInfo.push({
        date: dateString,
        totalItems: totalItems,
        totalCalories: totalCalories,
      });

      totalWeekItems += totalItems;

      totalWeekCalories += totalCalories;
    }

    return {
      dailyInfo: dailyInfo,
      totalWeekCalories: totalWeekCalories,
      totalWeekItems: totalWeekItems,
    };
  }
}
