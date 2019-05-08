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
		setTimeout(function(){thisser.run()}, Math.max(0, desiredTime-Date.now()));
	},
}