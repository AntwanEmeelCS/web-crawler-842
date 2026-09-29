let btnTrial = document.getElementById("btnTrial");

btnTrial.addEventListener("click", function (e) {
  TryAlert();
  e.stopPropagation();
});

function TryAlert() {
  CustomDeleteConfirmation();
}

function AlertNormalMessage_OkOnly() {
  Swal.fire("SweetAlert2 is working!");
}

function AlertDetailedMessage_OkOnly() {
  Swal.fire({
    title: "The Internet?", //main header
    text: "That thing is still around?", //sub-header
    icon: "question", //can also hold "success","error","info","warning"
  });
}

function htmlBody_1() {
  Swal.fire({
    title: "<strong>HTML <u>example</u></strong>",
    icon: "info",
    html: `
    You can use <b>bold text</b>,
    <a href="#" autofocus>links</a>,
    and other HTML tags
  `,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `
    👍 Great!
  `,
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: `
    👎
  `,
    cancelButtonAriaLabel: "Thumbs down",
  });
}

function CustomDeleteConfirmation() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed)
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
  });
}

function ShowAddContact() {
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

      Swal.fire({
        icon: "success",
        title: "Contact Saved Successfully!",
        html: `
                            <div class="text-start small bg-light p-3 rounded">
                                <p class="mb-1"><strong>Name:</strong> ${data.fullname}</p>
                                <p class="mb-1"><strong>Phone:</strong> ${data.phone}</p>
                                <p class="mb-1"><strong>Email:</strong> ${data.email}</p>
                                <p class="mb-1"><strong>Address:</strong> ${data.address}</p>
                                <p class="mb-1"><strong>Group:</strong> ${data.group}</p>
                                <p class="mb-1"><strong>Notes:</strong> ${data.notes || "None"}</p>
                                <p class="mb-1"><strong>Favourite:</strong> ${data.isFavourite ? "Yes" : "No"}</p>
                                <p class="mb-0"><strong>Emergency:</strong> ${data.isEmergency ? "Yes" : "No"}</p>
                            </div>
                        `,
        confirmButtonColor: "#6831FA",
      });
    }
  });
}
