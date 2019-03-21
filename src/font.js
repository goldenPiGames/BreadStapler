const TEXT_HEIGHT = 24;
const TEXT_WIDTH = 16;

var fontsheettable = 
	["0123456789+-%",
	 "ABCDEFGHIJKLM",
	 "NOPQRSTUVWXYZ",
	 "abcdefghijklm",
	 "nopqrstuvwxyz",
	 " ,.?!/<>;:()'è",
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

function drawParagraph(text, x, y, width) {
	var lines = 0;
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
	return lines;
}