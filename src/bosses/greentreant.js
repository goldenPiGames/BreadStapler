function GreenTreant(diffMult) {
	this.init(diffMult);
}
GreenTreant.prototype = Object.create(Boss.prototype);
GreenTreant.prototype.name = "Green Treant";
GreenTreant.prototype.baseMaxHP = 3000;