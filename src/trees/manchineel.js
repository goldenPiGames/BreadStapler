class ManchineelTree extends TreeBase {
	constructor(x = SIZE/2, diffMult = 1) {
		super();
		this.x = x;
		this.fruitDelayMax = this.fruitDelayMaxBase / diffMult;
		this.fruitDelay = this.fruitDelayMax;
	}
	update() {
		//super.update();
		this.fruitDelay --;
		if (this.fruitDelay <= 0) {
			this.spawnFruit();
			this.fruitDelay += this.fruitDelayMax;
		}
	}
	affixEx(obj, punt) {
		//super.affix(obj);
		this.fruitDelay -= 60;
	}
	spawnFruit() {
		//var fruitOffsetMin = this.width/2 + ManchineelFruit.prototype.radius;
		playSFX("fall");
		breads.push(new ManchineelFruit(this.x + (Math.random()>.5 ? 1 : -1) * (this.width/2 + ManchineelFruit.prototype.radius + Math.random()*this.fruitOffsetRange)));
	}
}
ManchineelTree.prototype.lName = "manchineeltree-name";
ManchineelTree.prototype.lDesc = "manchineeltree-desc";
ManchineelTree.prototype.image = makeImage("src/treesprites/manchineel.png");
ManchineelTree.prototype.width = 80;
ManchineelTree.prototype.fruitDelayMaxBase = 300;
ManchineelTree.prototype.fruitOffsetRange = 100;

class ManchineelFruit extends BreadBase {
	constructor(x) {
		super();
		this.x = x;
		this.y = -1 - this.radius;
	}
	update() {
		this.move();
		if (this.y-this.radius > SIZE) {
			this.impact();
			return false;
		} else {
			return true;
		}
	}
	impact() {
		var punt = this.baseDamage;
		stage.hurtPoison(punt);
		playSFX("hurt");
		faders.push(new TextFader("-"+punt, this.x, Math.min(this.y, SIZE-45)));
	}
	/* move() {
		this.x += this.dx;
		this.y += this.dy;
		this.dy += this.g;
	} */
	/* draw() {
		drawSprite(this.image, this.x, this.y, 1/2, 1/2);
	} */
	/* drawAfter() {
		ctx.globalAlpha = this.fade;
		this.draw();
		this.fade -= 1/40;
		return (this.fade > 0);
	} */
	checkHit(staplex, stapley, hitTree, collTree) {
		var coll = this.collides(staplex, stapley);
		if (coll) {
			accHits ++;
			playSFX("fruithit");
			return false;
		} else {
			return true;
		}
	}
	collides = genCollidesCircle(BREAD_EDGE_MULT);
	/*collides(x, y) {
		var roff = Math.floor(Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)));
		if (roff > this.radius)
			return false;
		return 1-roff/this.radius*(1-BREAD_EDGE_MULT);
	}*/
	/*getPoints(bcoll, tcoll) {
		return Math.ceil(this.maxPoints * bcoll * tcoll);
	}*/
}
ManchineelFruit.prototype.lName = "manchineelfruit-name";
ManchineelFruit.prototype.description = "manchineelfruit-desc";
ManchineelFruit.prototype.image = makeImage("src/breadsprites/manchineel.png");
ManchineelFruit.prototype.radius = 17;
ManchineelFruit.prototype.g = .005;
ManchineelFruit.prototype.dx = 0;
ManchineelFruit.prototype.dy = 2;
ManchineelFruit.prototype.baseDamage = 150;