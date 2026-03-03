// ================= SIGNUP VALIDATION =================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let fullname = document.getElementById("fullname").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let city = document.getElementById("city").value.trim();
        let password = document.getElementById("password").value.trim();
        let confirmPassword = document.getElementById("confirmPassword").value.trim();

        let nameInput = document.getElementById("fullname");
        let emailInput = document.getElementById("email");
        let phoneInput = document.getElementById("phone");
        let cityInput = document.getElementById("city");
        let passwordInput = document.getElementById("password");
        let confirmPasswordInput = document.getElementById("confirmPassword");

        let isValid = true;

        // Clear previous errors
        document.querySelectorAll("small").forEach(el => el.innerText = "");
        document.querySelectorAll(".form-control").forEach(el => {
            el.classList.remove("is-invalid", "is-valid");
        });

        // Full Name
        if (fullname === "") {
            document.getElementById("nameError").innerText = "Full name is required";
            nameInput.classList.add("is-invalid");
            isValid = false;
        } else {
            nameInput.classList.add("is-valid");
        }

        // Email
        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            document.getElementById("emailError").innerText =
                "Enter valid email (example@mail.com)";
            emailInput.classList.add("is-invalid");
            isValid = false;
        } else {
            emailInput.classList.add("is-valid");
        }

        // Phone
        let phonePattern = /^[0-9]{10}$/;
        if (!phone.match(phonePattern)) {
            document.getElementById("phoneError").innerText =
                "Phone number must be 10 digits";
            phoneInput.classList.add("is-invalid");
            isValid = false;
        } else {
            phoneInput.classList.add("is-valid");
        }

        // City
        let cityPattern = /^[A-Za-z ]+$/;
        if (!city.match(cityPattern)) {
            document.getElementById("cityError").innerText =
                "City must contain only alphabets";
            cityInput.classList.add("is-invalid");
            isValid = false;
        } else {
            cityInput.classList.add("is-valid");
        }

        // Password
        let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!password.match(passwordPattern)) {
            document.getElementById("passwordError").innerText =
                "Password must be 8 characters with letters and numbers";
            passwordInput.classList.add("is-invalid");
            isValid = false;
        } else {
            passwordInput.classList.add("is-valid");
        }

        // Confirm Password
        if (password !== confirmPassword) {
            document.getElementById("confirmPasswordError").innerText =
                "Passwords do not match";
            confirmPasswordInput.classList.add("is-invalid");
            isValid = false;
        } else {
            confirmPasswordInput.classList.add("is-valid");
        }

        if (isValid) {
            let userData = {
                fullname,
                email,
                phone,
                city,
                password
            };

            localStorage.setItem("user", JSON.stringify(userData));
            alert("Signup Successful! Please Sign In.");
           window.location.href = "signin.html";
        }
    });
}


// ================= SIGNIN VALIDATION =================

const signinForm = document.getElementById("signinForm");

if (signinForm) {
    signinForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("signinEmail").value.trim();
        let password = document.getElementById("signinPassword").value.trim();

        let emailInput = document.getElementById("signinEmail");
        let passwordInput = document.getElementById("signinPassword");

        let emailError = document.getElementById("signinEmailError");
        let passwordError = document.getElementById("signinPasswordError");

        // Clear previous errors FIRST
        emailError.innerText = "";
        passwordError.innerText = "";
        emailInput.classList.remove("is-invalid", "is-valid");
        passwordInput.classList.remove("is-invalid", "is-valid");

        let storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            alert("No registered user found. Please Sign Up first.");
            return;
        }

        // Email check
        if (email !== storedUser.email) {
            emailError.innerText = "Email not registered";
            emailInput.classList.add("is-invalid");
            return;
        } else {
            emailInput.classList.add("is-valid");
        }

        // Password check
        if (password !== storedUser.password) {
            passwordError.innerText = "Incorrect password";
            passwordInput.classList.add("is-invalid");
            return;
        } else {
            passwordInput.classList.add("is-valid");
        }

        // Success
        localStorage.setItem("isLoggedIn", "true");
        alert("Login Successful!");
        window.location.href ="travelapp.html";
    });
}


// ================= LOGOUT FUNCTION =================

function logout() {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully!");
    window.location.href = "signin.html";
}

// ================= PAGE PROTECTION =================

if (window.location.pathname.includes("travelapp.html")) {
    let isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        alert("Access denied! Please login first.");
        window.location.href ="signin.html";
    }
}
// ================= SHOW / HIDE PASSWORD =================

function togglePassword(fieldId) {
    let field = document.getElementById(fieldId);

    if (field.type === "password") {
        field.type = "text";
    } else {
        field.type = "password";
    }
}
// ================= BOOKING FORM =================

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let bookingModal = new bootstrap.Modal(
            document.getElementById("bookingModal")
        );

        bookingModal.show();
        bookingForm.reset();
    });
}
