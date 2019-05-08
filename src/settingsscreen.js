var settingsScreen = {
	returnButton : new TextButton("BACK", function(){mainMenu.begin()}, SIZE-10, SIZE-10, 1, 1),
	items : [],
	begin : function() {
		runnee = this;
	},
	update : function() {
		/*this.items.forEach(function(oj) {
			oj.update();
		})*/
	},
	draw : function() {
		this.items.forEach(oj => oj.draw());
		this.returnButton.draw();
	},
	click : function(x, y) {
		this.returnButton.checkClick(x, y);
		this.items.forEach(oj => oj.checkClick(x, y));
	},
	build : function() {
		var thisser = this;
		var y = 0;
		OPTIONS_LIST.forEach(function(oj, dex) {
			var newItem;
			switch (oj.type) {
				case "portion":
					newItem = new OptionItemPortion(oj, y);
					break;
				case "choices":
					newItem = new OptionItemChoices(oj, y);
					break;
			}
			thisser.items.push(newItem);
			y += newItem.height;
		});
	}
}

function OptionItem() {
	
}
OptionItem.prototype.x = 0;
OptionItem.prototype.width = SIZE;
OptionItem.prototype.height = TEXT_HEIGHT + 6;

function OptionItemPortion(op, y) {
	this.option = op;
	this.y = y;
	this.boxes = [];
	var steps = this.option.steps;
	var spac = Math.floor((SIZE/2+3)/(steps+1));
	for (var i = 0; i <= steps; i ++) {
		var p = i/steps;
		this.boxes.push(new OptionItemPortionBox(p, this, SIZE/2 + i*spac, this.y+3, spac-3, this.height-6));
	}
}
OptionItemPortion.prototype = Object.create(OptionItem.prototype);
OptionItemPortion.prototype.draw = function() {
	drawText(this.option.title, 3, this.y+3, 0);
	var port = settings[this.option.name];
	drawText(asPercent(port), SIZE/2-4, this.y+3, 1);
	this.boxes.forEach(oj => oj.draw(port));
}
OptionItemPortion.prototype.checkClick = function(x, y) {
	this.boxes.forEach(oj => oj.checkClick(x, y));
}
OptionItemPortion.prototype.handle = function(port) {
	settings[this.option.name] = port;
	saveSettings();
	if (this.option.func) {
		window[this.option.func](port);
	}
}

function OptionItemPortionBox(portion, parent, x, y, width, height) {
	this.portion = portion;
	this.parent = parent;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}
OptionItemPortionBox.prototype = Object.create(Button.prototype);
OptionItemPortionBox.prototype.draw = function(port) {
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#eeeeee";
	ctx.strokeRect(this.x, this.y, this.width, this.height);
	if (this.portion <= port) {
		ctx.fillStyle = "#eeeeee";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
OptionItemPortionBox.prototype.action = function() {
	this.parent.handle(this.portion);
}

function OptionItemChoices(op, y) {
	this.option = op;
	this.y = y;
}
OptionItemChoices.prototype = Object.create(OptionItem.prototype);
OptionItemChoices.prototype.draw = function(oj) {
	drawText(this.option.title, 3, this.y+3, 0);
}
OptionItemChoices.prototype.checkClick = function(x, y) {
	
}

settingsScreen.build();