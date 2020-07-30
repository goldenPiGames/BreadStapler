class AllBreadStage extends Stage {
	update() {
		if (breads.length < this.maxBreadAtOnce && this.breadQueue.length > 0) {
			this.pushDelay--;
			if (this.pushDelay <= 0) {
				breads.push(this.breadQueue.shift().reset());
				this.pushDelay = this.maxPushDelay * (.8+.4*Math.random());
			}
		}
	}
	breadFell(slice) {
		this.accFallen++;
		this.breadQueue.push(slice);
	}
	/*getHUDlines() {
		return [
			"LEFT:" + fillLeft(this.totalLeft(), 2, "0"),
		];
	}*/
	drawHUD() {
		ctx.globalAlpha = settings.hudalpha;
		var HUDlines = [
			"SCORE:"+fillLeft(this.score, 6, "0"),
			"LEFT:" + fillLeft(this.totalLeft(), 2, "0"),
		];
		HUDlines.forEach(function(oj, dex) {
			drawText(oj, 3, dex*TEXT_HEIGHT+3, 0);
		});
		if (stage.delay)
			drawText("DELAY:"+stage.delay, 0, SIZE-TEXT_HEIGHT, 0);
	}
	getScoreLines() {
		var got = accHits / (accHits + Math.max(this.accFallen, 1));
		return [
			{name:"BASE:", val:this.score},
			accuracyLine(),
			{name:"GETTING:", val:got, mult:true, valdisp:asPercent(got)},
		];
	}
	hasWon() {
		return (this.totalLeft() <= 0);
	}
	hasLost() {
		return false;
	}
	totalLeft() {
		return this.breadQueue.length+breads.length;
	}
}
AllBreadStage.prototype.lName = "allbread";
AllBreadStage.prototype.lDesc = "allbread-desc";
AllBreadStage.prototype.pushDelay = 0;
AllBreadStage.prototype.accFallen = 0;