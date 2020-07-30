class WhiteBread extends BreadBase {
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
		this.y = 135 + 180*Math.random();
		this.dy = -0.5-Math.random();
		this.x = side ? SIZE + this.width/2 : -this.width/2;
		this.dx = (side?-1:1) * 2;
		return this;
	}
	hasFallen() {
		return (this.y >= SIZE+50 || (this.dx >= 0 && this.x >= SIZE+50) || (this.dx <= 0 && this.x <= -50));
	}
}
WhiteBread.prototype.lName = "whitebread-name";
WhiteBread.prototype.lDesc = "whitebread-desc";
WhiteBread.prototype.image = makeImage("src/breadsprites/white.png");
WhiteBread.prototype.width = 30;
WhiteBread.prototype.height = 30;
WhiteBread.prototype.g = .01;
WhiteBread.prototype.maxPoints = 100;

class WholeWheatBread extends BreadBase {
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
		this.y = 135 + 180*Math.random();
		this.dy = -0.7-Math.random();
		this.x = side ? SIZE + this.width/2 : -this.width/2;
		this.dx = (side?-1:1) * 3;
		return this;
	}
	hasFallen() {
		return (this.y >= SIZE+50 || (this.dx >= 0 && this.x >= SIZE+50) || (this.dx <= 0 && this.x <= -50))
	}
}
WholeWheatBread.prototype.lName = "wholewheatbread-name";
WholeWheatBread.prototype.lDesc = "wholewheatbread-desc";
WholeWheatBread.prototype.image = makeImage("src/breadsprites/wholewheat.png");
WholeWheatBread.prototype.width = 30;
WholeWheatBread.prototype.height = 30;
WholeWheatBread.prototype.g = .012;
WholeWheatBread.prototype.maxPoints = 150;