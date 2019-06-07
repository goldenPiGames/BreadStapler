function ScreenFlash(color, faderate) {
	this.color = color;
	this.faderate = Math.min(faderate, 1/faderate);
}
ScreenFlash.prototype.fade = 1;
ScreenFlash.prototype.drawAfter = function() {
	ctx.globalAlpha = this.fade;
	ctx.fillStyle = this.color;
	ctx.fillRect(0, 0, SIZE, SIZE);
	this.fade -= this.faderate;
	return (this.fade > 0);
}