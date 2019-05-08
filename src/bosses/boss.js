const STAPLE_DAMAGE = 5;

function Boss() {
	this.init();
}
Boss.prototype = Object.create(TreeBase);
Boss.prototype.name = "Boss";
Boss.prototype.description = "An enemy. Deplete its HP (by stapling bread to it) before it does the same to you.";

Boss.prototype.init = function(diffMult) {
	this.maxHP = this.baseMaxHP * diffMult;
	this.HP = this.maxHP;
	this.diffMult = diffMult;
	this.affixed = [];
}
Boss.prototype.respondFall = function(slice) {
	
}
Boss.prototype.affix = function(obj, punt) {
	//console.log(obj, punt)
	this.affixed.push(obj);
	this.affixEx(obj, punt);
	this.HP -= punt || STAPLE_DAMAGE;
}
Boss.prototype.isDead = function() {
	return this.hp <= this.maxHP;
}
Boss.prototype.diffMult = 1;