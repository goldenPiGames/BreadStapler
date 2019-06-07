function Button(x, y, width, height, text, action = doNothing) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.action = action;
}
Button.prototype.draw = function() {
	ctx.fillStyle = "#eeeeee";
	ctx.fillRect(this.x, this.y, this.width, this.height);
	drawText(this.text, this.x+this.width/2, this.y+3, 1/2);
}
Button.prototype.checkClick = function(x, y) {
	if (x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height)
		this.click();
}
Button.prototype.click = function() {
	//console.log("clicked");
	playSFX("staple");
	this.action();
}

function TextButton(text, action, x, y, xoff=.5, yoff=0) {
	this.text = text;
	this.width = this.text.length*TEXT_WIDTH+6;
	this.height = TEXT_HEIGHT+6;
	this.x = Math.round(x - this.width*xoff);
	this.y = Math.floor(y - this.height*yoff);
	this.action = action;
	//ctx.fillStyle = "#eeeeee";
	//ctx.fillRect(this.x, this.y, this.width, this.height);
	//drawText(this.text, this.x+this.width/2, this.y+3, 1/2);
}
TextButton.prototype = Object.create(Button.prototype);

var mainMenu = {
	buttons : [
		//new Button(SIZE/3, SIZE/2, SIZE/3, 40, "BEGIN", function(){startGame()}),
		new Button(SIZE/4, SIZE/2, SIZE/2, TEXT_HEIGHT+6, "PLAY", function(){WORLDS[0].hiscore ? worldSelect.begin() : startWorld(0)}),
		new Button(SIZE/4, SIZE/2+TEXT_HEIGHT*3/2, SIZE/2, TEXT_HEIGHT+6, "INSTRUCTION", function(){instructionsScreen.begin()}),
		new Button(SIZE/4, SIZE/2+TEXT_HEIGHT*6/2, SIZE/2, TEXT_HEIGHT+6, "JUKEBOX", function(){jukebox.begin()}),
		new Button(SIZE/4, SIZE/2+TEXT_HEIGHT*9/2, SIZE/2, TEXT_HEIGHT+6, "SETTINGS", function(){settingsScreen.begin()}),
		new Button(SIZE/4, SIZE/2+TEXT_HEIGHT*12/2, SIZE/2, TEXT_HEIGHT+6, "CREDITS", function(){creditsScreen.begin()}),
	],
	update : doNothing,
	begin : function() {
		runnee = this;
	},
	draw : function() {
		//ctx.fillStyle = "#eeeeee";
		//ctx.fillRect(10, 10, 20, 20);
		drawText(lg("title"), SIZE/2, 30, 1/2);
		drawParagraph(lg("mainmenu-subtitle"), 3, TEXT_HEIGHT+35, SIZE);
		this.buttons.forEach(oj=>oj.draw());
	},
	click : function(x, y) {
		this.buttons.forEach(oj=>oj.checkClick(x, y));
	},
}

var worldSelect = {
	returnButton : new TextButton("BACK", function(){mainMenu.begin()}, SIZE - 10, SIZE - 10, 1, 1),
	begin : function() {
		var thisser = this;
		runnee = this;
		this.worldSelectors = [];
		WORLDS.forEach(function(oj, dex) {
			thisser.worldSelectors.push(new WorldSelector(oj, dex*WorldSelector.prototype.height));
		});
	},
	update : function() {
		
	},
	draw : function() {
		this.returnButton.draw();
		this.worldSelectors.forEach(oj => oj.draw());
	},
	click : function(x, y) {
		this.returnButton.checkClick(x, y);
		this.worldSelectors.forEach(oj => oj.checkClick(x, y));
	},
}
function WorldSelector(warudo, y) {
	this.warudo = warudo;
	this.y = y;
	this.textTop = "WORLD "+warudo.index+": "+warudo.name;
	this.textBottomRight = warudo.hiscore || "-";
	this.color = warudo.color;
}
WorldSelector.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	drawText(this.textTop, 3, this.y+3, 0, 0);
	drawText(this.textBottomRight, SIZE-3, this.y+3+TEXT_HEIGHT, 1, 0);
}
WorldSelector.prototype.checkClick = function(x, y) {
	if (y >= this.y && y < this.y + this.height) {
		playSFX("staple");
		startWorld(this.warudo);
	}
}
WorldSelector.prototype.x = 0;
WorldSelector.prototype.width = SIZE;
WorldSelector.prototype.height = TEXT_HEIGHT*2 + 6;