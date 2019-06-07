WORLDS.forEach(function(oj, dex) {
	oj.index = dex;
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
		drawText(stage.name, SIZE/2, TEXT_HEIGHT, 1/2);
		drawText("NEW:"+this.duction.name, SIZE/2, 10+TEXT_HEIGHT*2, 1/2);
		drawParagraph(this.duction.description, 0, 50+TEXT_HEIGHT*3, SIZE, 0, 0, "#00000040");
		this.buttons.forEach(oj=>oj.draw());
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

function winStage() {
	(stage.boss ? bossFinishing : stageFinishing).begin();
}

var stageFinishing = {
	begin : function () {
		fadeAllBreads();
		runnee = this;
	},
	update : function() {
		if (faders.length <= 0) {
			if (stage.sceneAfter) {
				sceneScreen.begin(stage.sceneAfter);
			} else {
				stageResultsScreen.begin();
			}
		}
	},
	draw : function() {
		gameEngine.draw();
	},
	click : doNothing,
}

function fadeAllBreads() {
	Array.prototype.push.apply(faders, breads);
	breads = [];
}

function accuracyLine() {
	var acc = Math.min(accHits / accTotal, 1.0);
	return {name:"ACCURACY:", val:acc, mult:true, valdisp:asPercent(acc)};
}

var stageResultsScreen = {
	continueButton : new Button(SIZE/3, SIZE/2+TEXT_HEIGHT*2, SIZE/3, TEXT_HEIGHT+6, "NEXT", startNextStage),
	begin : function() {
		var thisser = this;
		runnee = this;
		this.buttons = [
			this.continueButton,
		];
		this.scores = stage.getScoreLines();
		this.stageTotal = 0;
		var mult = 1;
		this.scores.forEach(function(oj) {
			if (!oj.mult) {
				thisser.stageTotal += oj.val;
			} else {
				mult *= oj.val;
			}
		});
		//console.log(this.stageTotal, mult);
		this.stageTotal = Math.ceil(this.stageTotal * mult);
		totalScore += this.stageTotal;
	},
	update : function() {
		
	},
	draw : function() {
		this.scores.forEach(function(oj, dex) {
			drawText(oj.name, SIZE/2, TEXT_HEIGHT*dex, 1);
			drawText(oj.valdisp || oj.val, SIZE/2, TEXT_HEIGHT*dex, 0);
		});
		drawText("STAGE:", SIZE/2, SIZE/2, 1); drawText(this.stageTotal, SIZE/2, SIZE/2, 0);
		drawText("TOTAL:", SIZE/2, SIZE/2+TEXT_HEIGHT, 1); drawText(totalScore, SIZE/2, SIZE/2+TEXT_HEIGHT, 0);
		this.buttons.forEach(oj=>oj.draw());
	},
	click : function(x, y) {
		this.buttons.forEach(oj=>oj.checkClick(x, y));
	},
}

var worldFinishedScreen = {
	mainMenuButton : new TextButton("CONTINUE", function(){worldSelect.begin();}, SIZE/2, SIZE*2/3, 1/2, 0),
	begin : function() {
		this.newr = world.tryHiscore(totalScore);
		runnee = this;
	},
	update : function() {
		
	},
	draw : function() {
		drawText("WORLD "+world.index+" COMPLETE!", SIZE/2, SIZE/3, 1/2);
		drawText("SCORE:", SIZE/2, SIZE/2, 1); drawText(totalScore, SIZE/2, SIZE/2, 0);
		if (this.newr)
			drawText("NEW HISCORE!", SIZE/2, SIZE/2+TEXT_HEIGHT, 1/2);
		this.mainMenuButton.draw();
	},
	click : function(x, y) {
		this.mainMenuButton.checkClick(x, y);
	},
}