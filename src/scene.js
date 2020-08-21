//NOTE: this only works for end-of-stage cutscenes. if i want to add cutscenes at other times, i'll have to change some stuff
var sceneScreen = {
	nextButton : new TextButton(lg("scene-next"), function(){sceneScreen.next()}, SIZE-5, SIZE-5, 1, 1),
	skipButton : new TextButton(lg("scene-skip"), function(){sceneScreen.skip()}, 5, SIZE-5, 0, 1),
	init : function() {
		this.voice = document.createElement("audio");
		this.voice.preload = "auto";
		this.voice.controls = "none";
		this.voice.style.display = "none";
		//this.voice.addEventListener('ended', ()=>this.voiceEnded(), false);
		//music.volume = settings.music;
		document.body.appendChild(this.voice);
	},
	begin : function(scene) {
		runnee = this;
		this.scene = typeof scene == "function" ? new scene(stage) : scene;
		this.playVoice();
	},
	update : function() {
		/*if (this.voice.ended) {
			this.next();
			this.scene.advance();
			if (this.scene.isOver()) {
				this.end();
			} else {
				this.playVoice();
			}
		}*/
	},
	draw : function() {
		this.scene.draw();
		faders = faders.filter(oj=>oj.drawAfter());
		ctx.globalAlpha = 1;
		drawParagraph(this.scene.getClosedCaptions(), 10, SIZE-TEXT_HEIGHT-20, SIZE-20, .5, 1, "#00000080");
		this.skipButton.draw();
		this.nextButton.draw();
	},
	click : function(x, y) {
		this.skipButton.checkClick(x, y);
		this.nextButton.checkClick(x, y);
	},
	next : function() {
		this.scene.advance();
		if (this.scene.isOver()) {
			this.end();
		} else {
			//this.playVoice();
		}
	},
	playVoice : function() {
		this.voice.src = this.scene.getAudioPath();
		this.voice.play();
	},
	/*voiceEnded : function() {
		
	},*/
	skip : function() {
		this.end();
	},
	end : function() {
		this.voice.pause();
		stageResultsScreen.begin();
	},
}

class Scene {
	constructor(stage) {
		this.background = stage.background;
		this.lineIndex = 0;
		
	}
	advance() {
		this.lineIndex++;
	}
	isOver() {
		return this.lineIndex >= this.lines.length;
	}
	getClosedCaptions() {
		return this.lines[this.lineIndex].text;
	}
	getAudioPath() {
		return "src/voice/"+settings.lang+"/"+this.lines[this.lineIndex].name+".mp3";
	}
}

class CutsceneLine {
	constructor(name) {
		this.name = name;
		this.text = lg(name);
	}
	canAdvance() {
		return true;
	}
}
