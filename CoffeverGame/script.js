var joueur = document.querySelector("#joueur");
var obstacle = document.querySelector("#obstacle");
var score = document.querySelector("#score");
var cartoonBean = document.querySelector("#cartoonBean");
var ecranDeMort = document.querySelector("#ecranDeMort");
var ecranDeJeu = document.querySelector("#gameHolder");
var mort = false;

ecranDeMort.style.display = "none";
cartoonBean.style.visibility = "hidden";

var timeOfOneFall = 1000;

var positionXJoueur = 60;
var positionXObstacle = 0;
var positionYObstacle = 0;

var scoreInt = 0;

//Calculateur de points
setInterval(() => {
    if(mort === false)
    {
        scoreInt = scoreInt + 1000/timeOfOneFall;
        scoreInt = Math.round(scoreInt)
        score.textContent = "Score : " + scoreInt;
    }
}, 100)


obstacle.style.transition = "transform 0ms linear";
obstacle.style.transform = "translateX("+positionXObstacle+"vw)";

//Actualisation de la positionX de l'obstacle quand elle apparait en haut aléatoirement puis de sa chute
setInterval(()=>{
    if(mort === false)
    {
        if(positionYObstacle < 60)
        {
            positionYObstacle = positionYObstacle + 600/timeOfOneFall;
        }
        else
        {
            var randomPos = Math.random()
            positionYObstacle = 0;
            if(randomPos > 0.666)
            {
                positionXObstacle = 0;
            }
            else if(randomPos < 0.666 && randomPos > 0.333)
            {
                positionXObstacle = 30;
            }
            else{
                positionXObstacle = 60;
            }

            
            var randomCar = Math.random()
            if(randomCar > 0.666)
            {
                obstacle.src="../img/voiture1.png";
            }
            else if(randomCar < 0.666 && randomPos > 0.333)
            {
                obstacle.src="../img/voiture2.png";
            }
            else{
                obstacle.src="../img/voiture3.png";
            }

            timeOfOneFall = timeOfOneFall-(timeOfOneFall/100);

            console.log(timeOfOneFall);
        }
    }
},10)

//detection des touches
document.addEventListener('keydown', function(event) {
    
    if(event.key === 'a'&& positionXJoueur > 0)
    {
        positionXJoueur = positionXJoueur - 30;
    }
    
    if(event.key === 'd' && positionXJoueur < 60)
    {
        positionXJoueur = positionXJoueur + 30;
    }
})

//Actualisation de la positionX du joueur et la position de l'obstacle
setInterval(() => {
    joueur.style.transform = "translate("+positionXJoueur+"vw,60vh)";
    obstacle.style.transform = "translate("+positionXObstacle+"vw,"+positionYObstacle+"vh)";
}, 10)

//getBoundingClientRect sert a récupérer la taille et la position
//cette fonction sert à detecter les collisions entre le grains de café et la voiture
setInterval(()=>{
    if(obstacle.getBoundingClientRect().bottom > joueur.getBoundingClientRect().top && obstacle.getBoundingClientRect().top < joueur.getBoundingClientRect().bottom && obstacle.getBoundingClientRect().right > joueur.getBoundingClientRect().left && obstacle.getBoundingClientRect().left < joueur.getBoundingClientRect().right)
    {
        ecranDeMort.style.display = "flex";
        ecranDeJeu.style.display = "none";
        mort = true
    }
},1)