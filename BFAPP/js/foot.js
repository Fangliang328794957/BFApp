$("footer span:not([class])").click(function(){
	switch($(this).index()){
		case 0: location.href="main.html";break;
		case 1: location.href="test.html";break;
		case 2: location.href="store.html";break;
		case 3: location.href="setting.html";break;
	}
})