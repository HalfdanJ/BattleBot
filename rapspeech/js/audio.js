//http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound

var ctx;
var gradient;
var context = new AudioContext();
var audioBuffer;
var sourceNode;
var splitter;
var analyser, analyser2;
var javascriptNode;
var max = 0;

function playSound(buffer) {
	sourceNode.buffer = buffer;
	sourceNode.start(0);
}

// log if an error occurs
function onError(e) {
	console.log(e);
}


/*--this function triggers YO-------------------------------------------------------*/
function setAudioEvents(){
	// when the javascript node is called
	// we use information from the analyzer node to draw the volume
	javascriptNode.onaudioprocess = function() {
		// get the average for the first channel
		var array =  new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(array);
		var average = getAverageVolume(array);

		// get the average for the second channel
		// var array2 =  new Uint8Array(analyser2.frequencyBinCount);
		// analyser2.getByteFrequencyData(array2);
		// var average2 = getAverageVolume(array2);

		// clear the current state
		ctx.clearRect(0, 0, 60, 130);

		// set the fill style
		ctx.fillStyle=gradient;

		// create the meters
		// ctx.fillRect(0,130-average,25,130);
		// ctx.fillRect(30,130-average2,25,130);

//		var ave = average + average2 / 2;
		var ave = average;
		ctx.fillRect(0,130-ave,25,130);

		if(max < ave){
			max = ave;
			console.log(max);
		}

		//---here is threshold
		if(ave > 105){
			console.log("yo");
			var rap = ["Yo", "Yo", "Yo", "Yo", "Yo", "hey", "hey", "What's up",  "say"];
			var say = rap[Math.floor(Math.random()*rap.length)];
			speak(say, {amplitude: 800}, function(){});
			$('#keymonitor').empty();
			$('#keymonitor').append('<div id="letter">'+say+'</div>');
		}

	}
}


function getAverageVolume(array) {
	var values = 0;
	var average;
	var range = array.length;

	//--- get the frequency amplitudes inside range
	for (var i = 0; i < range; i++) {
		values += array[i];
	}

	average = values / range;
	return average;
}


function loadSound(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// When loaded decode the data
	request.onload = function() {
		// decode the data
		context.decodeAudioData(request.response, function(buffer) {
			// when the audio is decoded play the sound
			playSound(buffer);
		}, onError);
	}

	request.send();
}


function setupAudioNodes() {
	// setup a javascript node
	javascriptNode = context.createScriptProcessor(2048, 1, 1);

	// connect to destination, else it isn't called
	javascriptNode.connect(context.destination);

	// setup a analyzer
	analyser = context.createAnalyser();
	analyser.smoothingTimeConstant = 0.3;
	analyser.fftSize = 1024;

	analyser2 = context.createAnalyser();
	analyser2.smoothingTimeConstant = 0.0;
	analyser2.fftSize = 1024;

	// create a buffer source node
	sourceNode = context.createBufferSource();
	splitter = context.createChannelSplitter();

	// connect the source to the analyser and the splitter
	sourceNode.connect(splitter);

	// connect one of the outputs from the splitter to
	// the analyser
	splitter.connect(analyser,0,0);
	splitter.connect(analyser2,1,0);

	// connect the splitter to the javascriptnode
	// we use the javascript node to draw at a
	// specific interval.
	analyser.connect(javascriptNode);

	//        splitter.connect(context.destination,0,0);
	//        splitter.connect(context.destination,0,1);

	// and connect to destination
	sourceNode.connect(context.destination);
}


/*--this function is beginning-------------------------------------------------------*/
function setupAudioAndCanvas(){
	// create the audio context (chrome only for now)
	if (! window.AudioContext) {
		if (! window.webkitAudioContext) {
			alert('no audiocontext found');
		}
		window.AudioContext = window.webkitAudioContext;
	}

	// get the context from the canvas to draw on
	ctx = $("#canvas").get()[0].getContext("2d");

	// create a gradient for the fill. Note the strange
	// offset, since the gradient is calculated based on
	// the canvas, not the specific element we draw
	gradient = ctx.createLinearGradient(0,0,0,130);
	gradient.addColorStop(1,'#000000');
	gradient.addColorStop(0.75,'#ff0000');
	gradient.addColorStop(0.25,'#ffff00');
	gradient.addColorStop(0,'#ffffff');

	// load the sound
	setupAudioNodes();
	loadSound("cypress1.mp3");
	setAudioEvents();
}



