var speed = {"lv1": 4, "lv2": 3, "lv3": 2, "lv4": 1};

// Pour pouvoir empiler les éléments sur une frame
var loaded = function(){this.loaded = true; draw();}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

var affichageGrave: function(){

}

var grass = new Image();
    grass.src = "grass.png";
    grass.onload = loaded;

var zombie ={
    // On met un compteur pour savoir depuuis combien de temps il a pop
    compteur: 0;
    // On définit les dimensions d'une image zombie
    largeurSpritZombie: 32; hauteurSpritZombie: 32;
    // On définit les dimensions d'une image du boss
    largueurSpritBoss: 32; hauteurSpritBoss: 32;
    // On définit les dimensions d'une image de tombe
    largueurSpritGrave: 32; hauteurSpritGrave: 32;
    // Pour savoir quelle image de marche afficher
    etatMarche: 0;
    // On déclare les variables pour les images du zombie et de sa tombe
    var imgZombie = new Image();
    var imgGrave = new Image();

    /*
    Définit les stat du zombie en fonction de son niveau, lv1 = péon, lv4 = boss
    Notation des vitesses : 1 <=> rapide    2 <=> modérée   3 <=> lente     4 <=>très lente
    */
    init: function(level, coordPopX, coordPopY){
        if(level <= 0 && level >= 5){
            console.log("Problème dans la définition de niveau, le zombie doit avoir un niveau compris entre 1 et 4 !")
        }
        // Coord de "popage"
        this.coordPopX = coordPopX;
        this.coordPopY = coordPopY;
        // Coord de la position actuelle du zombie
        this.posX = coordPopX;
        this.posY = coordPopY;
        // Niveau du zombie
        this.level = level;
        // On va maintenant définir les stats et les images du zombie en fonction du niveau qu'on lui a mis
        if(this.level == 1){
            this.pv = 1; this.reward = 1; this.speed = speed["lv1"];
            imgZombie.src = "zombie_lvl1.png";
            imgGrave.src = "tumb_lvl1.png";
        }
        else if(this.level == 2){
            this.pv = 2; this.reward = 3; this.speed = speed["lv2"];
            imgZombie.src = "zombie_lvl2.png";
            imgGrave.src = "tumb_lvl2.png";
        }
        else if(this.level == 3){
            this.pv = 3; this.reward = 5; this.speed = speed["lv3"];
            imgZombie.src = "zombie_lvl3.png";
            imgGrave.src = "tumb_lvl3.png";
        }
        else{
            this.pv = 25; this.reward = 30; this.speed = speed["lv4"];
            imgZombie.src = "zombie_lvl4.png";
            imgGrave.src = "tumb_lvl4.png";
        }
        imgGrave.onload = this.affichageGrave();
    }

    // Draw la tombe à l'endroit où le zombie a pop
    affichageGrave: function(){
        ctx.drawImage(this.imgGrave, this.coordPopX, this.coordPopY);
    }

    // Fais avancer le zombie
    avance: function(){
        if(this.level == 4){
            this.posY += this.speed;
            ctx.drawImage(this.imgZombie, etatMarche*32, 0, largeurSpritBoss, hauteurSpritBoss, this.posX, this.posY, largeurSpritBoss, hauteurSpritBoss);
        }
        else{
            this.posY += this.speed;
            ctx.drawImage(this.imgZombie, etatMarche*32, 0, largeurSpritZombie, hauteurSpritZombie, this.posX, this.posY, largeurSpritZombie, hauteurSpritZombie);
        }
    }

    getReward: function(){return this.reward;}

    increment: function(){this.compteur++;}
}
            
var joueur={
    pv: 10; score: 0; hitpoint: 0.5;

    // Incremente le score du joueur de la quantité "score" définit en récupérant zombie.getReward()
    incrementScore: function(score){this.score += score;}

    // Retourne true si les zombies ont détruit les défenses
    zombieAttack: function(hitPoint){
        if(this.pv - hitPoint <= 0){this.pv = 0; return true;}
        else{this.pv -= hitPoint; return false;}
    }
}