"use strict";

import localStorageWorker from "./localStorageWorker.js";

let products = [];
let txtProductName = document.getElementById("txtProductName");
let txtProductCategory = document.getElementById("txtProductCategory");
let txtProductPrice = document.getElementById("txtProductPrice");
let dlgProductImage = document.getElementById("dlgProductImage");

//-------------Local Storage--------------------
function LoadProducts() {
  let productsContent = localStorageWorker.getVariableContent("products");
  if (productsContent != null) {
    products = JSON.parse(productsContent);
  }
}

function UpdateProductList() {
  localStorageWorker.addVariable("products", JSON.stringify(products), true);
}
//------------form functionality----------------
//------------initial--------------------

function AddUpdateHandlers() {
  let cards = document.querySelectorAll(".product-grid .product-card");
  for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    let productIndex = element.getAttribute("data-product-index");
    let btnUpdate = element.querySelector(
      ".product-content .product-footer .buttons .btnUpdate",
    );
    btnUpdate.addEventListener("click", function (e) {
      let btnAdd = document.getElementById("btnAddProduct");
      btnAdd.classList.add("d-none");
      StartUpdateProductByIndex(productIndex);
      e.stopPropagation();
    });
  }
}

function AddDeleteHandlers() {
  let cards = document.querySelectorAll(".product-grid .product-card");
  for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    let productIndex = element.getAttribute("data-product-index");
    let btnDelete = element.querySelector(
      ".product-content .product-footer .buttons .btnDelete",
    );
    btnDelete.addEventListener("click", function (e) {
      DeleteProductByIndex(productIndex);
      e.stopPropagation();
    });
  }
}

function FillProductCardsByFilter(filterString) {
  if (filterString == null || filterString == undefined) {
    filterString = "";
  } else {
    let grid = document.querySelector(".product-grid");
    //console.log(grid);

    let cartoona = ``;
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      if (
        element.ProductName.toLowerCase().includes(filterString.toLowerCase())
      ) {
        cartoona += `<article class="product-card" data-product-index="${index}">
          <div class="product-image-container">
            <span class="product-badge">New</span>
            <img
              src="./img/${element.ProductImageLoc}"
              alt="${element.ProductName}"
              class="product-image"
              loading="lazy"
            />
          </div>

          <div class="product-content">
            <p class="product-category">${element.ProductCategory}</p>
            <h2 class="product-title">${element.ProductName}</h2>

            <div class="product-footer">
              <div class="product-price">
                <span class="current-price">$${element.ProductPrice}</span>
              </div>
              <div class="buttons">
                <button class="btn btn-primary">Add to Cart</button>
                <button class="btnUpdate btn btn-secondary">Edit</button>
                <button class="btnDelete btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </article>`;
      }
    }
    grid.innerHTML = cartoona;
    AddUpdateHandlers();
    AddDeleteHandlers();
  }
}
function InitializeAddButton() {
  let btnAdd = document.getElementById("btnAddProduct");
  btnAdd.addEventListener("click", function () {
    AddProduct();
  });
}

function InitializeUpdateButton() {
  let btnUpdate = document.getElementById("btnUpdateProduct");
  btnUpdate.classList.add("d-none");
}

function InitializeSearchText() {
  let txtSearchByName = document.getElementById("txtSearchByName");

  txtSearchByName.addEventListener("input", function (e) {
    let searchString = txtSearchByName.value;
    FillProductCardsByFilter(searchString);
  });
}

function InitializePage() {
  InitializeSearchText();
  InitializeAddButton();
  InitializeUpdateButton();
  LoadProducts();
  FillProductCardsByFilter("");
}

//----------------CRUD-----------------
function AddProduct() {
  let newProductInfo = {
    ProductName: txtProductName.value,
    ProductCategory: txtProductCategory.value,
    ProductPrice: txtProductPrice.value,
    ProductImageLoc: dlgProductImage.files[0].name,
  };

  //console.log(products);
  //console.log(newProductInfo);

  products.push(newProductInfo);
  UpdateProductList();
  FillProductCardsByFilter("");
}

function DeleteProductByIndex(productIndex) {
  products.splice(productIndex, 1);
  UpdateProductList();
  FillProductCardsByFilter("");
}

function StartUpdateProductByIndex(index) {
  let prod = products[index];
  txtProductName.value = prod.ProductName;
  txtProductCategory.value = prod.ProductCategory;
  txtProductPrice.value = prod.ProductPrice;
  //------------------
  let btnUpdateProduct = document.getElementById("btnUpdateProduct");

  btnUpdateProduct.classList.remove("d-none");
  btnUpdateProduct.setAttribute("data-product-to-update-index", index);
  btnUpdateProduct.addEventListener("click", function (e) {
    let productInfo = {
      ProductName: txtProductName.value,
      ProductCategory: txtProductCategory.value,
      ProductPrice: txtProductPrice.value,
      ProductImageLoc: dlgProductImage.files[0].name,
    };
    products.splice(index, 1, productInfo);
    btnUpdateProduct.classList.add("d-none");
    let btnAdd = document.getElementById("btnAddProduct");
    btnAdd.classList.remove("d-none");

    UpdateProductList();
    FillProductCardsByFilter("");
  });
}

InitializePage();
