function modal(){
	var oModal = document.createElement('div');
	oModal.style.width = "100%";
	oModal.style.height = "100%";
	oModal.style.backgroundColor = "#000";
	oModal.style.opacity = 0.3;
	oModal.style.position = "fixed";
	oModal.style.top = "0";
	oModal.style.left = "0";
	oModal.style.zIndex = 80;
	document.body.appendChild(oModal);
	return function(){
		document.body.removeChild(oModal)
	}
}
function alertBox(txt){
	var alertBox = document.createElement('div');
	alertBox.className = 'alertBox';
	
	alertBox.innerHTML = "<p>"+txt+"</p>"+
	"<button type='button' >确定</button>"
	
	document.body.appendChild(alertBox);
	var oM = modal();
	showCenter(alertBox);
	
	var delBtn = alertBox.getElementsByTagName('button')[0];
	delBtn.onclick = function(){
		document.body.removeChild(alertBox);
		oM();
	}
}