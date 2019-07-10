class Treant extends Boss {
	constructor(diffMult) {
		super(diffMult);
	}
	update() {
		this.updateEx();
		this.leftEye.update();
		this.rightEye.update();
	}
	collides = function(x, y) {
		var bass = this.collidesBase(x, y)
		if (bass) {
			if (this.shieldActive) {
				return .02;
			} else {
				return bass + this.leftEye.collides(x, y) + this.rightEye.collides(x, y);
			}
		}
	}
	returnNeutral() {
		this.shieldActive = false;
		this.activeBenchmark = null;
		this.updateEx = this.updateNeutral;
	}
	purify() {
		this.shieldActive = false;
		this.leftEye.purify();
		this.rightEye.purify();
	}
	pushBreadNormally() {
		return !this.shieldActive;
	}
}
Treant.prototype.collidesBase = genCollidesPillar(TREE_EDGE_MULT);

//------------------------------------------------------------------ Finger ---------------------------------------------------

class TreantDigit {
	constructor(parent) {
		this.parent = parent;
	}
	valSize(type) {
		if (!this.image)
			this.image = this.parent.sprites[type];
		if (!this.width)
			this.width = this.image.width;
		if (!this.height)
			this.height = this.image.height;
	}
	draw() {
		drawSprite(this.image, this.parent.x + this.xoff, this.parent.y + this.yoff, 1/2, 1/2);
	}
	addToFaders() {
		this.x = this.parent.x + this.xoff;
		this.y = this.parent.y + this.yoff;
		this.dx = -1 + 2*Math.random();
		this.dy = .5-2*Math.random();
		faders.push(this);
	}
	drawAfter() {
		this.x += this.dx;
		this.y += this.dy;
		this.dy += this.g;
		drawSprite(this.image, this.x, this.y, 1/2, 1/2);
		return this.y-this.height/2 <= SIZE;
	}
}
TreantDigit.prototype.g = .04;

class TreantFinger extends TreantDigit {
	constructor(parent, xoff) {
		super(parent);
		this.valSize("finger");
		this.xoff = xoff;
		this.yoff = -this.parent.height/2 + this.height/2 - 5;
	}
}

class TreantThumb extends TreantDigit {
	constructor(parent, right) {
		super(parent)
		this.valSize("thumb");
		this.right = right;
		this.xoff = (this.right?1:-1) * (this.parent.width/2 - this.width/2);
		this.yoff = this.parent.height/2 - this.height/2 - 0;
	}
}

//------------------------------------------------------------------ Eye ------------------------------------------------------
function TreantEye(parent, isRight) {
	this.parent = parent;
	this.sprites = parent.sprites;
	this.right = isRight;
	this.xoff = (isRight?-1:1)*this.parent.width/5;
	this.updatePosition();
	this.y = SIZE/3;
}
TreantEye.prototype.radius = 12;
TreantEye.prototype.collides = genCollidesCircle(.8);
TreantEye.prototype.update = function() {
	this.updatePosition();
}
TreantEye.prototype.updatePosition = function() {
	this.x = this.parent.x + this.xoff;
}
TreantEye.prototype.startCounterGleam = function() {
	stage.hurtImpact(10);
	faders.push(new TextFader("-10", this.x, this.y+30));
	faders.push(new EyeGleam(this.x, this.y));
	playSFX("hurt");
	this.gleaming = 24;
}
TreantEye.prototype.blight = true;
TreantEye.prototype.draw = function(open) {
	var spritename = (this.right?"r":"l") + "eye";
	if (this.gleaming) {
		this.gleaming = Math.max(this.gleaming-1, 0);
		//console.log(this.gleaming);
		spritename += "open";
	} else if (open != this.lastOpen) {
		spritename += "partial";
	} else if (open) {
		spritename += this.blight ? "angry" : "partial";
	} else {
		spritename += "closed";
	}
	spritename += this.blight ? "blight" : "pure";
	//console.log(spritename);
	drawSprite(this.sprites[spritename], this.x, this.y, .5, .5);
	this.lastOpen = open;
}
TreantEye.prototype.purify = function() {
	this.blight = false;
}

function EyeGleam(x, y) {
	this.x = x;
	this.y = y;
	this.theta = Math.random()*Math.PI;
}
EyeGleam.prototype.timer = 0;
EyeGleam.prototype.maxDuration = 20;
EyeGleam.prototype.drawAfter = function() {
	this.timer++;
	this.theta += .13;
	ctx.globalAlpha = 1 - Math.pow((this.timer/this.maxDuration), 2);
	//ctx.lineWidth = 3;
	var ro = 5+this.timer*4;
	var ri = 4+this.timer/2;
	var sink = Math.sin(this.theta);
	var cost = Math.cos(this.theta);
	ctx.fillStyle = "#00FF00";
	ctx.beginPath();
	ctx.moveTo(this.x+cost*ro, this.y+sink*ro);
	ctx.lineTo(this.x+sink*ri, this.y-cost*ri);
	ctx.lineTo(this.x-cost*ro, this.y-sink*ro);
	ctx.lineTo(this.x-sink*ri, this.y+cost*ri);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(this.x+sink*ro, this.y-cost*ro);
	ctx.lineTo(this.x+cost*ri, this.y+sink*ri);
	ctx.lineTo(this.x-sink*ro, this.y+cost*ro);
	ctx.lineTo(this.x-cost*ri, this.y-sink*ri);
	ctx.closePath();
	ctx.fill();
	return (this.timer < this.maxDuration);
}