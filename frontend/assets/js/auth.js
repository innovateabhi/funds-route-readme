/* =========================================================
   AUTHENTICATION FRONTEND
========================================================= */


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

document
    .querySelectorAll("[data-password-toggle]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const inputId =
                button.getAttribute(
                    "data-password-toggle"
                );

            const input =
                document.getElementById(inputId);

            if (!input) {
                return;
            }


            if (input.type === "password") {

                input.type = "text";

                button.setAttribute(
                    "aria-label",
                    "Hide password"
                );

                button.textContent = "◉";

            } else {

                input.type = "password";

                button.setAttribute(
                    "aria-label",
                    "Show password"
                );

                button.textContent = "◉";
            }

        });

    });



/* =========================================================
   MESSAGE HELPER
========================================================= */

function showMessage(element, message, type) {

    if (!element) {
        return;
    }

    element.textContent = message;

    element.className =
        "form-message show " + type;
}


function clearMessage(element) {

    if (!element) {
        return;
    }

    element.textContent = "";

    element.className =
        "form-message";
}



/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);
}



/* =========================================================
   LOGIN FORM
========================================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    const loginMessage =
        document.getElementById("loginMessage");


    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        clearMessage(loginMessage);


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim();


        const password =
            document
                .getElementById("loginPassword")
                .value;


        /* =========================
           VALIDATION
        ========================= */

        if (!email) {

            showMessage(
                loginMessage,
                "Please enter your email address.",
                "error"
            );

            return;
        }


        if (!isValidEmail(email)) {

            showMessage(
                loginMessage,
                "Please enter a valid email address.",
                "error"
            );

            return;
        }


        if (!password) {

            showMessage(
                loginMessage,
                "Please enter your password.",
                "error"
            );

            return;
        }


        if (password.length < 6) {

            showMessage(
                loginMessage,
                "Password must contain at least 6 characters.",
                "error"
            );

            return;
        }


        /* =========================
           FRONTEND DEMO
        ========================= */

        showMessage(
            loginMessage,
            "Login form validated successfully. Backend authentication will be connected later.",
            "success"
        );

    });

}



/* =========================================================
   REGISTER FORM
========================================================= */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    const registerMessage =
        document.getElementById(
            "registerMessage"
        );


    registerForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            clearMessage(registerMessage);


            const name =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("registerPassword")
                    .value;


            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            const terms =
                document
                    .getElementById("terms")
                    .checked;



            /* =========================
               VALIDATION
            ========================= */

            if (!name) {

                showMessage(
                    registerMessage,
                    "Please enter your full name.",
                    "error"
                );

                return;
            }


            if (!email) {

                showMessage(
                    registerMessage,
                    "Please enter your email address.",
                    "error"
                );

                return;
            }


            if (!isValidEmail(email)) {

                showMessage(
                    registerMessage,
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            if (!phone) {

                showMessage(
                    registerMessage,
                    "Please enter your mobile number.",
                    "error"
                );

                return;
            }


            if (!password) {

                showMessage(
                    registerMessage,
                    "Please create a password.",
                    "error"
                );

                return;
            }


            if (password.length < 8) {

                showMessage(
                    registerMessage,
                    "Password must contain at least 8 characters.",
                    "error"
                );

                return;
            }


            if (password !== confirmPassword) {

                showMessage(
                    registerMessage,
                    "Passwords do not match.",
                    "error"
                );

                return;
            }


            if (!terms) {

                showMessage(
                    registerMessage,
                    "Please accept the Terms & Conditions.",
                    "error"
                );

                return;
            }



            /* =========================
               FRONTEND DEMO
            ========================= */

            showMessage(
                registerMessage,
                "Registration form validated successfully. Account creation will be connected to the backend later.",
                "success"
            );

        }
    );

}



/* =========================================================
   FORGOT PASSWORD
========================================================= */

const forgotPassword =
    document.getElementById(
        "forgotPassword"
    );


if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        event => {

            event.preventDefault();

            const message =
                document.getElementById(
                    "loginMessage"
                );


            showMessage(
                message,
                "Password recovery will be available when the authentication backend is connected.",
                "success"
            );

        }
    );

}