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
		e.preventDefault();
		makeClick(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
	});
}

function makeClick(clientX, clientY) {
	var rect = canvas.getBoundingClientRect();
	var adjX = (clientX-rect.left)*canvas.width/rect.width;
	var adjY = (clientY-rect.top)*canvas.height/rect.height;
	runnee.click(adjX, adjY);
}