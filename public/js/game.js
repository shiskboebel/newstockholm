// Initialize Phaser
var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'gameDiv');

// Our 'global' variable
game.global = {
	score: 0,
	// Add other global variables
    phase: 0,
    planets: null,
    orbiterGroup: null,
    points: [],
    over: false,
    currentPoint: null,
    marker: null,
    selectedMarkers: [],
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
    phase1button: null,
    phase2button: null,
    phase3button: null,
    
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
    spawnNewOrbiter: function (graphic, marker, tint) {
	
        var orbiter = game.add.sprite(marker.pos.x, marker.pos.y, graphic);
        orbiter.anchor.setTo(0.5, 0.5);
        orbiter.scale.setTo(0.1,0.1);
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
        orbiter.moveData.orbitRate = 2;
        orbiter.selected = false;
        orbiter.alpha = 0.9;
        orbiter.tint = tint;
        
        orbiter.events.onInputDown.add(function() {
            if (this.selected === true) {
                this.alpha = 0.9;
                this.selected = false;
                return true;
            }
            if (this.selected === false){ 
                this.alpha = 1;
                this.selected = true;
                return true;
            }
        }, orbiter);
        
        orbiter.events.onInputOver.add(function() {
            this.alpha = 1;
        }, orbiter);

        orbiter.events.onInputOut.add(function() {
            if (this.selected === false) {
                this.alpha = 0.9;
            }
        }, orbiter);
        
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