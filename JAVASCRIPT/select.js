// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged
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


const response = await fetch('https://quiz-app-197e0-default-rtdb.firebaseio.com/quizQuestions.json', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
        'Content-Type': 'application/json',
    },
});