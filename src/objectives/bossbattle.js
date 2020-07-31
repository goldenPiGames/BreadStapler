const BAR_MARGINS = 5;
const BAR_HEIGHT = 10;

class BossBattleStage extends Stage {
	constructor(diffMult) {
		super();
		var eachMult = Math.sqrt(diffMult);
		this.playerMaxHP = Math.ceil(this.basePlayerHP / eachMult);
		this.playerHP = this.playerMaxHP;
		this.boss = new (this.bossConstructor)(eachMult);
		trees = [this.boss];
		this.delayPopper = new WeightPopper(1.2,
			new WeightPopperTicket(this.maxPushDelay*.8, 1),
			new WeightPopperTicket(this.maxPushDelay, 1),
			new WeightPopperTicket(this.maxPushDelay*1.2, 1),
		);
	}
	update() {
		if (this.boss.pushBreadNormally()) {	
			this.pushDelay--;
			if (this.pushDelay <= 0 && breads.length < this.maxBreadAtOnce) {
				breads.push(new (this.breadPopper.pop())());
				this.pushDelay = this.delayPopper.pop();
			}
		}
	}
	breadFell(slice) {
		this.boss.respondFall(slice);
	}
	pointsBonus(points) {
		this.playerHP += points;
	}
	hurtCurse(points) {
		this.playerHP -= points;
	}
	hurtPoison(points) {
		this.playerHP -= points;
	}
	hurtImpact(points) {
		this.playerHP -= points;
	}
	drawHUD() {
		ctx.globalAlpha = settings.hudalpha;
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#000000";
		ctx.fillStyle = "#FF0000";
		var bosswidth = (SIZE-BAR_MARGINS*2) * this.boss.getHPPortion();
		ctx.fillRect(BAR_MARGINS, BAR_MARGINS, bosswidth, BAR_HEIGHT);
		ctx.strokeRect(BAR_MARGINS, BAR_MARGINS, bosswidth, BAR_HEIGHT);
		//console.log(this.boss.benchmarks)
		this.boss.benchmarks.forEach(oj=>oj.draw());
		ctx.strokeStyle = "#000000";
		ctx.fillStyle = "#FF0000";
		var playerwidth = (SIZE-BAR_MARGINS*2) * (this.playerHP/this.playerMaxHP);
		ctx.fillRect(BAR_MARGINS, SIZE-BAR_HEIGHT-BAR_MARGINS, playerwidth, BAR_HEIGHT);
		ctx.strokeRect(BAR_MARGINS, SIZE-BAR_HEIGHT-BAR_MARGINS, playerwidth, BAR_HEIGHT);
		if (stage.delay)
			drawText("DELAY:"+stage.delay, 0, SIZE-TEXT_HEIGHT-BAR_HEIGHT-2*BAR_MARGINS, 0);
	}
	getScoreLines() {
		return [
			{name:"BASE:", val:this.boss.maxHP},
			accuracyLine(),
			{name:"HP:", val:Math.ceil(this.playerHP*this.basePlayerHP/this.playerMaxHP)},
		];
	}
	hasWon() {
		return this.boss.isDead();
	}
	hasLost() {
		return this.playerHP <= 0;
	}
}
BossBattleStage.prototype.lName = "bossbattle";
BossBattleStage.prototype.lDesc = "bossbattle-desc";
BossBattleStage.prototype.haltMusicBefore = true;
BossBattleStage.prototype.haltMusicOnLoss = true;
BossBattleStage.prototype.pushDelay = 0;
BossBattleStage.prototype.accFallen = 0;
BossBattleStage.prototype.maxBreadAtOnce = Infinity;

var bossFinishing = {
	begin : function() {
		runnee = this;
		this.timer = 0;
		stopMusic();
		stage.boss.purify();
		fadeAllBreads();
		faders.push(new ScreenFlash("#FFFFFF", 30));
		playSFX("bossbeat");
	},
	update : function() {
		this.timer++;
		if (this.timer > 2*FPS && faders.length <= 0) {
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