
function Staple(x, y, t = 0) {
	this.x = x;
	this.y = y;
	this.t = t;
	this.tt = t;
}
Staple.prototype.name = lg("staple-name");
Staple.prototype.description = lg("staple-desc");
Staple.prototype.sprites = makeSprites("src/staplesheet.png", {
	thunked : {x:0, y:0, width:10, height:3},
	//flying : {X:0, y: },
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
	faders.push(this);
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
Staple.prototype.draw = function() {
	var z = (this.t/this.tt*10) || 0;
	if (z <= 0) {
		drawSprite(this.sprites["thunked"], this.x, this.y, 1/2, 1/2);
	} else {
		ctx.fillStyle = "#808080";
		ctx.fillRect(this.x-5-z/2, this.y-1.5+z, 10+z, 3);
		ctx.fillStyle = "#FF000080";
		ctx.fillRect(this.x-1, this.y-1, 2, 2);
	}
}
Staple.prototype.fade = 1;
Staple.prototype.drawAfter = function() {
	ctx.globalAlpha = this.fade;
	drawSprite(this.sprites["thunked"], this.x, this.y, 1/2, 1/2);
	//console.log(this.fade)
	this.fade -= 1/40;
	return (this.fade > 0);
}


