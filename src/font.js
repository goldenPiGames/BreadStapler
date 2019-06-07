const TEXT_HEIGHT = 24;
const TEXT_WIDTH = 16;

var fontsheettable = 
	["0123456789+-%",
	 "ABCDEFGHIJKLM",
	 "NOPQRSTUVWXYZ",
	 "abcdefghijklm",
	 "nopqrstuvwxyz",
	 " ,.?!/<>;:()'è",
	 //"             ",
	];
var fontset = {
	image : makeImage("src/font.png")
};
for (var i = 0; i < fontsheettable.length; i++) {
	for (var j = 0; j < fontsheettable[i].length; j++) {
		fontset[fontsheettable[i][j]] = {
			x : j * TEXT_WIDTH,
			y : i * TEXT_HEIGHT,
			width : TEXT_WIDTH,
			height : TEXT_HEIGHT,
			parent : fontset,
			image : fontset.image,
		}
	}
}

function drawText(text, x, y, right, sizemult) {
	if (typeof text != "string")
		text = ""+text;
	var width = text.length * TEXT_WIDTH;
	for (var i = 0; i < text.length; i++) {
		drawSprite(fontset[text[i]], x - width*right + i*TEXT_WIDTH, y, 0, 0);
	}
}

function drawParagraph(text, x, y, width, xoff=0, yoff=0, bg=null) {
	ctx.fillStyle = bg;
	var maxLength = Math.floor(width/TEXT_WIDTH);
	var words = text.split(" ");
	var lines = [];
	var currentLine = "";
	while (words.length > 0) {
		var word = words.shift();
		if (word == "<br>") {
			lines.push(currentLine.trim());
			currentLine = "";
		} else {
			if (currentLine.length + word.length > maxLength) {
				lines.push(currentLine.trim());
				currentLine = "";
			}
			currentLine += word + " ";
		}
	}
	if (currentLine)
		lines.push(currentLine.trim());
	var basey = y - yoff*TEXT_HEIGHT*lines.length;
	if (bg) {
		ctx.fillStyle = bg;
		ctx.fillRect(x, basey, width, TEXT_HEIGHT*lines.length);
	}
	lines.forEach(function(oj, dex) {
		//console.log(oj, x+width*xoff, basey+TEXT_HEIGHT*dex, xoff);
		drawText(oj, x+width*xoff, basey+TEXT_HEIGHT*dex, xoff);
	});
	//console.log(lines);
	/*var lines = 0;
	var rx = x + width;
	var words = text.split(" ");
	var cx = x;
	while (words.length > 0) {
		var word = words.shift();
		if (word == "<br>") {
			y += TEXT_HEIGHT;
			lines++;
			cx = x;
		} else {
			if (cx + word.length*TEXT_WIDTH > rx) {
				y += TEXT_HEIGHT;
				lines++;
				cx = x;
			}
			drawText(word, cx, y, 0);
			cx += (word.length+1)*TEXT_WIDTH;
		}
	}
	return lines;*/
}

function TextFader(text, x, y) {
	this.text = text;
	this.x = x;
	this.y = y;
}
TextFader.prototype.fade = 1;
TextFader.prototype.drawAfter = function() {
	ctx.globalAlpha = this.fade;
	drawText(this.text, this.x, this.y-TEXT_HEIGHT/2, 0.5);
	this.fade -= 1/40;
	return (this.fade > 0);
}