
function Staple(x, y, t = 0, ) {
	this.x = x;
	this.y = y;
	this.t = t;
}
Staple.prototype.name = lg("staple-name");
Staple.prototype.description = lg("staple-desc");
Staple.prototype.sprites = makeSprites("src/staplesheet.png", {
	thunked : {x:0, y:0, width:10, height:3},
});
Staple.prototype.update = function() {
	var thisser = this;
	if (this.t > 0) {
		this.t--;
		return true;
	} else {
		this.hit();
		return false;
	}
}
Staple.prototype.hit = function() {
	var thisser = this;
	var hitTree = null;
	var collTree = 0;
	trees.forEach(function(oj) {
		var coll = oj.collides(thisser.x, thisser.y);
		if (coll) {
			hitTree = oj;
			collTree = coll;
		}
	});
	accTotal ++;
	breads = breads.filter(oj => oj.checkHit(thisser.x, thisser.y, hitTree, collTree));
	//var afterBreads = [];
	/*breads.forEach(function(oj, dex) {
		var remove = oj.checkHit(thisser.x, thisser.y, hitTree, collTree);
		if (!remove)
			afterBreads.push(oj);
	});*/
	//breads = afterBreads;
	if (hitTree) {
		hitTree.affix(this);
		playSFX("staple");
	}
	return false;
}
Staple.prototype.fade = 1;
Staple.prototype.draw = function() {
	drawSprite(this.sprites["thunked"], this.x, this.y, 1/2, 1/2);
	this.fade -= 1/40;
	return (this.fade > 0);
}
Staple.prototype.drawAfter = function() {
	ctx.globalAlpha = this.fade;
	drawSprite(this.sprites["thunked"], this.x, this.y, 1/2, 1/2);
	this.fade -= 1/40;
	return (this.fade > 0);
}


