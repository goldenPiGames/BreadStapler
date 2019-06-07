var langjson;
if (settings.lang != "en") {
	try {
		var langresponse = /* await */ fetch("src/lang/"+settings.lang+".json");
		langjson = /* await */ response.json();
		console.log(langjson);
	} catch (err) {
		console.log(err);
	}
}

function lg(name) {
	if (langjson) {
		return langjson[name] || lang_en[name];
	} else {
		return lang_en[name];
	}
}

const lang_en = {
	"title" : "BREAD STAPLER",
	"mainmenu-subtitle" : "(Imagine some kind of cool logo here)",
	"world-intro" : "INTRO",
	"world-green" : "GREEN",
	"allbread" : "Staple All Bread",
	"allbread-desc" : "Staple all bread to the tree. Bread that falls off screen will return later. You cannot lose. Just go for a high score.",
	"greentreant-name" : "Green Treant",
	"greentreant-desc" : "A monstrous tree that seems to have some significance.",
	"lostscreen-head" : "STAGE LOST",
	"lostscreen-adjust" : "DIFFICULTY ADJUSTMENT",
	"lostscreen-this" : "THIS STAGE:",
	"lostscreen-future" : "FUTURE:",
	"lostscreen-retry" : "RETRY",
	"lostscreen-quit" : "MAIN MENU",
	"scene-next" : "NEXT",
	"scene-skip" : "SKIP",
	"greenend1" : "Thank you, young one, for purging The Blight from me.",
	"greenend2" : "You have done a great deed, but your mission is far from over.",
	"greenend3" : "I sense that all of the Guardian Treants have been claimed by The Blight.",
	"greenend4" : "You must cure them all before it is too late. Good luck.",
}
