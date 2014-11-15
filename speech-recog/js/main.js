/*
https://github.com/GoogleChrome/webplatform-samples/blob/master/webspeechdemo/webspeechdemo.html

http://www.sitepoint.com/introducing-web-speech-api/

Web speech api asks a permission everytime but in https it happens just for the first time.
http://tips.hecomi.com/entry/20130121/1358790987
*/

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

var recognizing = false;
var time = 0;
var countInterval;
var mode = "hayakuchi";

function setEvents(){

	$("#speech_btn").click(function(){
		if(recognizing){
			recognition.stop();
			return;
		}
		recognition.start();
	});

	recognition.onstart = function(){
		console.log("start");
		recognizing = true;
		$("#speech_btn").children("img").attr("src","./img/mic-animate.gif");
	}

	recognition.onend = function(){
		console.log("end");
		recognizing = false;
		$("#speech_btn").children("img").attr("src","./img/mic.gif");
	}

	recognition.onresult = function(e) {
		console.log("result");
		console.log(e);
		if(e.results.length > 0){
			console.log(e.results[0]);
			$("#result").html(e.results[e.results.length-1][0].transcript);
		}else{
			console.log("no result");
			$("#result").html("no result");
		}
	}

	recognition.onerror = function(e) {
		console.log("error");
		console.log(e);
	}
}

$(function(){
	setEvents();
});