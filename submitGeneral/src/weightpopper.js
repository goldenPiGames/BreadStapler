function WeightPopper(base) {
	this.base = base;
	this.tickets = Array.prototype.slice.call(arguments, 1);
	//-console.log(this.tickets)
}
WeightPopper.prototype.pop = function() {
	var base = this.base;
	var totalweight = 0;
	var totalbase = 0;
	//console.log(this);
	this.tickets.forEach(function(oj) {
		totalbase += oj.baseWeight;
		totalweight += oj.baseWeight*Math.pow(base, oj.exp);
		oj.rafflebound = totalweight;
		//console.log(oj + ": " + oj.rafflebound);
	});
	var roll = Math.random()*totalweight;
	var toreturn = null;
	this.tickets.forEach(function(oj) {
		oj.exp += oj.baseWeight;
		if (!toreturn && oj.rafflebound >= roll) {
			toreturn = oj;
			oj.exp -= totalbase;
		}
	});
	//console.log(toreturn);
	return toreturn.value;
}

function WeightPopperTicket(value, baseWeight) {
	this.value = value;
	this.baseWeight = baseWeight;
	this.exp = 0;
}
/* WeightPopperTicket.prototype.getWeight = function(base) {
	return this.baseWeight*Math.pow(base, this.exp);
} */
//this.exp += this.baseWeight; //when not chosen
//exp -= totalBaseWeight; //when chosen