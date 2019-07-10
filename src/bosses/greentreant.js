class GreenTreant extends Treant {
	constructor(diffMult) {
		super(diffMult);
		this.x = SIZE/2;
		this.benchmarks = [
			new Benchmark(.8, ()=>this.startStream(false)),
			new Benchmark(.6, ()=>this.startRain(false)),
			new Benchmark(.4, ()=>this.startStream(true)),
			new Benchmark(.2, ()=>this.startRain(true)),
		];
		this.leftEye = new TreantEye(this, false);
		this.rightEye = new TreantEye(this, true);
		this.returnNeutral();
	}
	returnNeutral() {
		this.shieldActive = false;
		this.activeBenchmark = null;
		this.updateEx = this.updateNeutral;
	}
	updateNeutral() {
		this.checkBenchmarks();
		this.leftEye.update();
		this.rightEye.update();
		this.fruitDelay -= 2 + PRound(3*(1-this.getHPPortion()));
		if (this.fruitDelay <= 0) {
			this.spawnFruit();
			this.fruitDelay += this.fruitDelayMax;
		}
	}
	respondFall(slice) {
		if (this.hand) {
			this.hand.respondFall(slice);
		} else if (!this.shieldActive) {
			if (!slice.cursed)
				this.rightEye.startCounterGleam();
		}
	}
	draw() {
		ctx.globalAlpha = 1;
		drawSprite(this.sprites.trunk, this.x, 0, 1/2, 0);
		this.leftEye.draw(!this.shieldActive);
		this.rightEye.draw(!this.shieldActive);
		if (settings.stay) {
			ctx.globalAlpha = settings.stay/2;
			this.affixed.forEach(oj => oj.draw());
		}
		ctx.globalAlpha = 1;
		if (this.shieldActive) {
			drawSprite(this.sprites.shield, this.x, 0, 1/2, 0);
		}
	}
	startRain(second) {
		this.shieldActive = true;
		this.updateEx = this.updateRain;
		this.rainLeft = this.rainTotal;
		this.fruitDelay = 20;
		this.rainDelay = this.rainDelayBase*(second?.8:1.2)/this.diffMult;
	}
	updateRain() {
		this.fruitDelay--;
		if (this.fruitDelay <= 0) {
			this.spawnFruit();
			this.fruitDelay = PRound(this.fruitDelay + this.rainDelay);
			this.rainLeft --;
		}
		if (this.rainLeft <= 0) {
			this.updateEx = this.updateRainEnd;
		}
	}
	updateRainEnd() {
		if (breads.length <= 2) {
			this.fruitDelay = this.fruitDelayMax;
			this.returnNeutral();
		}
	}
	startStream(isRight) {
		this.shieldActive = true;
		this.updateEx = this.updateStreamIntro;
		this.hand = new GreenTreantHand(this.diffMult, isRight);
		trees.push(this.hand);
		this.untilGood = 5;
		this.streamDelay = 0;
		this.streamDelayMax = isRight ? this.streamDelayBase*(1-(.3*this.diffMult)) : this.streamDelayBase;
	}
	updateStreamIntro() {
		if (breads.length <= 0 && this.hand.isReady()) {
			this.hand.openUp();
			this.updateEx = this.updateStream;
		}
	}
	updateStream() {
		this.streamDelay--;
		if (this.streamDelay <= 0) {
			if (this.untilGood <= 0) {
				this.hand.spawnBread(true);
				this.untilGood = Math.round(this.untilGoodBase*(.75+.5*Math.random()));
			} else {
				this.hand.spawnBread(false);
				this.untilGood--;
			}
			this.streamDelay = this.streamDelayMax;
		}
		if (this.hand.isDead()) {
			this.updateEx = this.updateStreamEnd;
			trees.splice(trees.indexOf(this.hand), 1);
			this.hand.addToFaders();
		}
	}
	updateStreamEnd() {
		if (!faders.includes(this.hand)) {
			this.shieldActive = false;
			this.hand = null;
			this.updateEx = this.updateNeutral;
		}
	}
}

GreenTreant.prototype.name = lg("greentreant-name");
GreenTreant.prototype.description = lg("greentreant-desc");
GreenTreant.prototype.sprites = makeSprites("src/bosssprites/greentreant.png", {
	"trunk" : {x:0, y:0, width:120, height:360},
	"shield" : {x:120, y:0, width:120, height:360},
	"palm" : {x:240, y:280, width:100, height:80},
	"finger" : {x:240, y:220, width:23, height:60},
	"thumb" : {x:263, y:257, width:60, height:23},
	"reyeopenpure" : {x:240, y:0, width:24, height:24},
	"leyeopenpure" : {x:264, y:0, width:24, height:24},
	"reyeangrypure" : {x:288, y:0, width:24, height:24},
	"leyeangrypure" : {x:312, y:0, width:24, height:24},
	"reyepartialpure" : {x:240, y:24, width:24, height:24},
	"leyepartialpure" : {x:264, y:24, width:24, height:24},
	"reyeclosedpure" : {x:288, y:24, width:24, height:24},
	"leyeclosedpure" : {x:312, y:24, width:24, height:24},
	"reyeopenblight" : {x:240, y:48, width:24, height:24},
	"leyeopenblight" : {x:264, y:48, width:24, height:24},
	"reyeangryblight" : {x:288, y:48, width:24, height:24},
	"leyeangryblight" : {x:312, y:48, width:24, height:24},
	"reyepartialblight" : {x:240, y:72, width:24, height:24},
	"leyepartialblight" : {x:264, y:72, width:24, height:24},
	"reyeclosedblight" : {x:288, y:72, width:24, height:24},
	"leyeclosedblight" : {x:312, y:72, width:24, height:24},
});
GreenTreant.prototype.baseMaxHP = 3200;
GreenTreant.prototype.width = 120;

GreenTreant.prototype.fruitDelay = 300;
GreenTreant.prototype.fruitDelayMax = 240;
GreenTreant.prototype.fruitOffsetRange = 80;
GreenTreant.prototype.spawnFruit = Manchineel.prototype.spawnFruit;

GreenTreant.prototype.rainTotal = 12;
GreenTreant.prototype.rainDelayBase = 20;

GreenTreant.prototype.streamDelayBase = RyeBread.prototype.width / Math.abs((new RyeBread()).dx);
GreenTreant.prototype.untilGoodBase = 8;

//------------------------------------------------------------------ Hand -----------------------------------------------------
function GreenTreantHand(diffMult, isRight) {
	this.init(diffMult);
	this.right = isRight;
	this.x = isRight ? (this.width/2+10) : (SIZE-this.width/2-10);
	this.y = SIZE + this.height/2+5;
	var d = isRight ? 1 : -1;
	this.digits = [
		new GreenTreantFinger(this, Math.PI*2/5, d*this.width*3/8),
		new GreenTreantFinger(this, Math.PI*4/5, d*this.width*1/8),
		new GreenTreantFinger(this, Math.PI*6/5, -d*this.width*1/8),
		new GreenTreantFinger(this, Math.PI*8/5, -d*this.width*3/8),
		new GreenTreantThumb(this, 0, isRight),
	]
}
GreenTreantHand.prototype = Object.create(Boss.prototype);
GreenTreantHand.prototype.name = "Green Treant Hand";
GreenTreantHand.prototype.description = "ZA HANDO";
GreenTreantHand.prototype.sprites = GreenTreant.prototype.sprites;
GreenTreantHand.prototype.baseMaxHP = 400;
//GreenTreantHand.prototype.x = SIZE*4/5;
//GreenTreantHand.prototype.y = SIZE+50;
GreenTreantHand.prototype.ygoal = SIZE*1/2;
GreenTreantHand.prototype.dy = -1.5;
GreenTreantHand.prototype.width = 100;
GreenTreantHand.prototype.height = 80;
GreenTreantHand.prototype.opened = false;
GreenTreantHand.prototype.punchDamage = 200;
GreenTreantHand.prototype.punching = 0;
GreenTreantHand.prototype.digittheta = 0;
GreenTreantHand.prototype.collides = genCollidesRect(.4);
GreenTreantHand.prototype.update = function() {
	if (this.opened) {
		if (this.punching) {
			this.punching--;
			if (this.punching == 6) {
				this.hitPunch();
			}
			if (this.punching <= 0) {
				this.punching = false;
			}
		}
	} else {
		this.y += this.dy;
		if (this.y < this.ygoal)
			this.y = this.ygoal;
	}
}
GreenTreantHand.prototype.isReady = function() {
	return this.y <= this.ygoal;
}
GreenTreantHand.prototype.openUp = function() {
	this.opened = true;
}
GreenTreantHand.prototype.draw = function() {
	this.drawHPBar();
	ctx.globalAlpha = 1;
	drawSprite(this.sprites.palm, this.x, this.y, 1/2, 1/2);
	this.digittheta = (this.digittheta + .15) % (2*Math.PI);
	this.digits.forEach(oj=>oj.draw(!this.opened || this.punching, this.digittheta));
}
GreenTreantHand.prototype.spawnBread = function(good) {
	var bred = new (good ? RyeBread : MarbleRye)();
	bred.x = this.x;
	bred.y = this.y;
	bred.dx = (this.right?1:-1)*Math.abs(bred.dx);
	bred.dy = 0;
	var failstop = 0;
	while (!bred.hasFallen() && failstop < 300) {
		bred.move();
		failstop++;
	}
	bred.dx = -bred.dx;
	bred.dy = -bred.dy;
	if (good)
		breads.unshift(bred);
	else
		breads.push(bred);
}
GreenTreantHand.prototype.respondFall = function(slice) {
	if (this.opened && !slice.cursed && !this.isDead()) {
		this.startPunch();
	}
}
GreenTreantHand.prototype.startPunch = function(slice) {
	this.punching = 30;
}
GreenTreantHand.prototype.hitPunch = function() {
	stage.hurtImpact(this.punchDamage);
	faders.push(new TextFader("-"+this.punchDamage, this.x, this.y - this.height/3));
	playSFX("hurt");
}
GreenTreantHand.prototype.addToFaders = function() {
	this.dy = 0;
	faders.push(this);
	this.digits.forEach((oj)=>oj.addToFaders());
}
GreenTreantHand.prototype.drawAfter = function() {
	ctx.globalAlpha = 1;
	drawSprite(this.sprites.palm, this.x, this.y, 1/2, 1/2);
	this.dy += .04;
	this.y += this.dy;
	return this.y-this.height/2 <= SIZE;
}

class GreenTreantFinger extends TreantFinger {
	constructor(parent, thoff, xoff) {
		super(parent, xoff);
		this.thoff = thoff;
	}
	draw(fist, theta) {
		var ygoal;
		if (fist) {
			ygoal = -this.parent.height/2 + this.height/2 - 5;
		} else {
			ygoal = -this.parent.height/2 - this.height/2 - 5*(1+Math.sin(theta + this.thoff));
		}
		if (Math.abs(ygoal - this.yoff) < 1.5) {
			this.yoff = ygoal;
		} else {
			this.yoff = (1-this.catchupMult)*this.yoff + this.catchupMult*ygoal;
		}
		super.draw();
		//drawSprite(this.image, this.parent.x + this.xoff, this.parent.y + this.yoff, 1/2, 1/2);
	}
}
//GreenTreantFinger.prototype.image = GreenTreant.prototype.sprites.finger;
GreenTreantFinger.prototype.catchupMult = .1;

class GreenTreantThumb extends TreantThumb {
	constructor(parent, thoff) {
		super(parent, parent.right);
		this.thoff = thoff;
	}
	draw(fist, theta) {
		var xgoal;
		if (fist) {
			xgoal = (this.right?1:-1) * (this.parent.width/2 - this.width/2);
		} else {
			xgoal = (this.right?1:-1) * (this.parent.width/2 + this.width/2 + 5*(1+Math.sin(theta + this.thoff)));
		}
		if (Math.abs(xgoal - this.xoff) < 1.5) {
			this.xoff = xgoal;
		} else {
			this.xoff = (1-this.catchupMult)*this.xoff + this.catchupMult*xgoal;
		}
		drawSprite(this.image, this.parent.x + this.xoff, this.parent.y + this.yoff, 1/2, 1/2);
	}
}
//GreenTreantThumb.prototype.image = GreenTreant.prototype.sprites.thumb;
//GreenTreantThumb.prototype.width = GreenTreantThumb.prototype.image.width;
//GreenTreantThumb.prototype.height = GreenTreantThumb.prototype.image.height;
GreenTreantThumb.prototype.catchupMult = GreenTreantFinger.prototype.catchupMult;