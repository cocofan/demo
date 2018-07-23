
function showCenter(obj){
	function center(){
		obj.css({ 
			left:( $(window).width() - obj.outerWidth() )/2,
			top:($(window).height()-obj.outerHeight())/2
		})
	}
	center();
	$(window).resize(function(){
		center();
	})
}



//拖拽
function drag(obj,title){
	var title=title||obj;
	title.mousedown(function(ev){
		ev.preventDefault();
		var disX=ev.pageX-obj.position().left;
		var disY=ev.pageY-obj.position().top;
		$(document).mousemove(function(ev){
			var l=ev.pageX-disX;
			var t=ev.pageY-disY;
			if(l<0)l=0;
			if(t<0)t=0;
			var maxL=$(window).width()-obj.outerWidth();
			var maxT=$(window).height()-obj.outerHeight();
			if(l>maxL)l=maxL;
			if(t>maxT)t=maxT;
			obj.css( {left:l,top:t} );
			
		})
		$(document).mouseup(function(){
			$(document).off("mousemove mouseup")
		})
	})
}


//抖动
function shake(obj,num,der,func){
	if(obj.prop('onOff')){
		return;
	};
	obj.prop('onOff',true);
	var objL=der=="left"? obj.position().left:obj.position().top;
	var arr=[];
	for(var i=1;i<=num;i++){
		arr.push(-i,i);//从数组末尾加    unshift  从头加
	}
	arr=arr.reverse();//翻转
	arr.push(0);
	var index=0;
	var timer=setInterval(function(){
		obj.css(der,objL+arr[index]);
		index++;
		if(index==arr.length){
			clearInterval(timer);
			func&&func();//短路语句
			obj.prop('onOff',false);
		}
	},30)
}


//移动
function move(obj,setOpt,time,fn){
	if(obj.onOff){
		return;
	}
	obj.onOff=true;
	var begin={};
	var disOpt={};
	for(var key in setOpt){
		begin[key]=parseInt(getComputedStyle(obj,null)[key]);//开始的宽高
		disOpt[key]=setOpt[key]-begin[key];					//差值=总-始
	}
	var step=parseInt( time/30 );				//步数
	var num=0;
	var timer=setInterval(function(){
		num++;
		for(var key in disOpt){							//每步的长度
			var step_length=disOpt[key] / step;	
			if(key=="opacity"){
				obj.style[key]=begin[key]+step_length*num;
			}else{
				obj.style[key]=begin[key]+step_length*num+"px";
			}
		}
		if(num >= step){
			clearInterval(timer);
			fn&&fn();
		}
	},30)
}	