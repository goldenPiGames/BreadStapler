var trees;

function Oak(x = SIZE/2) {
	this.x = x;
}
Oak.prototype.name = "Oak";
Oak.prototype.description = "A nice and wide tree. Staple some bread to it.";
Oak.prototype.image = makeImage("src/treesprites/oak.png");
Oak.prototype.width = 90;
Oak.prototype.update = doNothing;
Oak.prototype.draw = function() {
	drawSprite(this.image, this.x, 0, 1/2, 0);
}
Oak.prototype.collides = function(x, y) {
	var xoff = Math.abs(x - this.x);
	if (xoff > this.width/2)
		return false;
	return 1-xoff/this.width/5; //100% in center, 90% on edge
}