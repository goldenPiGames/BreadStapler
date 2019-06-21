function WhiteBread() {
	this.reset();
}
WhiteBread.prototype = Object.create(BreadBase);
WhiteBread.prototype.name = "White Bread";
WhiteBread.prototype.description = "Made of flour with bran and germ removed. Due to its very little substance, it moves slowly and is not pulled much by gravity.";
WhiteBread.prototype.image = makeImage("src/breadsprites/white.png");
WhiteBread.prototype.width = 30;
WhiteBread.prototype.height = 30;
WhiteBread.prototype.g = .01;
WhiteBread.prototype.maxPoints = 100;
WhiteBread.prototype.reset = function() {
	var side;
	if (typeof this.dx == "number")
		side = this.dx < 0;
	else
		side = Math.random()>=.5;
	this.y = 135 + 180*Math.random();
	this.dy = -0.5-Math.random();
	this.x = side ? SIZE + this.width/2 : -this.width/2;
	this.dx = (side?-1:1) * 2;
	return this;
}
WhiteBread.prototype.hasFallen = function() {
	return (this.y >= SIZE+50 || (this.dx >= 0 && this.x >= SIZE+50) || (this.dx <= 0 && this.x <= -50))
}

function WholeWheatBread() {
	this.reset();
}
WholeWheatBread.prototype = Object.create(BreadBase);
WholeWheatBread.prototype.name = "Whole Wheat Bread";
WholeWheatBread.prototype.description = "Made with the entire wheatberry, it has higher fiber, protein, vitamin B, points, velocity, and gravity than white bread.";
WholeWheatBread.prototype.image = makeImage("src/breadsprites/wholewheat.png");
WholeWheatBread.prototype.width = 30;
WholeWheatBread.prototype.height = 30;
WholeWheatBread.prototype.g = .012;
WholeWheatBread.prototype.maxPoints = 150;
WholeWheatBread.prototype.reset = function() {
	var side;
	if (typeof this.dx == "number")
		side = this.dx < 0;
	else
		side = Math.random()>=.5;
	this.y = 135 + 180*Math.random();
	this.dy = -0.7-Math.random();
	this.x = side ? SIZE + this.width/2 : -this.width/2;
	this.dx = (side?-1:1) * 3;
	return this;
}
WholeWheatBread.prototype.hasFallen = function() {
	return (this.y >= SIZE+50 || (this.dx >= 0 && this.x >= SIZE+50) || (this.dx <= 0 && this.x <= -50))
}