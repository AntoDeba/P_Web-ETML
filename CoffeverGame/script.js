var joueur = document.querySelector("#joueur");
var obstacle = document.querySelector("#obstacle");
var score = document.querySelector("#score");
var cartoonBean = document.querySelector("#cartoonBean");
var ecranDeMort = document.querySelector("#ecranDeMort");
var ecranDeJeu = document.querySelector("#gameHolder");
var finalScore = document.querySelector("#finalScore");
var mort = false;
var IsHitByCoffeeBean = false;
var boutonDroite = document.querySelector('#buttonRight');
var boutonGauche = document.querySelector('#buttonLeft');
var timeOfOneFallVoiture = 1000;
var timeOfOneFallGrain = 1500;
var positionXJoueur = 60;
var positionXObstacle = 0;
var positionYObstacle = 0;
var positionXGrain = 0;
var positionYGrain = 0;
var scoreInt = 0;
var bestScoreInt = localStorage.getItem("bestScoreInt");
var bestScore = document.querySelector('#bestScore');
var popUp = document.querySelector('#popUp');
var TimeToLivePopUp = 400;
var isGold = false;
var isInvincible = false;
var BeingHitByCar = false;

ecranDeMort.style.display = "none";

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
        }
    }
},10)


//Actualisation de la positionX du grain de café quand il apparait en haut aléatoirement puis de sa chute
setInterval(()=>{
    if(mort === false)
    {
        if(positionYGrain < 100)
        {
            positionYGrain = positionYGrain + 600/timeOfOneFallGrain;
        }
        else
        {
            var randomPos = Math.random()
            positionYGrain = 0;
            cartoonBean.style.opacity = "100%";
            if(randomPos > 0.66666)
            {
                positionXGrain = 0;
            }
            else if(randomPos < 0.66666 && randomPos > 0.33333)
            {
                positionXGrain = 30;
            }
            else{
                positionXGrain = 60;
            }

            isGold = false;
            cartoonBean.src="../img/beanPixelated.png";
            var randomGold = Math.random()
            if(randomGold < 0.02)
            {
                isGold = true;
                cartoonBean.src="../img/GoldenBeanPixelated.png";
            }

            timeOfOneFallGrain = timeOfOneFallGrain-(timeOfOneFallGrain/100);

            console.log(timeOfOneFallGrain);
        }
    }
},10)


//detection des touches
document.addEventListener('keydown', function(event) {
    
    console.log(event.key);

    if(event.key === 'a'&& positionXJoueur > 0)
    {
        
        positionXJoueur = positionXJoueur - 30;
    }
    
    if(event.key === 'd' && positionXJoueur < 60)
    {
        positionXJoueur = positionXJoueur + 30;
    }
})
//détection des boutons
boutonDroite.addEventListener("click", (event) => {
    if(positionXJoueur < 60)
    {
        positionXJoueur = positionXJoueur + 30;
    }
});
boutonGauche.addEventListener("click", (event) => {
    if(positionXJoueur > 0){
        positionXJoueur = positionXJoueur - 30;
    }
   
});

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
        BeingHitByCar = true;
        if(isInvincible == false)
        {
            ecranDeMort.style.display = "flex";
            ecranDeJeu.style.display = "none";
            finalScore.textContent = "score final : " + scoreInt
            if(bestScoreInt < scoreInt)
            {
                bestScore.textContent = "NOUVEAU MEILLEUR SCORE !!!"
                localStorage.setItem("bestScoreInt", scoreInt);
            }
            else{
                bestScore.textContent = "Meilleur score: "+bestScoreInt
            }
            
            mort = true
        }
    }
    else
    {
        if(BeingHitByCar == true)
        {
            isInvincible = false; //enlève l'invincibilité causer par le grain doré
            joueur.src="../img/joueur.png";
            BeingHitByCar = false;
        }
        
    }
},1)


//cette fonction sert à detecter les collisions entre le grain de café et la voiture
setInterval(()=>{
    if(cartoonBean.getBoundingClientRect().bottom > joueur.getBoundingClientRect().top && cartoonBean.getBoundingClientRect().top < joueur.getBoundingClientRect().bottom && cartoonBean.getBoundingClientRect().right > joueur.getBoundingClientRect().left && cartoonBean.getBoundingClientRect().left < joueur.getBoundingClientRect().right )
    {

        if(IsHitByCoffeeBean == false){
            scoreInt = scoreInt + 50
            IsHitByCoffeeBean = true;
            cartoonBean.style.opacity = "0%";
            
            popUp.style.transform = "translate("+positionXGrain+"vw,"+positionYGrain+"vh)";
            popUp.style.opacity = "100%";
        }

        if(isGold == true)
        {
            isInvincible = true;
            joueur.src="../img/joueurGolden.png";
        }
    }
    else
    {
        IsHitByCoffeeBean = false;
    }
},1)

//Supprime la popup après un certain temps en vérifiant si elle a changer de position
setInterval(()=>{

    if(IsHitByCoffeeBean == true){
        TimeToLivePopUp = TimeToLivePopUp -1;
    }
    if(TimeToLivePopUp < 400)
    {
        TimeToLivePopUp = TimeToLivePopUp -1;
    }
    if(TimeToLivePopUp == 0)
    {
        TimeToLivePopUp = 400;
        popUp.style.opacity = "0%";
    }
    
},1)