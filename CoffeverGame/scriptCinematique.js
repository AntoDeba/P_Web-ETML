var textes = document.querySelector('#texte');
var tempsEcoulé = 0;
var tempsEcouléAnnee = 0;



fetch("dialogue.txt")
.then((res) => res.text())
    .then((inputText) => { //lit le fichier et stocke le texte dans inputText
    const lines = inputText.split('\n');  //Découpe le texte et le met dans une liste de ligne
    var ID = 0;
    

    document.addEventListener('keydown', function(event) {

    if((event.key === 'Enter'))
    {
        if(lines[ID] === lines[-1])
        {
            
            tempsEcoulé = tempsEcoulé + 1;
            
            if(tempsEcoulé % 365 === 0)
            {
                tempsEcoulé = 0;
                tempsEcouléAnnee = tempsEcouléAnnee + 1;
            }

            textes.textContent = "["+tempsEcouléAnnee+" années et"+tempsEcoulé+" jours s'écoulent]";
        }
        else
        {
            textes.textContent = lines[ID];
            ID = ID + 1;
        }

    }

    
    });
})
.catch((e) => console.error(e));

