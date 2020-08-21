class SettingsScreen {
	constructor() {
		this.returnButton = new TextButton("BACK", toMainMenu, SIZE-10, SIZE-10, 1, 1);
		var y = 0;
		this.items = OPTIONS_LIST.map((oj, dex) => {
			var newItem;
			switch (oj.type) {
				case "portion":
					newItem = new OptionItemPortion(oj, y);
					break;
				case "choices":
					newItem = new OptionItemChoices(oj, y);
					break;
			}
			y += newItem.height;
			return newItem;
		});
	}
	update() {
		
	}
	draw() {
		this.items.forEach(oj => oj.draw());
		this.returnButton.draw();
	}
	click(x, y) {
		this.returnButton.checkClick(x, y);
		this.items.forEach(oj => oj.checkClick(x, y));
	}
}

class OptionItem {
	constructor() {
	
	}
}
OptionItem.prototype.x = 0;
OptionItem.prototype.width = SIZE;
OptionItem.prototype.height = TEXT_HEIGHT + 6;

class OptionItemPortion extends OptionItem {
	constructor(op, y) {
		super();
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
	draw() {
		drawText(lg(this.option.lTitle), 3, this.y+3, 0);
		var port = settings[this.option.id];
		drawText(asPercent(port), SIZE/2-4, this.y+3, 1);
		this.boxes.forEach(oj => oj.draw(port));
	}
	checkClick(x, y) {
		this.boxes.forEach(oj => oj.checkClick(x, y));
	}
	handle(port) {
		settings[this.option.id] = port;
		saveSettings();
		if (this.option.func) {
			this.option.func(port);
		}
	}
}

class OptionItemPortionBox extends Button {
	constructor(portion, parent, x, y, width, height) {
		super(x, y, width, height, "|", undefined);
		this.portion = portion;
		this.parent = parent;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	draw(port) {
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#eeeeee";
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		if (this.portion <= port) {
			ctx.fillStyle = "#eeeeee";
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	action() {
		this.parent.handle(this.portion);
	}
}

class OptionItemChoices extends OptionItem {
	constructor(op, y) {
		super();
		this.option = op;
		this.y = y;
		this.choiceIndex = 0;
		for (var i = 0; i < this.option.choices.length; i++) {
			if (this.option.choices[i].id == settings[this.option.id])
				this.choiceIndex = i;
			if (this.option.choices[i].id == this.option.default)
				this.defaultIndex = i;
		}
		this.leftButton = new TextButton("<", ()=>this.handleLeft(), SIZE/2-40, this.y, 0);
		this.rightButton = new TextButton(">", ()=>this.handleRight(), SIZE-4, this.y, 1);
		this.textX = (this.leftButton.x + this.leftButton.width + this.rightButton.x) / 2
	}
	draw(oj) {
		drawText(lg(this.option.lTitle), 3, this.y+3, 0);
		drawText(lg(this.option.choices[this.choiceIndex].lTitle), this.textX, this.y+3, 1/2);
		this.leftButton.draw();
		this.rightButton.draw();
	}
	checkClick(x, y) {
		this.leftButton.checkClick(x, y);
		this.rightButton.checkClick(x, y);
		//this.defaultButton.checkClick(x, y);
	}
	handleLeft() {
		this.choiceIndex--;
		if (this.choiceIndex < 0)
			this.choiceIndex += this.option.choices.length;
		this.changeSetting();
	}
	handleRight() {
		this.choiceIndex = (this.choiceIndex + 1) % this.option.choices.length;
		this.changeSetting();
	}
	changeSetting() {
		settings[this.option.id] = this.option.choices[this.choiceIndex].id;
		if (this.option.func)
			this.option.func(settings[this.option.id]);
		saveSettings();
	}
}