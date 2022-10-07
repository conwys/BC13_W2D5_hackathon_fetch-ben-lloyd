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
    let defaultAPI = 'https://opentdb.com/api.php?amount=10';
    if (catValue==="Any Category") {
        catValue="";
    } else if (diffValue==="Any Difficulty") {
        diffValue="";
    }
    
}