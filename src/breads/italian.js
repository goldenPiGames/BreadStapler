function Ciabatta() {
	this.side = (Math.random() > .5);
	this.reset();
}
Ciabatta.prototype = Object.create(BreadBase);
Ciabatta.prototype.name = "Ciabatta";
Ciabatta.prototype.description = "An Italian bread with olive oil. It goes back and forth, much like Italy during the world wars.";
Ciabatta.prototype.image = makeImage("src/breadsprites/ciabatta.png");
Ciabatta.prototype.width = 30;
Ciabatta.prototype.height = 30;
Ciabatta.prototype.maxPoints = 200;
Ciabatta.prototype.move = function() {
	var ax = (this.passesMade > 0 && this.passesMade < 3) ? ((this.side?-1:1) * .1) : 0;
	this.dx += ax;
	this.x += this.dx;
	if (this.side && this.x < SIZE/2) {
		this.side = false;
		this.passesMade++;
	}
	if (!this.side && this.x >= SIZE/2) {
		this.side = true;
		this.passesMade++;
	}
	this.y += this.dy;
}
Ciabatta.prototype.reset = function() {
	this.passesMade = 0;
	this.y = SIZE * (.25 + Math.random()*.5);
	this.dy = 1*(Math.random()-.5);
	this.x = this.side ? SIZE+50 : -50;
	this.dx = (this.side?-1:1) * 4;
	return this;
}
Ciabatta.prototype.hasFallen = function() {
	return ((this.dx >= 0 && this.x >= SIZE+50) || (this.dx <= 0 && this.x <= -50));
}