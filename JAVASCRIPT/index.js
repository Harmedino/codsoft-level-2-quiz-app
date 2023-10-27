// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,signOut,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {
    getDoc,
    getFirestore,
    doc
  } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

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
const db = getFirestore()

let uid;

// Function to update the user interface based on the user's login status
function updateUI(user,username) {
    const text = document.getElementById("usernamee");
    const logoutButton = document.getElementById("logout");
    if (user || username) {
        // User is logged in
        text.textContent = username; 
        logoutButton.textContent = "Log Out";
    } else {
        // User is not logged in
        text.textContent = "Please log in to access our service"; 
        logoutButton.textContent = "Log In"; 
    }
}

async function getLoginUser() {
    let user = null;
    let username = null;

    user = await new Promise((resolve) => {
        onAuthStateChanged(auth, (authUser) => {
            resolve(authUser);
        });
    });

    if (user) {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        const result = await getDoc(docRef);
        const userdata = result.data();
        username = userdata.username;
    }

    updateUI(user, username);
}

getLoginUser();



const logout = document.getElementById('logout')

logout.addEventListener('click', () => {
    
    signOut(auth)
    .then((result) => {
      window.location = "../HTML/login.html";
    })
    .catch((err) => console.log("unable to logout"));

})