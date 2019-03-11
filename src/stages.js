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
	if (stageIndex < STAGES.length) {
		stage = new STAGES[index](diffAdjCurrent);
		stageIntroScreen.begin();
	} else {
		gameFinishedScreen.begin();
	}
}

const STAGES = [
	
]

function TutorialStage() {
	this.breadQueue = [
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
	];
	this.pushDelay = 0;
	trees = [
		new Oak(),
	];
}; STAGES.push(TutorialStage);
TutorialStage.prototype = Object.create(AllBreadStage.prototype);
TutorialStage.prototype.name = "Tutorial";
TutorialStage.prototype.introducing = AllBreadStage;
TutorialStage.prototype.maxPushDelay = 30;
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
	trees = [
		new Oak(),
	];
}; STAGES.push(WhiteStage);
WhiteStage.prototype = Object.create(AllBreadStage.prototype);
WhiteStage.prototype.name = "Left and White";
WhiteStage.prototype.introducing = WhiteBread;
WhiteStage.prototype.maxPushDelay = 60;
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
	trees = [
		new Oak(),
	];
}; STAGES.push(WholeWheatStage);
WholeWheatStage.prototype = Object.create(AllBreadStage.prototype);
WholeWheatStage.prototype.name = "The Whole Thing";
WholeWheatStage.prototype.introducing = WholeWheatBread;
WholeWheatStage.prototype.maxPushDelay = 40;
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
RyeStage.prototype.maxPushDelay = 40;
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
	trees = [
		new Oak(),
	];
}; STAGES.push(PumpernickelStage);
PumpernickelStage.prototype = Object.create(AllBreadStage.prototype);
PumpernickelStage.prototype.name = "Pumper Full";
PumpernickelStage.prototype.introducing = Pumpernickel;
PumpernickelStage.prototype.maxPushDelay = 35;
PumpernickelStage.prototype.maxBreadAtOnce = 4;
PumpernickelStage.prototype.drawBackground = drawClearSky;

function TimeIntroStage(diffAdj = 0) {
	this.timeLeft = 20*60;
	this.scoreGoal = this.baseScoreGoal/(1+diffAdj/50);
	this.popper = new WeightPopper(1.3,
		new WeightPopperTicket(WhiteBread, 3),
		new WeightPopperTicket(WholeWheatBread, 2),
		new WeightPopperTicket(RyeBread, 3),
		new WeightPopperTicket(Pumpernickel, 2),
		);
	trees = [
		new Oak(),
	];
}; STAGES.push(TimeIntroStage);
TimeIntroStage.prototype = Object.create(TimedScoreStage.prototype);
TimeIntroStage.prototype.name = "Kid Loaves are Off";
TimeIntroStage.prototype.introducing = TimedScoreStage;
TimeIntroStage.prototype.baseScoreGoal = 1500;
TimeIntroStage.prototype.maxPushDelay = 30;
TimeIntroStage.prototype.maxBreadAtOnce = 5;
TimeIntroStage.prototype.drawBackground = drawCloudySky;