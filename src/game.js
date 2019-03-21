var faders = [];
var totalScore = 0;
var diffAdjCurrent;
var diffAdjAll;

function startWorld(tos) {
	if (typeof tos == "number") {
		worldIndex = dex;
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
		staples = staples.filter(oj=>oj.update());
		breads = breads.filter(function(oj) {
			oj.update();
			if (oj.hasFallen()) {
				stage.breadFell(oj);
				return false;
			} else
				return true;
		});
		trees.forEach(oj=>oj.update());
		if (stage.hasWon()) {
			switchScreen(stageFinishing);
			return;
		}
		if (stage.hasLost()) {
			gameOverScreen.begin();
		}
	},
	draw : function() {
		ctx.globalAlpha = 1;
		stage.drawBackground();
		trees.forEach(oj=>oj.draw());
		faders = faders.filter(oj=>oj.drawAfter());
		ctx.globalAlpha = 1;
		breads.forEach(oj=>oj.draw());
		ctx.globalAlpha = .7;
		var HUDlines = [
			"SCORE:"+fillLeft(stageScore, 6, "0"),
		].concat(stage.getHUDlines());
		HUDlines.forEach(function(oj, dex) {
			drawText(oj, 3, dex*TEXT_HEIGHT+3, 0);
		});
	},
	click : function(ix, iy) {
		staples.push(new Staple(ix, iy, stage.delay || 0));
	},
}

/* function tryStaple(stap) {
	var x = stap.x;
	var y = stap.y;
	accTotal ++;
	var hitBread = [];
	var notHitBread = [];
	breads.forEach(function(oj, dex) {
		var coll = oj.collides(x, y);
		if (coll) {
			hitBread.push(oj);
			oj.coll = coll;
		} else {
			notHitBread.push(oj);
			oj.coll = false;
		}
	});
	if (hitBread.length <= 0) {
		
		return;
	}
	//console.log("hit");
	breads = notHitBread;
	var hitTree = null;
	var collTree = 0;
	trees.forEach(function(oj) {
		var coll = oj.collides(x, y);
		if (coll) {
			hitTree = oj;
			collTree = coll;
		}
	});
	if (!hitTree) {
		hitBread.forEach(oj => stage.breadFell(oj));
		return;
	}
	hitBread.forEach(function(oj) {
		accHits ++;
		oj.gotPoints = oj.getPoints(oj.coll, collTree);
		stageScore += oj.gotPoints;
		faders.push(oj);
	});
} */
