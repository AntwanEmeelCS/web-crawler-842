"use strict";

import localStorageWorker from "./localStorageWorker.js";

let btnAddContact = document.getElementById("btnAddContact");

let totalContactCount = document.getElementById("totalContactCount");
let totalFavouritesCount = document.getElementById("totalFavouritesCount");
let totalEmergencyCount = document.getElementById("totalEmergencyCount");

let favList = document.getElementById("favList");
let emerList = document.getElementById("emerList");
let contactCards = document.getElementById("contactCards");

const localStorageItemName = "ContactHubInfo";
let ContactHubInfo = [];

function LoadOrInitializeLocalStorage() {
  if (localStorageWorker.variableExists(localStorageItemName)) {
    let info = localStorageWorker.getVariableContent(localStorageItemName);
    ContactHubInfo = Array.from(info);
    console.log("info loaded successfully");
  } else {
    localStorageWorker.addUpdateVariable(localStorageItemName, [], true);
    console.log("info initialized successfully");
  }
}

function LoadContactStatistics() {
  let total = 0;
  let favourites = 0;
  let emergency = 0;
  for (let index = 0; index < ContactHubInfo.length; index++) {
    const element = ContactHubInfo[index];
    total++;
    if (element.isFavorite) {
      favourites++;
    }
    if (element.isEmergency) {
      emergency++;
    }
  }
  totalContactCount.innerHTML = total;
  totalFavouritesCount.innerHTML = favourites;
  totalEmergencyCount.innerHTML = emergency;
}

function FilterConntacts(filterString = "none") {
  if (
    filterString !== "none" &&
    filterString !== "favourites" &&
    filterString !== "emergency"
  ) {
    filterString = "none";
  }

  if (filterString == "none") {
    return ContactHubInfo;
  }
  if (filterString == "favourites") {
    let arrFav = [];
    for (let index = 0; index < ContactHubInfo.length; index++) {
      const element = ContactHubInfo[index];
      if (element.isFavorite) {
        arrFav.push(element);
      }
    }
    return arrFav;
  }

  if (filterString == "emergency") {
    let arrEmer = [];
    for (let index = 0; index < ContactHubInfo.length; index++) {
      const element = ContactHubInfo[index];
      if (element.isEmergency) {
        arrEmer.push(element);
      }
    }
    return arrEmer;
  }
}

function getInitials(name) {
  const words = name.trim().split(/\s+/);

  if (words.length === 0 || words[0] === "") return "";

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  const firstInitial = words[0].charAt(0).toUpperCase();
  const secondInitial = words[1].charAt(0).toUpperCase();

  return firstInitial + secondInitial;
}

function LoadFavouritesList() {
  let favs = FilterConntacts("favourites");
  let cartoona = ``;
  for (let index = 0; index < favs.length; index++) {
    const element = favs[index];
    cartoona += `<div
                  class="favElement d-flex flex-row justify-content-between align-items-center"
                >
                  <div class="p1 d-flex flex-row">
                    <div
                      class="d-flex align-items-center border rounded-3 p-2 m-3"
                      style="background-color: rgb(${element.bgColor.red}, ${element.bgColor.green}, ${element.bgColor.blue})"
                    >
                      <div class="contactInitials text-white fw-bold">${getInitials(element.name)}</div>
                    </div>
                    <div class="d-flex flex-column">
                      <div>
                        <h3 class="fs-6 fw-bold text-black pt-3">
                          ${element.name}
                        </h3>
                      </div>
                      <div
                        class="siteSubtitle text-secondary"
                        style="font-size: 0.75rem"
                      >
                        <p class="text-secondary py-0 my-0">${element.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="p2 p-2 m-3 d-flex align-items-center justify-content-center rounded-3"
                  >
                    <a href="tel:${element.phone}"
                      ><i class="fa-solid fa-phone"></i
                    ></a>
                  </div>
                </div>`;
  }
  favList.innerHTML = cartoona;
}

function LoadEmergencyList() {
  let emer = FilterConntacts("emergency");
  let cartoona = ``;
  for (let index = 0; index < emer.length; index++) {
    const element = emer[index];
    cartoona += `<div
                  class="emerElement d-flex flex-row justify-content-between align-items-center"
                >
                  <div class="p1 d-flex flex-row">
                    <div
                      class="d-flex align-items-center border rounded-3 p-2 m-3"
                      style="background-color: rgb(${element.bgColor.red}, ${element.bgColor.green}, ${element.bgColor.blue})"
                    >
                      <div class="contactInitials text-white fw-bold">${getInitials(element.name)}</div>
                    </div>
                    <div class="d-flex flex-column">
                      <div>
                        <h3 class="fs-6 fw-bold text-black pt-3">
                          ${element.name}
                        </h3>
                      </div>
                      <div
                        class="siteSubtitle text-secondary"
                        style="font-size: 0.75rem"
                      >
                        <p class="text-secondary py-0 my-0">${element.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="p2 p-2 m-3 d-flex align-items-center justify-content-center rounded-3"
                  >
                    <a href="tel:${element.phone}"
                      ><i class="fa-solid fa-phone"></i
                    ></a>
                  </div>
                </div>`;
  }
  emerList.innerHTML = cartoona;
}

function LoadContactCards() {
  let cartoona = ``;
  for (let index = 0; index < ContactHubInfo.length; index++) {
    const element = ContactHubInfo[index];
    cartoona += `<div class="col-12 col-md-6 my-3">
                  <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-body p-4 pb-3">
                      <div class="d-flex align-items-center mb-3">
                        <div class="position-relative me-3">
                          <div
                            class="text-white d-flex align-items-center justify-content-center fw-bold rounded-3 fs-5 position-relative"
                            style="
                              width: 4rem;
                              height: 4rem;
                              background-color: rgb(${element.bgColor.red}, ${element.bgColor.green}, ${element.bgColor.blue});
                            "
                          >
                            ${getInitials(element.name)}
                            ${
                              element.isFavorite
                                ? `<span
                              class="position-absolute badge rounded-circle bg-warning p-1 border border-2 border-white d-flex align-items-center justify-content-center"
                              style="
                                width: 24px;
                                height: 24px;
                                right: -8px;
                                top: -8px;
                              "
                            >
                              <i
                                class="fa-solid fa-star"
                                style="font-size: 0.5rem"
                              ></i>
                            </span>`
                                : ``
                            }
                            ${
                              element.isEmergency
                                ? `<span
                              class="position-absolute badge rounded-circle bg-danger p-1 border border-2 border-white d-flex align-items-center justify-content-center"
                              style="
                                width: 24px;
                                height: 24px;
                                right: -8px;
                                bottom: -8px;
                              "
                            >
                              <i
                                class="fa-solid fa-heart-pulse text-white"
                                style="font-size: 10px"
                              ></i>
                            </span>`
                                : ``
                            }
                            
                          </div>
                        </div>
                        <div>
                          <h3 class="card-title fw-bold mb-2 text-dark fs-6">
                            ${element.name}
                          </h3>
                          <div class="d-flex align-items-center gap-2">
                            <span
                              class="badge bg-primary bg-opacity-10 text-primary p-2 rounded-3"
                            >
                              <i
                                class="fa-solid fa-phone"
                                style="font-size: 12px"
                              ></i>
                            </span>
                            <span class="text-secondary fw-semibold"
                              >${element.phone}</span
                            >
                          </div>
                        </div>
                      </div>

                      <div class="d-flex align-items-center gap-3 mb-3">
                        <span
                          class="badge bg-opacity-10 p-2 rounded-3"
                          style="
                            color: #6f42c1;
                            background-color: rgba(111, 66, 193, 0.1);
                          "
                        >
                          <i class="fa fa-envelope" style="font-size: 16px"></i>
                        </span>
                        <span class="text-secondary" style="font-size: 14px"
                          >${element.email}</span
                        >
                      </div>

                      <div class="d-flex align-items-center gap-3 mb-3">
                        <span
                          class="badge bg-success bg-opacity-10 text-success p-2 rounded-3"
                        >
                          <i class="fa-solid fa-location-dot fs-6"></i>
                        </span>
                        <span class="text-secondary" style="font-size: 14px"
                          >${element.address}</span
                        >
                      </div>

                      <div class="d-flex gap-2 mb-4">
                        <span
                          class="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-medium"
                          >${element.group}</span
                        >
                        ${
                          element.isEmergency
                            ? `<span
                          class="badge bg-danger bg-opacity-10 text-danger px-3 py-2 rounded-pill fw-medium d-flex align-items-center gap-1"
                        >
                          <i class="fa-solid fa-heart-pulse"></i> Emergency
                        </span>`
                            : ``
                        }
                        
                      </div>
                    </div>

                    <div
                      class="card-footer bg-transparent border-top border-light p-3 d-flex justify-content-between align-items-center"
                    >
                      <div
                        class="d-flex gap-2 align-items-center justify-content-evenly"
                      >
                        <button
                          class="btn btn-success bg-opacity-10 text-success border-0 px-2 py-1 rounded-3"
                        >
                          <a href="tel:${element.phone}"
                            ><i
                              class="fa-solid fa-phone text-white"
                              style="font-size: 12px"
                            ></i
                          ></a>
                        </button>
                        <button
                          class="btn btn-primary bg-opacity-10 text-primary border-0 px-2 py-1 rounded-3"
                          style="background-color: rgba(13, 110, 253, 0.1)"
                        >
                          <a href="mailto:${element.email}"
                            ><i
                              class="fa-solid fa-envelope"
                              style="font-size: 12px; color: #7f22fe"
                            ></i
                          ></a>
                        </button>
                      </div>
                      <div class="d-flex align-items-center gap-3">
                        <button
                          onclick="toggleBookmarks(${index})"
                          class="btn btn-warning bg-opacity-10 text-warning border-0 py-1 px-2 rounded-3"
                          style="background-color: #fef3c6"
                        >
                          <i class="fa-solid fa-star fs-6"></i>
                        </button>
                        <button
                          onclick="toggleEmergency(${index})"
                          class="btn btn-danger bg-opacity-10 text-danger border-0 p-2 rounded-3"
                          style="background-color: #ffe4e6"
                        >
                          <i class="fa-solid fa-heart-pulse"></i>
                        </button>
                        <button
                          onclick="editContact(${index})"
                          class="btn btn-link text-secondary p-1"
                          style="background-color: #eef2ff"
                        >
                          <i class="fa-solid fa-pen fs-6"></i>
                        </button>
                        <button
                          onclick="deleteContact(${index})"
                          class="btn btn-link text-secondary p-1"
                          style="background-color: #eef2ff"
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>`;
  }
  contactCards.innerHTML = cartoona;
}
function main() {
  LoadOrInitializeLocalStorage();
  LoadContactStatistics();
  LoadFavouritesList();
  LoadEmergencyList();
  LoadContactCards();
}

main();
