function GreenTreant(diffMult) {
	
}
GreenTreant.prototype.collidesBase = genCollidesPillar(TREE_EDGE_MULT);
GreenTreant.prototype.collides = function(x, y) {
	var bass = this.collidesBase(x, y)
	if (bass) {
		if (this.shieldActive) {
			return .02;
		} else {
			return bass + this.leftEye.collides(x, y) + this.rightEye.collides(x, y);
		}
	}
}