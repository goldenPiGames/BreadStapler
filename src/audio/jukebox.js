const SONGS_PER_PAGE = 6;

class Jukebox {
	constructor() {
		this.sprites = makeSprites("src/miscsprites/jukebox.png", {
			play : {x:0, y:0, width:30, height:30},
			pause : {x:30, y:0, width:30, height:30},
			website : {x:0, y:30, width:30, height:30},
			youtube : {x:30, y:30, width:30, height:30},
			soundcloud : {x:60, y:30, width:30, height:30},
		});
		this.returnButton = new TextButton("BACK", ()=>this.returnToMain(), SIZE-10, SIZE-10, 1, 1);
		this.pauseButton = new PauseButton(SIZE-40, 10, 30, 30, this.sprites);
		this.pageLeftButton = new Button(5, 5, 30, 30, "<", ()=>this.pageLeft(-1));
		this.pageRightButton = new Button(SIZE/2-35, 5, 30, 30, ">", ()=>this.pageRight(1));
		this.currentPage = 0;
		this.songButtons = [];
		this.numPages = Math.ceil(MUSIC_LIST.length / SONGS_PER_PAGE);
		this.linkButtons = [];
		this.buildPage();
	}
	begin() {
		runnee = this;
		this.buildPage();
		//music.controls = true;
		//music.hidden = false;
		//this.pauseButton.text = music.paused?"Play":"Pause";
	}
	update() {
		
	}
	draw () {
		/*this.returnButton.draw();
		this.pauseButton.draw();
		this.songButtons.forEach((oj)=>oj.draw());
		this.linkButtons.forEach((oj)=>oj.draw());*/
		this.allButtons.forEach((oj)=>oj.draw());
		drawText((this.currentPage+1) + "/" + this.numPages, SIZE/4, 9, 1/2);
		if (song) {
			drawText(song.name, 5, SIZE-TEXT_HEIGHT*3.5, 0);
			drawText(song.by, 5, SIZE-TEXT_HEIGHT*2.5, 0);
		}
	}
	click(x, y) {
		/*this.returnButton.checkClick(x, y);
		this.pauseButton.checkClick(x, y);
		this.songButtons.forEach((oj)=>oj.checkClick(x, y));
		this.linkButtons.forEach((oj)=>oj.checkClick(x, y));*/
		this.allButtons.forEach((oj)=>oj.checkClick(x, y));
	}
	assembleAll() {
		this.allButtons = [this.returnButton, this.pauseButton, this.pageLeftButton, this.pageRightButton, ...this.songButtons, ...this.linkButtons];
	}
	buildPage() {
		var listoff = this.currentPage * SONGS_PER_PAGE;
		this.songButtons = [];
		for (var i = 0; i < SONGS_PER_PAGE && i + listoff < MUSIC_LIST.length; i++) {
			let song = MUSIC_LIST[i+listoff];
			let name = song.name;
			if (name.length > 11) {
				name = name.substr(0, 10) + "\u2026";
			}
			this.songButtons.push(new Button(0, 40+35*i, 180, 30, name, ()=>{playMusic(song); this.buildLinks()}));
		}
		this.assembleAll();
	}
	pageLeft() {
		this.currentPage--;
		if (this.currentPage < 0)
			this.currentPage += this.numPages;
		this.buildPage();
	}
	pageRight() {
		this.currentPage++;
		if (this.currentPage >= this.numPages)
			this.currentPage -= this.numPages;
		this.buildPage();
	}
	buildLinks() {
		this.linkButtons = [];
		var x = 0;
		var y = 300;
		if (!song)
			return;
		if (song.site)
			this.linkButtons.push(new IconButton(this.sprites.website, function(){window.open(song.site)}, x += 35, SIZE-5, 1, 1));
		if (song.yt)
			this.linkButtons.push(new IconButton(this.sprites.youtube, function(){window.open("https://youtu.be/"+song.yt)}, x += 35, SIZE-5, 1, 1));
		if (song.sc)
			this.linkButtons.push(new IconButton(this.sprites.soundcloud, function(){window.open("https://soundcloud.com/"+song.sc)}, x += 35, SIZE-5, 1, 1));
		this.assembleAll();
	}
	returnToMain() {
		music.hidden = true;
		music.controls = false;
		toMainMenu();
	}
}

class PauseButton extends Button {
	constructor(x, y, width, height, sprites) {
		super(x, y, width, height, "P", ()=>{
			if(music.paused)
				music.play()
			else
				music.pause()
		});
		this.sprites = sprites;
	}
	draw() {
		ctx.globalAlpha = 1;
		var sprite = this.sprites[music.paused ? "play" : "pause"];
		//console.log(sprite, this.x+this.width/2, this.y+this.height/2, .5, .5);
		drawSprite(sprite, this.x+this.width/2, this.y+this.height/2, .5, .5);
	}
}