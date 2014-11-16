var keycodeMap = {
	'length' : null,
	'map' : {
		48 : { key : '0'},
		49 : { key : '1'},
		50 : { key : '2'},
		51 : { key : '3'},
		52 : { key : '4'},
		53 : { key : '5'},
		54 : { key : '6'},
		55 : { key : '7'},
		56 : { key : '8'},
		57 : { key : '9'},
		58 : { key : null},
		59 : { key : null},
		60 : { key : null},
		61 : { key : null},
		62 : { key : null},
		63 : { key : null},
		64 : { key : null},
		65 : { key : 'a'},
		66 : { key : 'b'},
		67 : { key : 'c'},
		68 : { key : 'd'},
		69 : { key : 'e'},
		70 : { key : 'f'},
		71 : { key : 'g'},
		72 : { key : 'h'},
		73 : { key : 'i'},
		74 : { key : 'j'},
		75 : { key : 'k'},
		76 : { key : 'l'},
		77 : { key : 'm'},
		78 : { key : 'n'},
		79 : { key : 'o'},
		80 : { key : 'p'},
		81 : { key : 'q'},
		82 : { key : 'r'},
		83 : { key : 's'},
		84 : { key : 't'},
		85 : { key : 'u'},
		86 : { key : 'v'},
		87 : { key : 'w'},
		88 : { key : 'x'},
		89 : { key : 'y'},
		90 : { key : 'z'}
	}
};


function setEvents(){
	$('body').keyup(function(e){
		var keyNum = e.keyCode;

//play speak
	// speak(keycodeMap.map[keyNum].key, {amplitude: 800}, function(){
	// 	$('#keymonitor').empty();
	// 	$('#keymonitor').append('<div id="letter">'+keycodeMap.map[keyNum].key+'</div>');
	// });

//		speak("hello", {amplitude: 800}, function(){});

	});
}



$(function(){
	setupAudioAndCanvas();
	setEvents();
});



