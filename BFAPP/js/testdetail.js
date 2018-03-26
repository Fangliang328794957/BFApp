//头部切换
$("#tabhead span").click(function(){
	setTimeout(function(){
		$("#tabhead span").toggleClass("selected");
		$(".content .tab").toggleClass("selected");
	},300);				
	$("#tabhead samp").css({
		"margin-left": ($(this).index()*50)+"%",
		"-webkit-transition": "margin-left 300ms"
	});
})

var user = JSON.parse(localStorage.getItem("user"));
var currentpage = 1;
var n = $.setType();
var year = new Date().getFullYear();
var semester = new Date() < new Date(year, 8, 1); //true-下半学期; false-上半学期
if (semester) year--;

$("#msg > span u").html(['-','男','女'][parseInt(user.sex||0)])

//显示排名，成绩等
$.CompareShow = function(p){
	var myavg=parseInt($("#contrast").attr("data-myavg")||0);
	if(p.max!=""){
		$("#msg p").html(p.rank);
		var tmpw=Math.round(100-(p.rank/p.cou*100));
		$("#msg #line #green").css("width", tmpw+"%");
		$("#msg #line #center").removeClass();
		if(tmpw>50)
			$("#msg #line #center").addClass("g");
	}
	else
		$("#msg p").html("/");
	$("#msg i").html(p.level);
	$("#msg #line #left").html(p.cou);
	$("#msg #mark span:nth-child(1) u").html(p.max/100 + n.units);
	$("#msg #mark span:nth-child(2) u").html(p.avg/100 + n.units);
	$("#msg #mark span:nth-child(3) u").html((p.max-myavg)/100 + n.units);
}
$.Commend = function(cou){
	var str="";
	for(var i=0; i<5; i++)
		str+='<strong'+(i<cou?' class="t"':'')+'></strong>';
	return str;
}

//$("#list").delegate("span", "click", function(){
//	location.href="intervene.html?id="+$(this).attr("data-id");
//})

$.getTestData = function(dt){
//	console.log(JSON.stringify(dt))
	$("#contrast span").removeAttr("data-d");
	$("#bottom_btns li:last-child").trigger("click");
	//拿比比看数据
	$.ajax_({
		method:"Compare",
		data:dt,
		success:function(d){
			var js = JSON.parse(d.d);
			//console.log(d.d)
			$("#contrast").attr("data-myavg", js.myavgmark);
			$("#contrast span:nth-child(1)").attr("data-d", JSON.stringify(js.list.list[0]));
			$("#contrast span:nth-child(2)").attr("data-d", JSON.stringify(js.list.list[1]));
			$("#contrast span:nth-child(3)").attr("data-d", JSON.stringify(js.list.list[2]));
			$("#contrast span:nth-child(4)").attr("data-d", JSON.stringify(js.list.list[3]));
			$("#contrast span:nth-child(5)").attr("data-d", JSON.stringify(js.list.list[4]));
			
			$.CompareShow(js.list.list[$("#contrast div span.selected").index()]);
		},
		error:function(){ $.dialog({msg:"请检查网络"}) }
	})
	//拿干预数据
	$.ajax_({
		method:"InterveneList",
		data:{currentpage:currentpage, pagesize:10, type:dt.type, grade:dt.grade},
		success:function(d){
			var js = JSON.parse(d.d);
			//console.log(d.d)
			
			$.each(js.list, function(i,val){
				$("<span>").attr("data-id",val.id).append($("<samp>").css("background-image","url("+val.img+")"))
				.append($("<i>").html($.Base64Decode(val.msg)))
				.append("<u>"+$.Commend(val.commend)+"</u>")
				.appendTo($("#list"));
			});
			if(js.count>10) $("#more").show();
		}
	})
	//拿测试数据
	$.ajax_({
		method:"TestDetail",
		data:dt,
		success:function(d){
			var js = JSON.parse(d.d);
	        $("#svg").empty();
	        if(js.list.list == undefined){
	        	$("#svg").html("<h1>暂无测试</h1>");
	            $("#detail samp,#detail p,#detail u").empty();
	            $("#detail p").removeClass();
	        	return;
	        }
	        
			$.numChange = function (str1) {
	            if (str1 == "-")
	                return { class: "", str: "-" };
	            var str = parseInt(str1);
	            if (str == 0)
	                return { class: "", str: "-" };
	            return { class: str > 0 ? 'u' : 'd', str: Math.abs(str) };
	        }
	        $.show = function (e, id) {
	        	$("svg .rec").css("fill","transparent")
	        	$(e).css("fill","rgba(0,0,0,.05)")
	            var t = js.list.list[id];
	            var n_mark = { class: "", str: "-" }, n_score = { class: "", str: "-" }, n_rank = { class: "", str: "-" };
	            if (id < js.list.list.length) {
	                var nt = js.list.list[id + 1];
	                if (nt != undefined) {
	                    n_mark = $.numChange(n.order ? (t.mark - nt.mark) : (nt.mark - t.mark));
	                    if (t.score != '-') n_score = $.numChange(t.score - nt.score);
	                    n_rank = $.numChange(nt.rank - t.rank);
	                }
	            }
	            
	            $("#num samp").html(js.list.list.length - id);
	            $("#mark samp").html(t.mark / 100);
	            $("#mark p").removeClass().addClass(n_mark.class).html((n_mark.str == "-" ? "-" : ((n_mark.str / 100)+n.units)));
	            $("#mark u").html(n.units)
	            $("#score samp").html(t.score);
	            $("#score p").removeClass().addClass(n_score.class).html(n_score.str)
	            $("#rank samp").html(t.rank+'/'+js.classcount);
	            $("#rank p").removeClass().addClass(n_rank.class).html(n_rank.str)
	        }

			//填总次数和平均成绩			
	        $("#counum samp").html(js.list.list.length);
	        var avg=0; $.each(js.list.list, function(i,val){ avg+=parseInt(val.mark)}); avg/=js.list.list.length;
	        $("#avgmark samp").html((avg/100).toFixed(2));
	        $("#avgmark u").html(n.units);
	        //计算成绩标尺
	        var achievementMax, achievementMin;
	        
	        if (n.order) {
	            achievementMax = parseInt($.getMax(js.list.list, parseInt($.getRequest("type")), "mark").mark);
	            if (js.list.list.length <= 1)
	                achievementMin = 0;
	            else
	                achievementMin = parseInt($.getMin(js.list.list, parseInt($.getRequest("type")), "mark").mark);
	        }
	        else {
	            achievementMax = parseInt($.getMin(js.list.list, parseInt($.getRequest("type")), "mark").mark);
	          
	            if (js.list.list.length <= 1)
	                achievementMin = 0;
	            else
	                achievementMin = parseInt($.getMax(js.list.list, parseInt($.getRequest("type")), "mark").mark);
	        }
	
			var svg="";
	        var cellwidth = $(".content > div").width()*.20; //单元格长度
	        var paddingwidth=$(".content > div").width()*.1;
	        var lineheight = $("body").height()*.3;
            svg='<svg style="min-width:'+cellwidth*js.list.list.length+'px;">';
	
	        //画横线
	        for (var i = 0; i < 6; i++)
	            svg+='<line class="hline" x1="0" y1="' + (i * lineheight/5) + '" x2="' + Math.max($(".content").width(),cellwidth*js.list.list.length) + '" y2="' + (i * lineheight/5) + '" />';
	
	        //画日期、竖线、响应区域
	        $.each(js.list.list, function (i, val) {
	            //日期
	            svg+='<text x="' + (i * cellwidth + paddingwidth) + '" y="'+lineheight+'" fill="#777" transform="translate(0 15)">' + val.intime.substr(5) + '</text>';
	            //竖线
	            svg+='<line class="vline" x1="' + (i * cellwidth + paddingwidth) + '" y1="0" x2="' + (i * cellwidth + paddingwidth) + '" y2="'+lineheight+'" stroke-dasharray="10,10" />';
	        });
	        
	        var mark_tmp;
	       if(achievementMax - achievementMin !==0){
	       		 mark_tmp = lineheight / (achievementMax - achievementMin);
	       }else{
	       	     mark_tmp = 0;
	       }
	        var rank_tmp = lineheight / (js.classcount - 1);
	        var score_tmp = js.list.list[0].score != '-'?(lineheight / 100):0;
	        $.each(js.list.list, function (i, val) {
	        	
	        	 
	        	var l=score_tmp>0?3:2;
	        	l*=cellwidth/7.5;
	        	l/=2;
	        	svg+= '<g class="mark" transform="translate(' + ((i * cellwidth + paddingwidth)-l) + ' 0)">';
 	            var tmpy = lineheight-(n.order ? (achievementMax - parseInt(val.mark)) : parseInt(val.mark) - achievementMin ) * mark_tmp;
	         
	            svg+='<rect y="'+(lineheight-(tmpy==0?1:tmpy))+'" width="'+cellwidth/8+'" height="' + (tmpy==0?1:tmpy) + '" style="fill:#9ed8f4" />'; //成绩
	            tmpy = lineheight-(val.rank - 1) * rank_tmp;
	            svg+='<rect x="'+cellwidth/7+'" y="' + (lineheight-(tmpy==0?1:tmpy)) + '" width="'+cellwidth/8+'" height="' + (tmpy==0?1:tmpy) + '" style="fill:#b7ddc2" />'; //排名	           
	            if(score_tmp>0){
	            	tmpy = lineheight-(100 - val.score) * score_tmp;
	            	svg+='<rect x="'+cellwidth/7*2+'" y="' + (lineheight-(tmpy==0?1:tmpy)) + '" width="'+cellwidth/8+'" height="' + (tmpy==0?1:tmpy) + '" style="fill:#efb8d3" />'; //评分
	            }
	            svg+='<rect width="'+l*2+'" height="' + lineheight + '" class="rec" style="fill:transparent" onclick="$.show(this,'+i+')" />'; //点击框
	        	svg+='</g>'
	        });
	        svg+="</svg>"
	        $("#svg").html(svg);
        	$.show(null,0);
		}
	})
}

var terms = [];
var td = { student_id: user.student_id, type: n.type };
switch (parseInt(user.beginyear)) { //入学年份
    case year: //是小班
        terms.push({ text: "小班上学期", click:function(){
        	$(".content #title").html("小班上学期")
        	$.getTestData($.extend({}, td, { year: year, month:9, grade:1})) 
        }}); //上学期一定有
        if (semester) 
        	terms.push({ text: "小班下学期",  click:function(){ 
        		$(".content #title").html("小班下学期")
        		$.getTestData($.extend({}, td, { year: year+1, month:2, grade:1}))
        	}}); //当前是下半学期，就要加上
        break;
    case year - 1: //是中班
        terms.push({ text: "中班上学期", click:function(){
        	$(".content #title").html("中班上学期")
        	$.getTestData($.extend({}, td, { year: year, month:9, grade:2}))
        }}); //上学期一定有
        if (semester) 
        	terms.push({ text: "中班下学期" , click:function(){
        		$(".content #title").html("中班下学期")
        		$.getTestData($.extend({}, td, { year: year + 1, month:2, grade:2}))
        	}}); //当前是下半学期，就要加上
        terms.push({ text: "小班上学期", click:function(){
        	$(".content #title").html("小班上学期")
        	$.getTestData($.extend({}, td, { year: year - 1, month:9, grade:1}))
        }});
        terms.push({ text: "小班下学期", click:function(){
        	$(".content #title").html("小班下学期")
        	$.getTestData($.extend({}, td, { year: year, month:2, grade:1}))
        }});
        break;
    case year - 2: //是大班
        terms.push({ text: "大班上学期", click:function(){
        	$(".content #title").html("大班上学期")
        	$.getTestData($.extend({}, td, { year: year, month:9, grade:3}))
        }}); //上学期一定有
        if (semester) 
        	terms.push({ text: "大班下学期", click:function(){
        		$(".content #title").html("大班下学期")
        		$.getTestData($.extend({}, td, { year: year+1, month:2, grade:3}))
        	}}); //当前是下半学期，就要加上
        terms.push({ text: "中班上学期", click:function(){
        	$(".content #title").html("中班上学期")
        	$.getTestData($.extend({}, td, { year: year-1, month:9, grade:2}))
        }});
        terms.push({ text: "中班下学期", click:function(){
        	$(".content #title").html("中班下学期")
        	$.getTestData($.extend({}, td, { year: year, month:2, grade:2}))
        }});
        terms.push({ text: "小班上学期", click:function(){
        	$(".content #title").html("小班上学期")
        	$.getTestData($.extend({}, td, { year: year-2, month:9, grade:1}))
        }});
        terms.push({ text: "小班下学期", click:function(){
        	$(".content #title").html("小班下学期")
        	$.getTestData($.extend({}, td, { year: year-1, month:2, grade:1}))
        }});
        break;
}
$(".content #title").html(terms[0].text).click(function(){
	$.b_btns(terms);
})
terms[0].click();

$("header .left").click(function(){ history.back(); });
$("header .title").html(n.name);


//以下是比比看
var z=screen.width*.5/1/Math.tan(50 * Math.PI / 180);
$("#contrast div").css("-webkit-transform", "translateZ(-"+z+"px) rotateY(0deg)")
$("#contrast div span:nth-child(1)").css("-webkit-transform", "rotateY(0deg) translateZ("+z+"px)")
$("#contrast div span:nth-child(2)").css("-webkit-transform", "rotateY(72deg) translateZ("+z+"px)")
$("#contrast div span:nth-child(3)").css("-webkit-transform", "rotateY(144deg) translateZ("+z+"px)")
$("#contrast div span:nth-child(4)").css("-webkit-transform", "rotateY(216deg) translateZ("+z+"px)")
$("#contrast div span:nth-child(5)").css("-webkit-transform", "rotateY(288deg) translateZ("+z+"px)")

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

