const MUSIC_LIST = [
	//{name:"Breeze",               by:"PeriTune",      yt:"RINkM_o-e4I", site:"https://peritune.com/breeze/"},
	{name:"Prairie",              by:"PeriTune",      yt:"iMkX3NxQYv0", site:"https://peritune.com/prairie/", sc:"sei_peridot/prairie"},
	{name:"Strategy 3",           by:"PeriTune",      yt:"tqS-DwicQCo", site:"https://peritune.com/strategy3/", sc:"sei_peridot/strategy3"},
	{name:"Havoc",                by:"PeriTune",      yt:"yfE5y2uiBX0", site:"https://peritune.com/havoc", sc:"sei_peridot/havoc", loopStart:4.304, loopEnd:112.101},
	{name:"Underwater Coolness",  by:"Eric Matyas", site:"https://soundimage.org/nature-science-3/"},
	{name:"War of the Pianos",    by:"Darren Curtis", yt:"CP8HoV4ArHw", site:"https://www.darrencurtismusic.com/piano", sc:"desperate-measurez/war-of-the-pianos-royalty-free"},
	{name:"Rapid",                by:"PeriTune",      yt:"pjc00EfBuKo", site:"https://peritune.com/rapid/", sc:"sei_peridot/rapid"},
	{name:"Rapid 4",              by:"PeriTune",      yt:"g3c-dHAI-ts", site:"https://peritune.com/rapid4/", sc:"sei_peridot/rapid4"},
	{name:"Beatdown City",        by:"Darren Curtis", yt:"qL4u3u5WKgU", site:"https://www.darrencurtismusic.com/retro", sc:"desperate-measurez/beatdown-city-80s-action-theme-royalty-free"},
	{name:"Up In My Jam (All Of A Sudden)",by:"Kubbi",yt:"6DB6hBRPsWc", site:"https://kubbimusic.com/track/up-in-my-jam-all-of-a-sudden", sc:"kubbi/up-in-my-jam-all-of-a-sudden"},
	//{name:"Samurai Sake Showdown",by:"Darren Curtis", yt:"NOGZX7Z4wSI", site:"https://www.darrencurtismusic.com/world-ethnic", sc:"desperate-measurez/samurai-sake-showdown-asian-royalty-free-music", loopStart:0.7, loopEnd:69.664},
	{name:"Machinery",            by:"PeriTune",      yt:"7zT8zYYyxFg", site:"https://peritune.com/machinery/", sc:"sei_peridot/machinery"},
	{name:"Dark Anthem",          by:"Darren Curtis", yt:"G-VY51L2AQU", site:"https://www.darrencurtismusic.com/horror-mystery"},//loopStart:0, loopEnd:201.175},//loopStart:8.743, loopEnd:200.673},
	//{name:"Gothic Dark",          by:"PeriTune",      yt:"brZWB8cdBDs", site:"https://peritune.com/gothic_dark/", loopStart:10.977, loopEnd:89.727},//loopStart:7.482, loopEnd:86.232},
	{name:"Demise",               by:"PeriTune",      yt:"Ouj_cwWJdmo", site:"https://peritune.com/demise/", sc:"sei_peridot/demise", loopStart:13.111, loopEnd:99.403},
	//{name:"Urban Jungle 2061",    by:"Eric Matyas", site:"http://soundimage.org/sci-fi/"},
	{name:"Don't Sleep",          by:"Ucchii 0",      yt:"pluUDQCBSso", site:"https://creofuga.net/audios/106981", loopStart:13.81606, loopEnd:97.81608},
	
	//{name:"Tempest",              by:"Darren Curtis", yt:"NsSYDbyQteg", site:"https://www.darrencurtismusic.com/fantasy"},
	//{name:"BattleField 2",        by:"PeriTune",      yt:"SWDVaQ8WAyM", site:"https://peritune.com/battlefield2/", loopStart:9, loopEnd:91.33},
	//{name:"Mountainside",         by:"Eric Matyas", site:"https://soundimage.org/quiet-peaceful-mellow/"},
	//{name:"Fuji",                 by:"Eric Matyas", site:"http://soundimage.org/naturescience/"},
	//{name:"Hong Kong Midnight",   by:"Eric Matyas", site:"https://soundimage.org/world/"},
	//{name:"Blast 2",              by:"PeriTune",      yt:"3orQ-zmYZiQ", site:"https://peritune.com/blast2/", ogg:true},
	//{name:"BattleField 4",        by:"PeriTune",      yt:"IR1aVoMOoRs", site:"https://peritune.com/battlefield4/", ogg:true},
	//{name:"Secret Power",         by:"Ucchii 0",      yt:"ivspAGvhA8E", site:"https://creofuga.net/audios/106993", loopStart:16.093, loopEnd:330.35, ogg:true},
	//{name:"Seiiki Kessen",        by:"Ucchii 0",      yt:"6Yx2__wLYek", loopStart:11.380, loopEnd:169.484},
];

const MUSIC_HASH = {};
const MUSIC_BY_ARTIST = {};

MUSIC_LIST.forEach(function(sing, dex) {
	if (!sing.iname)
		sing.iname = ((sing.fname || sing.name) + "-" + sing.by).replace(/\s/g, "");
	sing.src = "src/audio/songs/" + sing.iname + ".mp3";
	MUSIC_HASH[sing.name + " - " + sing.by] = sing;
	MUSIC_HASH[sing.name] = sing;
	sing.index = dex;
	if (!MUSIC_BY_ARTIST[sing.by])
		MUSIC_BY_ARTIST[sing.by] = [sing.name];
	else
		MUSIC_BY_ARTIST[sing.by].push(sing.name);
});

//this.particles.push(new MusicInfoBar(name));
var music;
var song;
//var canPlayOgg = !!(music.canPlayType && music.canPlayType('audio/ogg; codecs="vorbis"'));

function initMusic() {
	//music = document.createElement("audio");
	music = document.getElementById("music");
	music.preload = "auto";
	music.controls = false;
	music.hidden = true;
	//music.style.display = "none";
	if (typeof music.loop == 'boolean') {
		music.loop = true;
	} else {
		music.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
	}
	music.volume = settings.music;
	//document.body.appendChild(music);
}

function playMusic(sin) {
	if (sin == null) {
		music.pause();
		return;
	}
	if (typeof sin == "string") {
		sin = MUSIC_HASH[sin];
	}
	if (sin == song) {
		music.play();
		return;
	}
	song = sin;
	if (!settings.music)
		return;
	var songName = song.name + " - " + song.by;
	var unsce = songName.replace(/\s/g, "");
	music.src = song.src;
	music.currentTime = 0;
	music.play();
}

function stopMusic() {
	song = null;
	music.currentTime = 0;
	music.pause();
}

function setMusicVolume(pingas) {
	music.volume = pingas;
}

function musicLoopCheck() {
	//console.log(music.currentTime);
	if (song && song.loopEnd && music.currentTime >= song.loopEnd) {
		var d = song.loopEnd - song.loopStart;
		//music.pause();
		music.currentTime -= d;
		//music.play();
	}
}

function disableLooping() {
	musicLoopCheck = doNothing;
}

function destroyMusic() {
	music.pause();
	music.src = "";
	musicLoopCheck = doNothing;
	playMusic = doNothing;
}

/*var musicLoop = document.createElement("audio");
var musicIntro = document.createElement("audio");
var musicPoint = document.createElement("audio");
var music = musicLoop;
var songName;
var song;
var canPlayOgg = !!(music.canPlayType && music.canPlayType('audio/ogg; codecs="vorbis"'));

function initMusic() {
	musicLoop.preload = "auto"; musicIntro.preload = "auto"; musicPoint.preload = "auto";
	musicLoop.controls = "none"; musicIntro.controls = "none"; musicPoint.controls = "none";
	musicLoop.style.display = "none"; musicIntro.style.display = "none";  musicPoint.style.display = "none";
	if (typeof musicLoop.loop == 'boolean') {
		musicLoop.loop = true;
	} else {
		musicLoop.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
	}
	musicIntro.addEventListener('ended', function() {
		this.pause();
		this.src = "";
        music = musicLoop;
		musicLoop.currentTime = 0;
		musicLoop.play();
    }, false);
	musicPoint.addEventListener('ended', function() {
		this.currentTime = song.loopPoint;
		this.play();
	}, false);
	document.body.appendChild(musicIntro);
	document.body.appendChild(musicLoop);
	document.body.appendChild(musicPoint);
}

playMusic = function(sin) {
	if (sin == null) {
		music.pause();
		return;
	}
	//if (settings.music == "Off") {
	//	return false;
	//}
	if (typeof sin == "string") {
		sin = MUSIC_HASH[sin]
	}
	if (sin == song) {
		music.play();
		return;
	}
	song = sin;
	songName = song.name + " - " + song.by;
	unsce = songName.replace(/\s/g, "");
	end = (canPlayOgg && song.ogg) ? "ogg" : "mp3";
	musicIntro.pause();
	musicLoop.pause();
	musicPoint.pause();
	if (song.loopPoint) {
		musicIntro.src = "";
		musicLoop.src = "";
		music = musicPoint;
		musicPoint.src = "src/Music/"+unsce+"."+end;
	} else {
		musicLoop.src = "src/Music/"+unsce+"."+end;
		if (song.intro) {
			music = musicIntro;
			musicIntro.src = "src/Music/"+unsce+"_Intro."+end;
		} else {
			musicIntro.src = "";
			music = musicLoop;
		}
	}
	music.currentTime = 0;
	music.play();
}

function setMusicVolume(pingas) {
	console.log(pingas);
	musicIntro.volume = pingas;
	musicLoop.volume = pingas;
	musicPoint.volume = pingas;
}*/
