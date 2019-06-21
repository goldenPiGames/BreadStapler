var faders = [];
var totalScore = 0;

function startWorld(tos) {
	if (typeof tos == "number") {
		worldIndex = tos;
		world = WORLDS[worldIndex];
	} else {
		world = tos;
		worldIndex = world.index;
	}
	diffAdjCurrent = 0;
	diffAdjAll = 0;
	totalScore = 0;
	startStage(0);
}

var staples;

const gameEngine = {
	update : function() {
		stage.update();
		staples = staples.filter(oj => oj.update());
		breads = breads.filter(oj => oj.update());
		trees.forEach(oj=>oj.update());
		if (stage.hasWon()) {
			winStage();
			return;
		}
		if (stage.hasLost()) {
			loseStage();
			return;
		}
	},
	draw : function() {
		ctx.globalAlpha = 1;
		stage.drawBackground();
		trees.forEach(oj=>oj.draw());
		faders = faders.filter(oj=>oj.drawAfter());
		ctx.globalAlpha = 1;
		breads.forEach(oj=>oj.draw());
		staples.forEach(oj => oj.draw());
		stage.drawHUD();
	},
	click : function(ix, iy) {
		staples.push(new Staple(ix, iy, stage.delay || 0));
	},
}
