
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
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
    measurementId: "G-JDWQ596NBY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const db = getFirestore();
const colRef = collection(db, "users");

  const form = document.getElementById('getData');
  const passwordInput = form.querySelector('input[name="password"]');
  const confirmPasswordInput = form.querySelector('input[name="confirmPassword"]');
  const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const emailInput = form.querySelector('input[name="email"]');
  
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const username = form.username.value;
    const email = form.email.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validate that name and username are not empty
    if (firstname.trim() === '' || lastname.trim()=== '' || username.trim() === '') {
        // Handle the case where name or username is empty
        //error message and style
        firstnameInput.classList.add('invalid-input');
        lastnameInput.classList.add('invalid-input');
        usernameInput.classList.add('invalid-input');
        emailInput.classList.add('invalid-input');
        passwordInput.classList.add('invalid-input');
        firstError.textContent = 'Firstname is required';
        lastError.textContent = 'Lastname is required';
        usernameError.textContent = 'username is required';
        emailError.textContent = 'email is required';
        passwordError.textContent = 'password is required';
        return; // Prevent further execution
    } else {
        // Clear any previous validation errors
        firstnameInput.classList.remove('invalid-input');
        lastnameInput.classList.remove('invalid-input');
        usernameInput.classList.remove('invalid-input');
        firstError.textContent = '';
        lastError.textContent = '';
        usernameError.textContent = '';
    }

    if (password !== confirmPassword) {
        passwordInput.classList.add('invalid-input');
        confirmPasswordInput.classList.add('invalid-input');
        passwordError.textContent = 'Passwords do not match';
        confirmPasswordError.textContent = 'Passwords do not match';
    } else {
        passwordInput.classList.remove('invalid-input');
        confirmPasswordInput.classList.remove('invalid-input');
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        // Disable the submit button and display "Registering..."
        submitButton.disabled = true;
        submitButton.textContent = 'Registering...';

        try {
            // Check for unique username here (you need to implement this)
            if (await isUsernameUnique(username)) {
                await registerUser(firstname,lastname, username, email, password);
            } else {
                usernameInput.classList.add('invalid-input');
                usernameError.textContent = 'Username already exist';
            }
        } catch (error) {
            console.error(error);
        } finally {
            // Re-enable the submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Sign Up';
        }
    }
});

  async function registerUser(firstname,lastname,username, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user) {
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
    } catch (error) {
       
        if (error.code && error.message) {
            switch (error.code) {
                case 'auth/invalid-email':
                    emailInput.classList.add('invalid-input');
                    document.getElementById('emailError').textContent = error.message;
                    break;
                case 'auth/user-disabled':
                    emailInput.classList.add('invalid-input');
                    document.getElementById('emailError').textContent = error.message;
                    break;
                case 'auth/user-not-found':
                    emailInput.classList.add('invalid-input');
                    document.getElementById('emailError').textContent = error.message;
                    break;
                case 'auth/email-already-in-use':
                    emailInput.classList.add('invalid-input');
                    document.getElementById('emailError').textContent = 'Email is already in use.';
                    break;
                case 'auth/operation-not-allowed':
                    emailInput.classList.add('invalid-input');
                    document.getElementById('emailError').textContent = error.message;
                    break;
                case 'auth/weak-password':
                    passwordInput.classList.add('invalid-input');
                    document.getElementById('passwordError').textContent = error.message;
                    break;
                default:
                    // Handle other errors or display a generic error message
                    break;
            }
        }
    }
}

async function isUsernameUnique(username) {
    try {
        const querySnapshot = await getDocs(colRef);
        
        for (const userDoc of querySnapshot.docs) {
            const userData = userDoc.data();
            if (userData.username === username) {
                // Username exists, so return false
                return false;
            }
        }
        
        // Username is unique, so return true
        return true;
    } catch (error) {
        console.error(error);
        // Handle any potential errors
        return false;
    }
}



  
