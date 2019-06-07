world = new World("intro", "#483C32");
WORLDS.push(world);

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
	this.background = new BGClearSky();
}; world.stages.push(TutorialStage);
TutorialStage.prototype = Object.create(AllBreadStage.prototype);
TutorialStage.prototype.name = "Tutorial";
TutorialStage.prototype.music = "Prairie";//"Breeze";
TutorialStage.prototype.introducing = AllBreadStage;
TutorialStage.prototype.maxPushDelay = 30;
TutorialStage.prototype.maxBreadAtOnce = 1;

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
	this.background = new BGClearSky();
}; world.stages.push(WhiteStage);
WhiteStage.prototype = Object.create(AllBreadStage.prototype);
WhiteStage.prototype.name = "Left and White";
WhiteStage.prototype.introducing = WhiteBread;
WhiteStage.prototype.maxPushDelay = 60;
WhiteStage.prototype.maxBreadAtOnce = 4;

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
	this.background = new BGClearSky();
}; world.stages.push(WholeWheatStage);
WholeWheatStage.prototype = Object.create(AllBreadStage.prototype);
WholeWheatStage.prototype.name = "The Whole Shebang";
WholeWheatStage.prototype.introducing = WholeWheatBread;
WholeWheatStage.prototype.maxPushDelay = 40;
WholeWheatStage.prototype.maxBreadAtOnce = 4;

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
	this.background = new BGClearSky();
}; world.stages.push(RyeStage);
RyeStage.prototype = Object.create(AllBreadStage.prototype);
RyeStage.prototype.name = "Now It's Rye Time";
RyeStage.prototype.introducing = RyeBread;
RyeStage.prototype.maxPushDelay = 40;
RyeStage.prototype.maxBreadAtOnce = 4;

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
	this.background = new BGClearSky();
}; world.stages.push(PumpernickelStage);
PumpernickelStage.prototype = Object.create(AllBreadStage.prototype);
PumpernickelStage.prototype.name = "Pumper Full";
PumpernickelStage.prototype.introducing = Pumpernickel;
PumpernickelStage.prototype.maxPushDelay = 35;
PumpernickelStage.prototype.maxBreadAtOnce = 4;

function TimeIntroStage(diffMult = 1) {
	this.breadPopper = new WeightPopper(1.3,
		new WeightPopperTicket(WhiteBread, 3),
		new WeightPopperTicket(WholeWheatBread, 4),
		new WeightPopperTicket(RyeBread, 3),
		new WeightPopperTicket(Pumpernickel, 2),
		);
	trees = [
		new Oak(),
	];
	this.init(diffMult);
	this.background = new BGClearSky();
}; world.stages.push(TimeIntroStage);
TimeIntroStage.prototype = Object.create(TimedScoreStage.prototype);
TimeIntroStage.prototype.name = "Quickly Now";
TimeIntroStage.prototype.introducing = TimedScoreStage;
TimeIntroStage.prototype.baseTimeLimit = 20*60;
TimeIntroStage.prototype.baseScoreGoal = 1500;
TimeIntroStage.prototype.maxPushDelay = 30;
TimeIntroStage.prototype.maxBreadAtOnce = 5;

