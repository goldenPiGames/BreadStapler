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
	drawText(this.text, this.x+this.width/2, this.y+3, 1/2);
}
Button.prototype.checkClick = function(x, y) {
	if (x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height)
		this.click();
}
Button.prototype.click = function() {
	//console.log("clicked");
	playSFX("staple");
	this.action();
}

function TextButton(text, action, x, y, xoff=.5, yoff=0) {
	this.text = text;
	this.width = this.text.length*TEXT_WIDTH+6;
	this.x = Math.round(x - this.width*xoff);
	this.y = Math.floor(y - this.height*yoff);
	this.action = action;
	//ctx.fillStyle = "#eeeeee";
	//ctx.fillRect(this.x, this.y, this.width, this.height);
	//drawText(this.text, this.x+this.width/2, this.y+3, 1/2);
}
TextButton.prototype = Object.create(Button.prototype);
TextButton.prototype.height = TEXT_HEIGHT+6;

function IconButton(image, action, x, y, xoff=0, yoff=0) {
	this.image = image;
	this.width = this.image.width;
	this.height = this.image.height;
	this.x = Math.round(x - this.width*xoff);
	this.y = Math.floor(y - this.height*yoff);
	this.action = action;
}
IconButton.prototype = Object.create(Button.prototype);
IconButton.prototype.draw = function() {
	drawSprite(this.image, this.x+this.width/2, this.y+this.height/2, .5, .5);
}