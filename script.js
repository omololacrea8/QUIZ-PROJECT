(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'white';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "What is the full meaning of CSS?",
      answers: {
        a: "Cascading Style Sheet",
        b: "Computer Section Session",
        c: "Cascading Style Section"
      },
      correctAnswer: "a"
    },
    {
      question: "Which HTML tag is used to define an internal style sheet?",
      answers: {
        a: "script tag",
        b: "style tag",
        c: "css tag"
      },
      correctAnswer: "b"
    },
    {
      question: "Which property is used to change the background color?",
      answers: {
        a: "bgcolor",
        b: "background-color",
        c: "color",
        
      },
      correctAnswer: "b"
    },
    {question: "Which CSS property is used to change the text color of an element?",
      answers: {
        a: "fgcolor",
        b: "text-color",
        c: "color",
        
      },
      correctAnswer: "c"
    },
    {question: "How do you select an element with id 'demo'?",
      answers: {
        a: "demo",
        b: ".demo",
        c: "#demo",
        
      },
      correctAnswer: "c"
    },
    {question: "Which CSS property controls the text size?",
      answers: {
        a: "font-size",
        b: "font-style",
        c: "text-size",
        
      },
      correctAnswer: "a"
    },
    {question: "How do you make a list that lists its items with squares?",
      answers: {
        a: "list-type:square;",
        b: "list-style-type:square;",
        c: "list:square;",
        
      },
      correctAnswer: "b"
    },
    {question: "Which property is used to change the font of an element?",
      answers: {
        a: "font-style",
        b: "font-weight",
        c: "font-family",
        
      },
      correctAnswer: "c"
    },
    {question: "How do you make the text bold?",
      answers: {
        a: "style:bold;",
        b: "font:bold;",
        c: "font-weight:bold;",
        
      },
      correctAnswer: "c"
    },
    {question: "Which property is used to change the left margin of an element?",
      answers: {
        a: "margin-left",
        b: "indent",
        c: "padding-left",
        
      },
      correctAnswer: "a"
    },
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
