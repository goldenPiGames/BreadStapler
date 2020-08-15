const STAPLE_DAMAGE = 5;

class Boss extends TreeBase {
	constructor(diffMult = 1) {
		super();
		this.maxHP = Math.ceil(this.baseMaxHP * diffMult);
		this.HP = this.maxHP;
		this.diffMult = diffMult;
		this.affixed = [];
		this.shieldActive = false;
	}
	currentBenchmark = null;
	checkBenchmarks() {
		//console.log(this.getHPPortion(), this.benchmarks[0].portion)
		//console.log(this.benchmarks)
		if (this.benchmarks.length > 0 && this.getHPPortion() <= this.benchmarks[0].portion) {
			this.currentBenchmark = this.benchmarks.shift();
			this.currentBenchmark.activate(this);
		}
	}
	respondFall(slice) {
		
	}
	pushBreadNormally() {
		return true;
	}
	affix(obj, punt) {
		//console.log(obj, punt)
		this.affixed.push(obj);
		this.affixEx(obj, punt);
		this.HP -= punt || (this.shieldActive ? 0 : STAPLE_DAMAGE);
	}
	/*collides(x, y) {
		var xoff = Math.floor(Math.abs(x - this.x));
		if (xoff > this.width/2)
			return false;
		else if (this.shieldActive)
			return .02;
		else
			return 1-(xoff/this.width)*2*(1-TREE_EDGE_MULT);
	}*/

	getHPPortion() {
		return this.HP / this.maxHP;
	}
	isDead() {
		return this.HP <= 0;
	}
	drawHPBar() {
		ctx.globalAlpha = .7;
		ctx.lineWidth = 2;
		var barx = this.x - this.width/2
		var bary = this.y + this.height/2 + 5;
		var barwidth = this.width * this.getHPPortion();
		ctx.globalAlpha = .7;
		ctx.strokeStyle = "#000000";
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(barx, bary, barwidth, 5);
		ctx.strokeRect(barx, bary, barwidth, 5);
	}
}
Boss.prototype.lName = "bossbattle";
Boss.prototype.lDesc = "bossbattle-desc";
//Boss.prototype.name = "Boss";
//Boss.prototype.description = "An enemy. Deplete its HP (by stapling bread to it) before it does the same to you.";
Boss.prototype.diffMult = 1;

class Benchmark {
	constructor(portion, func, marker) {
		this.portion = portion;
		this.x = (SIZE-BAR_MARGINS*2)*portion + BAR_MARGINS;
		this.func = func;
		this.marker = marker;
	}
	activate(user) {
		this.func.call(user);
	}
	draw() {
		//console.log(this.x)
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#FFFFFF";
		ctx.beginPath();
		ctx.moveTo(this.x, BAR_MARGINS);
		ctx.lineTo(this.x, BAR_MARGINS+BAR_HEIGHT);
		ctx.stroke();
	}
}