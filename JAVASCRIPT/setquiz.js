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

let uid;

function getLoginUser() {

    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid
            const docRef = doc(db, "users", uid);
    
            getDoc(docRef).then((result) => {
                const usercart = result.data();
                welcome.textContent += usercart.username
            })

        }
    })
}
getLoginUser();

const form = document.getElementById('formData')

form.addEventListener('submit', async(event) => {
    event.preventDefault()

    const subject = form.quizSubject.value
    const question = form.question.value
    const option1 = form.option1.value
    const option2 = form.option2.value
    const option3 = form.option3.value
    const option4 = form.option4.value
    const answer = form.answer.value

    const data = {
        subject:subject,
        question:question,
    options: [option1, option2, option3, option4],
    cAnswer: answer,
  }
 
  try {
    const response = await fetch('https://quiz-app-197e0-default-rtdb.firebaseio.com/quizQuestions.json', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        showMessage('success', 'Quiz added successfully!');
    } else {
        showMessage('error', 'Failed to add quiz.');
    }

    setTimeout(() => {
        hideMessage();
    }, 5000); // Hide message after 5 seconds
} catch (error) {
    console.error(error);
}
});




function showMessage(type, text) {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
messageContainer.appendChild(message);
messageContainer.style.display = 'block';
}

function hideMessage() {
    messageContainer.style.display = 'none';
    // Remove all child elements (messages) from the container
    while (messageContainer.firstChild) {
        messageContainer.removeChild(messageContainer.firstChild);
    }
}