const CREDITS_SPEED = 5;

var creditsScreen = {
	returnButton : new TextButton("BACK", toMainMenu, SIZE, SIZE, 1, 1),
	begin : function() {
		runnee = this;
		this.offset = SIZE;
	},
	update : function() {
		this.offset -= 1;
	},
	draw : function() {
		var y = this.offset;
		CREDITS_LIST.forEach(function(oj, dex) {
			y += TEXT_HEIGHT;
			oj.draw(y);
		});
		if (!(y > -TEXT_HEIGHT))
			this.offset = SIZE;
		this.returnButton.draw();
	},
	click : function(x, y) {
		this.returnButton.checkClick(x, y);
	},
}

function CreditsLine(text, align) {
	if (!text)
		this.text = ""; 
	else if (text.length > SIZE/TEXT_WIDTH)
		this.text = text.substr(0, Math.floor(SIZE/TEXT_WIDTH)-1) + "…";
	else
		this.text = text;
	this.align = align;
}
CreditsLine.prototype.draw = function(y) {
	//console.log(this.text, SIZE*this.align, y, this.align);
	drawText(this.text, SIZE*this.align, y, this.align);
}

const CREDITS_LIST = [
	new CreditsLine("Programming, Design,", 1/2),
	new CreditsLine("Concept, Story, etc.", 1/2),
	new CreditsLine("goldenPiGames", 0),
	new CreditsLine("(u/Prexot)", 1/8),
	new CreditsLine(),
	new CreditsLine("Inspiration", 1/2),
	new CreditsLine("r/BreadStapledToTrees", 0),
	new CreditsLine(),
	new CreditsLine("Trailer", 1/2),
	new CreditsLine("OwlTowel", 0),
	new CreditsLine("(u/Owl_Towels)", 1/8),
	new CreditsLine(),
	new CreditsLine("Music", 1/2),
]
for (tist in MUSIC_BY_ARTIST) {
	CREDITS_LIST.push(new CreditsLine(tist, 0));
	MUSIC_BY_ARTIST[tist].forEach(function(oj) {
		CREDITS_LIST.push(new CreditsLine(oj, 1));
	});
}