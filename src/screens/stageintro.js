WORLDS.forEach((oj, dex) => {
	oj.index = dex;
	oj.cons.prototype.data = oj;
});

var stageIntroScreen = {
	continueButton : new Button(SIZE/3, SIZE - 50, SIZE/3, TEXT_HEIGHT+6, "BEGIN", startStageForReal),
	begin : function() {
		runnee = this;
		this.buttons = [
			this.continueButton,
		];
		if (stage.introducing) {
			this.duction = stage.introducing;
			if (typeof this.duction == "function")
				this.duction = new this.duction();
			this.duction.x = SIZE/2;
			this.duction.y = 30+TEXT_HEIGHT*3;
		}
		if (stage.music) {
			if (stage.haltMusicBefore) {
				stopMusic();
			} else {
				playMusic(stage.music);
			}
		}
	},
	update : function() {
		
	},
	draw : function() {
		if (this.duction.draw)
			this.duction.draw();
		ctx.globalAlpha = 1;
		drawText("WORLD "+worldIndex + " STAGE "+stageIndex, SIZE/2, 0, 1/2);
		drawText(lg(stage.lName), SIZE/2, TEXT_HEIGHT, 1/2);
		drawText("NEW:"+lg(this.duction.lName), SIZE/2, 10+TEXT_HEIGHT*2, 1/2);
		drawParagraph(lg(this.duction.lDesc), 0, 50+TEXT_HEIGHT*3, SIZE, 0, 0, "#00000040");
		this.buttons.forEach(oj=>oj.draw());
		if (stage.delay)
			drawText("DELAY:"+stage.delay, 0, SIZE-TEXT_HEIGHT, 0);
	},
	click : function(x, y) {
		this.buttons.forEach(oj=>oj.checkClick(x, y));
	},
}

function startStageForReal() {
	runnee = gameEngine;
	if (stage.haltMusicBefore) {
		playMusic(stage.music);
	}
}