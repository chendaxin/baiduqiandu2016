(function(){
	var $ = function(id){
		return document.getElementById(id);
	};
	var handler = function(){
		var num = parseInt($("aqi-input").value);
		if(!NaN && (num>0) && (num<1000)){
			$("aqi-display").innerHTML = num;
		}else {
			alert($("aqi-input").value + " 不是有效的AQI数值，请重新输入0-1000的有效整数！");
		}
	};
	$("button").onclick = function(){
		handler();
	}
	$("aqi-input").onkeyup = function(event){
		if(event.keyCode === 13){
			handler();
		}
	}

})();
