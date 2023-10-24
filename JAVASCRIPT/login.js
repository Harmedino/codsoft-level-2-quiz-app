// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYqhdVwi2yDV0DmP1iZTBtDmiXcvVA1iQ",
  authDomain: "quiz-app-197e0.firebaseapp.com",
  projectId: "quiz-app-197e0",
  storageBucket: "quiz-app-197e0.appspot.com",
  messagingSenderId: "246587546388",
  appId: "1:246587546388:web:0d5a3e0d6fd6d9c1580001",
  measurementId: "G-JDWQ596NBY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();


const form = document.getElementById("getData");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const submitButton = document.querySelector("button[type='submit']");

    // Clear any previous error messages and reset the button text
    emailError.textContent = "";
    passwordError.textContent = "";
    submitButton.textContent = "Logging in";

    const email = emailInput.value;
    const password = passwordInput.value;

    // Validate email and password
    if (!email || !password) {
        if (!email) {
            emailInput.classList.add("invalid-input");
            emailError.textContent = "Email is required.";
        }
        if (!password) {
            passwordInput.classList.add("invalid-input");
            passwordError.textContent = "Password is required.";
        }
        // Reset the button text
        submitButton.textContent = "Login";
    } else {
        // Clear any previous input errors
        emailInput.classList.remove("invalid-input");
        passwordInput.classList.remove("invalid-input");

        try {
            // Attempt to sign in
            await signInWithEmailAndPassword(auth, email, password);

            window.location = '../index.html'
            // Successful login, you can redirect to the dashboard or handle it as needed
        } catch (error) {
            // Handle Firebase Authentication errors
            if (error.code && error.message) {
                switch (error.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                    case "auth/wrong-password":
                        emailInput.classList.add("invalid-input");
                        emailError.textContent = error.message;
                        break;
                    default:
                        passwordInput.classList.add("invalid-input");
                        passwordError.textContent = error.message;
                }
            }
        } finally {
            // Reset the button text after the login process
            submitButton.textContent = "Login";
        }
    }
});

