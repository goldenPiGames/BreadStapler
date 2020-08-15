var diffAdjCurrent;
var diffAdjAll;

function loseStage() {
	diffAdjCurrent += 5;
	diffAdjAll += 1;
	runnee = new StageLostScreen();
}
class StageLostScreen {
	constructor() {
		this.retryButton = new Button(SIZE/4, SIZE*2/3, SIZE/2, TEXT_HEIGHT+6, lg("lostscreen-retry"), ()=>startStage(stageIndex));
		this.mainMenuButton = new Button(SIZE/4, SIZE*2/3 + TEXT_HEIGHT*3/2, SIZE/2, TEXT_HEIGHT+6, lg("lostscreen-quit"), ()=>runnee = new WorldSelect());
		if (stage.haltMusicOnLoss) {
			stopMusic();
			playSFX("haltlose");
		}
	}
	update() {
		
	}
	draw() {
		drawText(lg("lostscreen-head"), SIZE/2, SIZE/4, 1/2);
		drawText(lg("lostscreen-adjust"), SIZE/2, SIZE/2-TEXT_HEIGHT, 1/2);
		drawText(lg("lostscreen-this"), SIZE/2, SIZE/2, 1); drawText("-"+diffAdjCurrent+"%", SIZE/2, SIZE/2, 0);
		drawText(lg("lostscreen-future"), SIZE/2, SIZE/2+TEXT_HEIGHT, 1); drawText("-"+diffAdjAll+"%", SIZE/2, SIZE/2+TEXT_HEIGHT, 0);
		this.stageTotal = 0;
		this.retryButton.draw();
		this.mainMenuButton.draw();
	}
	click(x, y) {
		this.retryButton.checkClick(x, y);
		this.mainMenuButton.checkClick(x, y);
	}
}

/*var gameOverScreen = {
	mainMenuButton : new Button(SIZE/4, SIZE*2/3, SIZE/2, 35, "MAIN MENU", function(){runnee = mainMenu}),
	begin : function() {
		runnee = this;
	},
	update : function() {
		
	},
	draw : function() {
		drawText("GAME OVER", SIZE/2, SIZE/3, 1/2);
		this.mainMenuButton.draw();
	},
	click : function(x, y) {
		this.mainMenuButton.checkClick(x, y);
	},
}*/

function getDiffMult() {
	return (100-diffAdjCurrent)/100;
}