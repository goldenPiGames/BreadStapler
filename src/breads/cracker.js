class Hardtack extends BreadBase {
	constructor() {
		super();
		this.reset();
	}
	reset() {
		if (!this.x || this.x < this.width/2 || this.x > SIZE-this.width/2) {
			var x = 0;
			var i = 0;
			var tol = this.width/2;
			var clear = false;
			while (!clear && i < 10) {
				tol = this.width/2 + 50 - 5*i;
				x = 20 + (SIZE-40)*Math.random();
				clear = true;
				trees.forEach(function(oj) {
					//console.log(x+tol, oj.x-oj.width/2, x-tol, oj.x+oj.width/2, x+tol > oj.x-oj.width/2 && x-tol < oj.x+oj.width/2);
					if (x+tol > oj.x-oj.width/2 && x-tol < oj.x+oj.width/2) {
						clear = false;
					}
				});
				i++;
			}
			this.x = x;
		}
		this.y = -this.height/2;
		//this.dx = 0;
		this.dy = this.sinkdy;
		return this;
	}
	move() {
		this.x += this.dx;
		this.y += this.dy;
		this.dx = this.dx * this.velstay;
		this.dy = (this.dy-this.sinkdy) * this.velstay + this.sinkdy;
	}
	checkHit(staplex, stapley, hitTree, collTree) {
		var coll = this.collides(staplex, stapley);
		if (coll) {
			if (hitTree) {
				accHits ++;
				var punt = this.getPoints(coll, collTree);
				stage.pointsBread(punt);
				faders.push(new TextFader("+"+punt, this.x, this.y));
				hitTree.affix(this, punt);
				return false;
			} else {
				accHits ++;
				this.dx = -this.velhit * (staplex-this.x);
				this.dy = -this.velhit * (stapley-this.y) - 1;
				this.timesHit++;
				playSFX("pushhit");
				return true;
			}
		} else {
			return true;
		}
	}
	getPoints(bcoll, tcoll) {
		return Math.ceil(this.maxPoints * bcoll * tcoll * this.pointHitDecay/(this.pointHitDecay+this.timesHit));
	}
}
Hardtack.prototype.lName = "hardtack-name";
Hardtack.prototype.lDesc = "hardtack-desc";
Hardtack.prototype.image = makeImage("src/breadsprites/hardtack.png");
Hardtack.prototype.collides = genCollidesRect(BREAD_EDGE_MULT);
Hardtack.prototype.width = 34;
Hardtack.prototype.height = 30;
Hardtack.prototype.dx = 0;
Hardtack.prototype.sinkdy = .75;
Hardtack.prototype.dy = 0;
Hardtack.prototype.velstay = .95;
Hardtack.prototype.velhit = .22;
Hardtack.prototype.timesHit = 0;
Hardtack.prototype.maxPoints = 400;
Hardtack.prototype.pointHitDecay = 16;