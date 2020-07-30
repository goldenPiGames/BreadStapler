var breads;

function WhiteBread() {
	this.reset();
}
WhiteBread.prototype.name = "White Bread";
WhiteBread.prototype.description = "A bread made with wheat flour without the bran and germ. It has very little substance and therefore moves rather slowly and isn't affected much by gravity.";
WhiteBread.prototype.image = makeImage("src/breadsprites/white.png");
WhiteBread.prototype.width = 20;
WhiteBread.prototype.height = 20;
WhiteBread.prototype.g = .01;
WhiteBread.prototype.update = function() {
	this.dy += this.g;
	this.x += this.dx;
	this.y += this.dy;
}
WhiteBread.prototype.draw = function() {
	drawSprite(this.image, this.x, this.y, 1/2, 1/2);
}
WhiteBread.prototype.collision = function(x, y) {
	var xoff = Math.abs(x - this.x);
	var yoff = Math.abs(y - this.y);
	if (xoff > this.width/2 || yoff > this.height/2)
		return false;
	return 1-Math.max(xoff, yoff)/this.width; //100% in center, 50% on edge
}
WhiteBread.prototype.reset = function() {
	var side;
	if (typeof this.dx == "number")
		side = this.dx < 0;
	else
		side = Math.random()>=.5;
	this.y = 180;
	this.dy = 2;
	this.x = side ? SIZE + 50 : -50;
	this.dx = (side?-1:1) * 10;
	this.dy += this.gravity;
}