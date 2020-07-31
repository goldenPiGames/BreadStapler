class TimedScoreStage extends Stage {
	constructor(diffMult) {
		super();
		var eachMult = Math.sqrt(diffMult);
		this.scoreGoal = Math.floor(this.baseScoreGoal * eachMult);
		this.timeLimit = Math.ceil(this.baseTimeLimit / eachMult);
		this.timeLeft = this.timeLimit;
		this.delayPopper = new WeightPopper(1.2,
			new WeightPopperTicket(this.maxPushDelay*.8, 1),
			new WeightPopperTicket(this.maxPushDelay, 1),
			new WeightPopperTicket(this.maxPushDelay*1.2, 1),
		);
		
	}
	update() {
		this.timeLeft--;
		this.pushDelay--;
		if (this.pushDelay <= 0 && breads.length < this.maxBreadAtOnce) {
			breads.push(new (this.breadPopper.pop())());
			this.pushDelay = this.delayPopper.pop();
		}
	}
	breadFell(slice) {
		slice.reset();
	}
	/*getHUDlines() {
		return [
			"GOAL: " + fillLeft(this.scoreGoal, 6, "0"),
			"TIME:" + fillLeft(this.timeLeft, 6, "0"),
		];
	}*/
	drawHUD() {
		ctx.globalAlpha = settings.hudalpha;
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
		if (stage.delay)
			drawText("DELAY:"+stage.delay, 0, SIZE-TEXT_HEIGHT, 0);
	}
	getScoreLines() {
		return [
			{name:"BASE:", val:this.score},
			accuracyLine(),
			{name:"TIME:", val:this.timeLeft*2},
		];
	}
	hasWon() {
		return (this.score >= this.scoreGoal);
	}
	hasLost() {
		return (this.timeLeft < 0);
	}
}
TimedScoreStage.prototype.pushDelay = 0;
TimedScoreStage.prototype.accFallen = 0;
TimedScoreStage.prototype.maxBreadAtOnce = Infinity;
TimedScoreStage.prototype.lName = "timedscore";
TimedScoreStage.prototype.lDesc = "timedscore-desc";