const OPTIONS_LIST = [
	{
		name : "lang",
		title : "Language",
		type : "choices",
		//default : "en",
		default : (navigator.userLanguage || navigator.language || "en-US").substr(0, 2),
		choices : [
			{name : "en", title : "English"},
			{name : "es", title : "Español"},
		]
	},
	{
		name : "music",
		title : "Music",
		type : "portion",
		default : 8/10,
		steps : 10,
		func : "setMusicVolume",
	},
	{
		name : "sfx",
		title : "SFX",
		type : "portion",
		default : 8/10,
		steps : 10,
		func : "setSFXVolume",
	},
	{
		name : "stay",
		title : "Stay",
		type : "portion",
		default : 1/2,
		steps : 10,
	},
	{
		name : "hudalpha",
		title : "HUD",
		type : "portion",
		default : .7,
		steps : 10,
	},
]

var settings;

function loadSettings() {
	settings = JSON.parse(localStorage.getItem("settings")) || {};
	OPTIONS_LIST.forEach(function(oj) {
		if (settings[oj.name] == undefined) {
			settings[oj.name] = oj.default;
		}
	});
}

function applySettings() {
	setMusicVolume(settings.music);
	setSFXVolume(settings.sfx);
}

function saveSettings() {
	localStorage.setItem("settings", JSON.stringify(settings));
}

loadSettings();