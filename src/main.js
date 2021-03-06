const SIZE = 360;
var gameInterval;
var canvas;// = document.getElementById("GraphicsBox");
var ctx;
var eventCatcher;
var body;
var loadingTotal = 0;
var loadedYet = 0;
const ALWAYS_RESIZE = false;
const ERROR_THROW = true; //TODO set this to false for release versions

function startLoading() {
	body = document.getElementById("Body");
	backDiv = document.getElementById("BackgroundBox");
	canvas = document.getElementById("GraphicsBox");
	ctx = canvas.getContext("2d");
	//gameInterval = setInterval(hasLoaded, 250);
	
	eventCatcher = document.getElementById("GraphicsBox");
	
	fitCanvas();
	window.addEventListener("resize", fitCanvas);
	
	addEvents();
	initSFX();
	initMusic();
	sceneScreen.init();
	/*
	launchGame();
}

function launchGame() {*/
	runnee = new MainMenu();
	coreEngine.start();
}

function fitCanvas(e) {
	var rekt = backDiv.getBoundingClientRect();
	if (!document.fullscreen && settings.stretch != "always" && rekt.width > SIZE*2 && rekt.height > SIZE*2) {
		canvas.classList.remove("fullscreenWider");
		canvas.classList.remove("fullscreenTaller");
		canvas.classList.add("partscreen");
	} else if (rekt.width/rekt.height >= 1) {
		canvas.classList.remove("partscreen");
		canvas.classList.remove("fullscreenTaller");
		canvas.classList.add("fullscreenWider");
	} else {
		canvas.classList.remove("partscreen");
		canvas.classList.remove("fullscreenWider");
		canvas.classList.add("fullscreenTaller");
	}
	var size = canvas.getBoundingClientRect().width;
	if (size == SIZE*2)
		backDiv.classList.add("pixellated");
	else
		backDiv.classList.remove("pixellated");
}

function throwMaybe(...args) {
	if (ERROR_THROW) {
		throw args[0]
	} else {
		console.log(...args);
	}
}

function PRound(num, seed) {
	var whole = Math.floor(num);
	var partial = num-whole;
	if (seed == undefined)
		return whole + ((Math.random() < partial) ? 1 : 0);
	return whole + ((seed < partial) ? 1 : 0);
}

function doNothing() {
	
}

function fillLeft(str, length, filler="0") {
	str = "" + str;
	while(str.length < length) {
		str = filler+str;
	}
	return str;
}

function round(num, precision) {
	var mult = Math.pow(10, precision);
	return Math.round(num*mult)/mult;
}

function asPercent(num, precision = 0) {
	return round(num*100, precision)+"%";
}

function shuffle(ray) {
	var currdex = ray.length;
	while (currdex > 0) {
		var randex = Math.floor(Math.random() * currdex);
		currdex --;
		var temp = ray[currdex];
		ray[currdex] = ray[randex];
		ray[randex] = temp;
	}
	return ray;
}

function clearBack() {
	ctx.globalAlpha = 1;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSprite(sprite, x, y, woff = 0, hoff = 0) {
	if (!sprite)
		return;
	if (sprite instanceof HTMLImageElement) {
		ctx.drawImage(sprite, Math.round(x - woff*sprite.width), Math.round(y - hoff*sprite.height));
	} else if (sprite.image) {
		//console.log(sprite.image)
		//if (woff == .5)
		//	console.log(sprite.x, sprite.y, sprite.width, sprite.height, x - woff*sprite.width, y - hoff*sprite.height, sprite.width, sprite.height)
		ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, Math.round(x - woff*sprite.width), Math.round(y - hoff*sprite.height), sprite.width, sprite.height)
	}
}

function makeImage(sauce) {
	var img = new Image();
	loadingTotal++;
	img.onload = function() {
		loadedYet++;
		//console.log("shub");
		//img.crossOrigin = "anonymous";
	};
	img.src = sauce;
	return img;
}

function makeSprites(sauce, sheetData) {
	if (typeof sauce == "string") {
		sauce = makeImage(sauce);
	}
	for (sub in sheetData) {
		if (sub == "image")
			throw "You cannot have a sprite named \"image\".";
		sheetData[sub].image = sauce;
		sheetData[sub].parent = sheetData;
	}
	sheetData.image = sauce;
	return sheetData;
}