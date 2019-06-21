world = new World("water", "#0000FF");
WORLDS.push(world);

function SubIntroStage() {
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
}; world.stages.push(SubIntroStage);
SubIntroStage.prototype = Object.create(AllBreadStage.prototype);
SubIntroStage.prototype.name = "Sub";
SubIntroStage.prototype.music = "Underwater Coolness";
SubIntroStage.prototype.introducing = SubRoll;
SubIntroStage.prototype.delay = 0;
SubIntroStage.prototype.maxPushDelay = 45;
SubIntroStage.prototype.maxBreadAtOnce = 4;

function DelayIntroStage() {
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
}; world.stages.push(DelayIntroStage);
DelayIntroStage.prototype = Object.create(AllBreadStage.prototype);
DelayIntroStage.prototype.name = "Delay Fish";
DelayIntroStage.prototype.music = "Underwater Coolness";
DelayIntroStage.prototype.introducing = {
	name : "delay",
	description : "There's a delay between when you shoot a staple and when it hits the bread. Delay is given in frames (1/60 seconds), so 15 frames is 1/4 second.",
}
DelayIntroStage.prototype.delay = 15;
DelayIntroStage.prototype.maxPushDelay = 55;
DelayIntroStage.prototype.maxBreadAtOnce = 2;

function HardtackIntroStage() {
	trees = [
		new Oak(),
	];
	this.breadQueue = shuffle([
		new Hardtack(),
		new Hardtack(),
		new Hardtack(),
	]);
	this.background = new BGUnderwater();
}; world.stages.push(HardtackIntroStage);
HardtackIntroStage.prototype = Object.create(AllBreadStage.prototype);
HardtackIntroStage.prototype.name = "Moldy Hardtack";
HardtackIntroStage.prototype.music = "Underwater Coolness";
HardtackIntroStage.prototype.pointsBread = function(points) {
	this.score += points;
	this.maxBreadAtOnce = 2;
}
HardtackIntroStage.prototype.introducing = Hardtack;
HardtackIntroStage.prototype.delay = 15;
HardtackIntroStage.prototype.maxPushDelay = 30;
HardtackIntroStage.prototype.maxBreadAtOnce = 1;


function WaterTimedStage(diffMult = 1) {
	trees = [
		new Oak(),
	];
	this.breadPopper = new WeightPopper(1.5,
		new WeightPopperTicket(SubRoll, 4),
		new WeightPopperTicket(Hardtack, 1),
		);
	this.init(diffMult);
	this.background = new BGUnderwater();
}; world.stages.push(WaterTimedStage);
WaterTimedStage.prototype = Object.create(TimedScoreStage.prototype);
WaterTimedStage.prototype.name = "Moldy Hardtack";
//TwoTimeStage.prototype.music = "Strategy 3";
WaterTimedStage.prototype.introducing = {
	name : "Difficulty",
	description : "You might fail on this level. But don't worry - if you do, you can retry with lower difficulty and score.",
}
WaterTimedStage.prototype.baseScoreGoal = 2200;
WaterTimedStage.prototype.baseTimeLimit = 25*60;
WaterTimedStage.prototype.maxPushDelay = 40;
WaterTimedStage.prototype.maxBreadAtOnce = 5;

function WaterBossStage(diffMult = 1) {
	this.maxPushDelay = this.maxPushDelay * diffMult;
	this.breadPopper = new WeightPopper(1.5,
		new WeightPopperTicket(SubRoll, 3),
		new WeightPopperTicket(Hardtack, 3),
		);
	trees = [];
	this.init(diffMult);
	this.background = new BGForest();
}; world.stages.push(WaterBossStage);
WaterBossStage.prototype = Object.create(BossBattleStage.prototype);
WaterBossStage.prototype.name = "Water Logged";
WaterBossStage.prototype.music = "War of the Pianos";
WaterBossStage.prototype.introducing = WaterTreant;
WaterBossStage.prototype.bossConstructor = WaterTreant;
WaterBossStage.prototype.basePlayerHP = 2400;
WaterBossStage.prototype.maxPushDelay = 35;