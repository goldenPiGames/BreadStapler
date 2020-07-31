var breads;
const BREAD_EDGE_MULT = .75;

class BreadBase {
	update() {
		this.move();
		if (this.hasFallen()) {
			stage.breadFell(this);
			return false;
		} else {
			return true;
		}
	}
	move() {
		this.x += this.dx;
		this.y += this.dy;
		this.dy += this.g;
	}
	draw() {
		drawSprite(this.image, this.x, this.y, 1/2, 1/2);
	}
	drawAfter() {
		ctx.globalAlpha = this.fade;
		this.draw();
		this.fade -= 1/40;
		return (this.fade > 0);
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
			} else {
				stage.breadFell(this);
			}
			return false;
		} else {
			return true;
		}
	}
	/*collides(x, y) {
		var xoff = Math.floor(Math.abs(x - this.x));
		var yoff = Math.floor(Math.abs(y - this.y));
		if (xoff > this.width/2 || yoff > this.height/2)
			return false;
		return 1-Math.max(xoff/this.width, yoff/this.height)*2*(1-BREAD_EDGE_MULT);
	},*/
	hasFallen() {
		return (this.y >= SIZE+50 || (this.dx >= 0 && this.x >= SIZE+50) || (this.dx <= 0 && this.x <= -50))
	}
	getPoints(bcoll, tcoll) {
		return Math.ceil(this.maxPoints * bcoll * tcoll);
	}
}
BreadBase.prototype.collides = genCollidesRect(BREAD_EDGE_MULT);
BreadBase.prototype.isBread = true;
BreadBase.prototype.fade = 1;