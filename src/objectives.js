var objective;

const StageBase = {
	drawBackground() {
		this.background.draw();
	},
}

function AllBreadStage() {
	
}
AllBreadStage.prototype = Object.create(StageBase);
AllBreadStage.prototype.name = "Staple All Bread";
AllBreadStage.prototype.description = "Staple all bread to the tree. Bread that falls off screen will return later. You cannot lose. Just go for a high score.";
AllBreadStage.prototype.update = function() {
	if (breads.length < this.maxBreadAtOnce && this.breadQueue.length > 0) {
		this.pushDelay--;
		if (this.pushDelay <= 0) {
			breads.push(this.breadQueue.shift().reset());
			this.pushDelay = this.maxPushDelay * (.8+.4*Math.random());
		}
	}
}
AllBreadStage.prototype.breadFell = function(slice) {
	this.accFallen++;
	this.breadQueue.push(slice);
}
AllBreadStage.prototype.getHUDlines = function() {
	return [
		"LEFT:" + fillLeft(this.totalLeft(), 2, "0"),
	];
}
AllBreadStage.prototype.getScoreLines = function() {
	var ack = accHits / (accHits + this.accFallen);
	return [
		{name:"GETTING:", val:ack, mult:true, valdisp:asPercent(ack)},
	];
}
AllBreadStage.prototype.hasWon = function() {
	return (this.totalLeft() <= 0);
}
AllBreadStage.prototype.hasLost = function() {
	return false;
}
AllBreadStage.prototype.totalLeft = function() {
	return this.breadQueue.length+breads.length;
}
AllBreadStage.prototype.pushDelay = 0;
AllBreadStage.prototype.accFallen = 0;

// ------------------------------------------------------------------- Timed Score --------------------------------------
function TimedScoreStage() {
	
}
TimedScoreStage.prototype = Object.create(StageBase);
TimedScoreStage.prototype.name = "Score Timed";
TimedScoreStage.prototype.description = "Get the required score before time runs out.";
TimedScoreStage.prototype.update = function() {
	this.timeLeft--;
	this.pushDelay--;
	if (this.pushDelay <= 0 && breads.length < this.maxBreadAtOnce) {
		breads.push(new (this.breadPopper.pop())());
		this.pushDelay = this.delayPopper.pop();
	}
}
TimedScoreStage.prototype.init = function() {
	this.delayPopper = new WeightPopper(1.2,
		new WeightPopperTicket(this.maxPushDelay*.8, 1),
		new WeightPopperTicket(this.maxPushDelay, 1),
		new WeightPopperTicket(this.maxPushDelay*1.2, 1),
		);
}
TimedScoreStage.prototype.breadFell = function(slice) {
	slice.reset();
}
TimedScoreStage.prototype.getHUDlines = function() {
	return [
		"GOAL: " + fillLeft(this.scoreGoal, 6, "0"),
		"TIME:" + fillLeft(this.timeLeft, 6, "0"),
	];
}
TimedScoreStage.prototype.getScoreLines = function() {
	var ack = accHits / (accHits + this.accFallen);
	return [
		{name:"TIME:", val:this.timeLeft*2},
	];
}
TimedScoreStage.prototype.hasWon = function() {
	return (stageScore >= this.scoreGoal);
}
TimedScoreStage.prototype.hasLost = function() {
	return (this.timeLeft < 0);
}
TimedScoreStage.prototype.pushDelay = 0;
TimedScoreStage.prototype.accFallen = 0;
TimedScoreStage.prototype.maxBreadAtOnce = Infinity;