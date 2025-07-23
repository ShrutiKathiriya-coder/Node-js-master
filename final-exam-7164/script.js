const questions = [
  {
    question: "what is the full form of CSS?",
    options: [
      " A. Computer Style Sheet",
      " B. Common Style Sheet",
      " C. Colorful Style Sheet",
      " D. Cascading Style Sheet"
    ],
    ans: 3
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: [" A. <script>",
      " B. <style>",
      " C. <css>",
      " D. <link>"],
    ans: 1
  },
  {
    question: "what is the full form of HTML ?",
    options: [
      " A. float",
      " B. string",
      " C. boolean",
      " D. number"
    ],
    ans: 0
  },
  {
    question: " Which tag is used to display an image in HTML?",
    options: [
      " A. <image>",
      " B. <pic>",
      " C. <img>",
      " D. <src>"
    ],
    ans: 2
  },
  {
    question: "which HTML element do we put JavaScript?",
    options: [" A.<js>",
      " B. <scripting>",
      " C. <javascript>",
      " D. <script>"],
    ans: 3
  }
];

let current = 0;
let answer = [];
let secound = 20;
let timer;


const qtext = document.getElementById("question");
const qlist = document.getElementById("options");
const plist = document.getElementById("priview");
const showtime = document.getElementById("time");
const result = document.getElementById("result");

function start() {
  clearInterval(timer);
  secound = 20;
  showtime.textContent = secound;

  timer = setInterval(() => {
    secound--;
    showtime.textContent = secound;

    if (secound <= 0) {
      clearInterval(timer);
      nextq();
    }
  }, 1000);
}

function question(index) {
  const q = questions[index];
  qtext.textContent = q.question;
  qlist.innerHTML = "";

  q.options.forEach((optionText, i) => {
    const li = document.createElement("li");
    li.textContent = optionText;

    if (answer[index] === i) {
      li.classList.add("selected");
    }

    li.addEventListener("click", () => {
      answer[index] = i;
      question(index);
    });

    qlist.appendChild(li);
  });

  plist.textContent = `${index + 1} of ${questions.length} Questions`;
  start();
}

function nextq() {
  if (current < questions.length - 1) {
    current++;
    question(current);
  } else {
    Result();
  }
}

function prevq() {
  if (current > 0) {
    current--;
    question(current);
  }
}

function Result() {
  clearInterval(timer);
  let mark = 0;

  questions.forEach((q, i) => {
    if (answer[i] === q.ans) {
      mark++;
    }
  });

  qtext.textContent = "Quiz Completed!";
  qlist.innerHTML = "";
  result.textContent = `You mark ${mark} out of ${questions.length}`;

  document.getElementById("nextBtn").disabled = true;
  document.getElementById("prevBtn").disabled = true;
}

document.getElementById("nextBtn").addEventListener("click", nextq);
document.getElementById("prevBtn").addEventListener("click", prevq);

question(current);
