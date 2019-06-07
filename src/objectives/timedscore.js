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
TimedScoreStage.prototype.init = function(diffMult) {
	var eachMult = Math.sqrt(diffMult)
	this.scoreGoal = Math.floor(this.baseScoreGoal * eachMult);
	this.timeLimit = Math.ceil(this.baseTimeLimit / eachMult);
	this.timeLeft = this.timeLimit;
	this.delayPopper = new WeightPopper(1.2,
		new WeightPopperTicket(this.maxPushDelay*.8, 1),
		new WeightPopperTicket(this.maxPushDelay, 1),
		new WeightPopperTicket(this.maxPushDelay*1.2, 1),
		);
}
TimedScoreStage.prototype.breadFell = function(slice) {
	slice.reset();
}
/*TimedScoreStage.prototype.getHUDlines = function() {
	return [
		"GOAL: " + fillLeft(this.scoreGoal, 6, "0"),
		"TIME:" + fillLeft(this.timeLeft, 6, "0"),
	];
}*/
TimedScoreStage.prototype.drawHUD = function() {
	ctx.globalAlpha = .7;
	/*var HUDlines = [
		"SCORE:"+fillLeft(this.score, 6, "0"),
		"GOAL: " + fillLeft(this.scoreGoal, 6, "0"),
		"TIME:" + fillLeft(this.timeLeft, 6, "0"),
	];
	HUDlines.forEach(function(oj, dex) {
		drawText(oj, 3, dex*TEXT_HEIGHT+3, 0);
	});*/
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = "#FFFF00";
	var timewidth = (SIZE-10) * (this.timeLeft/this.timeLimit);
	ctx.fillRect(SIZE-5-timewidth, 5, timewidth, 10);
	ctx.strokeRect(SIZE-5-timewidth, 5, timewidth, 10);
	ctx.fillStyle = "#FF0000";
	var pointwidth = (SIZE-10) * (this.score/this.scoreGoal);
	ctx.fillRect(5, 12, pointwidth, 10);
	ctx.strokeRect(5, 12, pointwidth, 10);
}
TimedScoreStage.prototype.getScoreLines = function() {
	return [
		{name:"BASE:", val:this.score},
		accuracyLine(),
		{name:"TIME:", val:this.timeLeft*2},
	];
}
TimedScoreStage.prototype.hasWon = function() {
	return (this.score >= this.scoreGoal);
}
TimedScoreStage.prototype.hasLost = function() {
	return (this.timeLeft < 0);
}
TimedScoreStage.prototype.pushDelay = 0;
TimedScoreStage.prototype.accFallen = 0;
TimedScoreStage.prototype.maxBreadAtOnce = Infinity;