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
	for (var i = 0; i < this.option.choices.length; i++) {
		if (this.option.choices[i].name == settings[this.option.name])
			this.choiceIndex = i;
		if (this.option.choices[i].name == this.option.default)
			this.defaultIndex = i;
	}
	this.leftButton = new TextButton("<", ()=>this.handleLeft(), SIZE/2, this.y, 0);
	this.rightButton = new TextButton(">", ()=>this.handleRight(), SIZE-4, this.y, 1);
}
OptionItemChoices.prototype = Object.create(OptionItem.prototype);
OptionItemChoices.prototype.choiceIndex = 0;
OptionItemChoices.prototype.draw = function(oj) {
	drawText(this.option.title, 3, this.y+3, 0);
	drawText(this.option.choices[this.choiceIndex].title, SIZE*3/4 - 2, this.y+3, 1/2);
	this.leftButton.draw();
	this.rightButton.draw();
}
OptionItemChoices.prototype.checkClick = function(x, y) {
	this.leftButton.checkClick(x, y);
	this.rightButton.checkClick(x, y);
	//this.defaultButton.checkClick(x, y);
}
OptionItemChoices.prototype.handleLeft = function() {
	this.choiceIndex--;
	if (this.choiceIndex < 0)
		this.choiceIndex += this.option.choices.length;
	this.changeSetting();
}
OptionItemChoices.prototype.handleRight = function() {
	this.choiceIndex = (this.choiceIndex + 1) % this.option.choices.length;
	this.changeSetting();
}
OptionItemChoices.prototype.changeSetting = function() {
	settings[this.option.name] = this.option.choices[this.choiceIndex].name;
	saveSettings();
}

settingsScreen.build();