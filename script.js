const errors = {
  empty: "Can't be blank",
  wrongFormat: "Wrong format, numbers only",
  invalidMonth: "Must be a valid month",
  expiredDate: "Credit card expired",
};

function createErrorMessage(inputElement, errorMessage) {
  const p = document.createElement("p");
  p.innerText = errors[errorMessage];
  p.classList.add("error");
  inputElement.parentElement.append(p);
}

function resetErrors() {
  document.querySelectorAll(".error-border").forEach((element) => {
    element.classList.remove("error-border");
  });

  document.querySelectorAll(".error").forEach((element) => {
    element.remove();
  });
}

function applyNumberMask(e) {
  let number = e.target.value.split(" ").join("");

  if (number.length > 0)
    number = number.match(new RegExp(".{1,4}", "g")).join(" ");
  e.target.value = number;
  if (!e.target.value) return "0000 0000 0000 0000";

  return e.target.value;
}

function validateCardHolder() {
  if (!cardHolder.value.trim()) {
    cardHolder.classList.add("error-border");
    createErrorMessage(cardHolder, "empty");

    return null;
  }
}

function validateCardNumber() {
  if (!cardNumber.value.trim()) {
    cardNumber.classList.add("error-border");
    createErrorMessage(cardNumber, "empty");

    return null;
  }

  let cardNumberCopy = cardNumber.value.split(" ").join("");

  if (cardNumberCopy.match(new RegExp("^[0-9]{16}$", "g")) === null) {
    cardNumber.classList.add("error-border");
    createErrorMessage(cardNumber, "wrongFormat");

    return null;
  }
}

function validateExpDate() {
  if (!expDateMonth.value.trim()) {
    expDateMonth.classList.add("error-border");
  }

  if (!expDateYear.value.trim()) {
    expDateYear.classList.add("error-border");
  }

  if (
    expDateMonth.classList.contains("error-border") ||
    expDateYear.classList.contains("error-border")
  ) {
    createErrorMessage(expDateMonth.parentElement, "empty");
    return null;
  }

  if (expDateMonth.value.match(new RegExp("^[0-9]{2}$", "g")) === null) {
    expDateMonth.classList.add("error-border");
  }

  if (expDateYear.value.match(new RegExp("^[0-9]{2}$", "g")) === null) {
    expDateYear.classList.add("error-border");
  }

  if (
    expDateMonth.classList.contains("error-border") ||
    expDateYear.classList.contains("error-border")
  ) {
    createErrorMessage(expDateMonth.parentElement, "wrongFormat");
    return null;
  }

  if (expDateMonth.value < 0 || expDateMonth.value > 12) {
    expDateMonth.classList.add("error-border");
    createErrorMessage(expDateMonth.parentElement, "invalidMonth");
    return null;
  }

  const expDateYearFull = "20" + expDateYear.value.substring(0);

  if (new Date(expDateYearFull, expDateMonth.value - 1) < new Date()) {
    expDateMonth.classList.add("error-border");
    expDateYear.classList.add("error-border");
    createErrorMessage(expDateMonth.parentElement, "expiredDate");
    return null;
  }
}

function validateCVC() {
  if (!CVC.value.trim()) {
    CVC.classList.add("error-border");
    createErrorMessage(CVC, "empty");

    return null;
  }

  if (CVC.value.match(new RegExp("^[0-9]{3}$", "g")) === null) {
    CVC.classList.add("error-border");
    createErrorMessage(CVC, "wrongFormat");

    return null;
  }
}

const form = document.querySelector("form");
const completed = document.querySelector(".completed");
const spanCardHolder = document.querySelector("#cardholder-span");
const pCardNumber = document.querySelector("#card-number-paragraph");
const spanExpDateMonth = document.querySelector("#exp-date-month-span");
const spanExpDateYear = document.querySelector("#exp-date-year-span");
const spanCVC = document.querySelector("#cvc-span");
const cardHolder = document.querySelector('input[name="cardholder"]');
const cardNumber = document.querySelector('input[name="card-number"]');
const expDateMonth = document.querySelector('input[name="exp-date-month"]');
const expDateYear = document.querySelector('input[name="exp-date-year"]');
const CVC = document.querySelector('input[name="cvc"]');
const completedButton = document.querySelector("#completed-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  resetErrors();

  validateCardHolder();
  validateCardNumber();
  validateExpDate();
  validateCVC();

  if (document.querySelectorAll(".error-border").length === 0) {
    form.classList.add("d-none");
    completed.classList.replace("d-none", "d-block");
  }
});

cardHolder.addEventListener("input", () => {
  spanCardHolder.innerText = !cardHolder.value
    ? "Jane Appleseed"
    : cardHolder.value;
});

cardNumber.addEventListener("input", (e) => {
  pCardNumber.innerText = applyNumberMask(e);
});

expDateMonth.addEventListener("input", () => {
  spanExpDateMonth.innerText = !expDateMonth.value ? "00" : expDateMonth.value;
});

expDateYear.addEventListener("input", () => {
  spanExpDateYear.innerText = !expDateYear.value ? "00" : expDateYear.value;
});

CVC.addEventListener("input", () => {
  spanCVC.innerText = !CVC.value ? "000" : CVC.value;
});

completedButton.addEventListener("click", () => {
  window.location.reload();
});
