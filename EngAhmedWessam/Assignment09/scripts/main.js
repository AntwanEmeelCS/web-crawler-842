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

let swal_timeout = 1000;
let refreshTimeout = 1200;

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
    if (element.isFavourite) {
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
      if (element.isFavourite) {
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
    cartoona += `<div class="col-12 col-lg-6 my-3">
                  <div class="card border-1 shadow-sm rounded-4" data-card-id="${index}">
                    <div class="card-body p-2">
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
                              element.isFavourite
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
                          class="btnToggleBookmark btn btn-warning bg-opacity-10 text-warning border-0 py-1 px-2 rounded-3"
                          style="background-color: #fef3c6"
                        >${element.isFavourite ? `<i class="fa-solid fa-star fs-6"></i>` : `<i class="fa-regular fa-star fs-6"></i>`}
                          
                        </button>
                        <button
                          class="btnToggleEmergency btn btn-danger bg-opacity-10 text-danger border-0 p-2 rounded-3"
                          style="background-color: #ffe4e6"
                        >
                          ${element.isEmergency ? `<i class="fa-solid fa-heart-pulse"></i>` : `<i class="fa-regular fa-heart"></i>`}
                        </button>
                        <button
                          class="btnEditContact btn btn-link text-secondary p-1"
                          style="background-color: #eef2ff"
                        >
                          <i class="fa-solid fa-pen fs-6"></i>
                        </button>
                        <button
                          class="btnDeleteContact btn btn-link text-secondary p-1"
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

function toggleBookmark(cardID) {
  let element = ContactHubInfo[cardID];
  element.isFavourite = !element.isFavourite;
  localStorageWorker.addUpdateVariable("ContactHubInfo", ContactHubInfo, true);
  LoadContactCards();
  setEditContactListeners();
  setDeleteContactListeners();
  setToggleBookmarkListeners();
  setToggleEmergencyListeners();
  LoadFavouritesList();
}

function setToggleBookmarkListeners() {
  let cards = document.querySelectorAll(".card");
  for (const element of cards) {
    const cardId = Number(element.getAttribute("data-card-id"));
    let btn = element.querySelector(".btnToggleBookmark");
    btn.addEventListener("click", function (e) {
      toggleBookmark(cardId);
      e.stopPropagation();
    });
  }
}

function toggleEmergency(cardId) {
  let element = ContactHubInfo[cardId];

  element.isEmergency = !element.isEmergency;
  localStorageWorker.addUpdateVariable("ContactHubInfo", ContactHubInfo, true);
  LoadContactCards();
  setEditContactListeners();
  setDeleteContactListeners();
  setToggleBookmarkListeners();
  setToggleEmergencyListeners();
  LoadEmergencyList();
}

function setToggleEmergencyListeners() {
  let cards = document.querySelectorAll(".card");
  for (const element of cards) {
    const cardId = Number(element.getAttribute("data-card-id"));
    let btn = element.querySelector(".btnToggleEmergency");
    btn.addEventListener("click", function (e) {
      toggleEmergency(cardId);
      e.stopPropagation();
    });
  }
}

function editContact(cardId) {
  let element = ContactHubInfo[cardId];
  Swal.fire({
    title: '<span class="fw-bold text-dark">Edit Contact</span>',
    html: `
                    <form id="contactForm" class="text-start needs-validation" novalidate>
                        <!-- Full Name -->
                        <div class="mb-2 d-flex flex-row align-items-center justify-content-between">
                            <label for="swal-fullname" class="form-label fw-semibold small text-secondary">Full Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control w-75" id="swal-fullname" placeholder="e.g. John Doe" required value="${element.name}">
                            <div class="invalid-feedback">Please enter a valid full name.</div>
                        </div>

                        <!-- Phone Number -->
                        <div class="mb-2  d-flex flex-row align-items-center justify-content-between">
                            <label for="swal-phone" class="form-label fw-semibold small text-secondary">Phone<span class="text-danger">*</span></label>
                            <input type="text" class="form-control w-75" id="swal-phone" placeholder="e.g. 01012345678" required  value="${element.phone}">
                            <div class="invalid-feedback">Phone must start with 01 followed by 0, 1, 2, or 5 and 8 digits (e.g. 01012345678).</div>
                        </div>

                        <!-- Email -->
                        <div class="mb-2 d-flex flex-row align-items-center justify-content-between">
                            <label for="swal-email" class="form-label fw-semibold small text-secondary">Email<span class="text-danger">*</span></label>
                            <input type="email" class="form-control w-75" id="swal-email" placeholder="name@example.com" required  value="${element.email}">
                            <div class="invalid-feedback">Please enter a valid email address.</div>
                        </div>

                        <!-- Address -->
                        <div class="mb-2  d-flex flex-row align-items-center justify-content-between">
                            <label for="swal-address" class="form-label fw-semibold small text-secondary">Address <span class="text-danger">*</span></label>
                            <input type="text" class="form-control w-75" id="swal-address" placeholder="Street, City, Country" required  value="${element.address}">
                            <div class="invalid-feedback">Please provide an address.</div>
                        </div>

                        <!-- Group -->
                        <div class="mb-2  d-flex flex-row align-items-center justify-content-between">
                            <label for="swal-group" class="form-label fw-semibold small text-secondary">Group</label>
                            <select class="form-select w-75" id="swal-group">
                                <option value="Family" ${element.group == "Family" ? "selected" : ""} >Family</option>
                                <option value="Friends" ${element.group == "Friends" ? "selected" : ""} >Friends</option>
                                <option value="Work" ${element.group == "Work" ? "selected" : ""} >Work</option>
                                <option value="School" ${element.group == "School" ? "selected" : ""} >School</option>
                                <option value="Other"  ${element.group == "Other" ? "selected" : ""} >Other</option>
                            </select>
                        </div>

                        <!-- Notes -->
                        <div class="mb-2">
                            <label for="swal-notes" class="form-label fw-semibold small text-secondary">Notes</label>
                            <textarea class="form-control" id="swal-notes" rows="2" placeholder="Additional details...">${element.notes}</textarea>
                        </div>

                        <!-- Checkboxes -->
                        <div class="row mb-2">
                            <div class="col-6">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="swal-favourite" ${element.isFavourite ? "checked" : ""}>
                                    <label class="form-check-label small text-secondary fw-semibold" for="swal-favourite">
                                    <div class="d-flex flex-row align-items-center justify-content-start">
                                      <i class="fa-solid fa-star text-warning fs-6 me-2"></i>
                                      <span>Favourite</span>
                                    </div>    
                                    </label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="swal-emergency"  ${element.isEmergency ? "checked" : ""}>
                                    <label class="form-check-label small text-secondary fw-semibold" for="swal-emergency">
                                        <div class="d-flex flex-row align-items-center justify-content-start">
                                      <i class="fa-solid fa-heart-pulse text-danger fs-6 me-2"></i>
                                      <span>Emergency</span>
                                    </div> 
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                `,
    showCancelButton: true,
    confirmButtonText: "Save Contact",
    cancelButtonText: "Cancel",
    focusConfirm: false,
    customClass: {
      confirmButton:
        "btn btn-custom-save px-4 py-2 m-1 rounded-pill fw-semibold",
      cancelButton:
        "btn btn-custom-cancel px-4 py-2 m-1 rounded-pill fw-semibold",
    },
    buttonsStyling: false,
    preConfirm: () => {
      const fullname = document.getElementById("swal-fullname").value.trim();
      const phone = document.getElementById("swal-phone").value.trim();
      const email = document.getElementById("swal-email").value.trim();
      const address = document.getElementById("swal-address").value.trim();
      const group = document.getElementById("swal-group").value;
      const notes = document.getElementById("swal-notes").value.trim();
      const isFavourite = document.getElementById("swal-favourite").checked;
      const isEmergency = document.getElementById("swal-emergency").checked;

      // Regex rule: ^01[0125][0-9]{8}$
      const phoneRegex = /^01[0125][0-9]{8}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Manual validation checks with SweetAlert validation messages
      if (!fullname) {
        Swal.showValidationMessage("Full name is required.");
        document.getElementById("swal-fullname").focus();
        return false;
      }
      if (!phone || !phoneRegex.test(phone)) {
        Swal.showValidationMessage(
          "Invalid phone format. Must start with 01 followed by 0, 1, 2, or 5 and 8 digits.",
        );
        document.getElementById("swal-phone").focus();
        return false;
      }
      if (!email || !emailRegex.test(email)) {
        Swal.showValidationMessage("Please enter a valid email address.");
        document.getElementById("swal-email").focus();
        return false;
      }
      if (!address) {
        Swal.showValidationMessage("Address is required.");
        document.getElementById("swal-address").focus();
        return false;
      }

      return {
        fullname,
        phone,
        email,
        address,
        group,
        notes,
        isFavourite,
        isEmergency,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const data = result.value;
      let new_contact = {
        address: data.address,
        createdAt: Date.now(),
        email: data.email,
        group: data.group,
        isEmergency: data.isEmergency,
        isFavourite: data.isFavourite,
        name: data.fullname,
        notes: data.notes,
        phone: data.phone,
        bgColor: {
          red: element.bgColor.red,
          green: element.bgColor.green,
          blue: element.bgColor.blue,
        },
      };

      ContactHubInfo[cardId] = new_contact;
      localStorageWorker.addUpdateVariable(
        "ContactHubInfo",
        ContactHubInfo,
        true,
      );
      viewSuccessAlert("Contact Saved Successfully!");
      //changes modifies the whole ui, a reload does all updates!
      setTimeout(() => {
        location.reload();
      }, refreshTimeout);
    }
  });
}

function setEditContactListeners() {
  let cards = document.querySelectorAll(".card");
  for (const element of cards) {
    const cardId = Number(element.getAttribute("data-card-id"));
    let btn = element.querySelector(".btnEditContact");
    btn.addEventListener("click", function (e) {
      editContact(cardId);
      e.stopPropagation();
    });
  }
}
function deleteContact(cardId) {
  let element = ContactHubInfo[cardId];
  Swal.fire({
    title: `Delete Contact ${element.name}?`,
    text: "This cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes!",
  }).then((result) => {
    if (result.isConfirmed) {
      ContactHubInfo.splice(cardId, 1);
      localStorageWorker.addUpdateVariable(
        "ContactHubInfo",
        ContactHubInfo,
        true,
      );
      viewSuccessAlert("Contact Deleted Successfully");
      //changes mofifies the whole ui, a reload does all updates!

      setTimeout(() => {
        location.reload();
      }, refreshTimeout);
    }
  });
}
function setDeleteContactListeners() {
  let cards = document.querySelectorAll(".card");
  for (const element of cards) {
    const cardId = Number(element.getAttribute("data-card-id"));
    let btn = element.querySelector(".btnDeleteContact");
    btn.addEventListener("click", function (e) {
      deleteContact(cardId);
      e.stopPropagation();
    });
  }
}

function phoneExists(phone) {
  for (let index = 0; index < ContactHubInfo.length; index++) {
    const element = ContactHubInfo[index];
    if (element.phone == phone) {
      return true;
    }
  }
  return false;
}

function viewSuccessAlert(alertTitle) {
  Swal.fire({
    icon: "success",
    title: alertTitle,
    timer: swal_timeout,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}

function addContact() {
  Swal.fire({
    title: '<span class="fw-bold text-dark">Add New Contact</span>',
    html: `
                    <form id="contactForm" class="text-start needs-validation" novalidate>
                        <!-- Full Name -->
                        <div class="mb-2 d-flex flex-row align-items-center justify-content-between">
                            <label for="swal-fullname" class="form-label fw-semibold small text-secondary">Full Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control w-75" id="swal-fullname" placeholder="e.g. John Doe" required>
                            <div class="invalid-feedback">Please enter a valid full name.</div>
                        </div>

                        <!-- Phone Number -->
                        <div class="mb-2  d-flex flex-row align-items-center justify-content-between">
                            <label for="swal-phone" class="form-label fw-semibold small text-secondary">Phone<span class="text-danger">*</span></label>
                            <input type="text" class="form-control w-75" id="swal-phone" placeholder="e.g. 01012345678" required>
                            <div class="invalid-feedback">Phone must start with 01 followed by 0, 1, 2, or 5 and 8 digits (e.g. 01012345678).</div>
                        </div>

                        <!-- Email -->
                        <div class="mb-2 d-flex flex-row align-items-center justify-content-between">
                            <label for="swal-email" class="form-label fw-semibold small text-secondary">Email<span class="text-danger">*</span></label>
                            <input type="email" class="form-control w-75" id="swal-email" placeholder="name@example.com" required>
                            <div class="invalid-feedback">Please enter a valid email address.</div>
                        </div>

                        <!-- Address -->
                        <div class="mb-2  d-flex flex-row align-items-center justify-content-between">
                            <label for="swal-address" class="form-label fw-semibold small text-secondary">Address <span class="text-danger">*</span></label>
                            <input type="text" class="form-control w-75" id="swal-address" placeholder="Street, City, Country" required>
                            <div class="invalid-feedback">Please provide an address.</div>
                        </div>

                        <!-- Group -->
                        <div class="mb-2  d-flex flex-row align-items-center justify-content-between">
                            <label for="swal-group" class="form-label fw-semibold small text-secondary">Group</label>
                            <select class="form-select w-75" id="swal-group">
                                <option value="Family" selected>Family</option>
                                <option value="Friends">Friends</option>
                                <option value="Work">Work</option>
                                <option value="School">School</option>
                                <option value="Other" >Other</option>
                            </select>
                        </div>

                        <!-- Notes -->
                        <div class="mb-2">
                            <label for="swal-notes" class="form-label fw-semibold small text-secondary">Notes</label>
                            <textarea class="form-control" id="swal-notes" rows="2" placeholder="Additional details..."></textarea>
                        </div>

                        <!-- Checkboxes -->
                        <div class="row mb-2">
                            <div class="col-6">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="swal-favourite">
                                    <label class="form-check-label small text-secondary fw-semibold" for="swal-favourite">
                                    <div class="d-flex flex-row align-items-center justify-content-start">
                                      <i class="fa-solid fa-star text-warning fs-6 me-2"></i>
                                      <span>Favourite</span>
                                    </div>    
                                    </label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="swal-emergency">
                                    <label class="form-check-label small text-secondary fw-semibold" for="swal-emergency">
                                        <div class="d-flex flex-row align-items-center justify-content-start">
                                      <i class="fa-solid fa-heart-pulse text-danger fs-6 me-2"></i>
                                      <span>Emergency</span>
                                    </div> 
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                `,
    showCancelButton: true,
    confirmButtonText: "Save Contact",
    cancelButtonText: "Cancel",
    focusConfirm: false,
    customClass: {
      confirmButton:
        "btn btn-custom-save px-4 py-2 m-1 rounded-pill fw-semibold",
      cancelButton:
        "btn btn-custom-cancel px-4 py-2 m-1 rounded-pill fw-semibold",
    },
    buttonsStyling: false,
    preConfirm: () => {
      const fullname = document.getElementById("swal-fullname").value.trim();
      const phone = document.getElementById("swal-phone").value.trim();
      const email = document.getElementById("swal-email").value.trim();
      const address = document.getElementById("swal-address").value.trim();
      const group = document.getElementById("swal-group").value;
      const notes = document.getElementById("swal-notes").value.trim();
      const isFavourite = document.getElementById("swal-favourite").checked;
      const isEmergency = document.getElementById("swal-emergency").checked;

      // Regex rule: ^01[0125][0-9]{8}$
      const phoneRegex = /^01[0125][0-9]{8}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Manual validation checks with SweetAlert validation messages
      if (!fullname) {
        Swal.showValidationMessage("Full name is required.");
        document.getElementById("swal-fullname").focus();
        return false;
      }
      if (!phone || !phoneRegex.test(phone)) {
        Swal.showValidationMessage(
          "Invalid phone format. Must start with 01 followed by 0, 1, 2, or 5 and 8 digits.",
        );
        document.getElementById("swal-phone").focus();
        return false;
      }
      if (!email || !emailRegex.test(email)) {
        Swal.showValidationMessage("Please enter a valid email address.");
        document.getElementById("swal-email").focus();
        return false;
      }
      if (!address) {
        Swal.showValidationMessage("Address is required.");
        document.getElementById("swal-address").focus();
        return false;
      }

      return {
        fullname,
        phone,
        email,
        address,
        group,
        notes,
        isFavourite,
        isEmergency,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const data = result.value;
      let new_contact = {
        address: data.address,
        createdAt: Date.now(),
        email: data.email,
        group: data.group,
        isEmergency: data.isEmergency,
        isFavourite: data.isFavourite,
        name: data.fullname,
        notes: data.notes,
        phone: data.phone,
        bgColor: {
          red: Math.floor(Math.random() * 256),
          green: Math.floor(Math.random() * 256),
          blue: Math.floor(Math.random() * 256),
        },
      };
      if (!phoneExists(data.phone)) {
        ContactHubInfo.push(new_contact);
        localStorageWorker.addUpdateVariable(
          "ContactHubInfo",
          ContactHubInfo,
          true,
        );
        viewSuccessAlert("Contact Saved Successfully!");
        //changes mofifies the whole ui, a reload does all updates!
        setTimeout(() => {
          location.reload();
        }, refreshTimeout);
      } else {
        Swal.fire({
          title: "Duplicate Phone number detected!",
          icon: "error",
        });
      }
    }
  });
}

function addContactEventListener() {
  btnAddContact.addEventListener("click", function (e) {
    addContact();
    e.stopPropagation();
  });
}

function main() {
  LoadOrInitializeLocalStorage();
  //fill items
  LoadContactStatistics();
  LoadFavouritesList();
  LoadEmergencyList();
  LoadContactCards();
  //event listeners
  addContactEventListener();
  setEditContactListeners();
  setDeleteContactListeners();
  setToggleBookmarkListeners();
  setToggleEmergencyListeners();
}

main();
