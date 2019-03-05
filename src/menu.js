function Button(x, y, width, height, text, action = doNothing) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.action = action;
}
Button.prototype.draw = function() {
	ctx.fillStyle = "#eeeeee";
	ctx.fillRect(this.x, this.y, this.width, this.height);
	/*ctx.fillStyle = "#111111";
	ctx.textAlign = "center";
    ctx.textBaseline = "middle";
	ctx.font = (this.height-4)+"px sans-serif";
	ctx.fillText(this.text, this.x+this.width/2, this.y+this.height/2);*/
	drawText(this.text, this.x+this.width/2, this.y+3, 1/2);
	//console.log("bum");
}
Button.prototype.checkClick = function(x, y) {
	if (x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height)
		this.click();
}
Button.prototype.click = function() {
	//console.log("clicked");
	this.action();
}

var mainMenu = {
	buttons : [
		new Button(SIZE/3, SIZE/2, SIZE/3, 40, "BEGIN", function(){startGame()}),
	],
	update : doNothing,
	draw : function() {
		//ctx.fillStyle = "#eeeeee";
		//ctx.fillRect(10, 10, 20, 20);
		this.buttons.forEach(oj=>oj.draw());
	},
	click : function(x, y) {
		this.buttons.forEach(oj=>oj.checkClick(x, y));
	},
}
