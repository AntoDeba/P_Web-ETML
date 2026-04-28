var joueur = document.querySelector("#joueur");
var voleur = document.querySelector("#voleur");
var score = document.querySelector("#score");
var cartoonBean = document.querySelector("#cartoonBean");
var ecranDeMort = document.querySelector("#ecranDeMort");
var ecranDeJeu = document.querySelector("#gameHolder");
var mort = false;

ecranDeMort.style.display = "none";
cartoonBean.style.visibility = "hidden";


var positionXJoueur = 10;
var positionXVoleur = 10;
var scoreInt = 0;
var multiplyer = 1;

//Calculateur de points
setInterval(() => {
    if(mort === false)
    {
        multiplyer = multiplyer + 0.01;
        scoreInt = scoreInt + (1*multiplyer);
        scoreInt = Math.round(scoreInt)
        score.textContent = "Score : " + scoreInt;
    }
}, 100)

//Actualisation de la positionX du joueur
setInterval(() => {
    joueur.style.transform = "translate(calc("+positionXJoueur+"vw + -5vh),60vh)";
}, 10)

//Actualisation de la positionX du voleur
setInterval(() => {
    voleur.style.transform = "translateX(calc("+positionXVoleur+"vw + -5vh))";

    var random = Math.random()

    if(random > 0.5 && positionXVoleur > 5)
    {
        positionXVoleur = positionXVoleur - 5;
    }
        if(random < 0.5 && positionXVoleur < 85)
    {
        positionXVoleur = positionXVoleur + 5;
    }
}, 300)

//detection des touches
document.addEventListener('keydown', function(event) {
    console.log(`Key pressed: ${event.key}`)
    
    if(event.key === 'a'&& positionXJoueur > 5)
    {
        positionXJoueur = positionXJoueur - 5;
    }
    
    if(event.key === 'd' && positionXJoueur < 85)
    {
        positionXJoueur = positionXJoueur + 5;
    }
})



//fait bouger le grain de café
setInterval(()=>{
    cartoonBean.style.transition = "transform 1000ms linear";
    cartoonBean.style.transform = "translate(calc("+positionXJoueur+"vw + -5vh),75vh)";
    cartoonBean.style.visibility = "visible";
    setTimeout(function(){
        cartoonBean.style.visibility = "hidden";
        cartoonBean.style.transition = "transform 0ms linear";
        cartoonBean.style.transform = "translate(calc("+positionXVoleur+"vw + -5vh),0vh)";
    }, 1000);
    
},2000)

//getBoundingClientRect sert a récupérer la taille et la position
//cette fonction sert à detecter les collisions entre le grains de café et la voiture
setInterval(()=>{
    if(cartoonBean.getBoundingClientRect().bottom > joueur.getBoundingClientRect().top && cartoonBean.getBoundingClientRect().top < joueur.getBoundingClientRect().bottom && cartoonBean.getBoundingClientRect().right > joueur.getBoundingClientRect().left && cartoonBean.getBoundingClientRect().left < joueur.getBoundingClientRect().right)
    {
        ecranDeMort.style.display = "flex";
        ecranDeJeu.style.display = "none";
        mort = true
    }
},1)