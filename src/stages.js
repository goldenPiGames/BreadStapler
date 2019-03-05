var stage;
var stageTimer;
var stageScore;
var stageIndex;
var accHits;
var accTotal;

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
	stage = new STAGES[index]();
	stageIntroScreen.begin();
}

const STAGES = [
	
]

function drawClearSky() {
	ctx.fillStyle = "#55AAEE";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function TutorialStage() {
	this.breadQueue = [
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
	];
	this.pushDelay = 0;
	this.maxPushDelay = 30;
	trees = [
		new Oak(),
	];
}; STAGES.push(TutorialStage);
TutorialStage.prototype = Object.create(AllBreadStage.prototype);
TutorialStage.prototype.name = "Tutorial";
TutorialStage.prototype.introducing = AllBreadStage;
TutorialStage.prototype.maxBreadAtOnce = 1;
TutorialStage.prototype.drawBackground = drawClearSky;

function WhiteStage() {
	this.breadQueue = [
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
	];
	this.pushDelay = 0;
	this.maxPushDelay = 60;
	trees = [
		new Oak(),
	];
}; STAGES.push(WhiteStage);
WhiteStage.prototype = Object.create(AllBreadStage.prototype);
WhiteStage.prototype.name = "Left and White";
WhiteStage.prototype.introducing = WhiteBread;
WhiteStage.prototype.maxBreadAtOnce = 4;
WhiteStage.prototype.drawBackground = drawClearSky;

function WholeWheatStage() {
	this.breadQueue = [
		new WholeWheatBread(),
		new WholeWheatBread(),
		new WholeWheatBread(),
		new WholeWheatBread(),
		new WholeWheatBread(),
		new WholeWheatBread(),
		new WholeWheatBread(),
		new WholeWheatBread(),
		new WholeWheatBread(),
		new WholeWheatBread(),
	];
	this.pushDelay = 0;
	this.maxPushDelay = 40;
	trees = [
		new Oak(),
	];
}; STAGES.push(WholeWheatStage);
WholeWheatStage.prototype = Object.create(AllBreadStage.prototype);
WholeWheatStage.prototype.name = "The Whole Thing";
WholeWheatStage.prototype.introducing = WholeWheatBread;
WholeWheatStage.prototype.maxBreadAtOnce = 4;
WholeWheatStage.prototype.drawBackground = drawClearSky;

function RyeStage() {
	this.breadQueue = [
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
	];
	this.pushDelay = 0;
	this.maxPushDelay = 40;
	trees = [
		new Oak(),
	];
}; STAGES.push(RyeStage);
RyeStage.prototype = Object.create(AllBreadStage.prototype);
RyeStage.prototype.name = "Now It's Rye Time";
RyeStage.prototype.introducing = RyeBread;
RyeStage.prototype.maxBreadAtOnce = 4;
RyeStage.prototype.drawBackground = drawClearSky;

function PumpernickelStage() {
	this.breadQueue = [
		new Pumpernickel(),
		new Pumpernickel(),
		new Pumpernickel(),
		new Pumpernickel(),
		new Pumpernickel(),
		new Pumpernickel(),
		new Pumpernickel(),
		new Pumpernickel(),
		new Pumpernickel(),
		new Pumpernickel(),
	];
	this.pushDelay = 0;
	this.maxPushDelay = 40;
	trees = [
		new Oak(),
	];
}; STAGES.push(PumpernickelStage);
PumpernickelStage.prototype = Object.create(AllBreadStage.prototype);
PumpernickelStage.prototype.name = "Pumper Full";
PumpernickelStage.prototype.introducing = Pumpernickel;
PumpernickelStage.prototype.maxBreadAtOnce = 4;
PumpernickelStage.prototype.drawBackground = drawClearSky;