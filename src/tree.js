var trees;
const TREE_EDGE_MULT = .90;

function Oak(x = SIZE/2) {
	this.x = x;
}
Oak.prototype.name = "Oak";
Oak.prototype.description = "A large and tough tree. Staple some bread to it. Sometimes found in small groups.";
Oak.prototype.image = makeImage("src/treesprites/oak.png");
Oak.prototype.width = 90;
Oak.prototype.update = doNothing;
Oak.prototype.draw = function() {
	drawSprite(this.image, this.x, 0, 1/2, 0);
}
Oak.prototype.collides = function(x, y) {
	var xoff = Math.floor(Math.abs(x - this.x));
	if (xoff > this.width/2)
		return false;
	return 1-(xoff/this.width)*2*(1-TREE_EDGE_MULT); //100% in center, 90% on edge
}