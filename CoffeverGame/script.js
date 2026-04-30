var joueur = document.querySelector("#joueur");
var obstacle = document.querySelector("#obstacle");
var score = document.querySelector("#score");
var cartoonBean = document.querySelector("#cartoonBean");
var ecranDeMort = document.querySelector("#ecranDeMort");
var ecranDeJeu = document.querySelector("#gameHolder");
var finalScore = document.querySelector("#finalScore");
var mort = false;
var touchéParGrain = false;

ecranDeMort.style.display = "none";

var timeOfOneFallVoiture = 1000;
var timeOfOneFallGrain = 1500;

var positionXJoueur = 60;
var positionXObstacle = 0;
var positionYObstacle = 0;

var positionXGrain = 0;
var positionYGrain = 0;

var scoreInt = 0;

//Calculateur de points
setInterval(() => {
    if(mort === false)
    {
        scoreInt = scoreInt + 1000/timeOfOneFallVoiture;
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
        if(positionYObstacle < 100)
        {
            positionYObstacle = positionYObstacle + 600/timeOfOneFallVoiture;
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

            timeOfOneFallVoiture = timeOfOneFallVoiture-(timeOfOneFallVoiture/100);

            console.log(timeOfOneFallVoiture);
        }
    }
},10)


//Actualisation de la positionX du grain de café quand elle apparait en haut aléatoirement puis de sa chute
setInterval(()=>{
    if(mort === false)
    {
        if(positionYGrain < 115)
        {
            positionYGrain = positionYGrain + 600/timeOfOneFallGrain;
        }
        else
        {
            var randomPos = Math.random()
            positionYGrain = 0;
            if(randomPos > 0.666)
            {
                positionXGrain = 0;
            }
            else if(randomPos < 0.666 && randomPos > 0.333)
            {
                positionXGrain = 30;
            }
            else{
                positionXGrain = 60;
            }

            timeOfOneFallGrain = timeOfOneFallGrain-(timeOfOneFallGrain/100);

            console.log(timeOfOneFallGraina);
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
    joueur.style.transform = "translate("+positionXJoueur+"vw,80vh)";
    obstacle.style.transform = "translate("+positionXObstacle+"vw,"+positionYObstacle+"vh)";
    cartoonBean.style.transform = "translate("+positionXGrain+"vw,"+positionYGrain+"vh)";
}, 10)

//getBoundingClientRect sert a récupérer la taille et la position
//cette fonction sert à detecter les collisions entre l'obstacle et la voiture
setInterval(()=>{
    if(obstacle.getBoundingClientRect().bottom > joueur.getBoundingClientRect().top && obstacle.getBoundingClientRect().top < joueur.getBoundingClientRect().bottom && obstacle.getBoundingClientRect().right > joueur.getBoundingClientRect().left && obstacle.getBoundingClientRect().left < joueur.getBoundingClientRect().right)
    {
        ecranDeMort.style.display = "flex";
        ecranDeJeu.style.display = "none";
        mort = true
    }
},1)

//cette fonction sert à detecter les collisions entre le grain de café et la voiture
setInterval(()=>{
    if(cartoonBean.getBoundingClientRect().bottom > joueur.getBoundingClientRect().top && cartoonBean.getBoundingClientRect().top < joueur.getBoundingClientRect().bottom && cartoonBean.getBoundingClientRect().right > joueur.getBoundingClientRect().left && cartoonBean.getBoundingClientRect().left < joueur.getBoundingClientRect().right )
    {
        if(touchéParGrain == false){
            scoreInt = scoreInt + 50
            touchéParGrain = true;
            finalScore.textContent = "score final : " + scoreInt
        }

    }
    else
    {
        touchéParGrain = false;
    }
},1)