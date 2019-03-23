var instructionsScreen = {
	backButton : new TextButton("BACK", function(){mainMenu.begin()}, 10, SIZE - 10, 0, 1),
	prevButton : new TextButton("PREV", function(){instructionsScreen.slideIndex--; instructionsScreen.putSlide()}, 10, SIZE - 10, 0, 1),
	nextButton : new TextButton("NEXT", function(){instructionsScreen.slideIndex++; instructionsScreen.putSlide()}, SIZE-10, SIZE - 10, 1, 1),
	doneButton : new TextButton("DONE", function(){mainMenu.begin()}, SIZE-10, SIZE - 10, 1, 1),
	slideIndex : 0,
	slideGetters : [
		function() {
			var slid = new InstructionSlide("Click or touch to launch a staple.", function() {
				
			});
			return slid;
		},
		function() {
			var slid = new InstructionSlide("Hit both a piece of bread and a tree to staple the bread to the tree.", function() {
				
			});
			return slid;
		},
		function() {
			var slid = new InstructionSlide("The closer you get to the center, the more points you get.", function() {
				
			});
			return slid;
		},
		function() {
			var slid = new InstructionSlide("Remember, what matters is staple->bread and staple->tree, not bread->tree.", function() {
				
			});
			return slid;
		},
	],
	begin : function() {
		runnee = this;
		this.slideIndex = 0;
		this.putSlide();
	},
	update : function() {
		
	},
	draw : function() {
	ctx.fillStyle = "#80807F";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.currentSlide.draw();
		this.leftButton.draw();
		this.rightButton.draw();
	},
	click : function(x, y) {
		this.leftButton.checkClick(x, y);
		this.rightButton.checkClick(x, y);
	},
	putSlide : function() {
		this.currentSlide = this.slideGetters[this.slideIndex]();
		this.leftButton = this.slideIndex > 0 ? this.prevButton : this.backButton;
		this.rightButton = this.slideIndex < this.slideGetters.length-1 ? this.nextButton : this.doneButton;
	},
}

function InstructionSlide(text, drawEx = doNothing) {
	this.text = text;
	this.drawEx = drawEx;
	//this.image = makeImage("src/instrucslides/"+imagesrc+".png");
}
InstructionSlide.prototype.draw = function() {
	//drawSprite(this.image, SIZE/2, SIZE, 0.5, 1);
	this.drawEx();
	drawText("UNDER CONSTRUCTION", SIZE/2, SIZE*2/3, .5);
	drawParagraph(this.text, 0, 0, SIZE);
}