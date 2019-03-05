var breads;

const BreadBase = {
	isBread : true,
	update : function() {
		this.move();
	},
	move : function() {
		this.x += this.dx;
		this.y += this.dy;
		this.dy += this.g;
	},
	draw : function() {
		drawSprite(this.image, this.x, this.y, 1/2, 1/2);
	},
	drawAfter : function() {
		ctx.globalAlpha = this.fade;
		this.draw();
		drawText("+"+this.gotPoints, this.x, this.y-TEXT_HEIGHT/2, 0.5);
		this.fade -= 1/40;
		return (this.fade > 0);
	},
	collides : function(x, y) {
		var xoff = Math.abs(x - this.x);
		var yoff = Math.abs(y - this.y);
		if (xoff > this.width/2 || yoff > this.height/2)
			return false;
		return 1-Math.max(xoff/this.width, yoff/this.height)/2; //100% in center, 75% on edge
	},
	getPoints : function(bcoll, tcoll) {
		return Math.ceil(this.maxPoints * bcoll * tcoll);
	},
	fade : 1,
}