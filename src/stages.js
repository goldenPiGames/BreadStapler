var world;
var worldIndex;
var stage;
//var stageTimer;
var stageIndex;
var accHits;
var accTotal;

const StageBase = {
	score : 0,
	drawBackground() {
		this.background.draw();
	},
	pointsBread : function(points) {
		this.score += points;
	},
	hurtPoison : function(points) {
		this.score -= points;
	},
	hurtCurse : function(points) {
		this.score -= points;
	},
}

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
	if (stageIndex < world.stages.length) {
		stage = new world.stages[index](diffMult);
		stageIntroScreen.begin();
	} else {
		worldFinishedScreen.begin();
	}
}

function initHiscoreSave() {
	var scoresStr = localStorage.getItem("breadhiscores");
	if (scoresStr) {
		var scoresObj;
		try {
			var scoresObj = JSON.parse(scoresStr);
		} catch (err) {
			localStorage.setItem("breadhiscores", "{}");
		}
	} else
		localStorage.setItem("breadhiscores", "{}");
}

initHiscoreSave();

const WORLDS = [
	
]

function World(name, color) {
	this.name = name;
	this.title = lg("world-"+name);
	this.color = color;
	this.stages = [];
	this.hiscore = JSON.parse(localStorage.getItem("breadhiscores"))[this.name];
}
World.prototype.tryHiscore = function(kor) {
	if (!(kor <= this.hiscore)) {
		this.hiscore = kor;
		var his = JSON.parse(localStorage.getItem("breadhiscores"));
		his[this.name] = this.hiscore;
		localStorage.setItem("breadhiscores", JSON.stringify(his));
		return true;
	} else
		return false;
}