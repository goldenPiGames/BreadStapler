const OPTIONS_LIST = [
	{
		id : "lang",
		lTitle : "settings-lang",
		type : "choices",
		//default : "en",
		default : (navigator.userLanguage || navigator.language || "en-US").substr(0, 2),
		choices : LANGUAGES.map(l => {return {id:l, lTitle:"lang-name"}}),
	},
	{
		id : "music",
		lTitle : "settings-music",
		type : "portion",
		default : 8/10,
		steps : 10,
		func : p=>setMusicVolume(p),
	},
	{
		id : "sfx",
		lTitle : "settings-sfx",
		type : "portion",
		default : 8/10,
		steps : 10,
		func : p=>setSFXVolume(p),
	},
	{
		id : "stretch",
		lTitle : "settings-stretch",
		type : "choices",
		default : "max2",
		choices : [
			{id : "always", lTitle : "settings-stretch-always"},
			{id : "max2", lTitle : "settings-stretch-max2"},
		],
		func : ()=>fitCanvas(),
	},
	{
		id : "stay",
		lTitle : "settings-stay",
		type : "portion",
		default : 1/2,
		steps : 10,
	},
	{
		id : "hudalpha",
		lTitle : "settings-hudalpha",
		type : "portion",
		default : .7,
		steps : 10,
	},
]

var settings;

function loadSettings() {
	settings = JSON.parse(localStorage.getItem("settings")) || {};
	OPTIONS_LIST.forEach(function(oj) {
		if (settings[oj.id] == undefined) {
			settings[oj.id] = oj.default;
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