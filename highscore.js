
//function to clear highscores 
function clearHighscore(){
    window.localStorage.clear();
    window.location.reload();

}
//loading highscores in html
function loadHighscores(){
const highscoreString=window.localStorage.getItem("highScores");
const highscorePairs=highscoreString.split(";").slice(0, -1);
for (const highScore of highscorePairs){
    let [initials, score] =highScore.split(",");
    console.log(initials, score);
    const template=document.querySelector("#highscoreRow");
    const newRow=template.content.cloneNode(true);
    newRow.querySelector("li").innerHTML=`${initials} - ${score}`;
    const highscoreContainer=document.querySelector("#highscore-container");
    highscoreContainer.appendChild(newRow);



}
}

window.onload=loadHighscores;
