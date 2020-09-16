var trees;
const TREE_EDGE_MULT = .90;

class TreeBase {
	constructor() {
		this.affixed = [];
	}
	update() {
		
	}
	draw() {
		ctx.globalAlpha = 1;
		drawSprite(this.image, this.x, 0, 1/2, 0);
		if (settings.stay) {
			ctx.globalAlpha = settings.stay;
			this.affixed.forEach(oj => oj.draw());
		}
	}
	/*collides : function(x, y) {
		var xoff = Math.floor(Math.abs(x - this.x));
		if (xoff > this.width/2)
			return false;
		return 1-(xoff/this.width)*2*(1-TREE_EDGE_MULT);
	}*/
	affix(obj, punt) {
		//console.log(obj, punt)
		this.affixed.push(obj);
		this.affixEx(obj, punt);
	}
	affixEx() {
		
	}
}
TreeBase.prototype.y = 0;
TreeBase.prototype.height = SIZE;
TreeBase.prototype.collides = genCollidesPillar(TREE_EDGE_MULT);

class Oak extends TreeBase {
	constructor(x = SIZE/2) {
		super();
		this.x = x;
	}
}
Oak.prototype.lName = "oak-name";
Oak.prototype.lDesc = "oak-desc";
Oak.prototype.image = makeImage("src/treesprites/oak.png");
Oak.prototype.width = 90;

class Birch extends TreeBase {
	constructor(x = SIZE/2) {
		super();
		this.x = x;
	}
}
Birch.prototype.lName = "birch-name";
Birch.prototype.lDesc = "oak-desc";
Birch.prototype.image = makeImage("src/treesprites/birch.png");
Birch.prototype.width = 60;


function evenlySpacedTrees(cons, num) {
	var width = cons.prototype.width;
	var tween = (SIZE-(width*num))/(num+1);
	var zerol = -width/2;
	var inter = tween + width;
	var bark = [];
	for (var i = 1; i <= num; i++) {
		bark.push(new cons(zerol + inter*i));
	}
	return bark;
}