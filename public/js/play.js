var playState = {

    eShipCounter: 0,
    selectedShip: '',

	create: function() { 
        
        // Set a background color and the physic system
        var background = game.add.tileSprite(0,0, 1920, 1080, 'background');

        // Draw status screen rectangle
        var statusRect = game.add.graphics(0,0);
        statusRect.beginFill(0x99ccff);
        statusRect.lineStyle(2, 0x0000FF, 1);
        statusRect.drawRect(0, 0, 500, 1080);
        statusRect.alpha = 0.7;

        var statusTitle = game.add.retroFont('Xfont', 8, 8, Phaser.RetroFont.TEXT_SET1);
        statusTitle.align = Phaser.RetroFont.ALIGN_CENTER;
        statusTitle.multiLine = true;
        statusTitle.autoUpperCase = false;
        statusTitle.text = 'Status:';
        var statusTitleImage = game.add.image(10, 30, statusTitle);
        statusTitleImage.scale.x = 5;
        statusTitleImage.scale.y = 5;
        statusTitleImage.visible = true;

        var selectedTitle = game.add.retroFont('Xfont', 8, 8, Phaser.RetroFont.TEXT_SET1);
        selectedTitle.align = Phaser.RetroFont.ALIGN_CENTER;
        selectedTitle.multiLine = true;
        selectedTitle.autoUpperCase = false;
        selectedTitle.text = 'Selected:';
        var selectedTitleImage = game.add.image(10, 600, selectedTitle);
        selectedTitleImage.scale.x = 5;
        selectedTitleImage.scale.y = 5;
        selectedTitleImage.visible = true;

        game.global.selectedFlag = game.add.image(20, 700, null);
        game.global.selectedFlag.scale.x = 0.5;
        game.global.selectedFlag.scale.y = 0.5;

        game.global.shadow = game.add.sprite(30, 710, 'earthflag');
        game.global.shadow.tint = 0x000000;
        game.global.shadow.scale.x = 0.5;
        game.global.shadow.scale.y = 0.5;
        game.global.shadow.alpha = 0.6;
        game.global.shadow.visible = false;



        // Keys
        var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        var cKey = game.input.keyboard.addKey(Phaser.KeyCode.C);
        var dKey = game.input.keyboard.addKey(Phaser.KeyCode.D);
        var eKey = game.input.keyboard.addKey(Phaser.KeyCode.E);
        var pKey = game.input.keyboard.addKey(Phaser.KeyCode.P);
        var hKey = game.input.keyboard.addKey(Phaser.KeyCode.H);
        var rKey = game.input.keyboard.addKey(Phaser.KeyCode.R);
        var sKey = game.input.keyboard.addKey(Phaser.KeyCode.S);
        var gKey = game.input.keyboard.addKey(Phaser.KeyCode.G);
        var mKey = game.input.keyboard.addKey(Phaser.KeyCode.M);

        game.global.kKey = game.input.keyboard.addKey(Phaser.KeyCode.K);

        var lineKey = game.input.keyboard.addKey(Phaser.KeyCode.L);
        var oneKey = game.input.keyboard.addKey(Phaser.KeyCode.ONE);
        var twoKey = game.input.keyboard.addKey(Phaser.KeyCode.TWO);
        var threeKey = game.input.keyboard.addKey(Phaser.KeyCode.THREE);
        var fourKey = game.input.keyboard.addKey(Phaser.KeyCode.FOUR);
        var fiveKey = game.input.keyboard.addKey(Phaser.KeyCode.FIVE);
        var sixKey = game.input.keyboard.addKey(Phaser.KeyCode.SIX);
        var sevenKey = game.input.keyboard.addKey(Phaser.KeyCode.SEVEN);
        var eightKey = game.input.keyboard.addKey(Phaser.KeyCode.EIGHT);
        var nineKey = game.input.keyboard.addKey(Phaser.KeyCode.NINE);



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
        var coreColor = '0x67bbe4';
        var peripheryColor = '0x79b5d2';
        var fringeColor = '0x94acb8';

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

        game.world.bringToTop(game.global.planets);
        game.world.bringToTop(game.global.orbiterGroup);
        game.world.bringToTop(game.global.selectedFlag);

        // Earth
        game.global.spawnNewOrbiter(
        'earthship',
        game.global.searchArrayById('0c',game.global.points),
        '0x0F497B',
        oneKey,
        'Earth');
        // Mercury
        game.global.spawnNewOrbiter(
        'friendlyship',
        game.global.searchArrayById('1c',game.global.points),
        '0xdfe129',
        twoKey,
        'Mercury');
        // Mars
        game.global.spawnNewOrbiter(
        'marsship',
        game.global.searchArrayById('2c',game.global.points),
        '0xf6cb14',
        threeKey,
        'Mars');
        // Europa
        game.global.spawnNewOrbiter(
        'europaship',
        game.global.searchArrayById('1p',game.global.points),
        '0x3bbab7',
        fourKey,
        'Europa');
        // Titan
        game.global.spawnNewOrbiter(
        'titanship',
        game.global.searchArrayById('2p',game.global.points),
        '0x39e75f',
        fiveKey,
        'Titan');
        // Miranda
        game.global.spawnNewOrbiter(
        'friendlyship',
        game.global.searchArrayById('0p',game.global.points),
        '0xaeb3cc',
        sixKey,
        'Miranda');
        // Triton
        game.global.spawnNewOrbiter(
        'friendlyship',
        game.global.searchArrayById('3f',game.global.points),
        '0x48d5ff',
        sevenKey,
        'Triton');
        // Pluto and Charon
        game.global.spawnNewOrbiter(
        'plutoship',
        game.global.searchArrayById('2f',game.global.points),
        '0xbd0030',
        eightKey,
        'Pluto');
        // Beatrix
        game.global.spawnNewOrbiter(
        'beatrixship',
        game.global.searchArrayById('1f',game.global.points),
        '0xd30ef9',
        nineKey,
        'Beatrix');

        // TODO: Refactor all on-board status text to functions
        game.global.Xfont = game.add.retroFont('Xfont', 8, 8, Phaser.RetroFont.TEXT_SET1);
        game.global.Xfont.align = Phaser.RetroFont.ALIGN_CENTER;
        game.global.Xfont.multiLine = true;
        game.global.Xfont.autoUpperCase = false;
        game.global.Xfont.buildRetroFontText();
        var image = game.add.image(1500, 100, game.global.Xfont);
        image.scale.x = 10;
        image.scale.y = 10;
        image.visible = false;
        // Countdown for ten minutes
        cKey.onDown.add(this.countdownTimer, this);
        // http://www.html5gamedevs.com/topic/3541-listener-functions-how-do-i-properly-use-them/
        dKey.onDown.add(function() {this.toggleDisplay(image)}, this);

        game.global.phaseFont = game.add.retroFont('Xfont', 8, 8, Phaser.RetroFont.TEXT_SET1);
        game.global.phaseFont.align = Phaser.RetroFont.ALIGN_CENTER;
        game.global.phaseFont.multiLine = true;
        game.global.phaseFont.autoUpperCase = false;
        game.global.phaseFont.text = 'Phase: ' + game.global.phase.toString();
        game.global.phaseFont.buildRetroFontText();
        var phaseIndicator = game.add.image(20, 100, game.global.phaseFont);
        phaseIndicator.scale.x = 3;
        phaseIndicator.scale.y = 3;
        phaseIndicator.visible = true;

        pKey.onDown.add(this.phaseChanger, this);
        eKey.onDown.add(this.enemySpawner, this);
        rKey.onDown.add(this.resourceSpawner, this);

        this.eShipCounter = game.add.retroFont('Xfont', 8, 8, Phaser.RetroFont.TEXT_SET1);
        this.eShipCounter.align = Phaser.RetroFont.ALIGN_CENTER;
        this.eShipCounter.multiLine = true;
        this.eShipCounter.autoUpperCase = false;
        this.eShipCounter.text = 'Hound Ships: ' + game.global.nrEnemyShips.toString();
        this.eShipCounter.buildRetroFontText();

        var shipCount = game.add.image(20, 200, this.eShipCounter);
        shipCount.scale.x = 3;
        shipCount.scale.y = 3;
        shipCount.visible = false;
        hKey.onDown.add(function() {this.toggleDisplay(shipCount)}, this);

        this.selectedShip = game.add.retroFont('Xfont', 8, 8, Phaser.RetroFont.TEXT_SET1);
        this.selectedShip.align = Phaser.RetroFont.ALIGN_CENTER;
        this.selectedShip.multiLine = true;
        this.selectedShip.autoUpperCase = false;
        this.selectedShip.text = game.global.selectedShipName;
        this.selectedShip.buildRetroFontText();

        var shipSelect = game.add.image(20, 660, this.selectedShip);
        shipSelect.scale.x = 3;
        shipSelect.scale.y = 3;
        shipSelect.visible = true;

        mKey.onDown.add(function() {
            this.toggleDisplay(shipSelect);
            this.toggleDisplay(statusRect);
            this.toggleDisplay(phaseIndicator);
            this.toggleDisplay(selectedTitleImage);
            this.toggleDisplay(statusTitleImage);
        }, this);

        // TODO: Refactor save function to use objects and behave more generically
        sKey.onDown.add(function() {
            localStorage.setItem('phase', game.global.phase.toString());
            localStorage.setItem('saved', 'true');

            var planetships = [];
            var enemyships = [];
            var resourceNames = [];
            var resourceMarkers = [];
            game.global.orbiterGroup.forEach(function(orbiter) {
            // Save position data of all orbiters
                if (orbiter.shipName === 'Earth') {
                    planetships.earth = orbiter.moveData.atMarker;
                }
                if (orbiter.shipName === 'Mars') {
                    planetships.mars = orbiter.moveData.atMarker;
                }

                if (orbiter.shipName === 'Mercury') {
                    planetships.mercury = orbiter.moveData.atMarker;
                }

                if (orbiter.shipName === 'Titan') {
                    planetships.titan = orbiter.moveData.atMarker;
                }

                if (orbiter.shipName === 'Europa') {
                    planetships.europa = orbiter.moveData.atMarker;
                }

                if (orbiter.shipName === 'Triton') {
                    planetships.triton = orbiter.moveData.atMarker;
                }

                if (orbiter.shipName === 'Miranda') {
                    planetships.miranda = orbiter.moveData.atMarker;
                }

                if (orbiter.shipName === 'Pluto') {
                    planetships.pluto = orbiter.moveData.atMarker;
                }
                if (orbiter.shipName === 'Beatrix') {
                    planetships.beatrix = orbiter.moveData.atMarker;
                }
                if (orbiter.shipName.toString().indexOf("Hound") >= 0) {
                    enemyships.push(orbiter.moveData.atMarker)
                }
                if (orbiter.textureName.indexOf("heliumthree") >= 0 ||
                   orbiter.textureName.indexOf("antihydrogen") >= 0) {

                   resourceNames.push(orbiter.textureName);
                   resourceMarkers.push(orbiter.moveData.atMarker);
                }

            });

            localStorage.setItem('planetships', [planetships.earth,planetships.mars,planetships.mercury,
            planetships.titan,planetships.europa,planetships.triton,planetships.miranda,planetships.pluto,
            planetships.beatrix]);

            localStorage.setItem('enemyships', enemyships);
            localStorage.setItem('resourceNames', resourceNames);
            localStorage.setItem('resourceMarkers', resourceMarkers);

        }, this);

        var saved = localStorage.getItem('saved');
        if (saved === 'true') {
            game.global.phase = parseInt(localStorage.getItem('phase'));
            var ships = localStorage.getItem('planetships').split(',');
            var enemies = localStorage.getItem('enemyships').split(',');
            var resourceNames = localStorage.getItem('resourceNames').split(',');
            var resourceMarkers = localStorage.getItem('resourceMarkers').split(',');

            // Move fleets to saved markers in the following order:
            // Earth,Mars,Mercury,Titan,Europa,Triton,Miranda,Pluto,Beatrix
            for (var i = 0; i < 9; i++) {
                var marker = game.global.searchArrayById(ships[i],game.global.points);
                game.global.orbiterGroup.children[i].moveData.startX =
                marker.pos.x;

                game.global.orbiterGroup.children[i].moveData.startY =
                marker.pos.y;
            }

            // TODO: Implement rigorous check if enemy ships or resources exist.
            if (enemies && enemies.length > 0) {
                for (var i = 0; i < enemies.length; i++) {
                    if (!(enemies[i] === ("" || "undefined" || "false" || "null" || null || false ))) {
                        game.global.spawnNewOrbiter(
                            'enemyship',
                            game.global.searchArrayById(enemies[i],game.global.points),
                            '0xB51C04',
                            null,
                            'Hound' + game.global.totalNrEnemyShips.toString());
                        game.global.nrEnemyShips += 1;
                        game.global.totalNrEnemyShips += 1;

                    }
                }
            }

            if (resourceMarkers && resourceMarkers.length > 0) {
                if (resourceMarkers.length === resourceNames.length ) {
                    for (var i = 0; i < resourceNames.length; i++) {
                        if (!(resourceMarkers[i] === ("" || "undefined" || "false" || "null" || null || false ))) {
                            game.global.spawnNewOrbiter(
                            resourceNames[i],
                            game.global.searchArrayById(resourceMarkers[i],game.global.points),
                            false,
                            false,
                            resourceNames[i]);
                        }
                    }
                } else {
                    console.log('Resource markers not same length as resource names.');
                }
            }
        }
	},

	update: function() {
        this.updateOrbiterMovement();
	},
    
    render: function() {

            // Render status text
            game.global.phaseFont.text = 'Phase: ' + game.global.phase.toString();
            this.eShipCounter.text = 'Hound Ships: ' + game.global.nrEnemyShips.toString();
            this.selectedShip.text = game.global.selectedShipName;

            // Render countdown timer
            if (game.global.countdownTimerTime && game.global.countdownTimerTime.running) {
                game.global.Xfont.text = this.formatTime(Math.round((game.global.timerEvent.delay - game.global.countdownTimerTime.ms) / 1000));
            }
            else {
                game.global.Xfont.text = "00:00";
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

        var planetX = 40;
        var planetY = 40;
        var planetNameTemp = planetName;

        if (planetName === 'plutocharon') {
            planetNameTemp = 'pluto';
        };

        if (planetName === 'asteroid') {
            planetNameTemp = 'beatrix';
        };

        if (planetName === 'uranus') {
            planetX = 60;
            planetY = 60;
        };

        if (planetName === 'jupiter') {
            planetX = -20;
            planetY = 80;
        };

        if (planetName === 'neptune') {
            planetX = -50;
            planetY = 40;
        };

        if (planetName === 'saturn') {
            planetX = 40;
            planetY = -45;
        };

        var fontspot = game.add.bitmapText(game.world.centerX + posX - planetX,
            game.world.centerY + posY - planetY, 'gem', planetNameTemp, 16);
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

        var planetX = 12;
        var planetY = 12;

        if (moonName === 'titan') {
            planetX = 10    ;
            planetY = -30;
        };

        var fontspot = game.add.bitmapText(planet.x + posX + planetX,
            planet.y + posY + planetY, 'gem', moonName, 16);
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
                    var smIndex = game.global.selectedMarkers.indexOf(game.global.searchArrayById(this.id,game.global.selectedMarkers));
                    if (smIndex > -1) {
                        game.global.selectedMarkers.splice(smIndex,1);
                        this.alpha = 0.5;
                        this.selected = false;
                        return true;
                    }
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
                                orbiter.moveData.atMarker = game.global.selectedMarkers[0].id;
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
//            console.log(game.global.points);
    },
    
    connectionLogger: function() {
//            console.log(game.global.connectedMarkers);
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
//
//    moveOrbiter: function() {
//
//        orbiter.kill();
//        game.global.spawnNewOrbiter('friendlyship',game.global.selectedMarkers);
//
//    },
    
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
    
    phaseChanger: function() {

        if (game.global.phase === 0) {
            game.global.phase = 1;
        } else if (game.global.phase === 1) {
            game.global.phase = 2;
        } else if (game.global.phase === 2) {
            game.global.phase = 3;
        } else if (game.global.phase === 3) {
            game.global.phase = 0;
        } else {
            game.global.phase = 0;
        }
    },

    resourceSpawner: function() {
        var resourceAmount = Math.floor(Math.random() * 3) + 1;
        var resourceTypes = ['antihydrogen', 'heliumthree', 'heliumthree'];
        var resourceTypeSelect = Math.floor(Math.random() * 3);
        var resourceString = resourceTypes[resourceTypeSelect] + resourceAmount.toString();


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
                    var ship = game.global.spawnNewOrbiter(
                        resourceString,
                        game.global.searchArrayById(selectedShip.id,game.global.points),
                        false,
                        false,
                        resourceTypeSelect);
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
                    var ship = game.global.spawnNewOrbiter(
                        resourceString,
                        game.global.searchArrayById(selectedShip.id,game.global.points),
                        false,
                        false,
                        resourceTypeSelect);
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
                    var ship = game.global.spawnNewOrbiter(
                        resourceString,
                        game.global.searchArrayById(selectedShip.id,game.global.points),
                        false,
                        false,
                        resourceTypeSelect);
                    spawnedShip = true;
                    return;
                }

                selectMarker = Math.floor(Math.random * game.global.friGroup.children.length);
                selectedShip = selectedShipGroup[selectMarker];
            }
        };
    },

    enemySpawner: function() {
        if (game.global.nrEnemyShips < 10) {
            if (game.global.phase === 1){
                var selectMarker = Math.floor(Math.random() * game.global.friGroup.children.length);
                var selectedShip = game.global.friGroup.children[selectMarker];
                var selectedShipGroup = game.global.friGroup.children;
                var placedShip = false;
                var spawnedShip = false;

                while (spawnedShip === false) {
                    game.global.orbiterGroup.children.forEach(function(ship){

                        if (selectedShip.id) {
                            if (ship.moveData.atMarker === selectedShip.id){
                                placedShip = true;
                                return;
                            }
                        }
                    });

                    if (placedShip === false){
                        var ship = game.global.spawnNewOrbiter(
                            'enemyship',
                            game.global.searchArrayById(selectedShip.id,game.global.points),
                            '0xB51C04',
                            null,
                            'Hound' + game.global.totalNrEnemyShips.toString());
                        game.global.nrEnemyShips += 1;
                        game.global.totalNrEnemyShips += 1;
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
                        var ship = game.global.spawnNewOrbiter(
                            'enemyship',
                            game.global.searchArrayById(selectedShip.id,game.global.points),
                            '0xB51C04',
                            null,
                            'Hound' + game.global.totalNrEnemyShips.toString());
                        game.global.nrEnemyShips += 1;
                        game.global.totalNrEnemyShips += 1;
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
                        var ship = game.global.spawnNewOrbiter(
                            'enemyship',
                            game.global.searchArrayById(selectedShip.id,game.global.points),
                            '0xB51C04',
                            null,
                            'Hound' + game.global.totalNrEnemyShips.toString());
                        game.global.nrEnemyShips += 1;
                        game.global.totalNrEnemyShips += 1;
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

    toggleDisplay: function(thing) {
        if (thing.visible) {
            thing.visible = false;
        } else {
            thing.visible = true;
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
        game.global.timerEvent = game.global.countdownTimerTime.add(Phaser.Timer.MINUTE * 10, this.endTimer, this);

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