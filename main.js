const categorySelector = document.getElementById('category');
const difficultySelector = document.getElementById('difficulty');
const questionCount = document.querySelector('input');

categorySelector.addEventListener("change", () => {
    let catValue = categorySelector.selectedIndex + 8;
    if (catValue <= 8) {
        catValue=0;
    }
    console.log(catValue);
});

difficultySelector.addEventListener("change",() => {
    const diffValue = difficultySelector.options[difficultySelector.selectedIndex].text;
    console.log(diffValue);
});

function concatAPI(catValue, diffValue) {
    diffValue = difficultySelector.options[difficultySelector.selectedIndex].text;
    diffValue = diffValue.toLowerCase();
    catValue = (categorySelector.selectedIndex) + 8;
    let questionNum = questionCount.value;
    let questionStr = "?amount=";
    let catStr = "&category=";
    let diffStr = "&difficulty=";
    let defaultAPI = 'https://opentdb.com/api.php';

    if (catValue<=8) {
        catValue="";
        catStr="";
    } else {
        catStr=(catStr)+(catValue);
    }

    if (diffValue==="any difficulty") {
        diffValue="";
        diffStr="";
    } else {
        diffStr=(diffStr)+(diffValue);
    }
    
    if (questionNum==="0") {
        questionNum=10;
        questionStr=(questionStr)+(questionNum);
    } else if (questionNum==="") {
        questionNum=10;
        questionStr=(questionStr)+(questionNum);
    } else {
        questionStr=(questionStr)+(questionNum);
    }


    let finalAPI = defaultAPI+questionStr+catStr+diffStr;

    return finalAPI;
    
}

async function startQuiz() {

    let time=30;
    let score=0;

    let quizButton = document.querySelector('button');
    quizButton.style.display = 'none';

    let quizGame = await fetch(concatAPI());
    let quizGameData = await quizGame.json();
    const quizContainer = document.querySelector('.quiz-container');
    const quizInstance = document.createElement('div');
    let quizQuestionLabel = document.createElement('p');
    const quizAnswer = document.createElement('input');
    const quizAnswerButton = document.createElement('button');
    let quizTimer = document.createElement('p');
    
    quizContainer.appendChild(quizInstance);
    quizInstance.appendChild(quizTimer);
    quizInstance.appendChild(quizQuestionLabel);
    quizInstance.appendChild(quizAnswer);
    quizInstance.appendChild(quizAnswerButton);

    quizInstance.id="quizInstance";
    quizQuestionLabel.id="questionLabel";
    quizAnswer.id="questionInput";
    quizAnswer.placeholder="Enter answer here.."
    quizAnswerButton.textContent="Submit";
    quizAnswerButton.id="answerButton"
    quizAnswerButton.onclick="checkAnswer()"
    quizTimer.id="quizTimer";

    quizQuestionLabel.textContent="Question will appear here!"
    quizTimer.textContent=time;
    
    let questions = quizGameData.results;

    console.log(questions);

    let firstQuestion = questions[0].question;
    let firstQuestionAnswer = questions[0].correct_answer;
    quizQuestionLabel.textContent=firstQuestion;

    var index = 1;
    var interval = setInterval(function(){
        let currentQuestion = questions[index++].question;
        let currentCorrectAnswer = questions[index++].correct_answer;
        quizQuestionLabel.textContent=currentQuestion;

        function checkAnswer() {
            let inputtedAnswer = document.querySelector('#answerButton');
            if (inputtedAnswer==currentCorrectAnswer) {
                score++;
                console.log('Correct answer!');
            }
        }

        console.log(currentQuestion)
        if(index == questions.length){
            clearInterval(interval);
        }
    }, 31000)

    setInterval(() => {
        if (time<=0) {
            time=30;
        } else {
            time--;
        }
        quizTimer.textContent=time;
    }, 1000);
}

function checkAnswer(answerResponse, currentCorrectAnswer) {
    const questionResponseInput = document.getElementById('questionInput');
    let userResponse = questionResponseInput.value;
    if (userResponse===currentCorrectAnswer) {
        null;
    }
}