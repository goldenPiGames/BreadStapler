function BGSyncGreen() {
	
}
BGSyncGreen.prototype = Object.create(BGSync);
BGSyncGreen.prototype.draw = function() {
	ctx.fillStyle = "#33EE44";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}