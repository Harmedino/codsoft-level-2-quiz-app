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
let userdata
// Function to show a loading spinner
function showLoadingSpinner() {
    document.getElementById("loading-spinner").style.display = "block";
}

// Function to hide the loading spinner
function hideLoadingSpinner() {
    // Hide the loading spinner when the data is ready
    document.getElementById("loading-spinner").style.display = "none";
    document.getElementById("container").style.display = "block"; 
}

let isLoggedIn;

function getLoginUser() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            isLoggedIn = user;
            if (user) {
                uid = user.uid;
                const docRef = doc(db, "users", uid);

                getDoc(docRef).then((result) => {
                    userdata = result.data();
                    welcome.textContent += userdata.username;
                    hideLoadingSpinner();
                    resolve(); 
                });
            } else {
                hideLoadingSpinner(); // Hide the loading spinner when the user is not authenticated
                resolve(); // Resolve the promise if the user is not authenticated.
            }
        });
    });
}

// Show the loading spinner when the page loads
showLoadingSpinner();

getLoginUser().then(() => {
    // Page guard
    if (isLoggedIn) {
        // Allow access to the page
    } else {
        // Redirect to another page or display an error message
        window.location.href = '../index.html'; // Redirect to a denied access page
    }
});






const form = document.getElementById('formData');
const addQuestionButton = document.getElementById('addQuestion');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Reset error messages
    clearErrorMessages();

    // Disable the "Add Question" button
    addQuestionButton.disabled = true;

    const subject = form.quizSubject.value;
    const question = form.question.value;
    const option1 = form.option1.value;
    const option2 = form.option2.value;
    const option3 = form.option3.value;
    const option4 = form.option4.value;
    const answer = form.answer.value;

    const data = {
        subject: subject,
        question: question,
        options: [option1, option2, option3, option4],
        cAnswer: answer,
        createdBy : usercart.username
    };

    // Validate form fields
    if (validateForm()) {
        // If the form is valid, proceed with submission
        submitForm(data);
        
    }


});

// Function to submit form

async function submitForm(params) {
    
    try {
        const response = await fetch('https://quiz-app-197e0-default-rtdb.firebaseio.com/quizQuestions.json', {
            method: 'POST',
            body: JSON.stringify(params),
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
            // Re-enable the "Add Question" button
            addQuestionButton.disabled = false;
        }, 5000); // Hide message after 5 seconds
    } catch (error) {
        console.error(error);
        // Re-enable the "Add Question" button in case of an error
        addQuestionButton.disabled = false;
    } 
    addQuestionButton.disabled = false;
}


let isValid = true;

// Function to validate form fields
function validateForm() {

    // Validation for subject
    const subject = form.quizSubject.value;
    if (subject.trim() === '') {
        isValid = false;
        showError('quizSubject', 'Subject is required');
    }


 // Validation for question
 const question = form.question.value;
 if (question.trim() === '') {
     isValid = false;
     showError('question', 'Question is required');
 }
 
 // Validation for options
 const options = ['option1', 'option2', 'option3', 'option4'];
 options.forEach((option, index) => {
     const value = form[option].value;
      if (value.trim() === '') {
          isValid = false;
          showError(option, `Option ${index + 1} is required`);
        }
    });
    
    // Validation for correctOption
    const correctOption = form.answer.value;
    if (correctOption.trim() === '') {
        isValid = false;
        showError('answer', 'correct option is required');
    }
}
// Function to show error messages
function showError(inputName, errorMessage) {
    const input = form[inputName];
    input.classList.add('is-invalid');
    const errorContainer = document.getElementById(inputName + 'Error');
    errorContainer.textContent = errorMessage;
}

// function to clar error messages
function clearErrorMessages() {
    const invalidInputs = form.querySelectorAll('.is-invalid');
    invalidInputs.forEach((input) => {
        input.classList.remove('is-invalid');
    });

    const errorContainers = form.querySelectorAll('.error');
    errorContainers.forEach((container) => {
        container.textContent = '';
    })
}


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