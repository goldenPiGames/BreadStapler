const CREDITS_SPEED = 5;

class CreditsScreen {
	constructor() {
		this.returnButton = new TextButton("BACK", toMainMenu, SIZE, SIZE, 1, 1);
		this.list = [
			new CreditsLine(lg("credits-me1"), 1/2),
			new CreditsLine(lg("credits-me2"), 1/2),
			new CreditsLine("goldenPiGames", 0),
			new CreditsLine("(u/Prexot)", 1/8),
			new CreditsLine(),
			new CreditsLine(lg("credits-bstttitle"), 1/2),
			new CreditsLine("r/BreadStapledToTrees", 0),
			new CreditsLine(),
			//new CreditsLine("Trailer", 1/2),
			//new CreditsLine("OwlTowel", 0),
			//new CreditsLine("(u/Owl_Towels)", 1/8),
			new CreditsLine(),
			new CreditsLine(lg("credits-music"), 1/2),
		]
		for (var tist in MUSIC_BY_ARTIST) {
			this.list.push(new CreditsLine(tist, 0));
			MUSIC_BY_ARTIST[tist].forEach((oj) => {
				this.list.push(new CreditsLine(oj, 1));
			});
		}
	}
	begin() {
		runnee = this;
		this.offset = SIZE;
	}
	update() {
		this.offset -= 1;
	}
	draw() {
		var y = this.offset;
		this.list.forEach(function(oj, dex) {
			y += TEXT_HEIGHT;
			oj.draw(y);
		});
		if (!(y > -TEXT_HEIGHT))
			this.offset = SIZE;
		this.returnButton.draw();
	}
	click(x, y) {
		this.returnButton.checkClick(x, y);
	}
}

class CreditsLine {
	constructor(text, align) {
		if (!text)
			this.text = ""; 
		else if (text.length > SIZE/TEXT_WIDTH)
			this.text = text.substr(0, Math.floor(SIZE/TEXT_WIDTH)-1) + "…";
		else
			this.text = text;
		this.align = align;
	}
	draw(y) {
		//console.log(this.text, SIZE*this.align, y, this.align);
		drawText(this.text, SIZE*this.align, y, this.align);
	}
}