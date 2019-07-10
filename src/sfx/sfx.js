var lastSFXvolume;

function makeCycler(args) {
	return new SFXCycler(Array.prototype.slice.call(arguments, 0));
}
function makeSound(nom) {
	var fec = document.createElement("audio");
	fec.preload = "auto";
	fec.controls = "none";
	fec.style.display = "none";
	fec.addEventListener("ended", function() {
			this.currentTime = 0;
			this.pause();
		}, false);
	fec.src = "src/sfx/"+nom;
	fec.volume = settings.sfx;
	document.body.appendChild(fec);
	return fec;
}
var sfx = {
	
}
function initSFX() {
	lastSFXvolume = settings.sfx;
	sfx = {
		"staple0" : makeSound("staple.mp3"),
		"staple1" : makeSound("staple.mp3"),
		"staple" : makeCycler("staple0", "staple1"),
		"hurt" : makeSound("EOUdamage.mp3"), //Etrian Odyssey Untold | Sound Effect #12
		"fall0" : makeSound("fall.mp3"), //edited some slide whistle effect from somewhere, i don't remember
		"fall1" : makeSound("fall.mp3"),
		"fall" : makeCycler("fall0", "fall1"),
		"fruithit" : makeSound("bananaslap.mp3"), // http://soundbible.com/2047-Banana-Slap.html
		"pushhit" : makeSound("volleyball.mp3"), //https://www.soundsnap.com/694sport_squadra_pallavolo_pallone_cade
		"haltlose" : makeSound("TF2death.mp3"), //Team Fortress 2 | MvM death
		"bossbeat" : makeSound("KSSbossbeaten.mp3"), //Kirby Super Star | boss beaten
		"charge" : makeSound("BANK_2E_INSTR_0008_SND_0000.wav"), //Paper Mario | Forever Forest
	}
/*	SFX_NAMES.forEach(function(oj) {
		var fec = document.createElement("audio");
		
		fec.preload = "auto";
		fec.controls = "none";
		fec.style.display = "none";
		fec.addEventListener("ended", function() {
				this.currentTime = 0;
				this.pause();
			}, false);
		fec.src = "src/sfx/"+oj+".mp3";
		fec.volume = settings.sfx;
		document.body.appendChild(fec);
		sfx[oj] = fec;
	});*/
}

function playSFX(name) {
	//console.log(name)
	sfx[name].play();
}

function setSFXVolume(quant) {
	if (quant != lastSFXvolume) {
		for (f in sfx) {
			sfx[f].volume = quant;
		}
		lastSFXvolume = quant;
	}
}

function SFXCycler(names) {
	this.names = names;
}
SFXCycler.prototype.cycle = 0;
SFXCycler.prototype.play = function() {
	this.cycle = this.cycle % this.names.length;
	playSFX(this.names[this.cycle]);
	this.cycle++;
}