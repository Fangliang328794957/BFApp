var z=screen.width*.5/1/Math.tan(50 * Math.PI / 180);
$("#contrast div").css("-webkit-transform", "translateZ(-"+z+"px) rotateY(0deg)")
$("#contrast div span:nth-child(1)").css("-webkit-transform", "rotateY(0deg) translateZ("+z+"px)")
$("#contrast div span:nth-child(2)").css("-webkit-transform", "rotateY(72deg) translateZ("+z+"px)")
$("#contrast div span:nth-child(3)").css("-webkit-transform", "rotateY(144deg) translateZ("+z+"px)")
$("#contrast div span:nth-child(4)").css("-webkit-transform", "rotateY(216deg) translateZ("+z+"px)")
$("#contrast div span:nth-child(5)").css("-webkit-transform", "rotateY(288deg) translateZ("+z+"px)")

var user = JSON.parse(localStorage.getItem("user"));
$(".item > span u").html(['-','男','女'][parseInt(user.sex||0)])


$.CompareShow = function(p){
	$(".item i").html(p.name);
	var tmpw=0;
	//这里的排名，全部是按从大到小来排
	//身高
	if(p.height_max!=""){
		$("#height p a:nth-child(1)").html(p.cou-p.height_rank);
		$("#height p a:nth-child(3)").html(p.height_rank-1);
		tmpw=Math.round(100-((p.height_rank-1)/p.cou*100));
		$("#height .line .green").show().css("width", tmpw+"%");
		$("#height .line .center").removeClass("g");
		if(tmpw>50)
			$("#height .line .center").addClass("g");
//		console.log("cou:"+p.cou+",height:"+p.height_rank+",%"+tmpw)
		$("#height .mark span:nth-child(1) u").html(p.height_max/100 + "厘米");
		$("#height .mark span:nth-child(2) u").html(p.height_min/100 + "厘米");
		$("#height .mark span:nth-child(3) u").html((p.height_avg)/100 + "厘米");
	}
	else{
		$("#height p").html("-");
		$("#height .line .green").hide();
		$("#height .mark span u").html("-");
	}
	
	//体重
	if(p.weight_max!=""){
		$("#weight p a:nth-child(1)").html(p.cou-p.weight_rank);
		$("#weight p a:nth-child(3)").html(p.weight_rank-1);
		tmpw=Math.round(100-((p.weight_rank-1)/p.cou*100));
		$("#weight .line .green").show().css("width", tmpw+"%");
		$("#weight .line .center").removeClass("g");
		if(tmpw>50)
			$("#weight .line .center").addClass("g");
//		console.log("cou:"+p.cou+",weight:"+p.weight_rank+",%"+tmpw)
		$("#weight .mark span:nth-child(1) u").html(p.weight_max/100 + "千克");
		$("#weight .mark span:nth-child(2) u").html(p.weight_min/100 + "千克");
		$("#weight .mark span:nth-child(3) u").html((p.weight_avg)/100 + "千克");
	}
	else{
		$("#weight p").html("-");
		$("#weight .line .green").hide();
		$("#weight .mark span u").html("-");
	}
	
	//体指
	if(p.bmi_max!=""){
		$("#bmi p a:nth-child(1)").html(p.cou-p.bmi_rank);
		$("#bmi p a:nth-child(3)").html(p.bmi_rank-1);
		tmpw=Math.round(100-((p.bmi_rank-1)/p.cou*100));
		$("#bmi .line .green").show().css("width", tmpw+"%");
		$("#bmi .line .center").removeClass("g");
		if(tmpw>50)
			$("#bmi .line .center").addClass("g");
//		console.log("cou:"+p.cou+",bmi:"+p.bmi_rank+",%"+tmpw)
		$("#bmi .mark span:nth-child(1) u").html(p.bmi_max);
		$("#bmi .mark span:nth-child(2) u").html(p.bmi_min);
		$("#bmi .mark span:nth-child(3) u").html((p.bmi_avg));
	}
	else{
		$("#bmi p").html("-");
		$("#bmi .line .green").hide();
		$("#bmi .mark span u").html("-");
	}
	
	//坐高
	if(p.sitheight_max!=""){
		$("#sitheight p a:nth-child(1)").html(p.cou-p.sitheight_rank);
		$("#sitheight p a:nth-child(3)").html(p.sitheight_rank-1);
		tmpw=Math.round(100-((p.sitheight_rank-1)/p.cou*100));
		$("#sitheight .line .green").show().css("width", tmpw+"%");
		$("#sitheight .line .center").removeClass("g");
		if(tmpw>50)
			$("#sitheight .line .center").addClass("g");
//		console.log("cou:"+p.cou+",sitheight:"+p.sitheight_rank+",%"+tmpw)
		$("#sitheight .mark span:nth-child(1) u").html(p.sitheight_max/100 + "厘米");
		$("#sitheight .mark span:nth-child(2) u").html(p.sitheight_min/100 + "厘米");
		$("#sitheight .mark span:nth-child(3) u").html((p.sitheight_avg)/100 + "厘米");
	}
	else{
		$("#sitheight p").html("-");
		$("#sitheight .line .green").hide();
		$("#sitheight .mark span u").html("-");
	}		
	
	//胸围
	if(p.bust_max!=""){
		$("#bust p a:nth-child(1)").html(p.cou-p.bust_rank);
		$("#bust p a:nth-child(3)").html(p.bust_rank-1);
		tmpw=Math.round(100-((p.bust_rank-1)/p.cou*100));
		$("#bust .line .green").show().css("width", tmpw+"%");
		$("#bust .line .center").removeClass("g");
		if(tmpw>50)
			$("#bust .line .center").addClass("g");
//		console.log("cou:"+p.cou+",bust:"+p.bust_rank+",%"+tmpw)
		$("#bust .mark span:nth-child(1) u").html(p.bust_max/100 + "厘米");
		$("#bust .mark span:nth-child(2) u").html(p.bust_min/100 + "厘米");
		$("#bust .mark span:nth-child(3) u").html((p.bust_avg)/100 + "厘米");
	}
	else{
		$("#bust p").html("-");
		$("#bust .line .green").hide();
		$("#bust .mark span u").html("-");
	}
	
	//皮褶厚度
	if(p.skinfold_max!=""){
		$("#skinfold p a:nth-child(1)").html(p.cou-p.skinfold_rank);
		$("#skinfold p a:nth-child(3)").html(p.skinfold_rank-1);
		tmpw=Math.round(100-((p.skinfold_rank-1)/p.cou*100));
		$("#skinfold .line .green").show().css("width", tmpw+"%");
		$("#skinfold .line .center").removeClass("g");
		if(tmpw>50)
			$("#skinfold .line .center").addClass("g");
//		console.log("cou:"+p.cou+",skinfold:"+p.skinfold_rank+",%"+tmpw)
		$("#skinfold .mark span:nth-child(1) u").html(p.skinfold_max/100 + "厘米");
		$("#skinfold .mark span:nth-child(2) u").html(p.skinfold_min/100 + "厘米");
		$("#skinfold .mark span:nth-child(3) u").html((p.skinfold_avg)/100 + "厘米");
	}
	else{
		$("#skinfold p").html("-");
		$("#skinfold .line .green").hide();
		$("#skinfold .mark span u").html("-");
	}
	
	//左眼视力
	if(p.eye_left_max!=""){
		$("#eye_left p a:nth-child(1)").html(p.cou-p.eye_left_rank);
		$("#eye_left p a:nth-child(3)").html(p.eye_left_rank-1);
		tmpw=Math.round(100-((p.eye_left_rank-1)/p.cou*100));
		$("eye_left .line .green").show().css("width", tmpw+"%");
		$("#eye_left .line .center").removeClass("g");
		if(tmpw>50)
			$("#eye_left .line .center").addClass("g");
//		console.log("cou:"+p.cou+",eye_left:"+p.eye_left_rank+",%"+tmpw)
		$("#eye_left .mark span:nth-child(1) u").html(p.eye_left_max);
		$("#eye_left .mark span:nth-child(2) u").html(p.eye_left_min);
		$("#eye_left .mark span:nth-child(3) u").html((p.eye_left_avg));
	}
	else{
		$("#eye_left p").html("-");
		$("#eye_left .line .green").hide();
		$("#eye_left .mark span u").html("-");
	}
	
	//右眼视力
	if(p.eye_right_max!=""){
		$("#eye_right p a:nth-child(1)").html(p.cou-p.eye_right_rank);
		$("#eye_right p a:nth-child(3)").html(p.eye_right_rank-1);
		tmpw=Math.round(100-((p.eye_right_rank-1)/p.cou*100));
		$("eye_right .line .green").show().css("width", tmpw+"%");
		$("#eye_right .line .center").removeClass("g");
		if(tmpw>50)
			$("#eye_right .line .center").addClass("g");
//		console.log("cou:"+p.cou+",eye_right:"+p.eye_right_rank+",%"+tmpw)
		$("#eye_right .mark span:nth-child(1) u").html(p.eye_right_max);
		$("#eye_right .mark span:nth-child(2) u").html(p.eye_right_min);
		$("#eye_right .mark span:nth-child(3) u").html((p.eye_right_avg));
	}
	else{
		$("#eye_right p").html("-");
		$("#eye_right .line .green").hide();
		$("#eye_right .mark span u").html("-");
	}
	
	//肺活量
	if(p.vitalcapacity_max!=""){
		$("#vitalcapacity p a:nth-child(1)").html(p.cou-p.vitalcapacity_rank);
		$("#vitalcapacity p a:nth-child(3)").html(p.vitalcapacity_rank-1);
		tmpw=Math.round(100-((p.vitalcapacity_rank-1)/p.cou*100));
		$("#vitalcapacity .line .green").show().css("width", tmpw+"%");
		$("#vitalcapacity .line .center").removeClass("g");
		if(tmpw>50)
			$("#vitalcapacity .line .center").addClass("g");
//		console.log("cou:"+p.cou+",vitalcapacity:"+p.vitalcapacity_rank+",%"+tmpw)
		$("#vitalcapacity .mark span:nth-child(1) u").html(p.vitalcapacity_max/100 + "毫升");
		$("#vitalcapacity .mark span:nth-child(2) u").html(p.vitalcapacity_min/100 + "毫升");
		$("#vitalcapacity .mark span:nth-child(3) u").html((p.vitalcapacity_avg)/100 + "毫升");
	}
	else{
		$("#vitalcapacity p").html("-");
		$("#vitalcapacity .line .green").hide();
		$("#vitalcapacity .mark span u").html("-");
	}
	
	//静态心率
	if(p.staticheart_max!=""){
		$("#staticheart p a:nth-child(1)").html(p.cou-p.staticheart_rank);
		$("#staticheart p a:nth-child(3)").html(p.staticheart_rank-1);
		tmpw=Math.round(100-((p.staticheart_rank-1)/p.cou*100));
		$("#staticheart .line .green").show().css("width", tmpw+"%");
		$("#staticheart .line .center").removeClass("g");
		if(tmpw>50)
			$("#staticheart .line .center").addClass("g");
//		console.log("cou:"+p.cou+",staticheart:"+p.staticheart_rank+",%"+tmpw)
		$("#staticheart .mark span:nth-child(1) u").html(p.staticheart_max/100 + "次/分钟");
		$("#staticheart .mark span:nth-child(2) u").html(p.staticheart_min/100 + "次/分钟");
		$("#staticheart .mark span:nth-child(3) u").html((p.staticheart_avg)/100 + "次/分钟");
	}
	else{
		$("#staticheart p").html("-");
		$("#staticheart .line .green").hide();
		$("#staticheart .mark span u").html("-");
	}
}

var StudentBodyCompare = localStorage.getItem("StudentBodyCompare");
$.init = function(js){
	$("#contrast span:nth-child(1)").attr("data-d", JSON.stringify(js.list[0]));
	$("#contrast span:nth-child(2)").attr("data-d", JSON.stringify(js.list[1]));
	$("#contrast span:nth-child(3)").attr("data-d", JSON.stringify(js.list[2]));
	$("#contrast span:nth-child(4)").attr("data-d", JSON.stringify(js.list[3]));
	$("#contrast span:nth-child(5)").attr("data-d", JSON.stringify(js.list[4]));
			
	$.CompareShow(js.list[$("#contrast div span.selected").index()]);
}
if(StudentBodyCompare=="" || StudentBodyCompare==undefined || StudentBodyCompare==null)
	$.ajax_({
		method:"StudentBodyCompare",
		data:{},
		success:function(d){
			var js = JSON.parse(d.d);
			console.log(d.d)
			localStorage.setItem("StudentBodyCompare",d.d)
			$.init(js);
		},
		error:function(){ $.dialog({msg:"请检查网络"}) }
	})
else
	$.init(JSON.parse(StudentBodyCompare));

var hammertime = new Hammer(document.querySelector("#compare")), theta = 0, i=1;
hammertime.on("swipeleft", function (ev) {
	var increment = 1;
    theta += ( 360 / 5 ) * increment * -1;
    i++;
    if(i>5)i=1;
    $("#contrast div span").removeClass();
    $("#contrast div").css("-webkit-transform",'translateZ( -'+z+'px ) rotateY(' + theta + 'deg)');
    $("#compare").css("background-color",$("#contrast div span:nth-child("+i+")").addClass("selected").attr("data-color"));
    $.CompareShow(JSON.parse($("#contrast div span:nth-child("+i+")").attr("data-d")));
});
hammertime.on("swiperight", function (ev) {
	var increment = -1;
    theta += ( 360 / 5 ) * increment * -1;
    i--;
    if(i<=0)i=5;
    $("#contrast div span").removeClass();
    $("#contrast div").css("-webkit-transform",'translateZ( -'+z+'px ) rotateY(' + theta + 'deg)');
    $("#compare").css("background-color", $("#contrast div span:nth-child("+i+")").addClass("selected").attr("data-color"));
    $.CompareShow(JSON.parse($("#contrast div span:nth-child("+i+")").attr("data-d")));
});
$("header .left").click(function(){
	window.history.back();
})