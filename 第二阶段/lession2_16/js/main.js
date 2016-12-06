function $(id){
	return document.getElementById(id);
}
var cityInput = $("aqi-city-input"),
	numInput = $("aqi-value-input"),
	data = {};

//验证
function check(){
	var city = cityInput.value.trim();
	var num = numInput.value.trim();
	if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！")
        return;
    }
    if(!num.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！")
        return;
    }
    data[city] = num;
}
//渲染表格
function apply(){
	var value = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var city in data){
		value += "<tr><td>"+city+"</td><td>"+data[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>";
	}
	$("aqi-table").innerHTML = city ? value : "";
}
//控制程序进程
function progress(){
	check();
	apply();
}
//删除
function deleteList(city){
	delete data[city];
	apply();
}

function init(){
	$("add-btn").onclick = function(){
		progress();
	}
	$("aqi-table").addEventListener('click', function(event){
		if(event.target.nodeName.toLowerCase() == "button" ){
			deleteList(event.target.dataset.city);
		}
	})
	
}
init();
