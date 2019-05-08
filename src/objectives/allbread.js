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
/*AllBreadStage.prototype.getHUDlines = function() {
	return [
		"LEFT:" + fillLeft(this.totalLeft(), 2, "0"),
	];
}*/
AllBreadStage.prototype.drawHUD = function() {
	ctx.globalAlpha = .7;
	var HUDlines = [
		"SCORE:"+fillLeft(this.score, 6, "0"),
		"LEFT:" + fillLeft(this.totalLeft(), 2, "0"),
	];
	HUDlines.forEach(function(oj, dex) {
		drawText(oj, 3, dex*TEXT_HEIGHT+3, 0);
	});
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