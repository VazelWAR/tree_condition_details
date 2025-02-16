'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("tree-form");

    // Function to show validation error
    function showError(input, message) {
        input.classList.add("error");
        let errorSpan = input.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            input.parentNode.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
        errorSpan.style.display = "block";
    }

    // Function to remove validation error
    function clearError(input) {
        input.classList.remove("error");
        let errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error-message")) {
            errorSpan.style.display = "none";
        }
    }

    // Individual field validation
    function validateField(input) {
        const value = input.value.trim();
        const id = input.id;
        let isValid = true;
        
        if (id === "common-name") {
            const nameRegex = /^[A-Za-z\s]+$/;
            if (!nameRegex.test(value)) {
                showError(input, "❌ Only letters and spaces allowed.");
                isValid = false;
            } else {
                clearError(input);
            }
        }

        if (id === "girth" || id === "height") {
            const numberValue = parseFloat(value);
            if (isNaN(numberValue) || numberValue <= 0) {
                showError(input, `❌ Must be a positive number.`);
                isValid = false;
            } else {
                clearError(input);
            }
        }

        if (id === "gps") {
            const gpsRegex = /^-?\d{1,2}\.\d+,\s*-?\d{1,3}\.\d+$/;
            if (!gpsRegex.test(value)) {
                showError(input, "❌ Use format: 12.3456, -98.7654");
                isValid = false;
            } else {
                clearError(input);
            }
        }

        return isValid;
    }

    // Attach event listeners to inputs
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => {
        input.addEventListener("blur", () => validateField(input));
        input.addEventListener("input", () => clearError(input)); // Remove error on typing
    });

    // Form submission validation
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;
        inputs.forEach((input) => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            alert("✅ Form submitted successfully!");
            form.submit(); // Submit if all validations pass
        }
    });
});

