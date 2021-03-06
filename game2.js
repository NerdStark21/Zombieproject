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
    context_game.clearRect(0,0,800,800);
    context_game.beginPath();

    var i=0
    zombies.forEach(function(element){

        //La barre de vie
        var long=Math.floor(40*(element.pv/element.maxPV));
        console.log(element.pv/element.maxPV);
        if (long<40&&long>20)
            context_game.fillStyle="green";
        else if (long<=20)
            context_game.fillStyle="red";
        else
            context_game.fillStyle="green";
        context_game.fill();
        context_game.rect(element.posX,element.posY-10,long,4);

        // Draw de la tombe
        if(element.compteur<100){
            context_game.drawImage(element.imgGrave,0,0,78,119,element.posX,element.popY,40,40);
        }
        element.compteur++; // On incremente le temps de vie du zombie

        //controle de la position du zombie pour les dégâts au joueur
        if (element.posY>=760){
            console.log("Ouch !!!");
            zombies.splice(i,1);
            if (player.estTouche(1)){
                console.log("Vous êtes mort");
                alive=false;
            }
        }

        // Draw du zombie
        if (element.level<4){
            context_game.drawImage(element.imgZombie,32*(element.etatMarche%10),0,32,32,element.posX,element.posY,40,40);
        }else{
            context_game.drawImage(element.imgZombie,74*(element.etatMarche%10),0,74,74,element.posX,element.posY,74,74);
        }
        
        element.avance();
        i+=1;
    });
    context_game.fillStyle = "rgb(0,0,0)";
    context_game.font = "25pt Calibri,Geneva,Arial";
    context_game.fillText("Score "+player.score, 650, 40);
    context_game.fillText("End "+remainingTime, 10, 40);
    context_game.fillText("Life :"+player.pv,350,40)
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
    var i=0;
    console.log(mousePos);
    zombies.forEach(function(element){
        //console.log(element.posY-mousePos.Y);
        /*Si on clique dans la zone formée par le zombie, on execute le code*/
        //console.log(element.posX<=mousePos.x);
        //console.log(mousePos.x<=element.posX+40);
        //console.log(element.posY<=mousePos.y);
        //console.log(mousePos.y<=element.posY+40);
        if ((element.posX-20<=mousePos.x+20)&&(mousePos.x+20<=element.posX+40)&&(element.posY<=mousePos.y+20)&&(mousePos.y+20<=element.posY+40)){
            if (!Att){
                Att=true;
                element.isAttack(1);
                if (element.pv==0){
                    zombies.splice(i,1);
                    player.score+=element.reward;
                }
            }
        }
        i+=1;

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
var Att=false;
var fin=false;
var boss=false;
var remainingTime = 200;

var compteurInc = function (timestamp) {
    if (start === null) {
        start = timestamp;
    }
    if (timestamp - start >= 250) {

        if(allr&&alive&&!fin){ // Si tout est chargé et que le joueur est en vie
            if(cpteur%4==0){
                remainingTime-=1;
                if (remainingTime==0){
                    fin=true;
                }
            }
            cpteur+=1
            if(cpteur<560){
                if (cpteur%8==0){
                    //On tire les coordonnées initiale
                    coordPopY=Math.floor((Math.random() * 60));
                    coordPopX=Math.floor((Math.random() * 740));
                    var img_g;
                    var img_z;
                    var lvl;

                    if (cpteur<120){ 
                        img_z=img_lvl1;
                        img_g=imgGrave_lv1;
                        lvl=1;
                    }else if (cpteur<400){
                        var z_lvl=Math.floor(Math.random()+1)
                        console.log(z_lvl);
                        if (z_lvl==1){
                            img_z=img_lvl1;
                            img_g=imgGrave_lv1;
                            lvl=1;
                        }else{
                        img_z=img_lvl2;
                        img_g=imgGrave_lv2;
                        lvl=2;
                        }
                    }else if(cpteur>=400){

                        var z_lvl=Math.floor((Math.random()*2)+1);

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
            }else{
                if (boss){
                    if(cpteur%4==0){
                        var z_lvl=Math.floor((Math.random()*2)+1);

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
                }else{
                    boss=true;
                    img_z=img_lvl4;
                    img_g=imgGrave_lv4;
                    lvl=4;
                }
                var zomb = Object.create(Zombie);
                zomb.init(img_z, img_g, lvl, coordPopX,coordPopY);

                zombies.push(zomb);
            }

            Att=false;
            drawGame();
        }else{
            if(alive){
                //context_game.drawImage(fond, 512*i,512*j)
                context_game.font = "80pt Calibri,Geneva,Arial";
                context_game.fillText("GAME OVER", 200, 200);
                context_game.fillText("YOU WIN", 200, 300);
                context_game.fillText("SCORE : "+player.score, 400, 400);
            }
            else{
                context_game.font = "80pt Calibri,Geneva,Arial";
                context_game.fillText("GAME OVER", 200, 200);
                context_game.fillText("YOU LOSE", 200, 300);
                context_game.fillText("SCORE : "+player.score, 320, 400);
            }
            
        }
        start = timestamp;
}
requestAnimationFrame(compteurInc);
};
requestAnimationFrame(compteurInc);
