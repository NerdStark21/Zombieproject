var speed = {"lv1": 4, "lv2": 3, "lv3": 2, "lv4": 1};


var joueur={
    /*
     * Attributs :
     * pv
     * score
     * hitpoint
     */

    //initialise le joueur
    init: function(pv,score,hitpoint){
        this.pv=pv;
        this.score=score;
        this.hitpoint=hitpoint;
    },

    // Incremente le score du joueur de la quantité "score" définit en récupérant zombie.getReward()
    incrementScore: function(score){this.score += score;},

    // Retourne true si le joueur n'as plus de vie
    estTouche: function(hitPoint){
        if(this.pv - hitPoint <= 0){this.pv = 0; return true;}
        else{this.pv -= hitPoint; return false;}
    }
}


var zombie ={
    /*
     * Attributs : 
     * etatMarche
     * imgZombie
     * imgGrave
     * posX
     * posY
     * level
     * PV
     * reward
     * speed
     */

    // Pour savoir quelle image de marche afficher
    etatMarche: 0,

    /*
    Définit les stat du zombie en fonction de son niveau, lv1 = péon, lv4 = boss
    Notation des vitesses : 1 <=> rapide    2 <=> modérée   3 <=> lente     4 <=>très lente
    */
    init: function(imgZ,level, coordPopX, coordPopY){
        if(level <= 0 && level >= 5){
            console.log("Problème dans la définition de niveau, le zombie doit avoir un niveau compris entre 1 et 4 !")
        }
        else{
            
            // On déclare les variables pour les images du zombie et de sa tombe
            this.imgZombie = imgZ;
            //this.imgGrave = imgG;


            // Coord de la position actuelle du zombie
            this.posX = coordPopX;
            this.posY = coordPopY;

            // Niveau du zombie
            this.level = level;

            // On va maintenant définir les stats et les images du zombie en fonction du niveau qu'on lui a mis
            if(this.level == 1){
                this.pv = 1; this.reward = 1; this.speed = speed["lv1"];
            }
            else if(this.level == 2){
                this.pv = 2; this.reward = 3; this.speed = speed["lv2"];
            }
            else if(this.level == 3){
                this.pv = 3; this.reward = 5; this.speed = speed["lv3"];
            }
            else{
                this.pv = 25; this.reward = 30; this.speed = speed["lv4"];
            }
        }
    },

    // Lorsqu'on attaque le zombie
    isAttack: function(hitpoint){
        this.pv-=hitpoint;
    },

    // Fais avancer le zombie
    avance: function(){
        if (this.etatMarche<3)
            this.etatMarche+=1;
        else
            this.etatMarche=0;
        this.posY+=speed;
    },

    draw: function(context){
        console.log('draw');
        context.drawImage(this.imgZombie,0,0,32,32,this.pos_X,this.pos_Y,40,40);
    }
}

//Génération du fond
var grass=document.getElementById("fond");
var context=grass.getContext("2d");


var drawFond =function(){
    context.clearRect(0,0,800,800);
    for(var i=0; i<2; i++){
        for (var j=0;j<2; j++){
            context.drawImage(fond, 512*i,512*j);
        }
    }
}

var fond= new Image();
fond.src="grass.png";
fond.onload= drawFond;

//Génération du jeux
var player = Object.create(joueur);
player.init(10, 0 , 0.5);

// On définit les dimensions d'une image zombie
var largeurSpritZombie = 32;
var hauteurSpritZombie = 32;
// On définit les dimensions d'une image de tombe
var largueurSpritGrave = 32;
var hauteurSpritGrave = 32;

var pos_X =200;
var pos_Y = 0 ;
var canvas=document.getElementById("cv");

/* Gestion du click */
canvas.addEventListener("click", getClickPosition, false);

function getClickPosition(e) {
    var mousePos = getMousePos(canvas, e);
    zombies.forEach(function(element){
        if (element[1]==mousePos.x&&element[2]==mousePos.y)
            console.log("le zombie est touché");
    });

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
  };
}
/* Fin gestion du click*/

var context_game=canvas.getContext("2d");

var drawGame = function(){
    console.log('draw');
    context_game.clearRect(0,0,800,800);
    zombies.forEach(function(element){
        //console.log(element.imgZombie);

        // Draw de la tombe
        // la durée de vie d'unt tombe est de 10 unités
        if(element[5]<10){
            context_game.drawImage(element[3],0,0,78,119,element[1],element[4],40,40);
        }

        // Draw de l'image du zombie
        context_game.drawImage(element[0],0,0,32,32,element[1],element[2],40,40);
        console.log('compteur = '+element[5]);

        element[5]++;
        element[2]+=5;
    });
}

var lvl1r=false,lvl2r=false,lvl3r=false,lvl4r=false;
var graver1=false,graver2=false,graver3=false,graver4=false;
var allr=false;


// fonctions chargées de tester si tout à été chargé correctement
var testready_lvl1=function(){
    lvl1r=true;
    if (lvl1r&&lvl2r&&lvl3r&&lvl4r&&graver1&&graver2&&graver3&&graver4){
        allr=true;
    }
    console.log("lvl1_load");
}

var testready_lvl2=function(){
    lvl2r=true;
    if (lvl1r&&lvl2r&&lvl3r&&lvl4r&&graver1&&graver2&&graver3&&graver4){
        allr=true;
    }
    console.log("lvl2_load");
}

var testready_lvl3=function(){
    lvl3r=true;
    if (lvl1r&&lvl2r&&lvl3r&&lvl4r&&graver1&&graver2&&graver3&&graver4){
        allr=true;
    }
    console.log("lvl3_load");
}

var testready_lvl4=function(){
    lvl4r=true;
    if (lvl1r&&lvl2r&&lvl3r&&lvl4r&&graver1&&graver2&&graver3&&graver4){
        allr=true;
    }
    console.log("lvl4_load");
}

var testready_gravelv1=function(){
    graver1=true;
    if (lvl1r&&lvl2r&&lvl3r&&lvl4r&&graver1&&graver2&&graver3&&graver4){
        allr=true;
    }
    console.log("grave_load");
}

var testready_gravelv2=function(){
    graver2=true;
    if (lvl1r&&lvl2r&&lvl3r&&lvl4r&&graver1&&graver2&&graver3&&graver4){
        allr=true;
    }
    console.log("grave_load");
}


var testready_gravelv3=function(){
    graver3=true;
    if (lvl1r&&lvl2r&&lvl3r&&lvl4r&&graver1&&graver2&&graver3&&graver4){
        allr=true;
    }
    console.log("grave_load");
}


var testready_gravelv4=function(){
    graver4=true;
    if (lvl1r&&lvl2r&&lvl3r&&lvl4r&&graver1&&graver2&&graver3&&graver4){
        allr=true;
    }
    console.log("grave_load");
}



var img_lvl1=new Image();
img_lvl1.src="zombie_lvl1.png";
img_lvl1.onload=testready_lvl1;

var img_lvl2=new Image();
img_lvl2.src="zombie_lvl2.png";
img_lvl2.onload=testready_lvl2;

var img_lvl3=new Image();
img_lvl3.src="zombie_lvl3.png";
img_lvl3.onload=testready_lvl3;

var img_lvl4=new Image();
img_lvl4.src="zombie_lvl4.png";
img_lvl4.onload=testready_lvl4;

var imgGrave_lv1=new Image();
imgGrave_lv1.src="tumb_lvl1.png";
imgGrave_lv1.onload=testready_gravelv1;

var imgGrave_lv2=new Image();
imgGrave_lv2.src="tumb_lvl2.png";
imgGrave_lv2.onload=testready_gravelv2;

var imgGrave_lv3=new Image();
imgGrave_lv3.src="tumb_lvl3.png";
imgGrave_lv3.onload=testready_gravelv3;

var imgGrave_lv4=new Image();
imgGrave_lv4.src="tumb_lvl4.png";
imgGrave_lv4.onload=testready_gravelv4;


var zombies=[];
var z;

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var start = null;
var create=false;
var compteurInc = function (timestamp) {
    if (start === null) {
        start = timestamp;
    }
    if (timestamp - start >= 1000) {

        if(allr){
            //On tire les coordonnées initiale pour chaque zombie
            coordPopY=Math.floor((Math.random() * 100) + 36);
            coordPopX=Math.floor((Math.random() * 728) + 36);
            y_init=coordPopY;
            compteur=0;

            var zombie=[img_lvl1,coordPopX,coordPopY, imgGrave_lv1, y_init, compteur];
            zombies.push(zombie);
            drawGame();
        }
        start = timestamp;
    }
    requestAnimationFrame(compteurInc);
};
requestAnimationFrame(compteurInc);
