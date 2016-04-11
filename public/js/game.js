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

       if ((graphic.toLowerCase().indexOf("antihydrogen") >= 0) ||
        (graphic.toLowerCase().indexOf("heliumthree") >= 0)) {
            orbiter.scale.setTo(0.3,0.3);
            orbiter.moveData.orbitRate = 0;
            orbiter.alpha = 0.8;
            orbiter.moveData.startX = marker.pos.x - 15;
            orbiter.moveData.startY = marker.pos.y - 15;
        } else {
            orbiter.scale.setTo(0.1,0.1);
            orbiter.moveData.orbitRate = 1;
            orbiter.alpha = 0.5;
        };


        if (tint) {
            orbiter.tint = tint;
        };

        orbiter.shipName = shipName;
        
        orbiter.events.onInputDown.add(function() {
            if (this.selected === true) {
                this.alpha = 0.5;
                this.selected = false;
                game.global.selectedShipName = '';
                return true;
            }
            if (this.selected === false){ 
                game.global.orbiterGroup.forEach(function(orbiter) {
                    orbiter.selected = false;
                    orbiter.alpha = 0.5;
                });
                this.alpha = 1;
                this.selected = true;
                game.global.selectedShipName = this.shipName;
                return true;
            }
        }, orbiter);

        if (selectKey) {
            selectKey.onDown.add(function() {
                if (this.selected === true) {
                    this.alpha = 0.5;
                    this.selected = false;
                    game.global.selectedShipName = '';
                    return true;
                }
                if (this.selected === false){
                    game.global.orbiterGroup.forEach(function(orbiter) {
                        orbiter.selected = false;
                        orbiter.alpha = 0.5;
                    });
                    this.alpha = 1;
                    this.selected = true;
                    game.global.selectedShipName = this.shipName;
                    return true;
                }
            }, orbiter);
        }

        orbiter.events.onInputOver.add(function() {
            this.alpha = 1;
        }, orbiter);

        orbiter.events.onInputOut.add(function() {
            if (this.selected === false) {
                this.alpha = 0.5;
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