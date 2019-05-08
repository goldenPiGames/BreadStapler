var STAPLE_SFX_COUNT = 2;
var SFX_NAMES = ["staple0", "staple1"];
var sfx = {
	
}
function initSFX() {
	SFX_NAMES.forEach(function(oj) {
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
	});
}

function playSFX(name) {
	sfx[name].play();
}

function setSFXVolume(quant) {
	for (f in sfx) {
		sfx[f].volume = quant;
	}
}

function SFXCycler(name, cycleLength) {
	this.name = name;
	this.cycle = 0;
	this.cycleLength = cycleLength;
}
SFXCycler.prototype.play = function() {
	this.cycle = this.cycle % this.cycleLength;
	playSFX(this.name+this.cycle);
	this.cycle++;
}

sfx["staple"] = new SFXCycler("staple", 2);
