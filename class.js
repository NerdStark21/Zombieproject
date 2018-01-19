var speed = {"lv1": 1, "lv2": 3, "lv3": 2, "lv4": 1};

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

var Zombie ={
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
    etatMarche: 21,

    /*
    Définit les stat du zombie en fonction de son niveau, lv1 = péon, lv4 = boss
    Notation des vitesses : 1 <=> rapide    2 <=> modérée   3 <=> lente     4 <=>très lente
    */
    init: function(imgZ,imgG,level, coordPopX, coordPopY){
        if(level <= 0 && level >= 5){
            console.log("Problème dans la définition de niveau, le zombie doit avoir un niveau compris entre 1 et 4 !")
        }
        else{
            
            // On déclare les variables pour les images du zombie et de sa tombe
            this.imgZombie = imgZ;
            this.imgGrave = imgG;

            // Coord de la position actuelle du zombie
            this.posX = coordPopX;
            this.posY = coordPopY;
            this.popY = coordPopY;  // Pour la position de la tombe

            // Niveau du zombie
            this.level = level;

            // Temps de vie
            this.compteur = 0;

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
            this.maxLife = this.pv;
        }
    },

    // Lorsqu'on attaque le zombie
    isAttack: function(hitpoint){
        this.pv-=hitpoint;
    },

    // Fais avancer le zombie
    avance: function(){
        switch(this.etatMarche){
            case 21:
                this.etatMarche = 22;
                break;
            case 22:
                this.etatMarche = 11;
                break;
            case 11:
                this.etatMarche = 10;
                break;
            case 10:
                this.etatMarche = 21;
                break;
        }
        this.posY+=this.speed;
        this.compteur++;
    },

    draw: function(context2){
        console.log('draw');
        context2.drawImage(this.imgZombie,0,0,32,32,this.pos_X,this.pos_Y,40,40);
    }
}