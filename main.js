let index = 0;
let score = 0;
let name;
let selected = 0;
let clicked = true;

myArray = [
  {
    questions: "Which planet has the most moon",
    options: ["Pluto", "Mars", "Saturn", "Uranus"],
    chosenAnswer: "",
    cAnswer: "Saturn",
  },
  {
    questions: "Which part of the plant conducts photosynthesis",
    options: ["Stem", "Leaf", "Root", "Flower"],
    chosenAnswer: "",
    cAnswer: "Leaf",
  },
  {
    questions: "How many hearts does an octopus have",
    options: ["3", "5", "1", "7"],
    chosenAnswer: "",
    cAnswer: "3",
  },
  {
    questions: "Where is the smallest bone in the human body located",
    options: ["Nose", "Eye", "Teeth", "Ear"],
    chosenAnswer: "",
    cAnswer: "Ear",
  },
  {
    questions: "The second World War started in 1935",
    options: ["False", "True"],
    chosenAnswer: "",
    cAnswer: "False",
  },
  {
    questions:
      "Which gas do plants absorb from the atmosphere during photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    chosenAnswer: "",
    cAnswer: "Carbon Dioxide",
  },
  {
    questions: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "N2"],
    chosenAnswer: "",
    cAnswer: "H2O",
  },
  {
    questions: "Which mammal can fly?",
    options: ["Bat", "Dolphin", "Elephant", "Kangaroo"],
    chosenAnswer: "",
    cAnswer: "Bat",
  },
  {
    questions: "What is the capital city of Japan?",
    options: ["Tokyo", "Beijing", "Seoul", "Shanghai"],
    chosenAnswer: "",
    cAnswer: "Tokyo",
  },
  {
    questions: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Mark Twain",
    ],
    chosenAnswer: "",
    cAnswer: "William Shakespeare",
  },
  {
    questions: "What is the largest organ in the human body?",
    options: ["Brain", "Heart", "Liver", "Skin"],
    chosenAnswer: "",
    cAnswer: "Skin",
  },
  {
    questions: "What is the chemical symbol for iron?",
    options: ["Fe", "Ir", "In", "I"],
    chosenAnswer: "",
    cAnswer: "Fe",
  },
  {
    questions: "What is the largest planet in our solar system?",
    options: ["Mars", "Jupiter", "Venus", "Mercury"],
    chosenAnswer: "",
    cAnswer: "Jupiter",
  },
  {
    questions: "Who painted the Mona Lisa?",
    options: [
      "Leonardo da Vinci",
      "Vincent van Gogh",
      "Pablo Picasso",
      "Michelangelo",
    ],
    chosenAnswer: "",
    cAnswer: "Leonardo da Vinci",
  },
  {
    questions: "What is the chemical symbol for gold?",
    options: ["Go", "Au", "Gl", "Ag"],
    chosenAnswer: "",
    cAnswer: "Au",
  },
  {
    questions: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Korea", "Japan", "Thailand"],
    chosenAnswer: "",
    cAnswer: "Japan",
  },
  {
    questions: "What is the tallest mountain in the world?",
    options: [
      "Mount Everest",
      "Mount Kilimanjaro",
      "Mount McKinley",
      "Mount Fuji",
    ],
    chosenAnswer: "",
    cAnswer: "Mount Everest",
  },
  {
    questions: "Who wrote the book '1984'?",
    options: ["George Orwell", "J.K. Rowling", "Harper Lee", "Stephen King"],
    chosenAnswer: "",
    cAnswer: "George Orwell",
  },
  {
    questions: "What is the chemical symbol for oxygen?",
    options: ["O", "Ox", "Oy", "Oz"],
    chosenAnswer: "",
    cAnswer: "O",
  },
];

let welcomeBody = document.getElementById("welcome-body");
let startExam = document.getElementById("startExam");
let input = document.getElementById("input");
let starter = document.getElementById("starter");
let instruction = document.getElementById("instruction");
let mainPage = document.getElementById("main-page");

function startQuiz(param) {
  if (param === "start") {
    welcomeBody.hidden = true;
    startExam.hidden = false;
  } else if (param === "exist") {
    welcomeBody.hidden = false;
    startExam.hidden = true;
    instruction.hidden = true;
    starter.hidden = false;
  } else if (param === "exam") {
    if (input.value) {
      startExam.hidden = true;
      name = input.value;
      starter.hidden = true;
      instruction.hidden = false;
      userName.innerHTML = `NAME: ${name}`;
    } else {
      input.classList.add("border-danger");
    }
  } else if (param === "startExam") {
    answered.innerHTML = `( You have answerd ${selected} of ${myArray.length})`;
    instruction.hidden = true;
    mainPage.hidden = false;
    userName2.innerHTML = `NAME: ${name}`;
    timer();
    display();
  }
}

let time = document.getElementById("timer");
let second = 90;
let firstModal = document.getElementById("firt-modal");
let lastModal = document.getElementById("last-modal");
function timer() {
  let clear = setInterval(() => {
    time.innerHTML = `00:00:${second}`;

    if (second != 0) {
      second--;
      return;
    }
    clearInterval(clear);
    displayResult();
    // alert()
    submitPage.hidden = false;
    mainPage.hidden = true;
  }, 1000);
}

function display() {
  text.innerHTML = "";

  text.innerHTML += `<p class=" mt-3"> ${index + 1}. ${
    myArray[index].questions
  }</p>`;

  myArray[index].options.forEach((element) => {
    text.innerHTML += ` <p> <label> <input type="radio" name="question" id="lott" value="${element}" >
           ${element} </label> </p>
          `;
  });

  let optionValue = document.querySelectorAll("input");
  optionValue.forEach((element) => {
    if (element.value == myArray[index].chosenAnswer) {
      element.checked = true;
    }
    element.addEventListener("click", () => {
      myArray[index].chosenAnswer = element.value;
      if (myArray[index].cAnswer == myArray[index].chosenAnswer) {
        score++;
        displayResult();
      } else {
      }
      if (element.checked === true && clicked === true) {
        clicked = false;
        answered.innerHTML = `( You have answerd ${++selected} of ${
          myArray.length
        } )`;
      }
    });
  });
}

function nextQuestion() {
  clicked = true;
  if (index + 1 < myArray.length) {
    index++;
    if (myArray[index].chosenAnswer) {
      clicked = false;
    }

    display();
  }
}
function prevQuestion() {
  clicked = true;
  if (index != 0) {
    index--;
    if (myArray[index].chosenAnswer) {
      clicked = false;
    }
    display();
  }
}
function displayResult() {
  result.innerHTML = `
  <tr>
  <th scope="row">General knowledge</th>
  <td>${myArray.length}</td>
  <td>${selected}</td>
  <td>${score}</td>
</tr>`;
}

let submitPage = document.getElementById("submit");

function submit() {
  let check = confirm("Are you sure you want to submit");
  if (check) {
    displayResult();
    // alert()
    submitPage.hidden = false;
    mainPage.hidden = true;
  }
}
