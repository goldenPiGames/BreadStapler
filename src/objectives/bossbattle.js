const BAR_MARGINS = 5;
const BAR_HEIGHT = 10;

function BossBattleStage() {
	
}
BossBattleStage.prototype = Object.create(StageBase);
BossBattleStage.prototype.name = "Boss Battle";
BossBattleStage.prototype.description = "Deplete the boss's HP to 0 by stapling bread to it, before its attacks deplete your HP.";
BossBattleStage.prototype.haltMusicBefore = true;
BossBattleStage.prototype.haltMusicOnLoss = true;
BossBattleStage.prototype.update = function() {
	if (this.boss.pushBreadNormally()) {	
		this.pushDelay--;
		if (this.pushDelay <= 0 && breads.length < this.maxBreadAtOnce) {
			breads.push(new (this.breadPopper.pop())());
			this.pushDelay = this.delayPopper.pop();
		}
	}
}
BossBattleStage.prototype.init = function(diffMult) {
	var eachMult = Math.sqrt(diffMult);
	this.playerMaxHP = Math.ceil(this.basePlayerHP / eachMult);
	this.playerHP = this.playerMaxHP;
	this.boss = new this.bossConstructor(eachMult);
	trees = [this.boss];
	this.delayPopper = new WeightPopper(1.2,
		new WeightPopperTicket(this.maxPushDelay*.8, 1),
		new WeightPopperTicket(this.maxPushDelay, 1),
		new WeightPopperTicket(this.maxPushDelay*1.2, 1),
		);
}
BossBattleStage.prototype.breadFell = function(slice) {
	this.boss.respondFall(slice);
}
BossBattleStage.prototype.hurtCurse = function(points) {
	this.playerHP -= points;
}
BossBattleStage.prototype.hurtPoison = function(points) {
	this.playerHP -= points;
}
BossBattleStage.prototype.hurtImpact = function(points) {
	this.playerHP -= points;
}
BossBattleStage.prototype.drawHUD = function() {
	ctx.globalAlpha = .7;
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
}
BossBattleStage.prototype.getScoreLines = function() {
	return [
		{name:"BASE:", val:this.boss.maxHP},
		accuracyLine(),
		{name:"HP:", val:Math.ceil(this.playerHP*this.basePlayerHP/this.playerMaxHP)},
	];
}
BossBattleStage.prototype.hasWon = function() {
	return this.boss.isDead();
}
BossBattleStage.prototype.hasLost = function() {
	return this.playerHP <= 0;
}
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