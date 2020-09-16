function BGForest() {
	
}
BGForest.prototype.image = makeImage("src/backgrounds/forest.png");
BGForest.prototype.draw = function() {
	drawSprite(this.image, 0, 0, 0, 0);
}