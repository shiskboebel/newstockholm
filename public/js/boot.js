var bootState = {

	preload: function () {	
        game.load.image('background', 'assets/bgtex.png');
        game.load.image('sun', 'assets/Sun.png');
        game.load.image('kuiperbelt', 'assets/kuiperbelt.png');
        game.load.image('mercury', 'assets/mercury.png');
        game.load.image('venus', 'assets/venus.png');
        game.load.image('earth', 'assets/earth.png');
        game.load.image('mars', 'assets/mars.png');
        game.load.image('jupiter', 'assets/jupiter.png');
        game.load.image('saturn', 'assets/saturn.png');
        game.load.image('uranus', 'assets/uranus.png');
        game.load.image('neptune', 'assets/neptune.png');
        game.load.image('europa', 'assets/europa.png');
        game.load.image('titan', 'assets/titan.png');
        game.load.image('miranda', 'assets/miranda.png');
        game.load.image('triton', 'assets/triton.png');
        game.load.image('plutocharon', 'assets/plutocharon.png');
        game.load.image('asteroid', 'assets/asteroid.png');

        game.load.image('antihydrogen1', 'assets/resource_antihydrogen_1.png');
        game.load.image('antihydrogen2', 'assets/resource_antihydrogen_2.png');
        game.load.image('antihydrogen3', 'assets/resource_antihydrogen_3.png');

        game.load.image('heliumthree1', 'assets/resource_heliumthree_1.png');
        game.load.image('heliumthree2', 'assets/resource_heliumthree_2.png');
        game.load.image('heliumthree3', 'assets/resource_heliumthree_3.png');

        game.load.image('enemyship', 'assets/enemyship.png');
        game.load.image('friendlyship', 'assets/friendlyship.png');

        game.load.image('marker', 'assets/marker.png');
        game.load.spritesheet('explosion', 'assets/explosion.png', 64, 64, 23);
        
        game.load.spritesheet('enemybutton', 'assets/enemybuttonsheet.png',504,552,3);
        game.load.spritesheet('phase1button', 'assets/phase1sheet.png',348,432,3);
        game.load.spritesheet('phase2button', 'assets/phase2sheet.png',348,433,3);
        game.load.spritesheet('phase3button', 'assets/phase3sheet.png',348,433,3);
        
        game.load.image('markerFont', 'assets/fonts/retroFonts/FONT3.png');
        game.load.bitmapFont('gem', 'assets/fonts/bitmapFonts/gem.png', 'assets/fonts/bitmapFonts/gem.xml');
        game.load.image('Xfont', 'assets/fonts/arcadeFonts/8x8/Xexex.png', true);
        
        game.global.friArray = [[642,296],[701,994],[759,56],[1513,457],[1210,206],[695,824],[1256,890],[587,596],[549,437],[969,151],[1359,274],[1402,556],[1391,842],[1034,1012],[573,724],[740,188],[621,380],[824,925]];
        game.global.perArray = [[1310,678],[1264,525],[960,810],[695,516],[694,675],[829,780],[792,304],[954,248],[1238,315],[1232,622],[1155,759],[1092,883],[843,230],[725,408],[1085,271],[1321,407],[1130,360]];
        game.global.corArray = [[906,390],[1039,538],[1112,467],[1003,665],[821,399],[1020,337],[1148,601],[916,630],[891,472],[794,586],[854,714],[1103,694],[1011,435],[800,502]]; 
        
        game.global.linesArray = ["2f15f", "15f0f", "15f12p", "12p6p", "6p0f", "0f16f", "16f8f", "2f9f", "2f12p", "12p7p", "7p5c", "7p9f", "9f14p", "14p4f", "14p7p", "14p5c", "14p16p", "16p5c", "5c0c", "0c4c", "4c6p", "6p15f", "6p13p", "13p4c", "13p16f", "13p0f", "8f3p", "8f7f", "7f3p", "3p13p", "13p13c", "13c4c", "13c3p", "6p0c", "0c8c", "8c4c", "8c13c", "8c0s", "0s7c", "1c0s", "0s3c", "0s12c", "12c0c", "12c1c", "1c3c", "3c7c", "7c8c", "9c7c", "9c13c", "9c4p", "9c3p", "3p4p", "4p7f", "7f14f", "14f4p", "14f5f", "5f5p", "5p4p", "5p10c", "5p17f", "10c7c", "10c9c", "4p10c", "4p5f", "5f1f", "1f17f", "17f13f", "17f2p", "2p5p", "2p10c", "2p11p", "11p13f", "13f6f", "6f11p", "6f10p", "10p11c", "10p2p", "11c3c", "11c6c", "6c9p", "9p0p", "9p10p", "0p12f", "12f6f", "12f10p", "0p11f", "11f1p", "1p9p", "1p6c", "6c2c", "6c1c", "1c2c", "2c12c", "2c16p", "16p12c", "5c12c", "16p8p", "8p15p", "15p1p", "15p11f", "11f3f", "3f15p", "15p10f", "10f8p", "10f4f", "4f8p", "8p14p", "10f3f", "4f9f", "9f12p"];

	},

	create: function() { 

        
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.state.start('load');
	}
};