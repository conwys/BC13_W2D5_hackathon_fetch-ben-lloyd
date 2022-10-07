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

    let quizGame = await fetch(concatAPI());
    let quizGameData = await quizGame.json();
    let quizDiv = document.querySelector('option-container');
    const quizAnswer = document.createElement('input');
    
    let questions = quizGameData.results;
    for (let i=0;i<questions.length;i++) {
        let currentQuestion = questions[i].question;
        let currentCorrectAnswer = questions[i].correct_answer;


    }
}