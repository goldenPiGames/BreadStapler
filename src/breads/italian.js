function Ciabatta() {
	this.reset();
}
Ciabatta.prototype = Object.create(BreadBase);
Ciabatta.prototype.name = "Rye Bread";
Ciabatta.prototype.description = "An Italian bread with olive oil. It moves back and forth, much like Italy during the world wars.";
Ciabatta.prototype.image = makeImage("src/breadsprites/ciabatta.png");
Ciabatta.prototype.width = 30;
Ciabatta.prototype.height = 30;
Ciabatta.prototype.maxPoints = 160;
Ciabatta.prototype.reset = function() {
	var side;
	if (typeof this.dx == "number")
		side = this.dx < 0;
	else
		side = Math.random()>=.5;
	this.y = 180 + 180*Math.random();
	this.dy = -0.5-Math.random();
	this.x = side ? SIZE + 50 : -50;
	this.dx = (side?-1:1) * 2;
	return this;
}
Ciabatta.prototype.hasFallen = function() {
	return (this.y >= SIZE+50 || (this.dx >= 0 && this.x >= SIZE+50) || (this.dx <= 0 && this.x <= -50))
}