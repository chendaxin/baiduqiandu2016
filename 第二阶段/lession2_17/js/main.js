//转换数据格式
function getDateStr(dat){
  var y = dat.getFullYear();    //返回表示当前年份的四位数字
  var m = dat.getMonth() + 1;   //getMonth（）返回0-11的数来表示当前月份
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();         //返回月份中的某一天，1-31之间的数
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;	
}
//随机生成模拟数据
function randomBuildData(seed){
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);   //得到与每天相对应的随机空气质量指数数据
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;	
}
//city数据
var cityData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
}
//封装id获取对象
function $(id){
	return document.getElementById(id);
}
//获取处理对象
var formtime = $('form-gra-time'),
	cityselect = $('city-select'),
	aqiwrap = $('aqi-chart-wrap');
//渲染柱状图的数据
var uiData = {

}
//记录当前页面的选项
var currentPage = {
  nowSelectCity: "北京",
  nowGraTime: "day",
  width:20
}
//渲染柱状图界面
function applyUi(){
  var content=" ";
  for(var item in uiData){
    var bg="#" + Math.random().toString(16).substring(2, 8);   //得到背景的随机颜色
    content += '<div class="div" style="height:'+uiData[item]+'px;width:'+currentPage.width+'px;background-color:'+bg+';"'+'title="'+item+'  空气质量指数：'+uiData[item]+'">'+
   '</div>';
  }  
   aqiwrap.innerHTML = content;	
}
//初始化radio
function initRadio(){
	formtime.addEventListener('change', radioChange);
}
//检测radio是否发生了变化
function radioChange(){
	var inputArr = document.getElementsByTagName('input');
	for(var i=0; i<inputArr.length; i++){
		if(inputArr[i].checked){
			currentPage.nowGraTime = inputArr[i].value;
		}
	}
	initDate();
}
//初始化select
function initSelect(){
	var count = "";
	for(var item in cityData){
		count += '<option value="'+item+'">'+item+'</option>';
	}
	cityselect.innerHTML = count;
	cityselect.addEventListener('change', selectChange);
}
//检测select是否发生了变化
function selectChange(){
	var option = document.getElementsByTagName('option');
	for(var i=0; i<option.length; i++){
		if(option[i].selected){
			currentPage.nowSelectCity = option[i].value;
		}
	}
	initDate();
}
//初始化渲染图的数据
function initDate(){
	var char = cityData[currentPage.nowSelectCity];
	switch(currentPage.nowGraTime){
		case "day":{
			uiData = {};
			uiData = char;
			currentPage.width = 10;
			break;
		}
		case "week":{
	      uiData={};
	      var sum=0,i=0,week=0;
	      for(var item in char){
	        sum+=char[item];
	        i++;
	        if(new Date(item).getDay()==6) {
	          week++;
	          uiData['2016年第'+week+'周']=Math.round(sum/i);
	          sum=0;i=0;
	        }
	     }
	      if(sum!=0){
	         week++;
	         uiData['2016年第'+week+'周']=Math.round(sum/i);
	      }
	      currentPage.width = 100;
	      break;
	    }
		case "month":{
	      uiData={};
	      var sum=0,i=0,month=0;
	      for(var item in char){
	        if((new Date(item)).getMonth()==month) {
	          sum+=char[item];
	          i++;
	        }
	        else{
	          month++;
	          uiData['2016年'+month+'月']=Math.round(sum/i);
	          sum=0;i=0;
	          sum+=char[item];
	          i++;
	        }
	      }
	      if(sum!=0){
	        month++;
	        uiData['2016年'+month+'月']=Math.round(sum/i);
	      }
	      currentPage.width = 300;
	      break;
	    }
	}
	applyUi();
}
//js入口
function init(){
	initRadio();
	initSelect();
	initDate();
	
}
init();
