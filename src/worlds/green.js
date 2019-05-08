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
TwoTreesStage.prototype.music = "Prairie";
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
TwoTimeStage.prototype.music = "Strategy 3";
TwoTimeStage.prototype.introducing = {
	name : "Difficulty",
	description : "You might fail on this level. But don't worry - if you do, you can retry with lower difficulty and score.",
}
TwoTimeStage.prototype.timeLimit = 18*60;
TwoTimeStage.prototype.baseScoreGoal = 2000;
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
PoisonIntroStage.prototype.timeLimit = 20*60;
PoisonIntroStage.prototype.baseScoreGoal = 1600;
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
CurseIntroStage.prototype.timeLimit = 20*60;
CurseIntroStage.prototype.baseScoreGoal = 1800;
CurseIntroStage.prototype.maxPushDelay = 25; 
CurseIntroStage.prototype.maxBreadAtOnce = 5;

function GreenBossStage(diffMult = 1) {
	trees = [];
	this.init(diffMult);
	this.background = new BGSyncGreen();
}; world.stages.push(GreenBossStage);
GreenBossStage.prototype = Object.create(BossBattleStage.prototype);
GreenBossStage.prototype.introducing = Boss;
GreenBossStage.prototype.bossConstructor = GreenTreant;
GreenBossStage.prototype.basePlayerHP = 1000;