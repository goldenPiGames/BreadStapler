var diffAdjCurrent;
var diffAdjAll;

function loseStage() {
	stageLostScreen.begin();
}

var stageLostScreen = {
	retryButton : new Button(SIZE/4, SIZE*2/3, SIZE/2, TEXT_HEIGHT+6, "RETRY", function(){startStage(stageIndex)}),
	mainMenuButton : new Button(SIZE/4, SIZE*2/3 + TEXT_HEIGHT*3/2, SIZE/2, TEXT_HEIGHT+6, "MAIN MENU", function(){worldSelect.begin();}),
	begin : function() {
		diffAdjCurrent += 5;
		diffAdjAll += 1;
		runnee = this;
	},
	update : function() {
		
	},
	draw : function() {
		drawText("STAGE LOST", SIZE/2, SIZE/4, 1/2);
		drawText("DIFFICULTY ADJUSTMENT", SIZE/2, SIZE/2-TEXT_HEIGHT, 1/2);
		drawText("THIS STAGE:", SIZE/2, SIZE/2, 1); drawText("-"+diffAdjCurrent+"%", SIZE/2, SIZE/2, 0);
		drawText("FUTURE:", SIZE/2, SIZE/2+TEXT_HEIGHT, 1); drawText("-"+diffAdjAll+"%", SIZE/2, SIZE/2+TEXT_HEIGHT, 0);
		this.stageTotal = 0;
		this.retryButton.draw();
		this.mainMenuButton.draw();
	},
	click : function(x, y) {
		this.retryButton.checkClick(x, y);
		this.mainMenuButton.checkClick(x, y);
	},
}

var gameOverScreen = {
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
}

function getDiffMult() {
	return (100-diffAdjCurrent)/100;
}