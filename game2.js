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
//fin Génération fond


//Partie gestion du jeux
var canvas=document.getElementById("cv");
var context_game=canvas.getContext("2d");


/* On charge l'ensemble des image nécéssaire au jeux*/
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
    console.log("gravelv1_load");
}

var testready_gravelv2=function(){
    graver2=true;
    if (lvl1r&&lvl2r&&lvl3r&&lvl4r&&graver1&&graver2&&graver3&&graver4){
        allr=true;
    }
    console.log("gravelv2_load");
}


var testready_gravelv3=function(){
    graver3=true;
    if (lvl1r&&lvl2r&&lvl3r&&lvl4r&&graver1&&graver2&&graver3&&graver4){
        allr=true;
    }
    console.log("gravelv3_load");
}


var testready_gravelv4=function(){
    graver4=true;
    if (lvl1r&&lvl2r&&lvl3r&&lvl4r&&graver1&&graver2&&graver3&&graver4){
        allr=true;
    }
    console.log("gravelv4_load");
}


// On charge les images des zombies
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

// On charge les imaes des tombes
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

/* Fin du chargement */


//Rafraichissement du jeux
var drawGame = function(){
    console.log('draw');
    context_game.clearRect(0,0,800,800);

    var i=0
    zombies.forEach(function(element){

        // Draw de la tombe
        if(element.compteur<40){
            context_game.drawImage(element.imgGrave,0,0,78,119,element.posX,element.popY,40,40);
        }
        element.compteur++; // On incremente le temps de vie du zombie
/*
        //controle de la position du zombie pour les dégâts au joueur
        if (element.posY>=760){
            console.log("Ouch !!!");
            zombies.splice(i,1);
            if (player.estTouche(1)){
                console.log("Vous êtes mort");
                alive=false;
            }
        }
*/
        // Draw du zombie
        context_game.drawImage(element.imgZombie,32*(element.etatMarche%10),0,32,32,element.posX,element.posY,40,40);
        element.avance();
        i+=1;
    });
}
// Fin rafraichissement du jeux


// Création du joueur
var player = Object.create(joueur);
player.init(10, 0 , 0.5);
var alive=true; //vrai si le joueur est encore en vie

//var pos_X =200;
//var pos_Y = 0 ;


/* Gestion du click */
canvas.addEventListener("click", getClickPosition, false);

function getClickPosition(e) {
    var mousePos = getMousePos(canvas, e);
    zombies.forEach(function(element){
        /* Si on clique dans la zone formée par le zombie, on execute le code*/
        if (element.posX<=mousePos.x<=element.posX+40&&element.posY<=mousePos.y<=element.posY+40)
            console.log("zombie touché");
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


var zombies=[];

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var start = null;
var create=false;
var cpteur=0; //le compteur utilisé pour gérer la fréquence et le type de zombie qui apparait

var compteurInc = function (timestamp) {
    if (start === null) {
        start = timestamp;
    }
    if (timestamp - start >= 500) {

        if(allr&&alive){ // Si tout est chargé et que le joueur est en vie
            cpteur+=1
            if (cpteur%4==0){

                //On tire les coordonnées initiale
                coordPopY=Math.floor((Math.random() * 60));
                coordPopX=Math.floor((Math.random() * 740));
                var img_g;
                var img_z;
                var lvl;

                if (cpteur<60){ 
                    img_z=img_lvl1;
                    img_g=imgGrave_lv1;
                    lvl=1;
                }else if (cpteur<200){
                    var z_lvl=Math.floor(Math.random()+1)
                    
                    if (z_lvl==1){
                        img_z=img_lvl1;
                        img_g=imgGrave_lv1;
                        lvl=1;
                    }else{
                       img_z=img_lvl2;
                       img_g=imgGrave_lv2;
                       lvl=2;
                   }
                }else if(cpteur>=200){

                    var z_lvl=Math.floor(Math.random()+2);

                    if (z_lvl==1){
                        img_z=img_lvl1;
                        img_g=imgGrave_lv1;
                        lvl=1;
                    }else if(z_lvl==2){
                        img_z=img_lvl2;
                        img_g=imgGrave_lv2;
                        lvl=2;
                    }else{
                        img_z=img_lvl3;
                        img_g=imgGrave_lv3;
                        lvl=3;
                    }
                }

                var zomb = Object.create(Zombie);
                zomb.init(img_z, img_g, lvl, coordPopX,coordPopY);

                zombies.push(zomb);
            }
            drawGame();
        }
        start = timestamp;
    }
    requestAnimationFrame(compteurInc);
};
requestAnimationFrame(compteurInc);
