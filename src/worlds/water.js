class WorldWater extends World {
	constructor() {
		super("water", "#0000FF");
	}
}

WORLDS.push({
	lName : "world-water",
	id : "water",
	color : "#0000FF",
	cons:WorldWater,
});

class SubIntroStage extends AllBreadStage {
	constructor() {
		super();
		this.breadQueue = [
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
		]
		trees = [
			new (Oak),
		];
		this.background = new BGUnderwater();
	}
}
SubIntroStage.prototype.lName = "stage-subintro";
SubIntroStage.prototype.music = "Underwater Coolness";
SubIntroStage.prototype.introducing = SubRoll;
SubIntroStage.prototype.delay = 0;
SubIntroStage.prototype.maxPushDelay = 45;
SubIntroStage.prototype.maxBreadAtOnce = 4;

class DelayIntroStage extends AllBreadStage {
	constructor() {
		super();
		this.breadQueue = shuffle([
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
			new SubRoll(),
		]);
		trees = [
			new (Oak),
		];
		this.background = new BGUnderwater();
	}
}
DelayIntroStage.prototype.lName = "stage-delayintro";
DelayIntroStage.prototype.music = "Underwater Coolness";
DelayIntroStage.prototype.introducing = {
	lName : "delay",
	lDesc : "delay-desc",
}
DelayIntroStage.prototype.delay = 15;
DelayIntroStage.prototype.maxPushDelay = 55;
DelayIntroStage.prototype.maxBreadAtOnce = 2;

class HardtackIntroStage extends AllBreadStage {
	constructor() {
		super();
		trees = [
			new Oak(),
		];
		this.breadQueue = shuffle([
			new Hardtack(),
			new Hardtack(),
			new Hardtack(),
		]);
		this.background = new BGUnderwater();
	}
}
HardtackIntroStage.prototype.lName = "stage-hardtackintro";
HardtackIntroStage.prototype.music = "Underwater Coolness";
HardtackIntroStage.prototype.pointsBread = function(points) {
	this.score += points;
	this.maxBreadAtOnce = 2;
}
HardtackIntroStage.prototype.introducing = Hardtack;
HardtackIntroStage.prototype.delay = 15;
HardtackIntroStage.prototype.maxPushDelay = 30;
HardtackIntroStage.prototype.maxBreadAtOnce = 1;

class WaterTimedStage extends TimedScoreStage {
	constructor(diffMult = 1) {
		super(diffMult);
		trees = [
			new Oak(),
		];
		this.breadPopper = new WeightPopper(1.5,
			new WeightPopperTicket(SubRoll, 4),
			new WeightPopperTicket(Hardtack, 1),
		);
		this.background = new BGUnderwater();
	}
}
WaterTimedStage.prototype.lName = "stage-watertimed";
WaterTimedStage.prototype.introducing = {
	lName : "stage-watertimed-intro",
	lDesc : "stage-watertimed-desc",
}
WaterTimedStage.prototype.delay = 15;
WaterTimedStage.prototype.baseScoreGoal = 2200;
WaterTimedStage.prototype.baseTimeLimit = 30*60;
WaterTimedStage.prototype.maxPushDelay = 40;
WaterTimedStage.prototype.maxBreadAtOnce = 5;

class BagelIntroStage extends TimedScoreStage {
	constructor(diffMult = 1) {
		super(diffMult);
		trees = [
			new Oak(),
		];
		this.breadPopper = new WeightPopper(1.5,
			//new WeightPopperTicket(SubRoll, 1),
			new WeightPopperTicket(Bagel, 1),
			);
		this.background = new BGUnderwater();
	}
}
BagelIntroStage.prototype.lName = "stage-bagelintro";
BagelIntroStage.prototype.introducing = Bagel;
BagelIntroStage.prototype.delay = 15;
BagelIntroStage.prototype.baseScoreGoal = 2000;
BagelIntroStage.prototype.baseTimeLimit = 30*60;
BagelIntroStage.prototype.maxPushDelay = 80;
BagelIntroStage.prototype.maxBreadAtOnce = 13;

class WaterBossStage extends BossBattleStage {
	constructor(diffMult = 1) {
		super(diffMult);
		this.maxPushDelay = this.maxPushDelay * diffMult;
		this.breadPopper = new WeightPopper(1.5,
			new WeightPopperTicket(SubRoll, 3),
			new WeightPopperTicket(Bagel, 1),
			new WeightPopperTicket(Hardtack, 1),
		);
		this.background = new BGUnderwater();
	}
}
WaterBossStage.prototype.lName = "stage-waterboss";
WaterBossStage.prototype.music = "War of the Pianos";
WaterBossStage.prototype.introducing = WaterTreant;
WaterBossStage.prototype.bossConstructor = WaterTreant;
WaterBossStage.prototype.basePlayerHP = 2400;
WaterBossStage.prototype.delay = 15;
WaterBossStage.prototype.delayDuringPressure = 60;
WaterBossStage.prototype.delayAfterPressure = 30;
WaterBossStage.prototype.maxPushDelay = 90;


class WaterEndScene extends Scene {
	constructor(stage) {
		super(stage);
		this.background = stage.background;
		this.treant = stage.boss;
		this.lines = [
			new CutsceneLine("waterend1"),
			new CutsceneLine("waterend2"),
			new CutsceneLine("waterend3"),
			new CutsceneLine("waterend4"),
		];
	}
}
WaterEndScene.prototype = Object.create(Scene.prototype);
WaterBossStage.prototype.sceneAfter = WaterEndScene;
WaterEndScene.prototype.draw = function() {
	this.background.draw();
	this.treant.draw();
}

WorldWater.prototype.stageCons = [SubIntroStage, DelayIntroStage, HardtackIntroStage, WaterTimedStage, BagelIntroStage, WaterBossStage];