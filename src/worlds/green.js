world = new World("green", "#00FF00");
WORLDS.push(world);

function TwoTreesStage() {
	this.breadQueue = shuffle([
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
	]);
	trees = evenlySpacedTrees(Oak, 2);
	this.background = new BGForest();
}; world.stages.push(TwoTreesStage);
TwoTreesStage.prototype = Object.create(AllBreadStage.prototype);
TwoTreesStage.prototype.name = "Getting Out of Hand";
TwoTreesStage.prototype.music = "Strategy 3";//"Prairie";
TwoTreesStage.prototype.introducing = {
	name : "multiple trees",
	description : "Sometimes there can be more than one tree.",
}
TwoTreesStage.prototype.maxPushDelay = 35;
TwoTreesStage.prototype.maxBreadAtOnce = 4;


function BirchStage() {
	this.breadQueue = shuffle([
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new WhiteBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
		new RyeBread(),
	]);
	trees = evenlySpacedTrees(Birch, 2);
	this.background = new BGForest();
}; world.stages.push(BirchStage);
BirchStage.prototype = Object.create(AllBreadStage.prototype);
BirchStage.prototype.name = "Birch, Please";
BirchStage.prototype.introducing = Birch;
BirchStage.prototype.maxPushDelay = 35;
BirchStage.prototype.maxBreadAtOnce = 4;


function CiabattaStage() {
	this.breadQueue = [
		new Ciabatta(),
		new Ciabatta(),
		new Ciabatta(),
		new Ciabatta(),
		new Ciabatta(),
		new Ciabatta(),
		new Ciabatta(),
		new Ciabatta(),
		new Ciabatta(),
		new Ciabatta(),
	]
	trees = evenlySpacedTrees(Birch, 2);
	this.background = new BGForest();
}; world.stages.push(CiabattaStage);
CiabattaStage.prototype = Object.create(AllBreadStage.prototype);
CiabattaStage.prototype.name = "Ciabatta Up";
CiabattaStage.prototype.introducing = Ciabatta;
CiabattaStage.prototype.maxPushDelay = 35;
CiabattaStage.prototype.maxBreadAtOnce = 4;

function TwoTimeStage(diffMult = 1) {
	this.breadPopper = new WeightPopper(1.4,
		new WeightPopperTicket(WhiteBread, 3),
		new WeightPopperTicket(WholeWheatBread, 2),
		new WeightPopperTicket(RyeBread, 3),
		new WeightPopperTicket(Pumpernickel, 2),
		new WeightPopperTicket(Ciabatta, 4),
		);
	trees = evenlySpacedTrees(Oak, 2);
	this.init(diffMult);
	this.background = new BGForest();
}; world.stages.push(TwoTimeStage);
TwoTimeStage.prototype = Object.create(TimedScoreStage.prototype);
TwoTimeStage.prototype.name = "Kid Loaves are Off";
//TwoTimeStage.prototype.music = "Strategy 3";
TwoTimeStage.prototype.introducing = {
	name : "Difficulty",
	description : "You might fail on this level. But don't worry - if you do, you can retry with lower difficulty and score.",
}
TwoTimeStage.prototype.baseScoreGoal = 2200;
TwoTimeStage.prototype.baseTimeLimit = 18*60;
TwoTimeStage.prototype.maxPushDelay = 30;
TwoTimeStage.prototype.maxBreadAtOnce = 5;


function PoisonIntroStage(diffMult = 1) {
	this.breadPopper = new WeightPopper(1.4,
		new WeightPopperTicket(WhiteBread, 2),
		new WeightPopperTicket(WholeWheatBread, 3),
		new WeightPopperTicket(RyeBread, 2),
		new WeightPopperTicket(Pumpernickel, 3),
		new WeightPopperTicket(Ciabatta, 2),
		
		);
	trees = [
		new Manchineel(),
	];
	this.init(diffMult);
	this.background = new BGForest();
}; world.stages.push(PoisonIntroStage);
PoisonIntroStage.prototype = Object.create(TimedScoreStage.prototype);
PoisonIntroStage.prototype.name = "Poison";
PoisonIntroStage.prototype.introducing = Manchineel;
PoisonIntroStage.prototype.baseScoreGoal = 1600;
PoisonIntroStage.prototype.baseTimeLimit = 20*60;
PoisonIntroStage.prototype.maxPushDelay = 40; 
PoisonIntroStage.prototype.maxBreadAtOnce = 5;


function CurseIntroStage(diffMult = 1) {
	this.breadPopper = new WeightPopper(1.8,
		new WeightPopperTicket(WhiteBread, 2),
		new WeightPopperTicket(WholeWheatBread, 2),
		new WeightPopperTicket(RyeBread, 4),
		new WeightPopperTicket(Pumpernickel, 2),
		new WeightPopperTicket(Ciabatta, 1),
		new WeightPopperTicket(MarbleRye, 4)
		);
	trees = //evenlySpacedTrees(Birch, 3);
		[new Oak()];
	this.init(diffMult);
	this.background = new BGForest();
}; world.stages.push(CurseIntroStage);
CurseIntroStage.prototype = Object.create(TimedScoreStage.prototype);
CurseIntroStage.prototype.name = "cursed_bread";
CurseIntroStage.prototype.introducing = MarbleRye;
CurseIntroStage.prototype.baseScoreGoal = 2000;
CurseIntroStage.prototype.baseTimeLimit = 20*60;
CurseIntroStage.prototype.maxPushDelay = 25;
CurseIntroStage.prototype.maxBreadAtOnce = 5;

function GreenBossStage(diffMult = 1) {
	this.maxPushDelay = this.maxPushDelay * diffMult;
	this.breadPopper = new WeightPopper(1.5,
		new WeightPopperTicket(WhiteBread, 1),
		//new WeightPopperTicket(WholeWheatBread, 2),
		new WeightPopperTicket(RyeBread, 3),
		new WeightPopperTicket(Pumpernickel, 1),
		//new WeightPopperTicket(Ciabatta, 1),
		new WeightPopperTicket(MarbleRye, 4)
		);
	trees = [];
	this.init(diffMult);
	this.background = new BGForest();
}; world.stages.push(GreenBossStage);
GreenBossStage.prototype = Object.create(BossBattleStage.prototype);
GreenBossStage.prototype.name = "Lets-a Go";
GreenBossStage.prototype.music = "Havoc";
GreenBossStage.prototype.introducing = Boss;
GreenBossStage.prototype.bossConstructor = GreenTreant;
GreenBossStage.prototype.basePlayerHP = 2400;
GreenBossStage.prototype.maxPushDelay = 35;

function GreenEndScene(stage) {
	this.background = stage.background;
	this.treant = stage.boss;
	this.lines = [
		new CutsceneLine("greenend1"),
		new CutsceneLine("greenend2"),
		new CutsceneLine("greenend3"),
		new CutsceneLine("greenend4"),
	];
}
GreenEndScene.prototype = Object.create(Scene.prototype);
GreenBossStage.prototype.sceneAfter = GreenEndScene;
GreenEndScene.prototype.draw = function() {
	this.background.draw();
	this.treant.draw();
}