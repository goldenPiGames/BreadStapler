class WorldIntro extends World {
	constructor() {
		super("intro", "#483C32");
	}
}

WORLDS.push({
	lName : "world-intro",
	id : "intro",
	color : "#483C32",
	cons:WorldIntro,
});

class TutorialStage extends AllBreadStage {
	constructor() {
		super();
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
	}
}
TutorialStage.prototype.lName = "stage-tutorial";
TutorialStage.prototype.music = "Prairie";//"Breeze";
TutorialStage.prototype.introducing = AllBreadStage;
TutorialStage.prototype.maxPushDelay = 30;
TutorialStage.prototype.maxBreadAtOnce = 1;

class WhiteStage extends AllBreadStage {
	constructor() {
		super();
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
	}
}
WhiteStage.prototype.lName = "stage-white";
WhiteStage.prototype.introducing = WhiteBread;
WhiteStage.prototype.maxPushDelay = 60;
WhiteStage.prototype.maxBreadAtOnce = 4;

class WholeWheatStage extends AllBreadStage {
	constructor() {
		super();
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
	}
}
WholeWheatStage.prototype.lName = "stage-wholewheat";
WholeWheatStage.prototype.introducing = WholeWheatBread;
WholeWheatStage.prototype.maxPushDelay = 40;
WholeWheatStage.prototype.maxBreadAtOnce = 4;

class RyeStage extends AllBreadStage {
	constructor() {
		super();
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
	}
}
RyeStage.prototype.lName = "stage-rye";
RyeStage.prototype.introducing = RyeBread;
RyeStage.prototype.maxPushDelay = 40;
RyeStage.prototype.maxBreadAtOnce = 4;

class PumpernickelStage extends AllBreadStage {
	constructor() {
		super();
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
	}
}
PumpernickelStage.prototype.lName = "stage-pumpernickel";
PumpernickelStage.prototype.introducing = Pumpernickel;
PumpernickelStage.prototype.maxPushDelay = 35;
PumpernickelStage.prototype.maxBreadAtOnce = 4;

class TimeIntroStage extends TimedScoreStage {
	constructor(diffMult = 1) {
		super(diffMult);
		this.breadPopper = new WeightPopper(1.3,
			new WeightPopperTicket(WhiteBread, 3),
			new WeightPopperTicket(WholeWheatBread, 4),
			new WeightPopperTicket(RyeBread, 3),
			new WeightPopperTicket(Pumpernickel, 2),
			);
		trees = [
			new Oak(),
		];
		this.background = new BGClearSky();
	}
}
TimeIntroStage.prototype.lName = "stage-timeintro";
TimeIntroStage.prototype.introducing = TimedScoreStage;
TimeIntroStage.prototype.baseTimeLimit = 20*60;
TimeIntroStage.prototype.baseScoreGoal = 1500;
TimeIntroStage.prototype.maxPushDelay = 30;
TimeIntroStage.prototype.maxBreadAtOnce = 5;

WorldIntro.prototype.stageCons = [TutorialStage, WhiteStage, WholeWheatStage, RyeStage, PumpernickelStage, TimeIntroStage];