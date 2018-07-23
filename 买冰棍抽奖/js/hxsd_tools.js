function showCenter(obj){
	function center(){
		var scrW = document.documentElement.clientWidth;		//浏览器的宽度
		var scrH = document.documentElement.clientHeight;		//浏览器的高度
		console.log(scrW,scrH)
		var objW = obj.offsetWidth;
		var objH = obj.offsetHeight;
		obj.style.left = (scrW-objW)/2 + "px";
		obj.style.top = (scrH-objH)/2 + "px";
	}
	center();
	window.onresize = function(){
		center();
	}
};
function drag(obj,title){
	var title = title || obj;
	title.onmousedown = function(ev){
		ev.preventDefault();
		var disX = ev.clientX - obj.offsetLeft;
		var disY = ev.clientY - obj.offsetTop;
		document.onmousemove = function(ev){
			var l = ev.clientX - disX;
			var t = ev.clientY - disY;
			
			if(l<0)l=0;
			if(t<0)t=0;
			var maxL = document.documentElement.clientWidth - obj.offsetWidth;
			var maxT = document.documentElement.clientHeight - obj.offsetHeight;
			if(l>maxL)l=maxL;
			if(t>maxT)t=maxT;
			obj.style.left = l + 'px';
			obj.style.top = t + 'px';
		}
		document.onmouseup = function(){
			document.onmousemove = document.onmouseup =null;
			console.log("onmouseup")
		}
		
	}
}
function shake(obj,num,der,func){
	obj.onOff = false;
	var objL =parseInt(getComputedStyle(obj,null)[der]) ;//px100px
	var arr = [];
	for(var i=num;i>0;i--){
		arr.push(-i,i)
	}
	arr.push(0);
	var index = 0;
	var timer = setInterval(function(){
		obj.style[der] = objL + arr[index] + "px";
		index++;
		if(index ==arr.length ){
			clearInterval(timer);
			func&&func();
			obj.onOff = true;
		}
	},30)
	
}
function ajax(url,ok_fn){
	var oAjax = new XMLHttpRequest;		//实例化一个对象
	//console.log(oAjax.readyState)		//对象的状态码  0
	oAjax.open('GET',url,true)		//get请求方式            url地址           true/false  是否异步
	//console.log(oAjax.readyState)
	oAjax.send();				//发送请求
	//console.log(oAjax.readyState)	//1
	oAjax.onreadystatechange = function(){
		//console.log(oAjax.readyState)	//1
		if(oAjax.readyState == 4){
			if(oAjax.status == 200){		//状态码是200，代表成功返回数据
				ok_fn&&ok_fn(oAjax.responseText)		//带着数据回来了 函数调用时候，参数是实参
			}else if(oAjax.status == 404){
				alert('404没找到')
			}else{
				alert('失败了')
			}
		}
	}
}