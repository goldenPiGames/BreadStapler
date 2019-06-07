const MUSIC_LIST = [
	//{name:"Breeze",               by:"PeriTune",      yt:"RINkM_o-e4I", site:"https://peritune.com/breeze/"},
	{name:"Prairie",              by:"PeriTune",      yt:"iMkX3NxQYv0", site:"https://peritune.com/prairie/"},
	{name:"Strategy 3",           by:"PeriTune",      yt:"tqS-DwicQCo", site:"https://peritune.com/strategy3/"},
	{name:"Havoc",                by:"PeriTune",      yt:"yfE5y2uiBX0", site:"https://peritune.com/havoc", loopStart:4.304, loopEnd:112.101},
	//{name:"Tempest",              by:"Darren Curtis", yt:"NsSYDbyQteg", site:"https://www.darrencurtismusic.com/fantasy"},
	//{name:"Underwater Coolness",  by:"Eric Matyas", site:"https://soundimage.org/nature-science-3/"},
	//{name:"War of the Pianos",    by:"Darren Curtis", yt:"CP8HoV4ArHw", site:"https://www.darrencurtismusic.com/hybrid-other"},
	//{name:"Exotic",               by:"PeriTune",      yt:"ykiWQdzt4GI", site:"https://peritune.com/exotic/"},
	//{name:"Seahorse Dreams",      by:"Kubbi",         yt:"DLvrDRRaftQ", site:"https://kubbimusic.com/track/seahorse-dreams"},
	//{name:"Rapid 4",              by:"PeriTune",      yt:"g3c-dHAI-ts", site:"https://peritune.com/rapid4/"},
	//{name:"Beatdown City",        by:"Darren Curtis", yt:"qL4u3u5WKgU", site:"https://www.darrencurtismusic.com/sci-fi-modern"},
	//{name:"Let's Party 2",        by:"PeriTune",      yt:"rb8gRa6tTMY", site:"https://peritune.com/lets-party2/"},
	//{name:"Up In My Jam",         by:"Kubbi",         yt:"6DB6hBRPsWc", site:"https://kubbimusic.com/track/up-in-my-jam-all-of-a-sudden"},
	//{name:"Machinery",            by:"PeriTune",      yt:"7zT8zYYyxFg", site:"https://peritune.com/machinery/"},
	//{name:"Dark Anthem",          by:"Darren Curtis", yt:"G-VY51L2AQU", site:"https://www.darrencurtismusic.com/horror-mystery"},//loopStart:0, loopEnd:201.175},//loopStart:8.743, loopEnd:200.673},
	//{name:"Demise",               by:"PeriTune",      yt:"Ouj_cwWJdmo", site:"https://peritune.com/demise/", loopStart:13.111, loopEnd:99.403},
	//{name:"Don't Sleep",          by:"Ucchii 0",      yt:"pluUDQCBSso", site:"https://creofuga.net/audios/106981", loopStart:13.81606, loopEnd:97.81608},
	//{name:"Decisions",            by:"Eric Matyas", site:"https://soundimage.org/introspective/"},
	//{name:"Blue Ridge",           by:"Eric Matyas", site:"http://soundimage.org/quiet-peaceful-mellow/"},
	//{name:"Nostalgic 2",          by:"PeriTune",      yt:"rAwL5hyQbhU", site:"https://peritune.com/nostalgic2/", ogg:true},
	//{name:"BattleField 2",        by:"PeriTune",      yt:"SWDVaQ8WAyM", site:"https://peritune.com/battlefield2/", loopStart:9, loopEnd:91.33},
	//{name:"Mountainside",         by:"Eric Matyas", site:"https://soundimage.org/quiet-peaceful-mellow/"},
	//{name:"Fuji",                 by:"Eric Matyas", site:"http://soundimage.org/naturescience/"},
	//{name:"Hong Kong Midnight",   by:"Eric Matyas", site:"https://soundimage.org/world/"},
	//{name:"Urban Jungle 2061",    by:"Eric Matyas", site:"http://soundimage.org/sci-fi/"},
	//{name:"Breeze",               by:"PeriTune",      yt:"RINkM_o-e4I", site:"https://peritune.com/breeze/", ogg:true},
	// {name:"Still of Night",       by:"Eric Matyas",   site:"https://soundimage.org/city-urban/"},
	// {name:"Blast 2",              by:"PeriTune",      yt:"3orQ-zmYZiQ", site:"https://peritune.com/blast2/", ogg:true},
	// {name:"Up In My Jam (All Of A Sudden)", by:"Kubbi", yt:"6DB6hBRPsWc", site:"https://kubbimusic.com/track/up-in-my-jam-all-of-a-sudden"},
	// {name:"BattleField 4",        by:"PeriTune",      yt:"IR1aVoMOoRs", site:"https://peritune.com/battlefield4/", ogg:true},
	// {name:"Gothic Dark",          by:"PeriTune",      yt:"brZWB8cdBDs", site:"https://peritune.com/gothic_dark/", loopStart:10.977, loopEnd:89.727},//loopStart:7.482, loopEnd:86.232},
	// {name:"Secret Power",         by:"Ucchii 0",      yt:"ivspAGvhA8E", site:"https://creofuga.net/audios/106993", loopStart:16.093, loopEnd:330.35, ogg:true},
	// {name:"Samurai Sake Showdown",by:"Darren Curtis", yt:"NOGZX7Z4wSI", site:"https://www.darrencurtismusic.com/world-ethnic", loopStart:0.7, loopEnd:69.664},
	//{name:"Seiiki Kessen",        by:"Ucchii 0",      yt:"6Yx2__wLYek", loopStart:11.380, loopEnd:169.484},
];

const MUSIC_HASH = {};
const MUSIC_BY_ARTIST = {};

MUSIC_LIST.forEach(function(sing, dex) {
	MUSIC_HASH[sing.name + " - " + sing.by] = sing;
	MUSIC_HASH[sing.name] = sing;
	sing.index = dex;
	if (!MUSIC_BY_ARTIST[sing.by])
		MUSIC_BY_ARTIST[sing.by] = [sing.name];
	else
		MUSIC_BY_ARTIST[sing.by].push(sing.name);
});

var jukebox = {
	returnButton : new TextButton("BACK", function(){mainMenu.begin()}, SIZE-10, SIZE-10, 1, 1),
	pauseButton : new TextButton("Pause", function(){if(music.paused) {music.play(); this.text = "Pause"} else {music.pause(); this.text = "Play"}}, SIZE-10, 10, 1, 0),
	// siteButton = new Button(ritx, 10, thic, 40, "Artist's site", "See the current music on the artist's site. You might need to allow popups for this to work.", function(){window.open(song.site)}, false),
	// this.siteButton.active = song && song.site;
	// this.youtubeButton = new Button(ritx, 60, thic, 40, "YouTube", "See the current music on YouTube. You might need to enable popups for this to work.", function(){window.open("https://youtu.be/"+song.yt)}, false),
	// this.youtubeButton.active = song && song.yt;
	begin : function() {
		runnee = this;
		this.pauseButton.text = music.paused?"Play":"Pause";
	},
	update : function() {
		
	},
	draw : function() {
		this.returnButton.draw();
		this.pauseButton.draw();
		drawText("UNDER CONSTRUCTION", SIZE/2, SIZE/2, .5);
	},
	click : function(x, y) {
		this.returnButton.checkClick(x, y);
		this.pauseButton.checkClick(x, y);
	},
}

//this.particles.push(new MusicInfoBar(name));
var music;
var song;
//var canPlayOgg = !!(music.canPlayType && music.canPlayType('audio/ogg; codecs="vorbis"'));

function initMusic() {
	music = document.createElement("audio");
	music.preload = "auto";
	music.controls = "none";
	music.style.display = "none";
	if (typeof music.loop == 'boolean') {
		music.loop = true;
	} else {
		music.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
	}
	music.volume = settings.music;
	document.body.appendChild(music);
}

playMusic = function(sin) {
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
	var songName = song.name + " - " + song.by;
	var unsce = songName.replace(/\s/g, "");
	var end = "mp3"//(canPlayOgg && song.ogg) ? "ogg" : "mp3";
	music.src = "src/music/"+unsce+"."+end;
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
