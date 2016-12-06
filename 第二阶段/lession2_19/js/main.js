var arr=[];
var strr="";
var bottomNum=document.getElementById("bottom");
var text=document.getElementById("text");
var timer=null;
function change() {
    var bt1=document.getElementById("bt1");
    var bt2=document.getElementById("bt2");
    var bt3=document.getElementById("bt3");
    var bt4=document.getElementById("bt4");
    var bt5=document.getElementById("bt5");
    var bt6=document.getElementById("bt6");
    var bt7=document.getElementById("bt7");
    
    
    bt1.addEventListener('click',function(){
        inputRule();
        arr.unshift(text.value);
        arrChange();
    },false);
    bt2.addEventListener('click',function(){
        inputRule();
        arr.push(text.value);
        arrChange();
    },false);
    bt3.addEventListener('click',function(){
        arr.shift(text.value);
        arrChange();
    },false);
    bt4.addEventListener('click',function(){
        arr.pop(text.value);
        arrChange();
    },false);
    bt5.addEventListener('click',function(){
        resort();
    },false);
    bt6.addEventListener('click',function(){
        clear();
    },false);
    bt7.addEventListener('click',function(){
        randomArr();
        arrChange();
    },false);
}
//确定input规则
function inputRule(){
    tex=text.value.trim();
    if (tex>100||tex<10) {
        alert("请输入10-100的数");
        text.value="";
    }
    if (/[^\d]/.test(tex)) {
        alert("请输入10-100的数");
        text.value="";
    }
    if (arr.length>80) {
        alert("数组长度不能超过60");
        text.value="";
    }
}
//清空数组
function clear(){
    clearInterval(timer);
    arr=[];
    arrChange();
}
//随机生成60个[10-100]的数
function randomArr(){
    clear();
    for(var i=0;i<60;i++){
        arr.push(Math.floor(Math.random()*91+10));
    }
}
//渲染数组
function arrChange(){
    if (arr.length) {
        for(var i=0;i<arr.length;i++){
                strr+='<div class="bottomDiv" style="height:'+arr[i]+'px">'+arr[i]+'</div>';
            }
    }
    bottomNum.innerHTML=strr;
    strr="";
}
//冒泡排序
function resort(){
    clearInterval(timer);
    var i=0,j=0,len=arr.length;
    timer=setInterval(function(){
        if (i<len-1) {
            if (j==len-1-i) {
                j=0;
                i++;
            }
            if (arr[j]>arr[j+1]) {
                var x=0;
                x=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=x;
            }
            j++;
        }                   
        arrChange();
        if (i==arr.length-1) {
            clearInterval(timer);
        }
    },10);
}
function start(){
    change();
}
start();