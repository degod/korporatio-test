document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll("form section");
  const stepIndicators = document.querySelectorAll(".stepper .step");
  const nextBtn = document.querySelector(".form-footer .next");
  const backBtn = document.querySelector(".form-footer .back");
  const fieldValidations = [
    {
      inputId: "fullname",
      groupId: "fullnameGroup",
      validatorFn: (val) => val.trim() !== "",
      errorMessage: "Full name is required.",
      step: 0,
    },
    {
      inputId: "email",
      groupId: "emailGroup",
      validatorFn: (val) => val.includes("@") && val.includes("."),
      errorMessage: "Please enter a valid email address.",
      step: 0,
    },
    {
      inputId: "company",
      groupId: "companyGroup",
      validatorFn: (val) => val.trim() !== "",
      errorMessage: "Please enter a company name.",
      step: 1,
    },
    {
      inputId: "altCompany",
      groupId: "altCompanyGroup",
      validatorFn: (val) => val.trim() !== "",
      errorMessage: "Please enter an alternative company name.",
      step: 1,
    },
    {
      inputId: "companyDes",
      groupId: "companyDesGroup",
      validatorFn: (val) => val.trim() !== "",
      errorMessage: "Please select a designation for your company.",
      step: 1,
    },
    {
      inputId: "jurisdiction",
      groupId: "jurisdictionGroup",
      validatorFn: (val) => val.trim() !== "",
      errorMessage: "Please select your country.",
      step: 2,
    },
    {
      inputId: "target-jurisdictions",
      groupId: "target-jurisdictionsGroup",
      validatorFn: (val) => val.trim() !== "",
      errorMessage: "Please select at least one country.",
      step: 2,
    },
    {
      inputId: "shares",
      groupId: "sharesGroup",
      validatorFn: (val) => val.trim() !== "",
      errorMessage: "Please select how many shares you want.",
      step: 3,
    },
    {
      inputId: "sharesIss",
      groupId: "sharesIssGroup",
      validatorFn: (val) => val.trim() !== "",
      errorMessage: "Please select how many shares you want to issue.",
      step: 3,
    },
    {
      inputId: "sharesVal",
      groupId: "sharesValGroup",
      validatorFn: (val) => val.trim() !== "",
      errorMessage: "Please select how much each share is worth.",
      step: 3,
    },
  ];

  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });

    stepIndicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });

    backBtn.style.visibility = index === 0 ? "hidden" : "visible";
    nextBtn.textContent = index === steps.length - 1 ? "SUBMIT" : "NEXT →";
  }

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const isValidForm = validateForm(fieldValidations, currentStep);

    if (!isValidForm) {
      return false;
    } else {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      } else {
        alert("Attempting to submit form...");
      }
    }
  });

  fieldValidations.forEach(({ inputId, groupId, validatorFn, errorMessage }) => {
    const inputEl = document.getElementById(inputId);
    if (inputEl) {
      inputEl.addEventListener("blur", function () {
        validateInput({ inputId, groupId, validatorFn, errorMessage });
      });
    }
  });

  function validateForm(fields, currentStep) {
    let isValid = true;

    const currentStepFields = fields.filter(field => field.step === currentStep);

    currentStepFields.forEach((field) => {
      const result = validateInput(field);
      if (!result) {
        isValid = false;
      }
    });

    return isValid;
  }

  backBtn.addEventListener("click", function () {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  showStep(currentStep);

  // Initialize Select2 after loading the country list
  const countries = [
    "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra",
    "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina",
    "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
    "Belgium", "Belize", "Benin", "Bermuda", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil",
    "British Indian Ocean Territory", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands",
    "Central African Republic", "Chad", "Chile", "China", "Christmas Island",
    "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "The Democratic Republic of Congo",
    "Cook Islands", "Costa Rica", "Ivory Coast", "Croatia", "Cuba",
    "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "East Timor", "Ecuador", "Egypt", "England",
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
    "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji Islands", "Finland",
    "France", "French Guiana", "French Polynesia", "French Southern territories", "Gabon",
    "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar",
    "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam",
    "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong",
    "Hungary", "Iceland", "India", "Indonesia", "Iran",
    "Iraq", "Ireland", "Israel", "Isle of Man", "Italy",
    "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan",
    "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
    "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "North Macedonia",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
    "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius",
    "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova", "Monaco",
    "Mongolia", "Montserrat", "Montenegro", "Morocco", "Mozambique",
    "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger",
    "Nigeria", "Niue", "Norfolk Island", "North Korea", "Northern Ireland",
    "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau",
    "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
    "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico",
    "Qatar", "Reunion", "Romania", "Russia", "Rwanda",
    "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Scotland",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Georgia and the South Sandwich Islands", "South Korea", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland",
    "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
    "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia",
    "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda",
    "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
    "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Wales",
    "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
  ];

  const jurisdictionSelect = document.getElementById('jurisdiction');
  const targetJurisdictionSelect = document.getElementById('target-jurisdictions');

  countries.forEach(c => {
    const opt1 = document.createElement('option');
    opt1.value = c;
    opt1.textContent = c;
    jurisdictionSelect.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = c;
    opt2.textContent = c;
    targetJurisdictionSelect.appendChild(opt2.cloneNode(true));
  });

  // Activate Select2
  $('#jurisdiction').select2({ placeholder: "Select country..." });
  $('#target-jurisdictions').select2({
    placeholder: "Select multiple countries...",
    multiple: true
  });
});

document.querySelector(".save-exit").addEventListener("click", function () {
  alert("Form state saved. You can continue later.");
});

function validateInput({ inputId, groupId, validatorFn, errorMessage }) {
  const inputEl = document.getElementById(inputId);
  const groupEl = document.getElementById(groupId);
  const value = inputEl.value.trim();
  const isValid = validatorFn(value);

  if (!isValid) {
    groupEl.classList.add('error');
    groupEl.classList.remove('success');
    $(`#${groupId} .error-icon`).show();
    $(`#${groupId} .success-icon`).hide();
    $(`#${groupId} .error-message`).text(errorMessage).show();
  } else {
    groupEl.classList.remove('error');
    groupEl.classList.add('success');
    $(`#${groupId} .error-icon`).hide();
    $(`#${groupId} .success-icon`).show();
    $(`#${groupId} .error-message`).hide();
  }

  return isValid;
}

