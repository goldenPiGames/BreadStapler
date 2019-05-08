function RyeBread() {
	this.reset();
}
RyeBread.prototype = Object.create(BreadBase);
RyeBread.prototype.name = "Rye Bread";
RyeBread.prototype.description = "A bread made with rye. Heavier and travels in a higher arc.";
RyeBread.prototype.image = makeImage("src/breadsprites/rye.png");
RyeBread.prototype.width = 36;
RyeBread.prototype.height = 25;
RyeBread.prototype.g = .025;
RyeBread.prototype.maxPoints = 100;
RyeBread.prototype.reset = function() {
	var side;
	if (typeof this.dx == "number")
		side = this.dx < 0;
	else
		side = Math.random()>=.5;
	this.y = 270 + 90*Math.random();
	this.dy = -2.0-Math.random()*1.5;
	this.x = side ? SIZE + 50 : -50;
	this.dx = (side?-1:1) * 2;
	return this;
}

function Pumpernickel() {
	this.reset();
}
Pumpernickel.prototype = Object.create(BreadBase);
Pumpernickel.prototype.name = "Pumpernickel";
Pumpernickel.prototype.description = "A heavy and dark bread made with rye. Due to its weight, it travels in a very high arc.";
Pumpernickel.prototype.image = makeImage("src/breadsprites/pumpernickel.png");
Pumpernickel.prototype.width = 36;
Pumpernickel.prototype.height = 25;
Pumpernickel.prototype.g = .04;
Pumpernickel.prototype.maxPoints = 150;
Pumpernickel.prototype.reset = function() {
	var side;
	if (typeof this.dx == "number")
		side = this.dx < 0;
	else
		side = Math.random()>=.5;
	this.y = 300 + 60*Math.random();
	this.dy = -3.0-Math.random()*1.8;
	this.x = side ? SIZE + 50 : -50;
	this.dx = (side?-1:1) * 2;
	return this;
}

function MarbleRye() {
	this.reset();
}
MarbleRye.prototype = Object.create(BreadBase);
MarbleRye.prototype.name = "Marble Rye";
MarbleRye.prototype.description = "The light and dark dough of this bread actually forms evil, cursed patterns. DO NOT staple it.";
MarbleRye.prototype.image = makeImage("src/breadsprites/marblerye.png");
MarbleRye.prototype.width = 36;
MarbleRye.prototype.height = 25;
MarbleRye.prototype.g = .025;
MarbleRye.prototype.basedx = 2;
MarbleRye.prototype.baseDamage = 150;
MarbleRye.prototype.reset = function() {
	var side;
	if (typeof this.dx == "number")
		side = this.dx < 0;
	else
		side = Math.random()>=.5;
	this.y = 270 + 90*Math.random();
	this.dy = -2.0-Math.random()*1.5;
	this.x = side ? SIZE + 50 : -50;
	this.dx = (side?-1:1) * this.basedx;
	return this;
}
MarbleRye.prototype.checkHit = function(staplex, stapley, hitTree, collTree) {
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