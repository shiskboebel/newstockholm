// Initialize Phaser
var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'gameDiv');
// Our 'global' variable
game.global = {
	score: 0,
	// Add other global variables
    phase: 0,
    gamePhaseIndicator: "",
    planets: null,
    orbiterGroup: null,
    points: [],
    over: false,
    currentPoint: null,
    marker: null,
    selectedMarkers: [],
    selectedShipName: '',
    connectedMarkers: [],
    linesArray: [],
    inputType: null,
    friArray: [],
    perArray: [],
    corArray: [],
    friGroup: null,
    perGroup: null,
    corGroup: null,
    sunGroup: null,
    enemyShipGroup: null,
    lineGroup: null,
    nrEnemyShips : 0,
    totalNrEnemyShips: 0,
    phase1button: null,
    phase2button: null,
    phase3button: null,
    topLayer: null,
    Xfont: null,
    phaseFont: null,
    countdownTimerTime: null,
    timerEvent: null,
    kKey: '',
    
    // Global functions
    searchArrayById : function(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].id === nameKey) {
                return myArray[i];
            }
        }
    },
    searchArrayByValue : function(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i] === nameKey) {
                return myArray[i];
            }
        }
    },
    spawnNewOrbiter: function (graphic, marker, tint, selectKey, shipName) {
	
        var orbiter = game.add.sprite(marker.pos.x, marker.pos.y, graphic);
        orbiter.anchor.setTo(0.5, 0.5);

        orbiter.moveData = {};
        orbiter.inputEnabled = true;
        orbiter.moveData.altitude = 20;
        orbiter.moveData.altitudeTarget = 0;
        orbiter.moveData.altitudeChangeRate = 0;
        orbiter.moveData.altitudeMin = 0;
        orbiter.moveData.altitudeMax = 0;
        orbiter.moveData.startX = marker.pos.x;
        orbiter.moveData.startY = marker.pos.y;
        orbiter.moveData.atMarker = marker.id;
        orbiter.moveData.orbit = 0;
        orbiter.selected = false;
        orbiter.textureName = graphic;
        orbiter.selectAlpha = 1.0;
        orbiter.unselectAlpha = 0.5

       if ((graphic.toLowerCase().indexOf("antihydrogen") >= 0) ||
        (graphic.toLowerCase().indexOf("heliumthree") >= 0)) {
            orbiter.scale.setTo(0.3,0.3);
            orbiter.moveData.orbitRate = 0;
            orbiter.unselectAlpha = 0.8;
            orbiter.moveData.startX = marker.pos.x - 15;
            orbiter.moveData.startY = marker.pos.y - 15;
        } else {
            orbiter.scale.setTo(0.1,0.1);
            orbiter.moveData.orbitRate = 1;
        };

        if ((graphic.indexOf("earthship") >= 0) ||
            (graphic.indexOf("marsship") >= 0) ||
            (graphic.indexOf("titanship") >= 0) ||
            (graphic.indexOf("europaship") >= 0) ||
            (graphic.indexOf("plutoship") >= 0) ||
            (graphic.indexOf("beatrixship") >= 0) ||
            (graphic.indexOf("plutoship") >= 0))  {
            orbiter.scale.setTo(0.3,0.15);
            orbiter.unselectAlpha = 1.0;
        };

        if (graphic.indexOf("enemyship") >= 0) {
            orbiter.unselectAlpha = 1.0;
            var style = { font: "150px Arial", fill: "#ffffff" };
            var label_score = game.add.text(20, 20, game.global.totalNrEnemyShips, style);
            console.log(label_score);
            orbiter.addChild(label_score);
        }

        orbiter.alpha = orbiter.unselectAlpha;

        if (tint) {
            orbiter.tint = tint;
        };

        orbiter.shipName = shipName;

        var orbiterSelectFunction = function() {
            if (this.selected === true) {
                this.alpha = this.selectAlpha;
                this.selected = false;
                game.global.selectedShipName = '';
                this.loadTexture(orbiter.textureName.replace('_s',''));
                this.textureName = this.textureName.replace('_s','');
                return true;
            }
            if (this.selected === false){
                game.global.orbiterGroup.forEach(function(orbiter) {
                    orbiter.selected = false;
                    orbiter.alpha = orbiter.unselectAlpha;
                    if (orbiter.textureName.indexOf("_s") >= 0) {
                        orbiter.loadTexture(orbiter.textureName.replace('_s',''));
                        orbiter.textureName = orbiter.textureName.replace('_s','');
                    }
                });
                this.alpha = this.selectAlpha;
                this.selected = true;
                this.textureName = this.textureName + '_s'
                this.loadTexture(orbiter.textureName);
                game.global.selectedShipName = this.shipName;
                return true;
            }
        };

        orbiter.events.onInputDown.add(orbiterSelectFunction,orbiter);

        if (selectKey) {
            selectKey.onDown.add(orbiterSelectFunction,orbiter);
        }

        orbiter.events.onInputOver.add(function() {
            this.alpha = this.selectAlpha;
            if (this.selected === false) {
                this.loadTexture(this.textureName + '_s');
                this.textureName = this.textureName + '_s';
            }
        }, orbiter);

        orbiter.events.onInputOut.add(function() {
            if (this.selected === false) {
                this.alpha = this.unselectAlpha;
                this.loadTexture(this.textureName.replace('_s',''));
                this.textureName = this.textureName.replace('_s','');
            }
        }, orbiter);

        game.global.kKey.onDown.add(function() {
            var killable = (graphic.toLowerCase().indexOf("enemyship") >= 0) ||
                (graphic.toLowerCase().indexOf("antihydrogen") >= 0) ||
                (graphic.toLowerCase().indexOf("heliumthree") >= 0);

            if ((this.selected === true) && killable) {
                this.selected = false;

                if (graphic.toLowerCase().indexOf("enemyship") >= 0) {
                    game.global.nrEnemyShips -= 1;
                    // Kill animation:
                    // https://github.com/robomatix/Phaser-example-animation-change-before-killing-it/blob/master/index.html
                    explosion = this.game.add.sprite(
                        this.x - this.moveData.altitude,
                        this.y - this.moveData.altitude,
                        "explosion");
                    explosion.animations.add('explode');
                    explosion.animations.play('explode', 20, false, true);
                };
                this.destroy();
                game.global.selectedShipName = '';
                return true;
            }
        }, orbiter);

        // Kill unused faction ships

        if ((shipName === ('Mercury')) ||
            (shipName === ('Triton')) ||
            (shipName === ('Miranda'))) {
                orbiter.kill();
        };

        game.global.orbiterGroup.add(orbiter);
        return orbiter;

    },
};

// Define states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

// Start the "boot" state
game.state.start('boot');