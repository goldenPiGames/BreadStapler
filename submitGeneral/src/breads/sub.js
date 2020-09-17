class SubRoll extends BreadBase {
	constructor() {
		super();
		this.reset();
	}
	reset() {
		var side;
		if (typeof this.dx == "number")
			side = this.dx < 0;
		else
			side = Math.random()>=.5;
		this.y = 30 + (SIZE-60)*Math.random();
		this.x = side ? SIZE + this.width/2 : -this.width/2;
		this.dx = (side?-1:1) * 1.5;
		return this;
	}
	hasFallen() {
		return ((this.dx >= 0 && this.x >= SIZE+50) || (this.dx <= 0 && this.x <= -50))
	}
}
SubRoll.prototype.lName = "subroll-name";
SubRoll.prototype.lDesc = "subroll-desc";
SubRoll.prototype.image = makeImage("src/breadsprites/sub.png");
SubRoll.prototype.width = 45;
SubRoll.prototype.height = 20;
SubRoll.prototype.dy = 0;
SubRoll.prototype.g = 0;
SubRoll.prototype.maxPoints = 100;
SubRoll.prototype.collides = genCollidesRectHoriz(.5);