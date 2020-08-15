class Bagel extends BreadBase {
	constructor() {
		super();
		this.reset();
	}
	move() {
		this.otheta += this.oomega;
		this.cx += this.cdx;
		this.cy += this.cdy;
		//console.log(this.cx, this.oradius, this.otheta, Math.cos(this.otheta))
		this.x = this.cx + this.oradius * Math.cos(this.otheta);
		this.y = this.cy + this.oradius * Math.sin(this.otheta);
	}
	reset() {
		var side = Math.random() >= .5;
		this.otheta = (.5 + (side?-1:1) * Math.random()) * Math.PI;
		this.oomega = (Math.random()>=.5?1:-1) * .03;
		this.cy = SIZE * (.25 + Math.random()*.5);
		this.cdy = .5 * (Math.random()-.5);
		this.cx = side ? SIZE+this.radius : -this.radius;
		this.cdx = (side?-1:1) * .5;
		return this;
	}
	checkHit(staplex, stapley, hitTree, collTree) {
		var coll = this.collides(staplex, stapley);
		if (coll >= 1 - this.innerRadius / this.radius) {
			accHits ++;
			var punt = this.holeBonus;
			stage.pointsBonus(punt);
			faders.push(new TextFader("+"+punt, this.x, this.y));
			return false;
		} else if (coll) {
			if (hitTree) {
				accHits ++;
				var punt = this.getPoints(1, collTree);
				stage.pointsBread(punt);
				faders.push(new TextFader("+"+punt, this.x, this.y));
				hitTree.affix(this, punt);
			} else {
				stage.breadFell(this);
			}
			return false;
		} else {
			return true;
		}
	}
	hasFallen() {
		//return ((this.cx >= SIZE+this.oradius+this.radius) || (this.cx <= -this.oradius-this.radius));
		return ((this.cdx >= 0 && this.x >= SIZE+this.radius) || (this.cdx <= 0 && this.x <= -this.radius));
	}
}
Bagel.prototype.collides = genCollidesCircle(0);
Bagel.prototype.lName = "bagel-name";
Bagel.prototype.lDesc = "bagel-desc";
Bagel.prototype.image = makeImage("src/breadsprites/bagel.png"); //https://www.google.com/search?tbm=isch&q=bagel&tbs=imgo:1#imgrc=_tZfm9wGkuzupM https://www.bjs.com/product/wellsley-farms-plain-bagels-6-ct/3000000000000465870
Bagel.prototype.innerRadius = 5;
Bagel.prototype.radius = 18;
Bagel.prototype.oradius = 69;
Bagel.prototype.maxPoints = 180;
Bagel.prototype.holeBonus = 240;