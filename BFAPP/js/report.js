$("header .left").click(function(){
	window.history.back();
})
function cal (x,y,r,n,list) {
	var res = [];
	var th = n*2*Math.PI/360;
	for (var i = 0; ; i++) {
        if (n*i<360) {
            point = {x:x+ (list.length>0?list[i]:r) *Math.sin(th*i), y:y- (list.length>0?list[i]:r) *Math.cos(th*i) };
            res.push(point);
        }else
            break;
	};
	return res;
}

$.init = function(){
	var js = JSON.parse(localStorage.getItem("report"));
	$("#title i").html(js.body.name)
	//填基本数据
	js.body.height.val==""?$("#height samp").html("-"):$("#height samp").prepend((js.body.height.val/100).toFixed(1));
	$("#height i").prepend(js.body.height.rank!=""?("年级排名 "+js.body.height.rank):"尚未测试");
	js.body.weight.val==""?$("#weight samp").html("-"):$("#weight samp").prepend((js.body.weight.val/100).toFixed(1));
	$("#weight i").prepend(js.body.weight.rank!=""?("年级排名 "+js.body.weight.rank):"尚未测试");
	js.body.bmi.val==""?$("#bmi samp").html("-"):$("#bmi samp").prepend(js.body.bmi.val);
	$("#bmi i").prepend(js.body.bmi.rank!=""?("年级排名 "+js.body.bmi.rank):"尚未测试");
	js.body.bust.val==""?$("#bust samp").html("-"):$("#bust samp").prepend((js.body.bust.val/100).toFixed(1));
	$("#bust i").prepend(js.body.bust.rank!=""?("年级排名 "+js.body.bust.rank):"尚未测试");
	js.body.sitheight.val==""?$("#sitheight samp").html("-"):$("#sitheight samp").prepend((js.body.sitheight.val/100).toFixed(1));
	$("#sitheight i").prepend(js.body.sitheight.rank!=""?("年级排名 "+js.body.sitheight.rank):"尚未测试");
	js.body.skinfold.val==""?$("#skinfold samp").html("-"):$("#skinfold samp").prepend((js.body.skinfold.val/100).toFixed(1));
	$("#skinfold i").prepend(js.body.skinfold.rank!=""?("年级排名 "+js.body.skinfold.rank):"尚未测试");
	js.body.eye_left.val==""?$("#eye_left samp").html("-"):$("#eye_left samp").prepend((js.body.eye_left.val/100).toFixed(1));
	$("#eye_left i").prepend(js.body.eye_left.rank!=""?("年级排名 "+js.body.eye_left.rank):"尚未测试");
	js.body.eye_right.val==""?$("#eye_right samp").html("-"):$("#eye_right samp").prepend((js.body.eye_right.val/100).toFixed(1));
	$("#eye_right i").prepend(js.body.eye_right.rank!=""?("年级排名 "+js.body.eye_right.rank):"尚未测试");
	
	js.body.vitalcapacity.val==""?$("#vitalcapacity samp").html("-"):$("#vitalcapacity samp").prepend(js.body.vitalcapacity.val/100!==0?(js.body.vitalcapacity.val/100).toFixed(1):'0');
	$("#vitalcapacity i").prepend(js.body.vitalcapacity.rank!=""?("年级排名 "+js.body.vitalcapacity.rank):"尚未测试");		
	js.body.staticheart.val==""?$("#staticheart samp").html("-"):$("#staticheart samp").prepend((js.body.staticheart.val/100).toFixed(1));
	$("#staticheart i").html(js.body.staticheart.rank!=""?("年级排名 "+js.body.staticheart.rank):"尚未测试");		
	
	//填测试状况
	$.each(js.test.list, function(i,val){
		$("<div>").html('<span>'+val.name+'</span><samp>'+(val.mark==""?"-":(val.mark/100).toFixed(1)+val.units)+'</samp><i>'+(val.msg==""?"尚未测试，暂无评论":val.msg)+'</i>')
		.appendTo($("#test"));
	});
	console.log(JSON.stringify(js.test.list),JSON.stringify(js.compare.list),JSON.stringify(js.compare.list),JSON.stringify(js.intervene.list));
	//填雷达图
	var fen = js.compare.list.map(function(t){ return t.score }); //给进分数数组
	var txt=["柔韧","下肢力量","平衡素质","灵敏素质","上肢力量"]
	var x = $("#svg").width()/2, y=$("#svg").height()/2, r=$("#svg").height()/2*.75;
	var edge=5; //要7条边
	var lines="",circels="",texts=""; //线和圆点
	var first=cal(x,y,r,360/edge,[]); //这个用来画多边形
	var txtpolygon=cal(x,y,r*1.2,360/edge,[]); //这个用来定位文字的位置
	var my =cal(x,y,r,360/edge, fen.map(function(t){return t*r/100})); //根据半径去算
	for(var i=0;i<edge;i++){
		lines+='	<line class="line" x1="'+x+'" y1="'+y+'" x2="'+first[i].x+'" y2="'+first[i].y+'" style="stroke:#FFFFFF;stroke-width:1;opacity:.4" />';
		circels+='	<circle cx="'+my[i].x+'" cy="'+my[i].y+'" r="2" style="fill:#FFFFFF;stroke:#FFFFFF;stroke-opacity:.5;stroke-width:4;"/>'
		texts+='	<text x="'+txtpolygon[i].x+'" y="'+txtpolygon[i].y+'" fill="#FFF">'+txt[i]+'</text>'
	}
	$("#svg").html('<svg version="1.1" xmlns="http://www.w3.org/2000/svg">'+lines+texts+
	'	<polygon points="'+ first.map(function(t){return t.x+','+t.y}).join(' ') +'" style="fill:transparent;stroke:#FFFFFF;stroke-width:1;opacity:.8"/>'+
	'	<polygon points="'+ cal(x,y,r*.8,360/edge,[]).map(function(t){return t.x+','+t.y}).join(' ') +'" style="fill:transparent;stroke:#FFFFFF;stroke-width:1;opacity:.4"/>'+
	'	<polygon points="'+ cal(x,y,r*.6,360/edge,[]).map(function(t){return t.x+','+t.y}).join(' ') +'" style="fill:transparent;stroke:#FFFFFF;stroke-width:1;opacity:.4"/>'+
	'	<polygon points="'+ cal(x,y,r*.4,360/edge,[]).map(function(t){return t.x+','+t.y}).join(' ') +'" style="fill:transparent;stroke:#FFFFFF;stroke-width:1;opacity:.4"/>'+
	'	<polygon points="'+ cal(x,y,r*.2,360/edge,[]).map(function(t){return t.x+','+t.y}).join(' ') +'" style="fill:transparent;stroke:#FFFFFF;stroke-width:1;opacity:.4"/>'+
	'	<polygon points="'+ my.map(function(t){return t.x+','+t.y}).join(' ') +'" style="fill:#FFFFFF;opacity:.4"/>'+circels+
	'</svg>');
	$.each(js.compare.list, function(i,val){
		$("<div>").html('<span>'+val.name+'</span><samp>'+(val.score==0?"无":val.score)+'</samp><i>'+(val.msg==""?"尚未有测试结果":val.msg)+'</i>')
		.appendTo($("#evaluate .fen"));
	});
	
	//填充干预部分
	$.each(js.intervene.list, function(i,val){
		$("<span>").attr("data-id",val.id).append($("<samp>").css("background-image","url("+val.img+")"))
		.append("<u>"+$.setAbility(val.type2)+"</u>")
		.appendTo($("#list"));
	});
}

if(localStorage.getItem("report")!="" && localStorage.getItem("report")!=null && localStorage.getItem("report")!=undefined)
	$.init();
else
	$.ajax_({
		method:"Report",
		data:{},
		success:function(d){
			console.log(d.d)
			localStorage.setItem("report", d.d);
			$.init();
		}
	})

$("#list").delegate("span", "click", function(){
	location.href="intervene.html?id="+$(this).attr("data-id");
})