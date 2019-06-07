var runnee;
const FPS = 60;
var coreInterval;
var coreEngine = {
    frameDelay : 1000 / FPS,
	start : function() {
		//console.log("starting");
		//coreInterval = setInterval(function(){coreEngine.run()}, 1000/FPS);
		this.run();
	},
	run : function() {
		var desiredTime = Date.now() + this.frameDelay;
		var thisser = this;
		//musicLoopCheck();
		runnee.update();
		clearBack();
		runnee.draw();
		var until = desiredTime - Date.now();
		//console.log(until);
		//console.log(until);
		if (until > 0) {
			setTimeout(function(){thisser.run()}, until);
		} else {
			//console.log("lagging by " + (desiredTime-Date.now()));
			this.run();
		}
	},
}