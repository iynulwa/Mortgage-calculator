// Clear button
const clearAll = document.getElementById("clear-all");

// Input element
const amount = document.getElementById("amount");
const term = document.getElementById("term");
const interest = document.getElementById("rate");

// Mortgage type
const repayment = document.getElementById("repayment");
const interestOnly = document.getElementById("interest");

// Form and submit button
const form = document.querySelector("form");
const submit = document.getElementById("submit");

// Empty state, Completed state, and result
const emptyState = document.getElementById("empty-state");
const completedState = document.getElementById("completed-state");
const monthlyRepayment = document.getElementById("first-answer");
const termRepayment = document.getElementById("second-answer");


// Activates input element styling
amount.addEventListener("focus", function() {
    setActive(amount);
});

amount.addEventListener("blur", function() {
    setInactive(amount);
});

term.addEventListener("focus", function() {
    setActive(term);
});

term.addEventListener("blur", function() {
    setInactive(term);
});

interest.addEventListener("focus", function() {
    setActive(interest);
});

interest.addEventListener("blur", function() {
    setInactive(interest);
});

function setActive(element) {
    const inputBox = element.parentElement;
    const inputBoxSpan = inputBox.querySelector("span");

    inputBox.classList.add("active");
    inputBoxSpan.classList.add("active");
}

function setInactive (element) {
    const inputBox = element.parentElement;
    const inputBoxSpan = inputBox.querySelector("span");

    inputBox.classList.remove("active");
    inputBoxSpan.classList.remove("active");
}


// Form submission 

submit.addEventListener("click", function(event) {
    event.preventDefault();
    calculateMortgage();
});

// Clears all inputs

clearAll.addEventListener("click", function(event) {
    event.preventDefault();
    form.reset();

    completedState.style.display = "none";
    emptyState.style.display = "block"
});


// Calculates required outputs from given input after validates has been checked for error 

function calculateMortgage() {

    // Error check
    if (!validateInput()) return;

    const mortgageAmount = Number(amount.value);
    const mortgageTerm = Number(term.value);
    const interestRate = Number(rate.value);

    const monthlyMortgageTerm = mortgageTerm * 12;
    const monthlyInterestRate = interestRate / 100 / 12; 

    if (repayment.checked) {
        var numerator = monthlyInterestRate * ((1 + monthlyInterestRate) ** monthlyMortgageTerm);
        var denominator = ((1 + monthlyInterestRate) ** monthlyMortgageTerm) - 1; 
        var firstAnswer = mortgageAmount * (numerator / denominator);
        var secondAnswer = firstAnswer * monthlyMortgageTerm;
        
        monthlyRepayment.innerText = firstAnswer.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        termRepayment.innerText = secondAnswer.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        emptyState.style.display = "none"
        completedState.style.display = "block";

    }

    if (interestOnly.checked) {
        var firstAnswer = mortgageAmount * monthlyInterestRate;
        var secondAnswer = firstAnswer * monthlyMortgageTerm;

        monthlyRepayment.innerText = firstAnswer.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        termRepayment.innerText = secondAnswer.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        emptyState.style.display = "none";
        completedState.style.display = "block";
    }
    
}


// Sets error message and styling

function setError(element, message) {
    const inputBox = element.parentElement;

    const inputControl = element.closest(".input-control");
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputBox.classList.add("errors");
    
}

// clears error message and styling

function setSuccess(element) {
    const inputBox = element.parentElement;

    const inputControl = element.closest(".input-control");
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputBox.classList.remove("errors");
    
}

function validateInput() {

    let isValid = true;

    if (!amount.validity.valid) {
        setError(amount, "This field is required");
        isValid = false;
    } else if (amount.value <= 0) {
        setError(amount, "Mortgage amount cannot be 0 pounds or less");
        isValid = false;
    } else {
        setSuccess(amount);
    }


    if (!term.validity.valid) {
        setError(term, "This field is required");
        isValid = false;
    } else if (term.value <= 0) {
        setError(term, "Mortgage term cannot be 0 or less");
        isValid = false;
    } else {
        setSuccess(term);
    }


    if (!interest.validity.valid) {
        setError(interest, "This field is required");
        isValid = false;
    } else if (interest.value <= 0) {
        setError(interest, "Interest rate cannot be 0 or less");
        isValid = false;
    } else {
        setSuccess(interest);
    }
    
    
    if (!repayment.validity.valid || !interestOnly.validity.valid) {
        setError(repayment, "Please select one of the options")
        isValid = false;
    } else {
        setSuccess(repayment);
    }

    return isValid;

}