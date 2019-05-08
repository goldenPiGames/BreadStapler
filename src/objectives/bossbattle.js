function BossBattleStage() {
	
}
BossBattleStage.prototype = Object.create(StageBase);
BossBattleStage.prototype.name = "Boss Battle";
BossBattleStage.prototype.description = "Deplete the boss's HP to 0 by stapling bread to it, before its attacks deplete your HP.";
BossBattleStage.prototype.update = function() {
	/*this.timeLeft--;
	this.pushDelay--;
	if (this.pushDelay <= 0 && breads.length < this.maxBreadAtOnce) {/
		breads.push(new (this.breadPopper.pop())());
		this.pushDelay = this.delayPopper.pop();
	}*/
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
BossBattleStage.prototype.drawHUD = function() {
	ctx.globalAlpha = .7;
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = "#FF0000";
	var bosswidth = (SIZE-10) * (this.boss.HP/this.boss.maxHP);
	ctx.fillRect(5, 5, bosswidth, 10);
	ctx.strokeRect(5, 5, bosswidth, 10);
	ctx.fillStyle = "#FF0000";
	var playerwidth = (SIZE-10) * (this.playerHP/this.playerMaxHP);
	ctx.fillRect(5, SIZE-15, playerwidth, 10);
	ctx.strokeRect(5, SIZE-15, playerwidth, 10);
}
BossBattleStage.prototype.getScoreLines = function() {
	var ack = accHits / (accHits + this.accFallen);
	return [
		{name:"HP:", val:this.playerHP},
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