var trees;
const TREE_EDGE_MULT = .90;

const TreeBase = {
	y : 0,
	height : SIZE,
	update : doNothing,
	draw : function() {
		ctx.globalAlpha = 1;
		drawSprite(this.image, this.x, 0, 1/2, 0);
		if (settings.stay) {
			ctx.globalAlpha = settings.stay;
			this.affixed.forEach(oj => oj.draw());
		}
	},
	collides : genCollidesPillar(TREE_EDGE_MULT),
	/*collides : function(x, y) {
		var xoff = Math.floor(Math.abs(x - this.x));
		if (xoff > this.width/2)
			return false;
		return 1-(xoff/this.width)*2*(1-TREE_EDGE_MULT);
	},*/
	affix : function(obj, punt) {
		//console.log(obj, punt)
		this.affixed.push(obj);
		this.affixEx(obj, punt);
	},
	affixEx : doNothing,
}

function Oak(x = SIZE/2) {
	this.x = x;
	this.affixed = [];
}
Oak.prototype = Object.create(TreeBase);
Oak.prototype.name = "Oak";
Oak.prototype.description = "A large and tough tree. Staple some bread to it. Sometimes found in small groups.";
Oak.prototype.image = makeImage("src/treesprites/oak.png");
Oak.prototype.width = 90;

function Birch(x = SIZE/2) {
	this.x = x;
	this.affixed = [];
}
Birch.prototype = Object.create(TreeBase);
Birch.prototype.name = "Birch";
Birch.prototype.description = "On the thin side, and often found in groups. Otherwise just like any other tree.";
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