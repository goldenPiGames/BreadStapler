class WaterTreant extends Treant {
	constructor(diffMult) {
		super(diffMult);
		this.x = SIZE/2;
		this.benchmarks = [
			//new Benchmark(.99, ()=>this.startOrbitars(5)),
			new Benchmark(.8, ()=>this.startFist(false)),
			new Benchmark(.6, ()=>this.startOrbitars(5)),
			new Benchmark(.6, ()=>this.startPressure(true)),
			new Benchmark(.3, ()=>this.stopPressure(true)),
			new Benchmark(.3, ()=>this.startFist(true)),
			new Benchmark(.15, ()=>this.startOrbitars(7)),
		];
		this.leftEye = new TreantEye(this, false);
		this.rightEye = new TreantEye(this, true);
		this.returnNeutral();
	}
	returnNeutral() {
		super.returnNeutral();
		this.x = SIZE/2;
	}
	updateNeutral() {
		this.checkBenchmarks();
		this.leftEye.update();
		this.rightEye.update();
		/*this.fruitDelay -= 2 + PRound(3*(1-this.getHPPortion()));
		if (this.fruitDelay <= 0) {
			this.spawnFruit();
			this.fruitDelay += this.fruitDelayMax;
		}*/
	}
	respondFall(slice) {
		
	}
	draw() {
		//if (!this.shieldActive) {
			ctx.globalAlpha = 1;
			drawSprite(this.sprites.trunk, this.x, 0, 1/2, 0);
			this.leftEye.draw(!this.shieldActive);
			this.rightEye.draw(!this.shieldActive);
			if (settings.stay && !this.shieldActive) {
				ctx.globalAlpha = settings.stay/2;
				this.affixed.forEach(oj => oj.draw());
			}
			ctx.globalAlpha = 1;
			if (this.shieldActive) {
				drawSprite(this.sprites.shield, this.x, 0, 1/2, 0);
			}
		//}
	}
	collides(x, y) {
		var bass = this.collidesBase(x, y)
		if (bass) {
			if (this.shieldActive) {
				return false;
			} else {
				return bass + this.leftEye.collides(x, y)/2 + this.rightEye.collides(x, y)/2;
			}
		}
	}
	startFist(isRight) {
		this.x = isRight ? SIZE*3/4 : SIZE/4;
		this.shieldActive = true;
		this.updateEx = this.updateFist;
		//fadeAllBreads();
		this.hand = new WaterTreantHand(this.diffMult, isRight);
		this.storedBreads = breads;
		breads = [this.hand];
		this.ringDelay = 120;
		this.ringDelayMax = 120 / this.diffMult;
		this.ringsLeft = isRight ? 7 : 5;
		faders.push(new ScreenFlash("#000069", 30));
	}
	updateFist(isRight) {
		this.ringDelay --;
		if (this.ringDelay <= 0) {
			if (this.ringsLeft > 0) {
				this.hand.chargeUp(this.ringsLeft);
				this.ringsLeft--;
				this.ringDelay = this.ringDelayMax;
			} else {
				faders.push(new ScreenFlash("#FFFFFF", 300));
				this.hand.unleashPunch();
				this.hand = null;
				breads = this.storedBreads;
				this.returnNeutral();
			}
		}
	}
	startOrbitars(numBlasts) {
		this.x = NaN;
		this.shieldActive = true;
		this.updateEx = this.updateOrbitars;
		this.fuse = this.baseFuse / this.diffMult;
		this.storedBreads = breads;
		breads = [];
		for (var i = 0; i < numBlasts; i++) {
			let radius = (i+1)/(numBlasts+1)*SIZE/2;
			breads.push(new OrbitingBlast(radius, (i%2?1:-1) * (1 + Math.random()/2 + i) / radius * this.diffMult));
		}
		faders.push(new ScreenFlash("#000069", 30));
	}
	updateOrbitars() {
		this.fuse--;
		if (this.fuse <= 0) {
			if (breads.length >= 1) {
				breads[Math.floor(Math.random()*breads.length)].detonate();
				this.fuse = 15;
			} else {
				faders.push(new ScreenFlash("#FFFFFF", 30));
				breads = this.storedBreads;
				this.returnNeutral();
			}
		}
	}
	startPressure() {
		this.updateEx = this.updatePressure;
		this.storedBreadPopper = stage.breadPopper;
		stage.breadPopper = new WeightPopper(1,
			new WeightPopperTicket(SubRoll, 1)
		);
		stage.delay = stage.delayDuringPressure;
	}
	switchToHardtack() {
		stage.breadPopper = new WeightPopper(1,
			new WeightPopperTicket(Hardtack, 1)
		);
	}
	updatePressure() {
		this.checkBenchmarks();
		stage.hurtImpact(1);
	}
	stopPressure() {
		this.returnNeutral();
		this.currentBenchmark = null;
		stage.delay = stage.delayAfterPressure;
		stage.breadPopper = this.storedBreadPopper;
	}
}

WaterTreant.prototype.name = lg("watertreant-name");
WaterTreant.prototype.description = lg("watertreant-desc");
WaterTreant.prototype.sprites = makeSprites("src/bosssprites/watertreant.png", {
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
WaterTreant.prototype.baseMaxHP = 4800;
WaterTreant.prototype.width = 120;

WaterTreant.prototype.baseFuse = 600;

//------------------------------------------------------------------ Hand
function WaterTreantHand(diffMult, isRight) {
	//this.init(diffMult);
	this.right = isRight;
	this.velreturn *= diffMult;
	this.velhit /= diffMult;
	var d = isRight ? 1 : -1;
	this.digits = [
		new TreantFinger(this, d*this.width*3/8),
		new TreantFinger(this, d*this.width*1/8),
		new TreantFinger(this, -d*this.width*1/8),
		new TreantFinger(this, -d*this.width*3/8),
		new TreantThumb(this, isRight),
	]
}
//WaterTreantHand.prototype = Object.create(Boss.prototype);
WaterTreantHand.prototype.name = "Water Treant Hand";
WaterTreantHand.prototype.description = "ZA HANDO";
WaterTreantHand.prototype.sprites = WaterTreant.prototype.sprites;
WaterTreantHand.prototype.baseMaxHP = 400;
WaterTreantHand.prototype.x = SIZE/2;
WaterTreantHand.prototype.y = SIZE/2;
WaterTreantHand.prototype.centerx = SIZE/2;
WaterTreantHand.prototype.centery = SIZE/2;
WaterTreantHand.prototype.dx = 0;
WaterTreantHand.prototype.dy = 0;
WaterTreantHand.prototype.width = 100;
WaterTreantHand.prototype.height = 80;
WaterTreantHand.prototype.velstay = .95;
WaterTreantHand.prototype.velhit = .16;
WaterTreantHand.prototype.velreturn = .02;
WaterTreantHand.prototype.punchDamage = 0;
WaterTreantHand.prototype.maxDamagePerRing = 200;
WaterTreantHand.prototype.collides = genCollidesRect(1);
WaterTreantHand.prototype.update = function() {
	this.x += this.dx;
	this.y += this.dy;
	var rdx = (this.centerx-this.x) * this.velreturn;
	var rdy = (this.centery-this.y) * this.velreturn;
	this.dx = (this.dx-rdx) * this.velstay + rdx;
	this.dy = (this.dy-rdy) * this.velstay + rdy;
	return true;
}
WaterTreantHand.prototype.draw = function() {
	//this.drawHPBar();
	ctx.globalAlpha = 1;
	drawSprite(this.sprites.palm, this.x, this.y, 1/2, 1/2);
	this.digits.forEach(oj=>oj.draw());
}
WaterTreantHand.prototype.chargeUp = function(countdown) {
	var portion = Math.max(0, 1 - Math.sqrt(Math.pow(this.x-this.centerx, 2) + Math.pow(this.y-this.centery, 2)) / SIZE * 1.8);
	console.log(portion);
	var chargeAmount = PRound(portion * this.maxDamagePerRing);
	this.punchDamage += chargeAmount;
	faders.push(new TextFader(countdown, this.x, this.y));
	//console.log(new TextFader(countdown, this.x, this.y))
	playSFX("charge");
}
WaterTreantHand.prototype.unleashPunch = function() {
	stage.hurtImpact(this.punchDamage);
	playSFX("hurt");
	faders.push(new TextFader("-"+this.punchDamage, this.x, this.y));
}
WaterTreantHand.prototype.addToFaders = function() {
	this.dy = 0;
	faders.push(this);
	this.digits.forEach((oj)=>oj.addToFaders());
}
WaterTreantHand.prototype.drawAfter = function() {
	ctx.globalAlpha = 1;
	drawSprite(this.sprites.palm, this.x, this.y, 1/2, 1/2);
	this.dy += .04;
	this.y += this.dy;
	return this.y-this.height/2 <= SIZE;
}
WaterTreantHand.prototype.checkHit = function(staplex, stapley, hitTree, collTree) {
	var coll = this.collides(staplex, stapley);
	if (coll) {
		accHits ++;
		this.dx = -this.velhit * (staplex-this.x);
		this.dy = -this.velhit * (stapley-this.y);
		playSFX("pushhit");
		return true;
	} else {
		return true;
	}
}

//------------------------------------------------------------------ Neutral
//SubRolls and Hardtacks. Water Blasts fall down periodically.

//------------------------------------------------------------------ Orbiting Blasts
//Several orbiting blasts with different orbiting radius and speed; hit them to shrink their radius down to the distance from the center that you hit them. After a set time, they explode and deal damage proportional to their radius.

//------------------------------------------------------------------ Centered Fist
//Fist is int center. Hit it to launch it away like hardtack. The further it is, the more it wants to return.

//------------------------------------------------------------------ Pressure
//Extremely high delay, screen obscured, continual damage, no blasts, ends when below certain HP.

function WaterBlast() {
	
}

function OrbitingBlast(orbitRadius, orbitOmega, orbitTheta = Math.random()*2*Math.PI) {
	this.orbitRadius = orbitRadius;
	this.orbitOmega = orbitOmega;
	this.orbitTheta = orbitTheta;
}
OrbitingBlast.prototype.radius = 18;
OrbitingBlast.prototype.centerX = SIZE/2;
OrbitingBlast.prototype.centerY = SIZE/2;
OrbitingBlast.prototype.baseDamage = 250;
OrbitingBlast.prototype.collides = genCollidesCircle(0);
OrbitingBlast.prototype.update = function() {
	this.move();
	if (this.detonated) {
		//console.log("butt")
		this.explode();
		return false;
	} else {
		return true;
	}
}
OrbitingBlast.prototype.move = function() {
	this.orbitTheta += this.orbitOmega;
	this.x = SIZE/2 + this.orbitRadius * Math.cos(this.orbitTheta);
	this.y = SIZE/2 + this.orbitRadius * Math.sin(this.orbitTheta);
}
OrbitingBlast.prototype.draw = function() {
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	ctx.fill();
}
OrbitingBlast.prototype.checkHit = function(staplex, stapley, hitTree, collTree) {
	var coll = this.collides(staplex, stapley);
	//console.log(coll)
	if (coll) {
		accHits ++;
		playSFX("fruithit");
		faders.push(this);
		this.drawAfter = this.drawAfterDisarmed;
		return false;
	} else {
		return true;
	}
}
OrbitingBlast.prototype.detonate = function() {
	this.detonated = true;
}
OrbitingBlast.prototype.explode = function() {
	var damage = Math.floor(this.baseDamage);
	stage.hurtImpact(damage);
	playSFX("hurt");
	faders.push(this);
	this.drawAfter = this.drawAfterExploded;
}
OrbitingBlast.prototype.fade = 1;
OrbitingBlast.prototype.drawAfterExploded = function() {
	ctx.globalAlpha = this.fade;
	this.radius += 1;
	this.draw();
	this.fade -= 1/30;
	return (this.fade > 0);
}
OrbitingBlast.prototype.drawAfterDisarmed = function() {
	ctx.globalAlpha = this.fade;
	this.draw();
	this.fade -= 1/30;
	return (this.fade > 0);
}
OrbitingBlast.prototype.drawAfter = OrbitingBlast.prototype.drawAfterDisarmed;