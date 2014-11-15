function displayImage(query){
	$.getJSON('./imgur.py', {query:query}, function(res){
		console.log(res);
		$('body').append('<h1 style="font-size:100px;">'+query+'</h1>');
		$('body').append('<img width="500" src="' + res.url + '"/>');
	})
}

$(function(){
	displayImage("rapper");
})
