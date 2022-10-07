const categorySelector = document.getElementById('category');
const difficultySelector = document.getElementById('difficulty');
const questionCount = document.querySelector('input');

categorySelector.addEventListener("change", () => {
    let catValue = categorySelector.options[categorySelector.selectedIndex].text;
    console.log(catValue);
});

difficultySelector.addEventListener("change",() => {
    const diffValue = difficultySelector.options[difficultySelector.selectedIndex].text;
    console.log(diffValue);
});

async function startQuiz(catValue, diffValue) {
    let questionNum = questionCount.value;
    let questionStr = "?amount=";
    let catStr = "&category=";
    let diffStr = "&difficulty=";
    let defaultAPI = 'https://opentdb.com/api.php';

    if (catValue==="Any Category") {
        catValue="";
        catStr="";
    } else {
        catStr=(catStr)+(catValue);
    }

    if (diffValue==="Any Difficulty") {
        diffValue="";
        diffStr="";
    } else {
        diffStr=(diffStr)+(diffValue);
    }
    
    if (questionNum===0) {
        questionNum=10;
        questionStr=+questionNum;
    } else {
        questionStr=(questionStr)+(questionNum);
    }


    let finalAPI = defaultAPI+questionStr+catStr+diffStr;

    console.log(finalAPI)
    
}