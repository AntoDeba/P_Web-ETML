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
var isMAN = false;

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

            isMAN = false;
            var randomCar = Math.random()
            if(randomCar < 0.3)
            {
                obstacle.src="../img/voiture1.png";
                
            }
            if(randomCar > 0.3 && randomCar < 0.6)
            {
                obstacle.src="../img/voiture2.png";
            }
            if(randomCar > 0.6 && randomCar < 0.98){
                obstacle.src="../img/voiture3.png";
            }
            if(randomCar > 0.98)
            {
                obstacle.src="../img/MAN.gif";
                isMAN = true;
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

    if((event.key === 'A'||event.key === 'a'||event.key === 'ArrowLeft')&& positionXJoueur > 0)
    {
        
        positionXJoueur = positionXJoueur - 30;
    }
    
    if((event.key === 'D'||event.key === 'd'||event.key === 'ArrowRight')&& positionXJoueur < 60)
    {
        positionXJoueur = positionXJoueur + 30;
    }
    if(event.key === 'r'|| event.key === 'R')
    {
        window.location.replace("./jeu.html");
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
            if(isMAN === true) //lance la cinématique si on est rentré dans le conducteur de MAN
            {
                if(bestScoreInt < scoreInt)
                {
                    localStorage.setItem("bestScoreInt", scoreInt);
                    
                }

                console.log("TIME TO DIE");
                window.location.replace("./cinematique.html");

            }
            else
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