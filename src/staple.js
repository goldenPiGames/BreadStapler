function Staple(x, y, t = 0, ) {
	this.x = x;
	this.y = y;
	this.t = t;
}
Staple.prototype.update = function() {
	var thisser = this;
	if (this.t > 0) {
		this.t--;
		return true;
	} else {
		accTotal ++;
		var hitBreads = [];
		var notHitBreads = [];
		breads.forEach(function(oj, dex) {
			var coll = oj.collides(thisser.x, thisser.y);
			if (coll) {
				hitBreads.push(oj);
				oj.coll = coll;
			} else {
				notHitBreads.push(oj);
				oj.coll = false;
			}
		});
		if (hitBreads.length <= 0) {
			faders.push(this);
			return false;
		}
		//console.log("hit");
		breads = notHitBreads;
		var hitTree = null;
		var collTree = 0;
		trees.forEach(function(oj) {
			var coll = oj.collides(thisser.x, thisser.y);
			if (coll) {
				hitTree = oj;
				collTree = coll;
			}
		});
		if (!hitTree) {
			hitBreads.forEach(oj => stage.breadFell(oj));
			faders.push(this);
			return false;
		}
		playSFX("staple");
		hitBreads.forEach(function(oj) {
			accHits ++;
			oj.gotPoints = oj.getPoints(oj.coll, collTree);
			stageScore += oj.gotPoints;
			faders.push(oj);
		});
		faders.push(this);
		return false;
	}
}
Staple.prototype.fade = 1;
Staple.prototype.drawAfter = function() {
	ctx.globalAlpha = this.fade;
	drawSprite(this.sprites["thunked"], this.x, this.y, 1/2, 1/2);
	this.fade -= 1/40;
	return (this.fade > 0);
}
Staple.prototype.sprites = makeSprites("src/staplesheet.png", {
	thunked : {x:0, y:0, width:10, height:3},
});