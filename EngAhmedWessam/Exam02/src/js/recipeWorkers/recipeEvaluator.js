export default class recipeEvaluator {
  static dailyBasis = {
    minValues: {
      Protein: 0,
      Carbs: 0,
      Fat: 0,
      Fiber: 0,
      Sugar: 0,
      SaturatedFat: 0,
      Cholesterol: 0,
      Sodium: 0,
      Calories: 0,
    },
    maxValues: {
      Protein: 50,
      Carbs: 250,
      Fat: 65,
      Fiber: 34,
      Sugar: 50,
      SaturatedFat: 20,
      Cholesterol: 0.3,
      Sodium: 2.3,
      Calories: 2000,
    },
  };

  static evaluateCaloriesPercentage(caloriesValue) {
    if (caloriesValue <= this.dailyBasis.minValues.Calories) {
      return 0;
    } else if (caloriesValue >= this.dailyBasis.maxValues.Calories) {
      return 100;
    } else {
      return (
        ((caloriesValue - this.dailyBasis.minValues.Calories) /
          (this.dailyBasis.maxValues.Calories -
            this.dailyBasis.minValues.Calories)) *
        100
      );
    }
  }

  static evaluateProteinPercentage(proteinValue) {
    if (proteinValue <= this.dailyBasis.minValues.Protein) {
      return 0;
    } else if (proteinValue >= this.dailyBasis.maxValues.Protein) {
      return 100;
    } else {
      return (
        ((proteinValue - this.dailyBasis.minValues.Protein) /
          (this.dailyBasis.maxValues.Protein -
            this.dailyBasis.minValues.Protein)) *
        100
      );
    }
  }
  static evaluateCarbsPercentage(carbsValue) {
    if (carbsValue <= this.dailyBasis.minValues.Carbs) {
      return 0;
    } else if (carbsValue >= this.dailyBasis.maxValues.Carbs) {
      return 100;
    } else {
      return (
        ((carbsValue - this.dailyBasis.minValues.Carbs) /
          (this.dailyBasis.maxValues.Carbs - this.dailyBasis.minValues.Carbs)) *
        100
      );
    }
  }

  static evaluateFatPercentage(fatValue) {
    if (fatValue <= this.dailyBasis.minValues.Fat) {
      return 0;
    } else if (fatValue >= this.dailyBasis.maxValues.Fat) {
      return 100;
    } else {
      return (
        ((fatValue - this.dailyBasis.minValues.Fat) /
          (this.dailyBasis.maxValues.Fat - this.dailyBasis.minValues.Fat)) *
        100
      );
    }
  }

  static evaluateFiberPercentage(fiberValue) {
    if (fiberValue <= this.dailyBasis.minValues.Fiber) {
      return 0;
    } else if (fiberValue >= this.dailyBasis.maxValues.Fiber) {
      return 100;
    } else {
      return (
        ((fiberValue - this.dailyBasis.minValues.Fiber) /
          (this.dailyBasis.maxValues.Fiber - this.dailyBasis.minValues.Fiber)) *
        100
      );
    }
  }

  static evaluateSugarPercentage(sugarValue) {
    if (sugarValue <= this.dailyBasis.minValues.Sugar) {
      return 0;
    } else if (sugarValue >= this.dailyBasis.maxValues.Sugar) {
      return 100;
    } else {
      return (
        ((sugarValue - this.dailyBasis.minValues.Sugar) /
          (this.dailyBasis.maxValues.Sugar - this.dailyBasis.minValues.Sugar)) *
        100
      );
    }
  }

  static evaluateSaturatedFatPercentage(saturatedFatValue) {
    if (saturatedFatValue <= this.dailyBasis.minValues.SaturatedFat) {
      return 0;
    } else if (saturatedFatValue >= this.dailyBasis.maxValues.SaturatedFat) {
      return 100;
    } else {
      return (
        ((saturatedFatValue - this.dailyBasis.minValues.SaturatedFat) /
          (this.dailyBasis.maxValues.SaturatedFat -
            this.dailyBasis.minValues.SaturatedFat)) *
        100
      );
    }
  }

  static evaluateCholesterolPercentage(cholesterolValue) {
    if (cholesterolValue <= this.dailyBasis.minValues.Cholesterol) {
      return 0;
    } else if (cholesterolValue >= this.dailyBasis.maxValues.Cholesterol) {
      return 100;
    } else {
      return (
        ((cholesterolValue - this.dailyBasis.minValues.Cholesterol) /
          (this.dailyBasis.maxValues.Cholesterol -
            this.dailyBasis.minValues.Cholesterol)) *
        100
      );
    }
  }

  static evaluateSodiumPercentage(sodiumValue) {
    if (sodiumValue <= this.dailyBasis.minValues.Sodium) {
      return 0;
    } else if (sodiumValue >= this.dailyBasis.maxValues.Sodium) {
      return 100;
    } else {
      return (
        ((sodiumValue - this.dailyBasis.minValues.Sodium) /
          (this.dailyBasis.maxValues.Sodium -
            this.dailyBasis.minValues.Sodium)) *
        100
      );
    }
  }
}
