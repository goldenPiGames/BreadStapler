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
	"world-intro" : "INTRO",
	"world-green" : "GREEN",
}