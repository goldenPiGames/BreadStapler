function BGUnderwater() {
	
}
BGUnderwater.prototype.image = makeImage("src/backgrounds/pelagic.png");
BGUnderwater.prototype.draw = function() {
	drawSprite(this.image, 0, 0, 0, 0);
}