

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
