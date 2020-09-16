function genCollidesRect(edgeVal) {
	return function(x, y) {
		var xoff = Math.floor(Math.abs(x - this.x));
		var yoff = Math.floor(Math.abs(y - this.y));
		if (xoff > this.width/2 || yoff > this.height/2)
			return false;
		return 1-Math.max(xoff/this.width, yoff/this.height)*2*(1-edgeVal);
	}
}

function genCollidesRectHoriz(edgeVal) {
	return function(x, y) {
		var xoff = Math.floor(Math.abs(x - this.x));
		var yoff = Math.floor(Math.abs(y - this.y));
		if (xoff > this.width/2 || yoff > this.height/2)
			return false;
		return 1-xoff/this.width*2*(1-edgeVal);
	}
}

function genCollidesPillar(edgeVal) {
	return function(x, y) {
		var xoff = Math.floor(Math.abs(x - this.x));
		if (xoff > this.width/2)
			return false;
		return 1-(xoff/this.width)*2*(1-edgeVal);
	}
}

function genCollidesCircle(edgeVal) {
	return function(x, y) {
		var roff = Math.floor(Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)));
		if (roff > this.radius)
			return false;
		return 1-roff/this.radius*(1-edgeVal);
	}
}