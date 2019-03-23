world = new World("GREEN", "#0000FF");
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
	this.pushDelay = 0;
	trees = [
		new Oak(SIZE*1/4),
		new Oak(SIZE*3/4),
	];
	this.background = new BGCloudySky();
}; world.stages.push(TwoTreesStage);
TwoTreesStage.prototype = Object.create(AllBreadStage.prototype);
TwoTreesStage.prototype.name = "Getting Out of Hand";
TwoTreesStage.prototype.introducing = {
	name : "multiple trees",
	description : "Sometimes there can be more than one tree.",
}
TwoTreesStage.prototype.maxPushDelay = 35;
TwoTreesStage.prototype.maxBreadAtOnce = 4;