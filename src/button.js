class Button {
	constructor(x, y, width, height, text, action = doNothing) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.text = text;
		this.action = action;
	}
	draw() {
		ctx.fillStyle = "#eeeeee";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		drawText(this.text, this.x+this.width/2, this.y+3, 1/2);
	}
	checkClick(x, y) {
		if (x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height) {
			this.click();
			return true;
		}
	}
	click() {
		//console.log("clicked");
		playSFX("staple");
		this.action();
	}
}

class TextButton extends Button {
	constructor(text, action, x, y, xoff=.5, yoff=0) {
		var width = text.length*TEXT_WIDTH+6;
		var height = TEXT_HEIGHT+6;
		super(Math.round(x - width*xoff), Math.floor(y - height*yoff), width, height, text, action);
	}
}

class IconButton extends Button {
	constructor(image, action, x, y, xoff=0, yoff=0) {
		super(Math.round(x - image.width*xoff), Math.floor(y - image.height*yoff), image.width, image.height, "", action);
		this.image = image;
	}
	draw() {
		drawSprite(this.image, this.x+this.width/2, this.y+this.height/2, .5, .5);
	}
}