var world;
var worldIndex;
var stage;
//var stageTimer;
var stageIndex;
var accHits;
var accTotal;

class Stage {
	drawBackground() {
		this.background.draw();
	}
	pointsBread(points) {
		this.score += points;
	}
	pointsBonus(points) {
		this.score += points;
	}
	hurtPoison(points) {
		this.score -= points;
	}
	hurtCurse(points) {
		this.score -= points;
	}
	hurtImpact(points) {
		this.score -= points;
	}
}
Stage.prototype.score = 0;
Stage.prototype.delay = 0;

function startNextStage() {
	diffAdjCurrent = diffAdjAll;
	startStage(stageIndex + 1);
}

function startStage(index) {
	//stageTimer = 0;
	accHits = 0;
	accTotal = 0;
	stageIndex = index;
	staples = [];
	breads = [];
	trees = [];
	var diffMult = getDiffMult();
	if (world.atEnd(index)) {
		worldFinishedScreen.begin();
	} else {
		stage = world.getStage(index, diffMult);
		runnee = new StageIntroScreen();
	}
}

function initHiscoreSave() {
	var scoresStr = localStorage.getItem("breadhiscores");
	if (scoresStr) {
		try {
			var scoresObj = JSON.parse(scoresStr);
		} catch (err) {
			localStorage.setItem("breadhiscores", "{}");
		}
	} else {
		localStorage.setItem("breadhiscores", "{}");
	}
}

initHiscoreSave();

function loadHiscores() {
	var scoresObj = JSON.parse(localStorage.getItem("breadhiscores"));
	WORLDS.forEach(w => {
		w.hiscore = scoresObj[w.id];
	});
}

const WORLDS = [
	
]

class World {
	constructor(name, color) {
		this.name = name;
		this.title = lg("world-"+name);
		this.color = color;
		this.stages = [];
		this.hiscore = JSON.parse(localStorage.getItem("breadhiscores"))[this.name];
	}
	tryHiscore(kor) {
		if (!this.hiscore || kor > this.hiscore) {
			this.hiscore = kor;
			var his = JSON.parse(localStorage.getItem("breadhiscores"));
			his[this.name] = this.hiscore;
			localStorage.setItem("breadhiscores", JSON.stringify(his));
			return true;
		} else
			return false;
	}
	atEnd(index) {
		return index >= this.stageCons.length;
	}
	getStage(index, diffMult) {
		return new (this.stageCons[index])(diffMult);
	}
}