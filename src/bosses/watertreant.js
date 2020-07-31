class WaterTreant extends Treant {
	constructor(diffMult) {
		super(diffMult);
		this.x = SIZE/2;
		this.benchmarks = [
			//new Benchmark(1.0, ()=>this.startOrbitars(7)),
			new Benchmark(.8, ()=>this.startFist(false)),
			new Benchmark(.6, ()=>this.startOrbitars(5)),
			new Benchmark(.6, ()=>this.startPressure(true)),
			new Benchmark(.4, ()=>this.stopPressure(true)),
			new Benchmark(.4, ()=>this.startFist(true)),
			new Benchmark(.2, ()=>this.startOrbitars(5)),
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
		this.updateDOT();
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
			if (this.fuse) {
				ctx.lineWidth = 6;
				ctx.strokeStyle = 0;
				ctx.beginPath();
				ctx.arc(SIZE/2, SIZE/2, 25, 0, 2 * Math.PI);
				var handtheta = Math.PI * (-.5 - 2 * (this.fuseMax ? this.fuse/this.fuseMax : 0));
				ctx.moveTo(SIZE/2, SIZE/2);
				ctx.lineTo(SIZE/2 + 20*Math.cos(handtheta), SIZE/2 + 20*Math.sin(handtheta));
				ctx.stroke();
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
	updateDOT() {
		this.dotDelay--;
		if (this.dotDelay <= 0) {
			stage.hurtImpact(1);
			this.dotDelay = this.dotDelayMax;
		}
	}
	startFist(isRight) {
		this.x = SIZE * (.5 + (isRight?1:-1) * .3);
		this.shieldActive = true;
		this.updateEx = this.updateFist;
		//fadeAllBreads();
		this.hand = new WaterTreantHand(this.diffMult, isRight);
		this.storedBreads = breads;
		breads = [this.hand];
		this.ringDelay = 180;
		this.ringDelayMax = 120 / this.diffMult;
		this.ringsLeft = /*isRight ? 7 :*/ 5;
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
		this.fuseMax = this.fuseBase / this.diffMult;
		this.fuse = this.fuseMax;
		this.storedBreads = breads;
		breads = [];
		for (var i = 0; i < numBlasts; i++) {
			let radius = (i/numBlasts*2/3 + 1/3) * SIZE/2;
			breads.push(new OrbitingBlast(radius, (i%2?1:-1) * (2 + Math.random()/2 + i/8) / radius * this.diffMult));
		}
		faders.push(new ScreenFlash("#000069", 30));
	}
	updateOrbitars() {
		this.fuse--;
		if (this.fuse <= 0) {
			this.fuseMax = null;
			if (breads.length >= 1) {
				breads[Math.floor(Math.random()*breads.length)].detonate();
				this.fuse = 24;
			} else {
				faders.push(new ScreenFlash("#FFFFFF", 30));
				breads = this.storedBreads;
				this.fuse = null;
				this.returnNeutral();
			}
		}
	}
	startPressure() {
		this.updateEx = this.updatePressure;
		this.dotDelayMax = 2;
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
		this.updateDOT();
	}
	stopPressure() {
		this.returnNeutral();
		this.currentBenchmark = null;
		this.dotDelayMax = 4;
		stage.delay = stage.delayAfterPressure;
		stage.breadPopper = this.storedBreadPopper;
	}
}

WaterTreant.prototype.lName = "watertreant-name";
WaterTreant.prototype.lDesc = "watertreant-desc";
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

WaterTreant.prototype.dotDelay = 1;
WaterTreant.prototype.dotDelayMax = 6;
WaterTreant.prototype.fuseBase = 450;

//------------------------------------------------------------------ Hand
class WaterTreantHand extends Boss {
	constructor(diffMult, isRight) {
		super(diffMult);
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
	update() {
		this.x += this.dx;
		this.y += this.dy;
		var rdx = (this.centerx-this.x) * this.velreturn;
		var rdy = (this.centery-this.y) * this.velreturn;
		this.dx = (this.dx-rdx) * this.velstay + rdx;
		this.dy = (this.dy-rdy) * this.velstay + rdy;
		return true;
	}
	draw() {
		//this.drawHPBar();
		ctx.globalAlpha = 1;
		drawSprite(this.sprites.palm, this.x, this.y, 1/2, 1/2);
		this.digits.forEach(oj=>oj.draw());
	}
	chargeUp(countdown) {
		var portion = Math.max(0, 1 - Math.sqrt(Math.pow(this.x-this.centerx, 2) + Math.pow(this.y-this.centery, 2)) / (SIZE / 1.7));
		console.log(portion);
		var chargeAmount = PRound(portion * this.maxDamagePerRing);
		this.punchDamage += chargeAmount;
		faders.push(new TextFader(countdown, this.x, this.y));
		//console.log(new TextFader(countdown, this.x, this.y))
		playSFX("charge");
	}
	unleashPunch() {
		stage.hurtImpact(this.punchDamage);
		playSFX("hurt");
		faders.push(new TextFader("-"+this.punchDamage, this.x, this.y));
	}
	addToFaders() {
		this.dy = 0;
		faders.push(this);
		this.digits.forEach((oj)=>oj.addToFaders());
	}
	drawAfter() {
		ctx.globalAlpha = 1;
		drawSprite(this.sprites.palm, this.x, this.y, 1/2, 1/2);
		this.dy += .04;
		this.y += this.dy;
		return this.y-this.height/2 <= SIZE;
	}
	checkHit(staplex, stapley, hitTree, collTree) {
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
}
WaterTreantHand.prototype.name = "watertreanthand-name";
WaterTreantHand.prototype.description = "watertreanthand-desc";
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
WaterTreantHand.prototype.maxDamagePerRing = 150;
WaterTreantHand.prototype.collides = genCollidesRect(1);

//------------------------------------------------------------------ Neutral
//SubRolls and Hardtacks. Water Blasts fall down periodically.

//------------------------------------------------------------------ Orbiting Blasts
//Several orbiting blasts with different orbiting radius and speed; hit them to shrink their radius down to the distance from the center that you hit them. After a set time, they explode and deal damage proportional to their radius.

//------------------------------------------------------------------ Centered Fist
//Fist is int center. Hit it to launch it away like hardtack. The further it is, the more it wants to return.

//------------------------------------------------------------------ Pressure
//Extremely high delay, screen obscured, continual damage, no blasts, ends when below certain HP.

class WaterBlast {
	
}

class OrbitingBlast extends WaterBlast {
	constructor(orbitRadius, orbitOmega, orbitTheta = Math.random()*2*Math.PI) {
		super();
		this.orbitRadius = orbitRadius;
		this.orbitOmega = orbitOmega;
		this.orbitTheta = orbitTheta;
	}
	update() {
		this.move();
		if (this.detonated) {
			//console.log("butt")
			this.explode();
			return false;
		} else {
			return true;
		}
	}
	move() {
		this.orbitTheta += this.orbitOmega;
		this.x = SIZE/2 + this.orbitRadius * Math.cos(this.orbitTheta);
		this.y = SIZE/2 + this.orbitRadius * Math.sin(this.orbitTheta);
	}
	draw() {
		this.hoverSpriteIndex = Math.floor(Math.random()*this.numHoverSprites);
		drawSprite(this.sprites["hover"+this.hoverSpriteIndex], this.x, this.y, .5, .5);
	}
	checkHit(staplex, stapley, hitTree, collTree) {
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
	detonate() {
		this.detonated = true;
	}
	explode() {
		var damage = Math.floor(this.baseDamage);
		stage.hurtImpact(damage);
		playSFX("hurt");
		faders.push(this);
		this.drawAfter = this.drawAfterExploded;
		faders.push(new TextFader("-"+damage, this.x, this.y));
	}
	drawAfterExploded() {
		ctx.globalAlpha = this.fade;
		this.radius += 1;
		ctx.fillStyle = "#000040";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
		this.fade -= 1/30;
		return (this.fade > 0);
	}
	drawAfterDisarmed() {
		ctx.globalAlpha = this.fade;
		drawSprite(this.sprites["hover"+this.hoverSpriteIndex], this.x, this.y, .5, .5);
		this.fade -= 1/30;
		return (this.fade > 0);
	}
	drawAfter() {
		this.drawAfterDisarmed();
	}
}

OrbitingBlast.prototype.name = "Orbiting Blast";
OrbitingBlast.prototype.sprites = makeSprites("src/bosssprites/waterblast.png", {
	"hover0":{x:0,y:0,width:36,height:36},"hover1":{x:36,y:0,width:36,height:36},"hover2":{x:72,y:0,width:36,height:36},"hover3":{x:108,y:0,width:36,height:36},"hover4":{x:144,y:0,width:36,height:36},"hover5":{x:180,y:0,width:36,height:36},"hover6":{x:216,y:0,width:36,height:36},"hover7":{x:252,y:0,width:36,height:36},
	"hover8":{x:0,y:36,width:36,height:36},"hover9":{x:36,y:36,width:36,height:36},"hover10":{x:72,y:36,width:36,height:36},"hover11":{x:108,y:36,width:36,height:36},"hover12":{x:144,y:36,width:36,height:36},"hover13":{x:180,y:36,width:36,height:36},"hover14":{x:216,y:36,width:36,height:36},"hover15":{x:252,y:36,width:36,height:36},
	"hover16":{x:0,y:72,width:36,height:36},"hover17":{x:36,y:72,width:36,height:36},"hover18":{x:72,y:72,width:36,height:36},"hover19":{x:108,y:72,width:36,height:36},"hover20":{x:144,y:72,width:36,height:36},"hover21":{x:180,y:72,width:36,height:36},"hover22":{x:216,y:72,width:36,height:36},"hover23":{x:252,y:72,width:36,height:36},
	"hover24":{x:0,y:108,width:36,height:36},"hover25":{x:36,y:108,width:36,height:36},"hover26":{x:72,y:108,width:36,height:36},"hover27":{x:108,y:108,width:36,height:36},"hover28":{x:144,y:108,width:36,height:36},"hover29":{x:180,y:108,width:36,height:36},"hover30":{x:216,y:108,width:36,height:36},"hover31":{x:252,y:108,width:36,height:36},
});
OrbitingBlast.prototype.numHoverSprites = 32;
OrbitingBlast.prototype.hoverSpriteIndex = 0;
OrbitingBlast.prototype.radius = 18;
OrbitingBlast.prototype.centerX = SIZE/2;
OrbitingBlast.prototype.centerY = SIZE/2;
OrbitingBlast.prototype.fade = 1;
OrbitingBlast.prototype.baseDamage = 150;
OrbitingBlast.prototype.collides = genCollidesCircle(0);