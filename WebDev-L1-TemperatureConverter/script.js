const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertButton = document.getElementById("convertBtn");

const errorMessage = document.getElementById("errorMessage");
const resultSection = document.getElementById("resultSection");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");


// =========================================
// CONVERT TEMPERATURE
// =========================================

convertButton.addEventListener("click", function () {

    const inputValue = temperatureInput.value.trim();
    const unit = unitSelect.value;

    // Remove previous error
    errorMessage.style.display = "none";


    // =====================================
    // VALIDATE EMPTY INPUT
    // =====================================

    if (inputValue === "") {

        showError("Please enter a temperature value.");

        return;
    }


    // Convert input into number
    const temperature = Number(inputValue);


    // =====================================
    // VALIDATE NUMERIC INPUT
    // =====================================

    if (!Number.isFinite(temperature)) {

        showError("Please enter a valid numeric temperature.");

        return;
    }


    // =====================================
    // CONVERT TO CELSIUS FIRST
    // =====================================

    let celsius;


    if (unit === "celsius") {

        celsius = temperature;

    } else if (unit === "fahrenheit") {

        celsius = (temperature - 32) * 5 / 9;

    } else if (unit === "kelvin") {

        celsius = temperature - 273.15;
    }


    // =====================================
    // ABSOLUTE ZERO VALIDATION
    // =====================================

    if (celsius < -273.15) {

        showError(
            "Invalid temperature! Temperature cannot be below absolute zero (-273.15°C)."
        );

        clearResults();

        return;
    }


    // =====================================
    // CONVERT TO ALL UNITS
    // =====================================

    const fahrenheit = (celsius * 9 / 5) + 32;

    const kelvin = celsius + 273.15;


    // =====================================
    // DISPLAY RESULTS
    // =====================================

    celsiusResult.textContent = `${celsius.toFixed(2)} °C`;

    fahrenheitResult.textContent =
        `${fahrenheit.toFixed(2)} °F`;

    kelvinResult.textContent =
        `${kelvin.toFixed(2)} K`;

});


// =========================================
// ERROR FUNCTION
// =========================================

function showError(message) {

    errorMessage.textContent = message;

    errorMessage.style.display = "block";

    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


// =========================================
// CLEAR RESULTS
// =========================================

function clearResults() {

    celsiusResult.textContent = "--";

    fahrenheitResult.textContent = "--";

    kelvinResult.textContent = "--";
}


// =========================================
// REAL-TIME VALIDATION
// =========================================

temperatureInput.addEventListener("input", function () {

    errorMessage.style.display = "none";
});
