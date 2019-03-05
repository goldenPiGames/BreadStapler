//mouse
var mouse = {x:0,y:0,clicked:false,down:false,
	unClick : function() {
		this.clicked = false;
		this.wasPressed = this.pressed;
		this.lastX = this.x;
		this.lastY = this.y;
	}
}

function addEvents() {
	eventCatcher.addEventListener("mousedown", function(e) {
		makeClick(e.offsetX, e.offsetY);
	});
	eventCatcher.addEventListener("touchstart", function(e) {
		makeClick(e.x, e.y);
	});
}

function makeClick(x, y) {
	var adjx = x * canvas.width / parseInt(canvas.style.width);
	var adjy = y * canvas.width / parseInt(canvas.style.width);
	//console.log(adjx, adjy);
	runnee.click(adjx, adjy);
}