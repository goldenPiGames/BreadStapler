const SONGS_PER_PAGE = 6;

var jukebox = {
	sprites : makeSprites("src/miscsprites/jukebox.png", {
		play : {x:0, y:0, width:30, height:30},
		pause : {x:30, y:0, width:30, height:30},
		website : {x:0, y:30, width:30, height:30},
		youtube : {x:30, y:30, width:30, height:30},
		soundcloud : {x:60, y:30, width:30, height:30},
	}),
	returnButton : new TextButton("BACK", function(){jukebox.exit(); mainMenu.begin()}, SIZE-10, SIZE-10, 1, 1),
	pauseButton : new Button(SIZE-40, 10, 30, 30, "P", function(){if(music.paused) {music.play()} else {music.pause()}}),
	pageLeftButton : new Button(5, 5, 30, 30, "<", function(){jukebox.pageLeft(-1)}),
	pageRightButton : new Button(SIZE/2-35, 5, 30, 30, ">", function(){jukebox.pageRight(1)}),
	currentPage : 0,
	songButtons : [],
	numPages : Math.ceil(MUSIC_LIST.length / SONGS_PER_PAGE),
	linkButtons : [],
	// siteButton = new Button(ritx, 10, thic, 40, "Artist's site", "See the current music on the artist's site. You might need to allow popups for this to work.", function(){window.open(song.site)}, false),
	// this.siteButton.active = song && song.site;
	// this.youtubeButton = new Button(ritx, 60, thic, 40, "YouTube", "See the current music on YouTube. You might need to enable popups for this to work.", function(){window.open("https://youtu.be/"+song.yt)}, false),
	// this.youtubeButton.active = song && song.yt;
	begin : function() {
		runnee = this;
		this.buildPage();
		//music.controls = true;
		//music.hidden = false;
		//this.pauseButton.text = music.paused?"Play":"Pause";
	},
	update : function() {
		
	},
	draw : function() {
		/*this.returnButton.draw();
		this.pauseButton.draw();
		this.songButtons.forEach((oj)=>oj.draw());
		this.linkButtons.forEach((oj)=>oj.draw());*/
		this.allButtons.forEach((oj)=>oj.draw());
		//drawText("UNDER CONSTRUCTION", SIZE/2, SIZE/2, .5);
	},
	click : function(x, y) {
		/*this.returnButton.checkClick(x, y);
		this.pauseButton.checkClick(x, y);
		this.songButtons.forEach((oj)=>oj.checkClick(x, y));
		this.linkButtons.forEach((oj)=>oj.checkClick(x, y));*/
		this.allButtons.forEach((oj)=>oj.checkClick(x, y));
	},
	assembleAll : function() {
		this.allButtons = [this.returnButton, this.pauseButton, this.pageLeftButton, this.pageRightButton];
		Array.prototype.push.apply(this.allButtons, this.songButtons);
		Array.prototype.push.apply(this.allButtons, this.linkButtons);
	},
	exit : function() {
		music.hidden = true;
		music.controls = false;
	},
	buildPage : function() {
		var listoff = this.currentPage * SONGS_PER_PAGE;
		this.songButtons = [];
		for (var i = 0; i < SONGS_PER_PAGE && i + listoff < MUSIC_LIST.length; i++) {
			let song = MUSIC_LIST[i+listoff];
			let name = song.name;
			if (name.length > 11) {
				name = name.substr(0, 10) + "\u2026";
			}
			this.songButtons.push(new Button(0, 40+35*i, 180, 30, name, function(){playMusic(song); jukebox.buildLinks()}));
		}
		this.assembleAll();
	},
	pageLeft : function() {
		this.currentPage--;
		if (this.currentPage < 0)
			this.currentPage += this.numPages;
		this.buildPage();
	},
	pageRight : function() {
		this.currentPage++;
		if (this.currentPage >= this.numPages)
			this.currentPage -= this.numPages;
		this.buildPage();
	},
	buildLinks : function() {
		this.linkButtons = [];
		var x = 0;
		var y = 300;
		if (!song)
			return;
		if (song.site)
			this.linkButtons.push(new IconButton(jukebox.sprites.website, function(){window.open(song.site)}, x += 35, SIZE-5, 1, 1));
		if (song.yt)
			this.linkButtons.push(new IconButton(jukebox.sprites.youtube, function(){window.open("https://youtu.be/"+song.yt)}, x += 35, SIZE-5, 1, 1));
		if (song.sc)
			this.linkButtons.push(new IconButton(jukebox.sprites.soundcloud, function(){window.open("https://soundcloud.com/"+song.sc)}, x += 35, SIZE-5, 1, 1));
		this.assembleAll();
	},
}

jukebox.pauseButton.draw = function() {
	ctx.globalAlpha = 1;
	var sprite = jukebox.sprites[music.paused ? "play" : "pause"];
	//console.log(sprite, this.x+this.width/2, this.y+this.height/2, .5, .5);
	drawSprite(sprite, this.x+this.width/2, this.y+this.height/2, .5, .5);
}