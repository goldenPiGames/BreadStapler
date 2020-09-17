function pauseGame() {
	if (!(runnee instanceof PauseScreen) && !(runnee instanceof SettingsScreen)) {
		runnee = new PauseScreen(runnee);
	}
}

class PauseScreen {
	constructor(returnTo) {
		this.returnTo = returnTo;
		this.returnButton = new Button(SIZE/3, SIZE*2/3, SIZE/3, TEXT_HEIGHT+6, lg("pause-resume"), ()=>this.resume());
	}
	update() {
		
	}
	draw() {
		drawText(lg("pause-title"), SIZE/2, SIZE/3, 1/2);
		this.returnButton.draw();
	}
	click(x, y) {
		this.returnButton.checkClick(x, y);
	}
	resume() {
		runnee = this.returnTo;
	}
}

const PAUSE_BUTTON_SIZE = 50;;

class PauseButton extends Button {
	constructor(xoff, yoff) {
		super((SIZE-PAUSE_BUTTON_SIZE)*xoff, (SIZE-PAUSE_BUTTON_SIZE)*yoff, PAUSE_BUTTON_SIZE, PAUSE_BUTTON_SIZE, "||", pauseGame);
	}
	draw() {
		ctx.globalAlpha = .5;
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(this.x+this.width*.1, this.y+this.height*.1, this.width*.3, this.height*.8);
		ctx.fillRect(this.x+this.width*.6, this.y+this.height*.1, this.width*.3, this.height*.8);
	}
}