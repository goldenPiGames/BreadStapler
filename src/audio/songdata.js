const MUSIC_LIST = [
	//{name:"Breeze",               by:"PeriTune",      yt:"RINkM_o-e4I", site:"https://peritune.com/breeze/"},
	{name:"Prairie",
		by:"PeriTune", yt:"iMkX3NxQYv0", site:"https://peritune.com/prairie/", sc:"sei_peridot/prairie"},
	{name:"Strategy 3",           by:"PeriTune",      yt:"tqS-DwicQCo", site:"https://peritune.com/strategy3/", sc:"sei_peridot/strategy3"},
	{name:"Havoc", loopStart:4.304, loopEnd:112.101, 
		by:"PeriTune", yt:"yfE5y2uiBX0", site:"https://peritune.com/havoc", sc:"sei_peridot/havoc"},
	{name:"Underwater Coolness", 
		by:"Eric Matyas", site:"https://soundimage.org/nature-science-3/"},
	{name:"War of the Pianos", 
		by:"Darren Curtis", yt:"CP8HoV4ArHw", site:"https://www.darrencurtismusic.com/piano", sc:"desperate-measurez/war-of-the-pianos-royalty-free"},
	{name:"Rapid", 
		by:"PeriTune", yt:"pjc00EfBuKo", site:"https://peritune.com/rapid/", sc:"sei_peridot/rapid"},
	{name:"Rapid 4", 
		by:"PeriTune", yt:"g3c-dHAI-ts", site:"https://peritune.com/rapid4/", sc:"sei_peridot/rapid4"},
	{name:"Everlasting Snow", loopStart:12.502154195011338, loopEnd:125.00213151927437,
		by:"YouFulca", yt:"qafGl7a-PuM", site:"https://wingless-seraph.net/en/material-music_dangeon.html"},
	{name:"Beatdown City", by:"Darren Curtis", yt:"qL4u3u5WKgU", site:"https://www.darrencurtismusic.com/retro", sc:"desperate-measurez/beatdown-city-80s-action-theme-royalty-free"},
	{name:"Up In My Jam (All Of A Sudden)",
		by:"Kubbi", yt:"6DB6hBRPsWc", site:"https://kubbimusic.com/track/up-in-my-jam-all-of-a-sudden", sc:"kubbi/up-in-my-jam-all-of-a-sudden"},
	//{name:"Samurai Sake Showdown",by:"Darren Curtis", yt:"NOGZX7Z4wSI", site:"https://www.darrencurtismusic.com/world-ethnic", sc:"desperate-measurez/samurai-sake-showdown-asian-royalty-free-music", loopStart:0.7, loopEnd:69.664},
	{name:"Tempest", 
		by:"Darren Curtis", yt:"NsSYDbyQteg", site:"https://www.darrencurtismusic.com/fantasy"},
	{name:"Machinery", 
		by:"PeriTune", yt:"7zT8zYYyxFg", site:"https://peritune.com/machinery/", sc:"sei_peridot/machinery"},
	{name:"Dark Anthem", 
		by:"Darren Curtis", yt:"G-VY51L2AQU", site:"https://www.darrencurtismusic.com/horror-mystery"},//loopStart:0, loopEnd:201.175},//loopStart:8.743, loopEnd:200.673},
	//{name:"Gothic Dark",          by:"PeriTune",      yt:"brZWB8cdBDs", site:"https://peritune.com/gothic_dark/", loopStart:10.977, loopEnd:89.727},//loopStart:7.482, loopEnd:86.232},
	{name:"Demise", loopStart:13.111, loopEnd:99.403, 
		by:"PeriTune", yt:"Ouj_cwWJdmo", site:"https://peritune.com/demise/", sc:"sei_peridot/demise", loopStart:13.111, loopEnd:99.403},
	//{name:"Urban Jungle 2061",    by:"Eric Matyas", site:"http://soundimage.org/sci-fi/"},
	{name:"Don't Sleep", loopStart:13.81606, loopEnd:97.81608, 
		by:"Ucchii 0", yt:"pluUDQCBSso", site:"https://creofuga.net/audios/106981"},
	//{name:"BattleField 2",        by:"PeriTune",      yt:"SWDVaQ8WAyM", site:"https://peritune.com/battlefield2/", loopStart:9, loopEnd:91.33},
	//{name:"Hong Kong Midnight",   by:"Eric Matyas", site:"https://soundimage.org/world/"},
	//{name:"Blast 2",              by:"PeriTune",      yt:"3orQ-zmYZiQ", site:"https://peritune.com/blast2/", ogg:true},
	//{name:"BattleField 4",        by:"PeriTune",      yt:"IR1aVoMOoRs", site:"https://peritune.com/battlefield4/", ogg:true},
	//{name:"Secret Power",         by:"Ucchii 0",      yt:"ivspAGvhA8E", site:"https://creofuga.net/audios/106993", loopStart:16.093, loopEnd:330.35, ogg:true},
	//{name:"Seiiki Kessen",        by:"Ucchii 0",      yt:"6Yx2__wLYek", loopStart:11.380, loopEnd:169.484},
];

const MUSIC_HASH = {};
const MUSIC_BY_ARTIST = {};

MUSIC_LIST.forEach(function(sing, dex) {
	if (!sing.iname)
		sing.iname = ((sing.fname || sing.name) + "-" + sing.by).replace(/\s/g, "");
	sing.src = "src/audio/songs/" + sing.iname + ".mp3";
	MUSIC_HASH[sing.name + " - " + sing.by] = sing;
	MUSIC_HASH[sing.name] = sing;
	sing.index = dex;
	if (!MUSIC_BY_ARTIST[sing.by])
		MUSIC_BY_ARTIST[sing.by] = [sing.name];
	else
		MUSIC_BY_ARTIST[sing.by].push(sing.name);
});