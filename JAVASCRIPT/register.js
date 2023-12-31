// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc
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
const db = getFirestore();
const colRef = collection(db, "users");

const form = document.getElementById("getData");
const passwordInput = form.querySelector('input[name="password"]');
const confirmPasswordInput = form.querySelector(
  'input[name="confirmPassword"]'
);
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const emailInput = form.querySelector('input[name="email"]');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const firstname = form.firstname.value;
  const lastname = form.lastname.value;
  const username = form.username.value;
  const email = form.email.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validate that name and username are not empty
  if (
    firstname.trim() === "" ||
    lastname.trim() === "" ||
    username.trim() === ""
  ) {
    // Handle the case where name or username is empty
    //error message and style
    firstnameInput.classList.add("invalid-input");
    lastnameInput.classList.add("invalid-input");
    usernameInput.classList.add("invalid-input");
    emailInput.classList.add("invalid-input");
    passwordInput.classList.add("invalid-input");
    firstError.textContent = "Firstname is required";
    lastError.textContent = "Lastname is required";
    usernameError.textContent = "username is required";
    emailError.textContent = "email is required";
    passwordError.textContent = "password is required";
    return; // Prevent further execution
  } else {
    // Clear any previous validation errors
    firstnameInput.classList.remove("invalid-input");
    lastnameInput.classList.remove("invalid-input");
    usernameInput.classList.remove("invalid-input");
    firstError.textContent = "";
    lastError.textContent = "";
    usernameError.textContent = "";
  }

  if (password !== confirmPassword) {
    passwordInput.classList.add("invalid-input");
    confirmPasswordInput.classList.add("invalid-input");
    passwordError.textContent = "Passwords do not match";
    confirmPasswordError.textContent = "Passwords do not match";
  } else {
    passwordInput.classList.remove("invalid-input");
    confirmPasswordInput.classList.remove("invalid-input");
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    // Disable the submit button and display "Registering..."
    submitButton.disabled = true;
    submitButton.textContent = "Registering...";

    try {
      // Check for unique username here (you need to implement this)
      if (await isUsernameUnique(username)) {
        
      const response  =  await registerUser(firstname, lastname, username, email, password);
      if (response) {
        
        window.location = "../HTML/login.html";
      }
      } else {
        usernameInput.classList.add("invalid-input");
        usernameError.textContent = "Username already exist";
      }
    } catch (error) {
      console.error(error);
    } finally {
      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = "Sign Up";
    }
  }
});

async function registerUser(firstname, lastname, username, email, password) {
  try {
    // Attempt to create a new user account with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      // If the user account is successfully created, add user information to the Firestore database
      const userRef = await setDoc(
        doc(db, "users", user.uid),
        {
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
        },
        { merge: true }
      );
    }
    return true
  } catch (error) {
    // Handle Firebase Authentication errors
    if (error.code && error.message) {
      switch (error.code) {
        case "auth/invalid-email":
          // Invalid email format
          emailInput.classList.add("invalid-input");
          document.getElementById("emailError").textContent = error.message;
          break;
        case "auth/user-disabled":
          // User account is disabled
          emailInput.classList.add("invalid-input");
          document.getElementById("emailError").textContent = error.message;
          break;
        case "auth/user-not-found":
          // User not found
          emailInput.classList.add("invalid-input");
          document.getElementById("emailError").textContent = error.message;
          break;
        case "auth/email-already-in-use":
          // Email is already in use
          emailInput.classList.add("invalid-input");
          document.getElementById("emailError").textContent =
            "Email is already in use.";
          break;
        case "auth/operation-not-allowed":
          // Operation not allowed (e.g., email/password accounts not enabled)
          emailInput.classList.add("invalid-input");
          document.getElementById("emailError").textContent = error.message;
          break;
        case "auth/weak-password":
          // Weak password (e.g., too short)
          passwordInput.classList.add("invalid-input");
          document.getElementById("passwordError").textContent = error.message;
          break;
        default:
          // Handle other Firebase Authentication errors or display a generic error message
          break;
      }
      return false
    }
  }
}

async function isUsernameUnique(username) {
  try {
      const result = await getDocs(colRef);
      const checkForUsername = [];
      
      result.forEach((user) => {
          const id = user.id;
          checkForUsername.push({ id, ...user.data() });
      });

      const exists = checkForUsername.find(usernameToCheck => username === usernameToCheck.username);

      if (exists) {
          // The username exists in the array
          return false;
      } else {
          // The username doesn't exist in the array
          return true;
      }
  } catch (error) {
      // Handle any errors that may occur during the asynchronous operations
      console.error(error);
      return false; // Return false in case of an error
  }
}

