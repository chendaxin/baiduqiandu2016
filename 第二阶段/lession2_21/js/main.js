function $(id){
    return document.getElementById(id);
}
var tagText=$("tagText"),
    tagContainer=$("tagContainer"),
    flag=true,
    textarea=$("textarea"),
    bt=$("bt"),
    intrist=$("intrist"),
    arr=[];

//为tagText添加事件监听
function tagInput() {
    tagText.addEventListener('focus',function(){
        this.style.boxShadow="0 0 4px #88C5FB ";
    },false);
    tagText.addEventListener('blur',function(){
        this.style.boxShadow=null;
    },false);
    tagText.addEventListener('keyup',function(event){
        create(event);
    },false);
}
//Tag输入,创建tagDiv
function create(event){
    var value=tagText.value.trim();
    flag=true;
    if (event.keyCode==13||event.keyCode==32||event.keyCode==188) {
        check.checkRepeat();
        check.numRule();
        if (flag){
            //去掉","
            var tagDiv=document.createElement("div");
            if(event.keyCode == 188){
            	tagDiv.innerHTML = value.substr(0, value.length-1);
            }else{
            	tagDiv.innerHTML=value;
            }
           	
             
			tagText.value=null;
            tagDiv.addEventListener('mouseover',mouse.mousedel,false);
            tagDiv.addEventListener('click',mouse.clickdel,false);
            tagDiv.addEventListener('mouseout',mouse.mouseout,false);
            tagContainer.appendChild(tagDiv);
        }
    }
}
var check={
    //检查重复,如果有重复flag=false;
    checkRepeat:function(){
        var tagDivs=tagContainer.getElementsByTagName("div");
        var value=tagText.value.trim();
        for(var i=0;i<tagDivs.length;i++){
            if(tagDivs[i].innerHTML===value) {
                tagText.value="";
                flag=false;
            }
        }
    },
    //检查是否超过了10个,超过则删除第一个
    numRule:function(){
    var tagDivs=tagContainer.getElementsByTagName("div");
    if (tagDivs.length>9) {
        tagContainer.removeChild(tagContainer.firstChild);
    }
}
};

var mouse={
    //鼠标滑过显示删除
    mousedel:function(){
        this.style.background="#FA0300";
        this.innerHTML="点击删除"+this.innerHTML;
    },
    //移出恢复
    mouseout:function(){
        this.style.background="#88C5FB";
        this.innerHTML=this.innerHTML.substring(4);
    },
    //点击删除
    clickdel:function(){
        this.parentNode.removeChild(this);
    }
};
//兴趣输入
function inputIntrist(){
    str=textarea.value.split(/[\s+\、\,\，\r]/);
    for(var i=0;i<str.length;i++){
        arr.push(str[i].trim());
    }
    arr=uniqArray(arr);
}
//给button添加点击事件
function buttonStart(){
    bt.addEventListener('click',creIntrist,false);
}
//渲染intrist 
function creIntrist(){
    inputIntrist();
    arrNumRule();
    var strr="";
    for(var i=0;i<arr.length;i++){
        strr+="<div>"+arr[i]+"</div>";
    }
    intrist.innerHTML=strr;
    strr="";
}
//当数组大于10时,移除前面的
function arrNumRule(){
    while(arr.length>10) {
        arr.shift();
    }
}
//数组去重
function uniqArray(arr){
    var ar=[];
    var hash={};
    for(var i=0;i<arr.length;i++){
        if (!hash[arr[i]]) {
            ar.push(arr[i]);
            hash[arr[i]]=true;
        }
    }
    return ar;
}
var start=function(){
    tagInput();
    buttonStart();
}();