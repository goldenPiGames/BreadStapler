class WorldSky extends World {
	constructor() {
		super("sky", "#55AAEE");
	}
}

if (settings.dev)
	WORLDS.push({
		lName : "world-sky",
		id : "sky",
		color : "#55AAEE",
		cons:WorldSky,
	});

