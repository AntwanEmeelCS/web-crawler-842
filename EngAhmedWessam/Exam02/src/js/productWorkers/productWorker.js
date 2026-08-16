import Utils from "../utils.js";
import environment from "../environment.js";

export default class productWorker {
  static lastProductName = "";
  static lastBarcode = "";
  static lastCatagoryName = "";
  static async loadProductCatagories() {
    let catagoryInfo = await Utils.fetchData(
      "products/categories?page=1&limit=30",
    );
    let catagoryBox = document.getElementById("product-categories");
    let catagoryCartoona = ``;

    for (let index = 0; index < catagoryInfo.results.length; index++) {
      const element = catagoryInfo.results[index];

      //console.log(element.id);

      catagoryCartoona += `<button data-catagory-id="${element.id}" class="product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all">
                ${element.name}
              </button>`;
    }
    catagoryBox.innerHTML = catagoryCartoona;
  }

  static fillProductList(productList) {
    let productBox = document.getElementById("products-grid");
    if (
      productList != undefined &&
      productList != null &&
      productList.length > 0
    ) {
      let productCartoona = ``;
      for (let index = 0; index < productList.length; index++) {
        const element = productList[index];
        let nutrients = element.nutrients;
        productCartoona += `<div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${element.barcode}">
                <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" src="${element.image}" alt="${element.name}" loading="lazy">

                  <!-- Nutri-Score Badge -->
                  <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                    ${element.nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  ${
                    element.novaGroup != null
                      ? `<div class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA 2">
                    ${element.novaGroup}
                  </div>`
                      : ``
                  }
                  
                </div>

                <div class="p-4">
                  <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                    ${element.brand}
                  </p>
                  <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    ${element.name}
                  </h3>

                  <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    
                    <span><i class="mr-1" data-fa-i2svg=""><svg class="svg-inline--fa fa-fire" data-prefix="fas" data-icon="fire" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"></path></svg></i>${nutrients.calories} kcal/100g</span>
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${nutrients.protein}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${nutrients.carbs}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${nutrients.fat}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${nutrients.sugar}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`;
      }
      productBox.innerHTML = productCartoona;
    } else {
      productBox.innerHTML = `<div id="products-empty" class="py-12">
                <div class="text-center">
                  <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="text-3xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-box-open" data-prefix="fas" data-icon="box-open" role="img" viewBox="0 0 640 512" aria-hidden="true" data-fa-i2svg="">
                        <path fill="currentColor" d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"></path></svg></i>
                  </div>
                  <p class="text-gray-500 text-lg mb-2">
                    No products to display
                  </p>
                  <p class="text-gray-400 text-sm">
                    Search for a product or browse by category
                  </p>
                </div>
              </div>`;
    }
  }
  //catagory
  static async fillProductsByCatagory(
    catagory_name,
    productCount = environment.productCountMax,
  ) {
    if (this.lastProductName != "") {
      this.clearNameChoice();
    }
    if (this.lastBarcode != "") {
      this.clearBarCodeChoice();
    }
    let apiData = await Utils.fetchData(
      `products/category/${catagory_name}?page=1&limit=${productCount}`,
    );
    this.lastCatagoryName = catagory_name;
    this.fillProductList(apiData.results);
  }
  static async addCatagoryButtonListeners() {
    let buttons = document.querySelectorAll("#product-categories button");
    for (let index = 0; index < buttons.length; index++) {
      const element = buttons[index];
      //console.log(element);
      let catagoryName = element.getAttribute("data-catagory-id");

      element.addEventListener("click", async (e) => {
        await this.fillProductsByCatagory(catagoryName);
        e.stopPropagation();
      });
    }
  }
  static clearCatagoryChoice() {
    this.lastCatagoryName = "";
  }
  //name
  static clearNameChoice() {
    let inputBox = document.getElementById("product-search-input");
    inputBox.value = "";
    this.lastProductName = "";
  }
  static async fillProductsByName(queryString) {
    if (this.lastBarcode != "") {
      this.clearBarCodeChoice();
    }
    if (this.lastCatagoryName != "") {
      this.clearCatagoryChoice();
    }
    let apiInfo = await Utils.fetchData(`products/search?q=${queryString}`);
    this.lastProductName = queryString;
    this.fillProductList(apiInfo.results);
  }

  static async addBtnSearchByNameListener() {
    let btn = document.getElementById("search-product-btn");
    btn.addEventListener("click", async (e) => {
      let input = document.getElementById("product-search-input");
      let queryString = input.value;
      if (queryString.trim().length > 0) {
        await this.fillProductsByName(queryString);
      }
    });
  }
  //barcode
  static clearBarCodeChoice() {
    let inputBox = document.getElementById("barcode-input");
    inputBox.value = "";
    this.lastBarcode = "";
  }

  static async fillProductsByBarcode(barcode) {
    if (this.lastProductName != "") {
      this.clearNameChoice();
    }
    if (this.lastCatagoryName != "") {
      this.clearCatagoryChoice();
    }
    let apiInfo = await Utils.fetchData(`products/barcode/${barcode}`);

    console.log(apiInfo);

    this.lastBarcode = barcode;
    this.fillProductList([apiInfo.result]);
  }

  static async addBtnSearchByBarcodeListener() {
    let btn = document.getElementById("lookup-barcode-btn");

    btn.addEventListener("click", async (e) => {
      let input = document.getElementById("barcode-input");
      let queryString = input.value;
      if (queryString.trim().length > 0) {
        await this.fillProductsByBarcode(queryString);
      }
    });
  }

  static async prepareProductPage() {
    //catagory
    await this.loadProductCatagories();
    await this.addCatagoryButtonListeners();
    //barcode
    await this.addBtnSearchByBarcodeListener();
    //name
    await this.addBtnSearchByNameListener();
  }
}
