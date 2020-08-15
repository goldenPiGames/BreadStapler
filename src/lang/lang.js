const LANG = {};

//TRANSLATORS: To add another language, put another term in this array.
const LANGUAGES = ["en", "es"];

function lg(name) {
	var got = LANG[settings.lang][name] || LANG.en[name];
	if (!got) {
		throwMaybe(name + " could not be found in lang");
		return undefined;
	}
	return got;
}