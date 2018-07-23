function showCenter(obj){
	function center(){
		var srcW=document.documentElement.clientWidth;
		var srcH=document.documentElement.clientHeight;
		var w=obj.offsetWidth;
		var h=obj.offsetHeight;
		obj.style.left=(srcW-w)/2+"px";
		obj.style.top=(srcH-h)/2+"px";
	}
	center();
	window.onresize=function(){
		center();
	}
};

function drag(obj,title){
	var title=title||obj;
	title.onmousedown=function(ev){//按下鼠标：防止跳动，用鼠标的横坐标-盒子的横坐标
		var disX=ev.clientX-obj.offsetLeft;
		var disY=ev.clientY-obj.offsetTop;
		document.onmousemove=function(ev){//鼠标按下并移动时：left=鼠标横坐标-disY
			ev.preventDefault();
			var l=ev.clientX-disX;
			var t=ev.clientY-disY;
			if(l<0)l=0;//不让盒子移出界面：左上  负
			if(t<0)t=0;
			var maxL=document.documentElement.clientWidth-obj.offsetWidth;//left为盒子外宽
			var maxT=document.documentElement.clientHeight-obj.offsetHeight;
			if(l>maxL)l=maxL;
			if(t>maxT)t=maxT;//右下    设置最大值   盒子移动到最大值时让他=最大值；
			obj.style.left=l+"px";
			obj.style.top=t+"px";
		}
		document.onmouseup=function(){//当鼠标抬起的时候    move  up为空
			document.onmousemove=document.onmouseup=null;
		}
	}
}
function shake(obj,num,der,func){
	obj.onOff=false;
	var objL=parseInt(getComputedStyle(oBox,null)[der]);
	var arr=[];
	for(var i=1;i<=num;i++){
		arr.push(-i,i);//从数组末尾加    unshift  从头加
	}
	arr=arr.reverse();//翻转
	arr.push(0);
	console.log(arr);
	var index=0;
	var timer=setInterval(function(){
		oBox.style[der]=objL+arr[index]+"px";
		index++;
		if(index==arr.length){
			clearInterval(timer);
			obj.onOff=true;
			func&&func();//短路语句
		}
	},30)
}