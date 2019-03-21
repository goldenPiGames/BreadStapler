var creditsScreen = {
	returnButton : new TextButton("BACK", function(){mainMenu.begin()}, SIZE - 10, SIZE - 10, 1, 1),
	begin : function() {
		switchScreen(this);
	},
	update : doNothing,
	draw : function() {
		this.returnButton.draw();
	},
	click : function(x, y) {
		this.returnButton.checkClick(x, y);
	},
}

function CreditsLine(text, adjust) {
	this.text = text;
	this.adjust = adjust;
}

const CREDITS_LIST = [
	new CreditsLine("Programming, Design", 1/2),
	new CreditsLine("Concept, Story", 1/2),
	new CreditsLine("goldenPiGames", 0),
	new CreditsLine("(u/Prexot)", 0),
]
/*"Inspiration"
 "r/BreadStapledToTrees"
"Music"
"Darren Curtis"
 "Tempest"
"Peritune"
 "Let's Party 2"
 "Strategy 3"
 "Demise"
"Ucchii0"
 "Don't Sleep"
 "Seiiki Kessen"

"Special Thanks"
 "Wikipedia"
 "You"
}
]*/