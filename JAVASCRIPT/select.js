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



async function fetchAvailableQuestions() {
    try {
        const response = await fetch('https://quiz-app-197e0-default-rtdb.firebaseio.com/quizQuestions.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data) {
            // Extract the subject data
            const subjectData = Object.values(data)[0];
            if (subjectData && Array.isArray(subjectData.options)) {
                const subjects = subjectData.options;
                updateSubjectList(subjects);
            } else {
                throw new Error('Invalid data format');
            }
        } else {
            throw new Error('No data found');
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
        // You can handle the error here, for example, by displaying an error message to the user.
    }
}

function updateSubjectList(subjects) {
    const subjectList = document.querySelector('.subject-list');
    subjectList.innerHTML = '';

    subjects.forEach((subject, index) => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = `#`;
        anchor.textContent = `Option ${index + 1}: ${subject}`;
        listItem.appendChild(anchor);
        subjectList.appendChild(listItem);
    });
}

fetchAvailableQuestions();

