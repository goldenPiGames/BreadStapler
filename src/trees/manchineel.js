function Manchineel(x = SIZE/2) {
	this.x = x;
	this.affixed = [];
	this.fruitDelay = this.fruitDelayMax;
}
Manchineel.prototype = Object.create(TreeBase);
Manchineel.prototype.name = "Manchineel";
Manchineel.prototype.description = "A dangerous tree that produces poisonous fruit. Hit the fruit before it gets to you.";
Manchineel.prototype.image = makeImage("src/treesprites/manchineel.png");
Manchineel.prototype.width = 80;
Manchineel.prototype.fruitDelayMax = 300;
Manchineel.prototype.fruitOffsetRange = 100;
Manchineel.prototype.update = function() {
	//super.update();
	this.fruitDelay --;
	if (this.fruitDelay <= 0) {
		this.spawnFruit();
		this.fruitDelay += this.fruitDelayMax;
	}
}
Manchineel.prototype.affixEx = function(obj, punt) {
	//super.affix(obj);
	this.fruitDelay -= 60;
}
Manchineel.prototype.spawnFruit = function() {
	//var fruitOffsetMin = this.width/2 + ManchineelFruit.prototype.radius;
	breads.push(new ManchineelFruit(this.x + (Math.random()>.5 ? 1 : -1) * (this.width/2 + ManchineelFruit.prototype.radius + Math.random()*this.fruitOffsetRange)));
}

function ManchineelFruit(x) {
	this.x = x;
	this.y = -1 - this.radius;
}
ManchineelFruit.prototype = Object.create(BreadBase);
ManchineelFruit.prototype.name = "Manchineel";
ManchineelFruit.prototype.description = "A dangerous tree that produces poisonous fruit. Hit the fruit before it gets to you.";
ManchineelFruit.prototype.image = makeImage("src/breadsprites/manchineel.png");
ManchineelFruit.prototype.radius = 17;
ManchineelFruit.prototype.g = .005;
ManchineelFruit.prototype.dx = 0;
ManchineelFruit.prototype.dy = 2;
ManchineelFruit.prototype.baseDamage = 150;
ManchineelFruit.prototype.update = function() {
	this.move();
	if (this.y >= SIZE) {
		this.impact();
		return false;
	} else {
		return true;
	}
}
ManchineelFruit.prototype.impact = function() {
	var punt = this.baseDamage;
	stage.hurtPoison(punt);
	faders.push(new TextFader("-"+punt, this.x, Math.min(this.y, SIZE-50)));
}
/* ManchineelFruit.prototype.move = function() {
	this.x += this.dx;
	this.y += this.dy;
	this.dy += this.g;
} */
/* ManchineelFruit.prototype.draw = function() {
	drawSprite(this.image, this.x, this.y, 1/2, 1/2);
} */
/* ManchineelFruit.prototype.drawAfter = function() {
	ctx.globalAlpha = this.fade;
	this.draw();
	this.fade -= 1/40;
	return (this.fade > 0);
} */
ManchineelFruit.prototype.checkHit = function(staplex, stapley, hitTree, collTree) {
	var coll = this.collides(staplex, stapley);
	if (coll) {
		accHits ++;
		return false;
	} else {
		return true;
	}
}
ManchineelFruit.prototype.collides = function(x, y) {
	var roff = Math.floor(Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)));
	if (roff > this.radius)
		return false;
	return 1-roff/this.radius*(1-BREAD_EDGE_MULT);
}
ManchineelFruit.prototype.getPoints = function(bcoll, tcoll) {
	return Math.ceil(this.maxPoints * bcoll * tcoll);
}