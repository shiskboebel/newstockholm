var playState = {

	create: function() { 
        
        // Set a background color and the physic system
        var background = game.add.tileSprite(0,0, 1920, 1080, 'background');
        
        // Variables
        var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        var cKey = game.input.keyboard.addKey(Phaser.KeyCode.C);
        var lineKey = game.input.keyboard.addKey(Phaser.KeyCode.L);

        game.global.planets = game.add.group();
        game.global.orbiterGroup = game.add.group();
        game.global.friGroup = game.add.group();
        game.global.corGroup = game.add.group();
        game.global.perGroup = game.add.group();
        game.global.sunGroup = game.add.group();
        game.global.enemyShipGroup = game.add.group();
        game.global.lineGroup = game.add.group();
        game.global.topLayer = game.add.group();
        
        var Sun = game.add.sprite(game.world.centerX, game.world.centerY, 'sun');
        Sun.scale.x = 0.05;
        Sun.scale.y = 0.05;
        Sun.anchor.setTo(0.5, 0.5);
        
        var KuiperBelt = game.add.sprite(0,0, 'kuiperbelt');
        KuiperBelt.scale.setTo(1.0, 1.0);
        
        this.drawPlanet('mercury', 80, 0, 0.025, 0.025);
        this.drawPlanet('venus', -40, 90, 0.045, 0.045);
        this.drawPlanet('earth', -50, -150, 0.04, 0.04);
        this.drawPlanet('mars', 150, -70, 0.07, 0.07);
        
        this.drawPlanet('jupiter', 250, -70, 0.14, 0.14);
        this.drawMoon('europa', 4, 55, 55, 0.03, 0.03);

        this.drawPlanet('saturn', 0, 340, 0.14, 0.14);
        this.drawMoon('titan', 6, 0, -70, 0.07, 0.07);
        
        this.drawPlanet('uranus', 450, 140, 0.1, 0.1);
        this.drawMoon('miranda', 8, -100, 0, 0.05, 0.05);
        
        this.drawPlanet('neptune', 500, -140, 0.09, 0.09);
        this.drawMoon('triton', 10, 55, 55, 0.035, 0.035);
        
        this.drawPlanet('plutocharon', -200, -480, 0.07, 0.07);
        
        this.drawPlanet('asteroid', -259, 454, 0.05, 0.05);
        
        // Stretch to fill
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        
        // Regioncolors
        var coreColor = '0x80d4ff   ';
        var peripheryColor = '0x00aaff';
        var fringeColor = '0x005580';
        
        // Buttons
        var enemybutton = game.add.button(95, 400, 'enemybutton', this.enemySpawner, this, 1,0,2,0);
        enemybutton.scale.x = 0.5;
        enemybutton.scale.y = 0.5;
        
        game.global.phase1button = game.add.button(95, 100, 'phase1button', this.phaseChanger, this, 1,0,2,0);
        game.global.phase1button.phase = 1;
        game.global.phase1button.selected = false;
        game.global.phase1button.scale.x = 0.5;
        game.global.phase1button.scale.y = 0.5;
        game.global.phase1button.tint = fringeColor;
        
        game.global.phase2button = game.add.button(295, 100, 'phase2button', this.phaseChanger, this, 1,0,2,0);
        game.global.phase2button.phase = 2;
        game.global.phase2button.selected = false;
        game.global.phase2button.scale.x = 0.5;
        game.global.phase2button.scale.y = 0.5;
        game.global.phase2button.tint = peripheryColor;
        
        game.global.phase3button = game.add.button(495, 100, 'phase3button', this.phaseChanger, this, 1,0,2,0);
        game.global.phase3button.phase = 3;
        game.global.phase3button.selected = false;
        game.global.phase3button.scale.x = 0.5;
        game.global.phase3button.scale.y = 0.5;
        game.global.phase3button.tint = coreColor;
        
        
        // Fullscreen mode
        downKey.onDown.add(this.goFull, this);
        
        // Draw lines
        lineKey.onDown.add(this.toggleLineDisplay, this);

        // Draw markers and connect them with lines
        this.drawMarkers(game.global.corArray, coreColor,'c', game.global.corGroup);
        this.drawMarkers(game.global.perArray, peripheryColor,'p', game.global.perGroup);
        this.drawMarkers(game.global.friArray, fringeColor,'f', game.global.friGroup);
        this.drawMarkers([[game.world.centerX,game.world.centerY]],'0x800000','s', game.global.sunGroup);
        this.drawLines();


//        this.drawMinimap(game.global.planets);

        game.world.bringToTop(game.global.planets);
        game.world.bringToTop(game.global.orbiterGroup);


        
        // Earth
        game.global.spawnNewOrbiter('friendlyship', game.global.searchArrayById('0c',game.global.points), '0x0F497B');
        // Mercury
        game.global.spawnNewOrbiter('friendlyship', game.global.searchArrayById('1c',game.global.points), '0xdfe129');
        // Mars
        game.global.spawnNewOrbiter('friendlyship', game.global.searchArrayById('2c',game.global.points), '0xf6cb14');
        // Europa
        game.global.spawnNewOrbiter('friendlyship', game.global.searchArrayById('1p',game.global.points), '0x3bbab7');
        // Titan
        game.global.spawnNewOrbiter('friendlyship', game.global.searchArrayById('2p',game.global.points), '0x39e75f');
        // Miranda
        game.global.spawnNewOrbiter('friendlyship', game.global.searchArrayById('0p',game.global.points), '0xaeb3cc');
        // Triton
        game.global.spawnNewOrbiter('friendlyship', game.global.searchArrayById('3f',game.global.points), '0x48d5ff');
        // Pluto and Charon
        game.global.spawnNewOrbiter('friendlyship', game.global.searchArrayById('2f',game.global.points), '0xbd0030');
        // Beatrix
        game.global.spawnNewOrbiter('friendlyship', game.global.searchArrayById('1f',game.global.points), '0xd30ef9');

        game.global.Xfont = game.add.retroFont('Xfont', 8, 8, Phaser.RetroFont.TEXT_SET1);
        game.global.Xfont.align = Phaser.RetroFont.ALIGN_CENTER;
        game.global.Xfont.multiLine = true;
        game.global.Xfont.autoUpperCase = false;
        game.global.Xfont.buildRetroFontText();
        var image = game.add.image(1800, 100, game.global.Xfont);

        // Countdown for ten minutes
        cKey.onDown.add(this.countdownTimer, this);



	},

	update: function() {
        this.updateOrbiterMovement();
//        this.drawMinimap();
	},
    
    render: function() {

            if (game.global.countdownTimerTime && game.global.countdownTimerTime.running) {
                game.debug.text(this.formatTime(Math.round((game.global.timerEvent.delay - game.global.countdownTimerTime.ms) / 1000)), 2, 14, "#ff0");
            }
            else {
                game.debug.text("Done!", 2, 14, "#0f0");
            }

    },
    
    goFull: function() {
        if (game.scale.isFullScreen)
        {
            game.scale.stopFullScreen();
        }
        else
        {
            game.scale.startFullScreen(false);
        }
    },
    
    drawPlanet : function(planetName, posX, posY, scaleX, scaleY) {
        
        var orbit = game.add.graphics(game.world.centerX, game.world.centerY); // posX, posY
        
        
        var planet = game.add.sprite(game.world.centerX + posX, game.world.centerY + posY, planetName);
        planet.scale.x = scaleX;
        planet.scale.y = scaleY;
        planet.anchor.setTo(0.5, 0.5);
        game.global.planets.add(planet);
        
        var radius = Math.sqrt((posX * posX) + (posY * posY));
        // draw a circle
        orbit.lineStyle(1, 0x00ABA9, 0.3); // lineWidth, color, alpha
        orbit.beginFill(0xFFFF0B, 0.0); // color, alpha
        orbit.drawCircle(0, 0, 2 * radius); // offsetX, offsetY, radius
        orbit.endFill();

        window.graphics = orbit;

        var fontspot = game.add.bitmapText(game.world.centerX + posX + 10,
            game.world.centerY + posY + 10, 'gem', planetName, 16);
        fontspot.tint = '0x99ccff';
    },
    
    drawMoon: function(moonName, planetIndex, posX, posY, scaleX, scaleY) {
        
        var planet = game.global.planets.children[planetIndex];
        
        var orbit = game.add.graphics(planet.x, planet.y); // posX, posY
        
        var moon = game.add.sprite(planet.x + posX, planet.y + posY, moonName);
        moon.scale.x = scaleX;
        moon.scale.y = scaleY;
        moon.anchor.setTo(0.5, 0.5);
        game.global.planets.add(moon);
        
        var radius = Math.sqrt((posX * posX) + (posY * posY));
        // draw a circle
        orbit.lineStyle(1, 0x00ABA9, 0.5); // lineWidth, color, alpha
        orbit.beginFill(0xFFFF0B, 0.0); // color, alpha
        orbit.drawCircle(0, 0, 2 * radius); // offsetX, offsetY, radius
        orbit.endFill();

        window.graphics = orbit;

        var fontspot = game.add.bitmapText(planet.x + posX + 10,
            planet.y + posY + 10, 'gem', moonName, 16);
        fontspot.tint = '0x99ccff';
        
        
    },
    
    drawRegion: function(radius, color) {
    
        var orbit = game.add.graphics(game.world.centerX, game.world.centerY); // posX, posY
        
        // draw a circle
        orbit.lineStyle(1, 0x00ABA9, 0.0); // lineWidth, color, alpha
        orbit.beginFill(color, 0.3); // color, alpha
        orbit.drawCircle(0, 0, 2 * radius); // offsetX, offsetY, radius
        orbit.endFill();

        window.graphics = orbit;
        return orbit;
    },
    
    drawMarkers: function(inputArray, tint, region, group)  {
            var i = 0;
            for (i = 0; i < inputArray.length; i++){
                var img = game.add.sprite(inputArray[i][0], inputArray[i][1], 'marker', 0);
                
                var fontspot = game.add.bitmapText(inputArray[i][0], inputArray[i][1], 'gem', i + region, 16);
                img.selected = false;
                img.id = i + region;
                
                fontspot.tint = tint;

                game.global.points.push({'id' : img.id, 'pos' : img.position});

                img.anchor.set(0.5);
                img.alpha = 0.5;
                img.inputEnabled = true;
                img.tint = tint;

                img.events.onInputOver.add(function() {
                    this.alpha = 1;
                }, img);
                
                img.events.onInputOut.add(function() {
                    if (this.selected === false) {
                        this.alpha = 0.5;
                    }
                }, img);
                
                group.add(img);
                
                img.events.onInputDown.add(function() {
                    var smIndex = game.global.selectedMarkers.indexOf(game.global.searchArrayById(this.id,game.global.selectedMarkers));
                    if (smIndex > -1) {
                        game.global.selectedMarkers.splice(smIndex,1);
                        this.alpha = 0.5;
                        this.selected = false;
                        return true;
                    }
                    if (game.global.selectedMarkers.length < 1){ 
                        game.global.selectedMarkers.push({'id' : this.id, 'pos' : this.position});
                        this.alpha = 1;
                        this.selected = true;
                        game.global.orbiterGroup.forEach(function(orbiter) {
                            if (orbiter.selected) {
                                orbiter.moveData.startX = game.global.selectedMarkers[0].pos.x;
                                orbiter.moveData.startY = game.global.selectedMarkers[0].pos.y;
                            }
                        });
                        return true;
                    }
                }, img);
            }
    },
        
    markerLogger: function() {
            console.log(game.global.points);
    },
    
    connectionLogger: function() {
            console.log(game.global.connectedMarkers);
    },
    
    connectMarkers: function() {
        if (game.global.selectedMarkers.length === 2) {
            var markerOne = game.global.selectedMarkers[0];
            var markerTwo = game.global.selectedMarkers[1];
            
            var line = new Phaser.Line(markerOne.pos.x, markerOne.pos.y, markerTwo.pos.x, markerTwo.pos.y);  
            var graphicLine = game.add.graphics(0, 0);
            graphicLine.alpha = 0.5;
            graphicLine.beginFill(0x393092);
            graphicLine.lineStyle(2, 0x393092, 1);
            graphicLine.moveTo(markerOne.pos.x, markerOne.pos.y);
            graphicLine.lineTo(markerTwo.pos.x, markerTwo.pos.y);
            graphicLine.endFill();
            
            // Connect the markers
            var connectId = markerOne.id + markerTwo.id;
            var connectIdTwo = markerTwo.id + markerOne.id;
            
            var cmIndex = game.global.connectedMarkers.indexOf(
                game.global.searchArrayByValue(connectId,game.global.connectedMarkers));
            if (cmIndex === -1){
                game.global.connectedMarkers.push(connectId);
                game.global.connectedMarkers.push(connectIdTwo);
            };
        
        };
    },
    
    drawLines: function() {
        game.global.points.forEach(function(point) {
            game.global.linesArray.forEach(function(connection) {
                if (connection.includes(point.id)) {
                    var p2Str = connection.replace(point.id,'');
                    var p2StrIndex = game.global.points.indexOf(
                game.global.searchArrayById(p2Str,game.global.points));
                    var idIndex = connection.indexOf(point.id) - 1;
                    
                    // TODO: Make this condition less awful
                    // Alternatively, find a better way to document connections between markers
                    if (IsNumeric(p2Str.charAt(0)) &&
                    !(IsNumeric(p2Str.charAt(p2Str.length - 1))) &&
                       (p2StrIndex > -1) &&
                       !(IsNumeric(connection.charAt(idIndex)))) {
                        var p2Point = game.global.searchArrayById(p2Str,game.global.points);
                        var graphicLine = game.add.graphics(0, 0);
                        graphicLine.alpha = 0.5;
                        graphicLine.beginFill(0x393092);
                        graphicLine.lineStyle(2, 0x393092, 1);
                        graphicLine.moveTo(p2Point.pos.x, p2Point.pos.y);
                        graphicLine.lineTo(point.pos.x, point.pos.y);
                        graphicLine.endFill();
                        game.global.lineGroup.add(graphicLine);
                    };
                };
            });
        });
        
        function IsNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

    },
    
    selectOrbiter: function() {
        game.global.orbiterGroup.forEach(function(orbiter) {
            if (game.global.selectedMarkers === orbiter.atMarker){
                orbiter.selected = true;
            }
        });
    },
    
    moveOrbiter: function() {
        
        orbiter.kill();
        game.global.spawnNewOrbiter('friendlyship',game.global.selectedMarkers);
        
    },
    
    updateOrbiterMovement: function() {
        game.global.orbiterGroup.forEach(function(orbiter) {
            if (orbiter.alive) {
                updateOrbiterOrbit(orbiter);
            }	
        });
        
        function updateOrbiterOrbit(orbiter) {

            if (orbiter.moveData.orbitRate != 0) {
                orbiter.moveData.orbit -= orbiter.moveData.orbitRate;
                if (orbiter.moveData.orbit >= 360) {
                    orbiter.moveData.orbit -= 360;
                }
            }

            var oRad = Phaser.Math.degToRad(orbiter.moveData.orbit);
            orbiter.angle = orbiter.moveData.orbit;
            orbiter.x = orbiter.moveData.startX + orbiter.moveData.altitude * Math.cos(oRad);
            orbiter.y = orbiter.moveData.startY + orbiter.moveData.altitude * Math.sin(oRad);
        };
    },
    
    phaseChanger: function(button) {
        
        if (button.selected === false) {
            button._onOutFrame = 2;
            button._onUpFrame = 2;
            game.global.phase = button.phase;
            if (button.phase === 1) {
                unselectButton(game.global.phase2button);
                unselectButton(game.global.phase3button);
            };
            
            if (button.phase === 2) {
                unselectButton(game.global.phase1button);
                unselectButton(game.global.phase3button);
            };
            
            if (button.phase === 3) {
                unselectButton(game.global.phase2button);
                unselectButton(game.global.phase1button);
            };
            
            function unselectButton(unButton) {
                unButton.selected = false;
                unButton._onOutFrame = 0;
                unButton._onUpFrame = 0;
                unButton.forceOut;
            }
        }
    },
    
    enemySpawner: function() {
        if (game.global.nrEnemyShips <= 10) {
            if (game.global.phase === 1){
                var selectMarker = Math.floor(Math.random() * game.global.friGroup.children.length);
                var selectedShip = game.global.friGroup.children[selectMarker];
                var selectedShipGroup = game.global.friGroup.children;
                var placedShip = false;
                var spawnedShip = false;

                while (spawnedShip === false) {
                    game.global.orbiterGroup.children.forEach(function(ship){

                        if (ship.moveData.atMarker === selectedShip.id){
                            placedShip = true;
                            return;
                        }
                    });

                    if (placedShip === false){
                        game.global.spawnNewOrbiter(
                            'enemyship', game.global.searchArrayById(selectedShip.id,game.global.points), '0xB51C04');
                        game.global.nrEnemyShips += 1;
                        spawnedShip = true;
                        return;
                    }

                    selectMarker = Math.floor(Math.random * game.global.friGroup.children.length);
                    selectedShip = selectedShipGroup[selectMarker];
                }

            };


            if (game.global.phase === 2){
                var regionSelect = Math.floor(Math.random() * 2);
                var selectMarker = 0;
                if (regionSelect === 0) {
                    var selectMarker = Math.floor(Math.random() * game.global.friGroup.children.length);
                    var selectedShip = game.global.friGroup.children[selectMarker];
                    var selectedShipGroup = game.global.friGroup.children;
                };
                if (regionSelect === 1) {
                    var selectMarker = Math.floor(Math.random() * game.global.perGroup.children.length);
                    var selectedShip = game.global.perGroup.children[selectMarker];
                    var selectedShipGroup = game.global.perGroup.children;
                };

                var placedShip = false;
                var spawnedShip = false;

                while (spawnedShip === false) {
                    game.global.orbiterGroup.children.forEach(function(ship){

                        if (ship.moveData.atMarker === selectedShip.id){
                            placedShip = true;
                            return;
                        }
                    });

                    if (placedShip === false){
                        game.global.spawnNewOrbiter(
                            'enemyship', game.global.searchArrayById(selectedShip.id,game.global.points), '0xB51C04');
                        game.global.nrEnemyShips += 1;
                        spawnedShip = true;
                        return;
                    }

                    selectMarker = Math.floor(Math.random * game.global.friGroup.children.length);
                    selectedShip = selectedShipGroup[selectMarker];
                }

            }

            if (game.global.phase === 3){
                var regionSelect = Math.floor(Math.random() * 3);
                var selectMarker = 0;
                if (regionSelect === 0) {
                    var selectMarker = Math.floor(Math.random() * game.global.friGroup.children.length);
                    var selectedShip = game.global.friGroup.children[selectMarker];
                    var selectedShip = game.global.friGroup.children[selectMarker];
                };
                if (regionSelect === 1) {
                    var selectMarker = Math.floor(Math.random() * game.global.perGroup.children.length);
                    var selectedShip = game.global.perGroup.children[selectMarker];
                    var selectedShip = game.global.perGroup.children[selectMarker];
                };
                if (regionSelect === 2) {
                    var selectMarker = Math.floor(Math.random() * game.global.corGroup.children.length);
                    var selectedShip = game.global.corGroup.children[selectMarker];
                    var selectedShip = game.global.corGroup.children[selectMarker];
                };
                

                var placedShip = false;
                var spawnedShip = false;

                while (spawnedShip === false) {
                    game.global.orbiterGroup.children.forEach(function(ship){

                        if (ship.moveData.atMarker === selectedShip.id){
                            placedShip = true;
                            return;
                        }
                    });

                    if (placedShip === false){
                        game.global.spawnNewOrbiter(
                            'enemyship', game.global.searchArrayById(selectedShip.id,game.global.points), '0xB51C04');
                        game.global.nrEnemyShips += 1;
                        spawnedShip = true;
                        return;
                    }

                    selectMarker = Math.floor(Math.random * game.global.friGroup.children.length);
                    selectedShip = selectedShipGroup[selectMarker];
                }
            }
        };
    },
    
    toggleLineDisplay: function() {
        if (game.global.lineGroup.visible) {
            game.global.lineGroup.visible = false;
        } else {
            game.global.lineGroup.visible = true;
        }
    },

    drawMinimap: function(topLayer) {
        var bmd = game.add.bitmapData(game.world.width, game.world.height);
        bmd.drawGroup(topLayer);
        var image = game.add.image(200, 200, bmd);
        image.scale.setTo(.1);
    },

    updateTimer: function() {

        if (game.global.countDownTime > -1) {
            if (game.global.countDownTimeSeconds > -1) {
                game.global.countDownTimeSeconds--;
            } else {
                game.global.countDownTimeSeconds = 59;
                game.global.countDownTime--;
            }
            game.global.Xfont.text = game.global.countDownTime.toString() + ':' +
                game.global.countDownTimeSeconds.toString();
        } else {
            game.time.events.stop();
        };
    },

    countdownTimer: function() {

        game.global.countdownTimerTime = game.time.create();
        // Create a delayed event 1m and 30s from now
        game.global.timerEvent = game.global.countdownTimerTime.add(Phaser.Timer.MINUTE * 0.5, this.endTimer, this);

        // Start the timer
        game.global.countdownTimerTime.start();
    },

    endTimer: function() {
        // Stop the timer when the delayed event triggers
        game.global.countdownTimerTime.stop();
    },

    formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }
};