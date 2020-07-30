function toMainMenu() {
	runnee = new MainMenu();
}

class MainMenu {
	constructor() {
		loadHiscores();
		this.buttons = [
			new Button(SIZE/4, SIZE/2, SIZE/2, TEXT_HEIGHT+6, lg("mainmenu-play"), ()=>WORLDS[0].hiscore ? runnee = new WorldSelect() : startWorld(0)),
			new Button(SIZE/4, SIZE/2+TEXT_HEIGHT*3/2, SIZE/2, TEXT_HEIGHT+6, lg("mainmenu-instructions"), function(){instructionsScreen.begin()}),
			new Button(SIZE/4, SIZE/2+TEXT_HEIGHT*6/2, SIZE/2, TEXT_HEIGHT+6, lg("mainmenu-jukebox"), ()=>runnee=new Jukebox()),
			new Button(SIZE/4, SIZE/2+TEXT_HEIGHT*9/2, SIZE/2, TEXT_HEIGHT+6, lg("mainmenu-settings"), function(){settingsScreen.begin()}),
			new Button(SIZE/4, SIZE/2+TEXT_HEIGHT*12/2, SIZE/2, TEXT_HEIGHT+6, lg("mainmenu-credits"), function(){creditsScreen.begin()}),
		];
	}
	update() {
		
	}
	begin() {
		runnee = this;
	}
	draw() {
		drawText(lg("title"), SIZE/2, 30, 1/2);
		drawParagraph(lg("mainmenu-subtitle"), 3, TEXT_HEIGHT+35, SIZE);
		this.buttons.forEach(oj=>oj.draw());
	}
	click(x, y) {
		this.buttons.forEach(oj=>oj.checkClick(x, y));
	}
}

class WorldSelect {
	constructor() {
		loadHiscores();
		this.returnButton = new TextButton("BACK", toMainMenu, SIZE - 10, SIZE - 10, 1, 1);
		this.worldSelectors = WORLDS.map((oj, dex) => new WorldSelector(oj, dex*WorldSelector.prototype.height));
	}
	update() {
		
	}
	draw() {
		this.returnButton.draw();
		this.worldSelectors.forEach(oj => oj.draw());
	}
	click(x, y) {
		this.returnButton.checkClick(x, y);
		this.worldSelectors.forEach(oj => oj.checkClick(x, y));
	}
}

class WorldSelector {
	constructor(warudo, y) {
		this.warudo = warudo;
		this.y = y;
		this.textTop = "WORLD "+warudo.index+": "+lg(warudo.lName);
		this.textBottomRight = warudo.hiscore || "-";
		this.color = warudo.color;
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		drawText(this.textTop, 3, this.y+3, 0, 0);
		drawText(this.textBottomRight, SIZE-3, this.y+3+TEXT_HEIGHT, 1, 0);
	}
	checkClick(x, y) {
		if (y >= this.y && y < this.y + this.height) {
			playSFX("staple");
			startWorld(this.warudo);
		}
	}
}
WorldSelector.prototype.x = 0;
WorldSelector.prototype.width = SIZE;
WorldSelector.prototype.height = TEXT_HEIGHT*2 + 6;