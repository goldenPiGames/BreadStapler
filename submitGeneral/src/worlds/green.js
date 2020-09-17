class WorldGreen extends World {
	constructor() {
		super("green", "#00FF00");
	}
}

WORLDS.push({
	lName : "world-green",
	id : "green",
	color : "#00FF00",
	cons:WorldGreen,
});

class TwoTreesStage extends AllBreadStage {
	constructor() {
		super();
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
	}
}
TwoTreesStage.prototype.lName = "stage-twotrees";
TwoTreesStage.prototype.music = "Strategy 3";
TwoTreesStage.prototype.introducing = {
	lName : "multipletrees",
	lDesc : "multipletrees-desc",
}
TwoTreesStage.prototype.maxPushDelay = 35;
TwoTreesStage.prototype.maxBreadAtOnce = 4;

class BirchStage extends AllBreadStage {
	constructor() {
		super();
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
	}
}
BirchStage.prototype.lName = "stage-birch";
BirchStage.prototype.introducing = Birch;
BirchStage.prototype.maxPushDelay = 35;
BirchStage.prototype.maxBreadAtOnce = 4;

class CiabattaStage extends AllBreadStage {
	constructor() {
		super();
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
	}
}
CiabattaStage.prototype.lName = "stage-ciabatta";
CiabattaStage.prototype.introducing = Ciabatta;
CiabattaStage.prototype.maxPushDelay = 35;
CiabattaStage.prototype.maxBreadAtOnce = 4;

class TwoTimeStage extends TimedScoreStage {
	constructor(diffMult = 1) {
		super(diffMult);
		this.breadPopper = new WeightPopper(1.4,
			new WeightPopperTicket(WhiteBread, 3),
			new WeightPopperTicket(WholeWheatBread, 2),
			new WeightPopperTicket(RyeBread, 3),
			new WeightPopperTicket(Pumpernickel, 2),
			new WeightPopperTicket(Ciabatta, 4),
			);
		trees = evenlySpacedTrees(Oak, 2);
		this.background = new BGForest();
	}
}
TwoTimeStage.prototype.lName = "stage-twotime";
//TwoTimeStage.prototype.music = "Strategy 3";
TwoTimeStage.prototype.introducing = {
	lName : "introdifficulty",
	lDesc : "introdifficulty-desc",
}
TwoTimeStage.prototype.baseScoreGoal = 2200;
TwoTimeStage.prototype.baseTimeLimit = 18*60;
TwoTimeStage.prototype.maxPushDelay = 30;
TwoTimeStage.prototype.maxBreadAtOnce = 5;

class PoisonIntroStage extends TimedScoreStage {
	constructor(diffMult = 1) {
		super(diffMult);
		this.breadPopper = new WeightPopper(1.4,
			new WeightPopperTicket(WhiteBread, 2),
			new WeightPopperTicket(WholeWheatBread, 3),
			new WeightPopperTicket(RyeBread, 2),
			new WeightPopperTicket(Pumpernickel, 3),
			new WeightPopperTicket(Ciabatta, 2),
			
			);
		trees = [
			new ManchineelTree(SIZE/2, diffMult),
		];
		this.background = new BGForest();
	}
}
PoisonIntroStage.prototype.lName = "stage-poisonintro";
PoisonIntroStage.prototype.introducing = ManchineelTree;
PoisonIntroStage.prototype.baseScoreGoal = 1600;
PoisonIntroStage.prototype.baseTimeLimit = 20*60;
PoisonIntroStage.prototype.maxPushDelay = 40; 
PoisonIntroStage.prototype.maxBreadAtOnce = 5;


class CurseIntroStage extends TimedScoreStage{
	constructor(diffMult = 1) {
		super(diffMult);
		this.breadPopper = new WeightPopper(1.8,
			new WeightPopperTicket(WhiteBread, 2),
			new WeightPopperTicket(WholeWheatBread, 2),
			new WeightPopperTicket(RyeBread, 4),
			new WeightPopperTicket(Pumpernickel, 2),
			new WeightPopperTicket(Ciabatta, 1),
			new WeightPopperTicket(MarbleRye, 4)
			);
		trees = [new Oak()];
		this.background = new BGForest();
	}
}
CurseIntroStage.prototype.lName = "stage-curseintro";
CurseIntroStage.prototype.introducing = MarbleRye;
CurseIntroStage.prototype.baseScoreGoal = 2000;
CurseIntroStage.prototype.baseTimeLimit = 20*60;
CurseIntroStage.prototype.maxPushDelay = 25;
CurseIntroStage.prototype.maxBreadAtOnce = 5;

class GreenBossStage extends BossBattleStage {
	constructor(diffMult = 1) {
		super(diffMult);
		this.maxPushDelay = this.maxPushDelay * diffMult;
		this.breadPopper = new WeightPopper(1.5,
			new WeightPopperTicket(WhiteBread, 1),
			//new WeightPopperTicket(WholeWheatBread, 2),
			new WeightPopperTicket(RyeBread, 3),
			new WeightPopperTicket(Pumpernickel, 1),
			//new WeightPopperTicket(Ciabatta, 1),
			new WeightPopperTicket(MarbleRye, 4)
		);
		this.background = new BGForest();
	}
}
GreenBossStage.prototype.lName = "stage-greenboss";
GreenBossStage.prototype.music = "Havoc";
GreenBossStage.prototype.introducing = Boss;
GreenBossStage.prototype.bossConstructor = GreenTreant;
GreenBossStage.prototype.basePlayerHP = 2400;
GreenBossStage.prototype.maxPushDelay = 35;

class GreenEndScene extends Scene {
	constructor(stage) {
		super(stage);
		//this.background = stage.background;
		this.treant = stage.boss;
		this.lines = [
			new CutsceneLine("greenend1"),
			new CutsceneLine("greenend2"),
			new CutsceneLine("greenend3"),
			new CutsceneLine("greenend4"),
		];
	}
	draw() {
		this.background.draw();
		this.treant.draw();
	}
}
GreenBossStage.prototype.sceneAfter = GreenEndScene;

WorldGreen.prototype.stageCons = [TwoTreesStage, BirchStage, CiabattaStage, TwoTimeStage, PoisonIntroStage, CurseIntroStage, GreenBossStage];