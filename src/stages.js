var world;
var worldIndex;
var stage;
var stageTimer;
var stageScore;
var stageIndex;
var accHits;
var accTotal;
//Plains, City, Water, Beyond, Nowhere
function startNextStage() {
	diffAdjCurrent = diffAdjAll;
	startStage(stageIndex + 1);
}

function startStage(index) {
	stageScore = 0;
	stageTimer = 0;
	accHits = 0;
	accTotal = 0;
	stageIndex = index;
	staples = [];
	breads = [];
	trees = [];
	if (stageIndex < world.stages.length) {
		stage = new world.stages[index](diffAdjCurrent);
		stageIntroScreen.begin();
	} else {
		worldFinishedScreen.begin();
	}
}

const WORLDS = [
	
]

function World(name, color) {
	this.name = name;
	this.color = color;
	this.stages = [];
}