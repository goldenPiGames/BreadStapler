function BGClearSky() {
	
}
BGClearSky.prototype.draw = function() {
	ctx.fillStyle = "#55AAEE";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function BGCloudySky() {
	
}
BGCloudySky.prototype.draw = function() {
	ctx.fillStyle = "#5588CC";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}