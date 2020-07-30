class RyeBread extends BreadBase {
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
		this.y = 270 + 90*Math.random();
		this.dy = -2.0-Math.random()*1.5;
		this.x = side ? SIZE + this.width/2 : -this.width/2;
		this.dx = (side?-1:1) * 2;
		return this;
	}
}
RyeBread.prototype.lName = "ryebread-name";
RyeBread.prototype.lDesc = "ryebread-desc";
RyeBread.prototype.image = makeImage("src/breadsprites/rye.png");
RyeBread.prototype.width = 36;
RyeBread.prototype.height = 25;
RyeBread.prototype.g = .025;
RyeBread.prototype.maxPoints = 100;

class Pumpernickel extends BreadBase {
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
		this.y = 300 + 60*Math.random();
		this.dy = -3.0-Math.random()*1.8;
		this.x = side ? SIZE + this.width/2 : -this.width/2;
		this.dx = (side?-1:1) * 2;
		return this;
	}
}
Pumpernickel.prototype.lName = "pumpernickel-name";
Pumpernickel.prototype.lDesc = "pumpernickel-desc";
Pumpernickel.prototype.image = makeImage("src/breadsprites/pumpernickel.png");
Pumpernickel.prototype.width = 36;
Pumpernickel.prototype.height = 25;
Pumpernickel.prototype.g = .04;
Pumpernickel.prototype.maxPoints = 150;

class MarbleRye extends BreadBase {
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
		this.y = 270 + 90*Math.random();
		this.dy = -2.0-Math.random()*1.5;
		this.x = side ? SIZE + this.width/2 : -this.width/2;
		this.dx = (side?-1:1) * this.basedx;
		return this;
	}
	checkHit(staplex, stapley, hitTree, collTree) {
		var coll = this.collides(staplex, stapley);
		if (coll) {
			//accHits ++;
			var dam = this.baseDamage;
			stage.hurtCurse(dam);
			faders.push(new TextFader("-"+dam, this.x, this.y));
			//hitTree.affix(this, -dam);
			return false;
		} else {
			return true;
		}
	}
}
MarbleRye.prototype.lName = "marblerye-name";
MarbleRye.prototype.lDesc = "marblerye-desc";
MarbleRye.prototype.image = makeImage("src/breadsprites/marblerye.png");
MarbleRye.prototype.width = 36;
MarbleRye.prototype.height = 25;
MarbleRye.prototype.g = .025;
MarbleRye.prototype.basedx = 2;
MarbleRye.prototype.baseDamage = 150;
MarbleRye.prototype.cursed = true;