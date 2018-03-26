var ability = [
	{type:1, name:"上肢力量"},
	{type:2, name:"下肢力量"},
	{type:4, name:"平衡素质"},
	{type:8, name:"柔韧"},
	{type:16, name:"灵敏素质"},
	{type:32, name:"有氧耐力"},
];
;
(function() {
	$.setType = function () {
        var type = arguments.length > 0 ? arguments[0] : parseInt($.getRequest("type"));
        return [
            { type: 0, name: "", units: "", order: true },
            { type: 1, name: "立定跳远", units: "CM", order: true },
            { type: 2, name: "网球掷远", units: "CM", order: true },
            { type: 3, name: "10米折返跑", units: "秒", order: false },
            { type: 4, name: "10米折返爬", units: "秒", order: false },
            { type: 5, name: "单脚站", units: "秒", order: true },
            { type: 6, name: "双脚连续跳", units: "秒", order: false },
            { type: 7, name: "坐位体前屈", units: "CM", order: true },
            { type: 8, name: "走平衡木", units: "秒", order: false },
            { type: 9, name: "吊环", units: "秒", order: true },
            { type: 10, name: "爆发力", units: "KG", order: true },
            { type: 11, name: "灵敏测试", units: "秒", order: true },
            { type: 12, name: "静态心率", units: "MIN", order: true },     //order代表什么？
            { type: 13, name: "皮褶厚度", units: "MM", order: true },
            { type: 14, name: "视力", units: "", order: true },
            { type: 15, name: "肺活量", units: "	ML", order: true },
            { type: 16, name: "坐高", units: "CM", order: true },
            { type: 17, name: "身高体重", units: "CM", order: true },
            { type: 18, name: "胸围", units: "CM", order: true }
        ][type];
    };
    $.setAbility = function(v){
    	var str = [];
   		$.each(ability, function(i,val){
   			if ((v&val.type) != 0) str.push(val.name);
   		});
   		return str.join(",");
    };
    $.getMax = function(arr, type, prop) {
        if ($.setType(type).order) {
            var max;
            for (var i = 0; i < arr.length; i++) {
                if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
                    max = arr[i];
                    
            }
            return max; 
        } else {
            var min;
            for (var i = 0; i < arr.length; i++) {
                if (!min || parseInt(arr[i][prop]) < parseInt(min[prop]))
                    min = arr[i];
            }
            return min;
           
        }
    }
    $.getMin = function(arr, type, prop) {
        //1-立定跳远; 2-网球掷远; 3-10米折返跑; 4-20米爬; 5-单脚站立; 6-双脚连续跳; 7-坐位体前屈; 8-平衡木; 9-吊环;
        if ($.setType(type).order) {
            var min;
            for (var i = 0; i < arr.length; i++) {
                if (!min || parseInt(arr[i][prop]) < parseInt(min[prop]))
                    min = arr[i];
            }
            return min;
        } else {
            var max;
            for (var i = 0; i < arr.length; i++) {
                if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
                    max = arr[i];
            }
            return max;
        }
    }
	
	/**
	* ajax封装
	* @obj {method,data,before,form,success,error}
	*/
	$.ajax_ = function(obj) {
		$.ajax({
			type: "Post",
			url: "http://server.yphtoy.com/Parent.aspx/" + obj.method,
			data: JSON.stringify(obj.data),
			xhrFields: { withCredentials: true },
       		crossDomain: true,
       		beforeSend: function (hr) {
       			if(obj.btn)
       				obj.btn.attr("disabled","disabled");
       			$("<span>").addClass("loading").appendTo($("body"));
				$(".content").css("-webkit-overflow-scrolling", "auto");
       			if (obj.before != undefined)
       				obj.before(hr);
       		},
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				$("body span.loading").remove();
				$(".content").css("-webkit-overflow-scrolling", "touch");
       			if(obj.btn)
       				obj.btn.removeAttr("disabled");
				obj.success(data)
			},
			error: function(err) {
				console.log(err.responseText);
				$("body span.loading").remove();
       			if(obj.btn)
       				obj.btn.removeAttr("disabled");
       			if (obj.error != undefined)
					obj.error(err)
			}
		});
	};
	$.dialog = function(obj){
		$(".content").css("-webkit-overflow-scrolling", "auto");
		var div = $("<div>").addClass("alert").append(
			$("<div>").append(
				$("<span>").addClass("title").html(obj.title||'提示')
			).append(
				$("<span>").addClass("msg").html(obj.msg)
			).append(
				$("<span>").addClass("btn").html(obj.btn||'确定').click(function(){
					div.remove();
					if(obj.success) obj.success();
					$(".content").css("-webkit-overflow-scrolling", "touch");
				})
			)
		).appendTo($("body"));
		if(obj.after)
			obj.after(div);
	};
	$.b_btns = function(obj){
		$(".content").css("-webkit-overflow-scrolling", "auto");
		var ul = $("<ul>").css("-webkit-animation","btns_up 200ms ease-in forwards");
		$.each(obj, function(i,val){
			ul.append($("<li>").html(val.text).click(val.click));
		});
		ul.append($("<li>").html("取消").click(function(){
			$("#bottom_btns").css("-webkit-animation","btns_bghide 200ms ease-in forwards");
			ul.css("-webkit-animation"," btns_down 200ms ease-in forwards").one("webkitAnimationEnd",function(){
				$("#bottom_btns").remove();
				$(".content").css("-webkit-overflow-scrolling", "touch");
			});
		}));
		$("body").append($("<div>").attr("id","bottom_btns").css("-webkit-animation","btns_bgshow 200ms ease-in forwards").append(ul))
	};
	$.editItem = function(obj){
		$(".content").css("-webkit-overflow-scrolling", "auto");
		$("<div>").attr("id","editItem").append($("<header>").append(
			$("<span>").addClass("left").html(obj.cancle||"取消").click(function(){
				$("#editItem").css("-webkit-animation","edits_down 300ms ease-in forwards").one("webkitAnimationEnd",function(){
					$(".content").css("-webkit-overflow-scrolling", "touch");
					$("#editItem").remove();
				});
			})
		).append($("<span>").addClass("title").html(obj.title)).append(
			$("<span>").addClass("right").html(obj.complete||"完成").click(function(){
				var tmp = $("#editItem input").val();
				if(tmp.trim()==""){
					$("#editItem input").focus();
					return;
				}
				obj.completeClick(tmp, function(){
					$("#editItem .left").trigger("click");
				});
			})
		)).append(
			$("<div>").html('<input type="'+(obj.inputtype||"text")+'" value="'+(obj.val||"")+'" /><span>'+(obj.unit||"")+'</span>')
		).appendTo($("body"));
//		var webView = plus.webview.currentWebview().nativeInstanceObject();
//		webView.plusCallMethod({"setKeyboardDisplayRequiresUserAction:":false});
		plus.webview.currentWebview().setStyle({ softinputMode: "adjustResize" });// 弹出软键盘时自动改变webview的高度
		$("body").find("#editItem input").focus();
	}
	
	$.popup = function(obj){
		$(".content").css("-webkit-overflow-scrolling", "auto");
		$("<div>").attr("id","editItem").append($("<header>").append(
			$("<span>").addClass("left").html(obj.cancle||"取消").click(function(){
				$("#editItem").css("-webkit-animation","edits_down 300ms ease-in forwards").one("webkitAnimationEnd",function(){
					$(".content").css("-webkit-overflow-scrolling", "touch");
					$("#editItem").remove();
				});
			})
		).append($("<span>").addClass("title").html(obj.title)).append(
			$("<span>").addClass("right").html('')
		)).append(
			$("<div class='show_text'>").html(obj.content)
		).append(
			$("<div class='contentlink' >").html("<a href='detaillink.html?id="+obj.contlink+"'>点击购买</a>")
		).appendTo($("body"));
		
		if((obj.contlink).trim() == ''){
			$('.contentlink').hide()
		}
	};
	
	/**	 
	 * 设置url参数
	 * @par 键，也可以是对应的键值
	 * @newvalue 值
	 * */
	$.setRequest = function(par, newvalue){
		var url = "", afterstr = "", se = window.location.search;
		var s = function(par, newvalue){
			var r = new RegExp("^(.*?)" + par + "\=" + encodeURI($.getRequest(par)) + "(.*?)$").exec(se);
        	if(r == null)
        		url = se == "" ? "?" : (se + "&");
        	else{
        		url = r[1];
        		afterstr = r[2];
        	}
        	se = url + par + "=" + newvalue + afterstr;
        	url = "",afterstr = "";
        	return se;
		}
		if (typeof(par) == "string")
			return window.location.pathname + s(par,newvalue);
		else{
			var ret = "";
			for(var k in par)
				ret = s(k,par[k]);
			return window.location.pathname + ret;
		}					
	};
	/**	 
	 * 列表数据读取
	 * @obj { method: "", data:"", bodyDiv:$("#list"), pageDiv: $("#page"), setBody: function (count,list) { } }
	 * */
	$.pageData = function (obj) {
        if (obj.data.currentpage == undefined)
        {
            alert("当前页码不正确");
            return;
        }
        if (obj.data.currentpage <= 0)
        	obj.currentPage = 1;
        else
        	obj.currentPage = obj.data.currentpage;
        if (obj.data.pagesize == undefined) {
            alert("页尺寸不正确");
            return;
        }
        obj.pageSize = obj.data.pagesize;

        if(obj.displacement == undefined) //中间往左右显示几位
            obj.displacement = 3;
        if(obj.aroundFixed == undefined) //前后固定显示几位
            obj.aroundFixed = 2;
        if(obj.backText == undefined)
            obj.backText = "上一页";
        if(obj.nextText == undefined)
            obj.nextText = "下一页";
        if(obj.parName == undefined)
        	obj.parName = "page";

        var setPage = function (dc) {
            if (obj.pageDiv == undefined)
                return;
            if (dc <= 0)
                return;
            var m = Math.ceil(dc / obj.pageSize); //记录总数/每页显示=需要几页
            var pageCount = m <= 0 ? 1 : m;            
        		
            var setUrl = function(currentpage){
            	return $.setRequest(obj.parName, currentpage);
            }
            /// 上一页
            var Back = function()
            {
                if (obj.currentPage > 1)
                    $("<a>").addClass("p_back").html(obj.backText).attr("href",setUrl(obj.currentPage-1)).appendTo(obj.pageDiv);
            }
            /// 左边固定显示内容
            var Left = function()
            {
                if (obj.displacement + 1 >= obj.currentPage)
                    return;

                var start = 1, //起始点肯定是1
                    end = obj.aroundFixed;//理论结束点
                    s_end = obj.currentPage - obj.displacement; //实际结束点

                var split = s_end - end > 1 ? "<samp>...</samp>" : "";
                if (s_end <= end)
                    end = --s_end;

                for (var t = start, i = 0; t <= end; t++, i++)
                    $("<a>").html(t).attr("href",setUrl(t)).appendTo(obj.pageDiv);
                obj.pageDiv.append(split);
            }
            /// 中间往左显示内容
            var CurrentToLeft = function()
            {
                var start = 0, end = 0;
                end = obj.currentPage - 1;
                start = obj.currentPage - obj.displacement;
                if (start < 1) start = 1;

                for (var t = start, i = 0; t <= end; t++, i++)
                    $("<a>").html(t).attr("href",setUrl(t)).appendTo(obj.pageDiv);
            }
            /// 当前页
            var NowPage = function()
            {
                $("<span>").html(obj.currentPage).appendTo(obj.pageDiv);
            }
            /// 中间往右显示内容
            var CurrentToRight=function()
            {
                var start = 0, end = 0;
                start = obj.currentPage > pageCount ? pageCount + 1 : obj.currentPage + 1;
                end = obj.currentPage + obj.displacement;
                if (end >= pageCount) end = pageCount;

                for (var t = start, i = 0; t <= end; t++, i++)
                    $("<a>").html(t).attr("href",setUrl(t)).appendTo(obj.pageDiv);
            }
            /// 右边固定显示内容
            var Right=function()
            {
                if (pageCount - obj.displacement <= obj.currentPage)
                    return;
            
                var start = pageCount - obj.aroundFixed + 1, //理论上起始点           
                    s_start = obj.currentPage + obj.displacement; //实际起始点

                var split = start - s_start > 1 ? "<samp>...</samp>" : "";
                if (s_start >= start)
                    start = ++s_start;
                var end = pageCount;

                obj.pageDiv.append(split);
                for (var t = start, i = 0; t <= end; t++, i++)
                    $("<a>").html(t).attr("href",setUrl(t)).appendTo(obj.pageDiv);
            }
            /// 下一页
            var Next = function()
            {
                if (obj.currentPage < pageCount)
                    $("<a>").html(obj.nextText).addClass("p_next").attr("href",setUrl(obj.currentPage+1)).appendTo(obj.pageDiv);
            }
            obj.pageDiv.empty();
            Back();
            Left();
            CurrentToLeft();
            NowPage();
            CurrentToRight();
            Right();
            Next();
        }
        
        $.ajax_({
            method: obj.method,
            data: obj.data,
            before: function(hr){
            	obj.pageDiv.before($("<span>").addClass("loading").html("正在加载，请稍候..."));
            },
            success: function (da) {
                var p = JSON.parse(da.d);
            	$("span.loading").remove();
            	obj.setBody(p.count, p.list);
            	if(obj.noData)
            		obj.pageDiv.html(obj.noData);
                setPage(p.count);
            },
            error: function (err) {
            	$("span.loading").addClass("loaderr").html("加载失败");
            	if(obj.err)
                	obj.err(err);
            }
        });
    };
	
	$.getRequest = function () {
        if (arguments.length > 0) {
            var url = window.location.search, reg, retVal;
            reg = new RegExp("(^\\?|&)" + arguments[0].toLowerCase() + "=([^&]*)(&|$)");
            retVal = url.match(reg);
            return $.isArray(retVal) && retVal.length >= 3 ? decodeURIComponent(retVal[2]) : '';
        } else
            return decodeURIComponent(window.location.search.slice(1));
    }
	$.htmlEncode = function(value) {
		return $('<div/>').text(value).html();
	};
	$.htmlDecode = function(value) {
		return $('<div/>').html(value).text();
	};
	$.Base64Encode = function(str) {
		if(str == "") return "";
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var input = "";
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = $.utf8_encode(str);

		while(i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if(isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if(isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	};
	$.Base64Decode = function(str) {
		if(str == "") return "";
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var intput = "";
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = str.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while(i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if(enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if(enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = $.utf8_decode(output);
		return output;
	};
	$.utf8_encode = function(str) {
		var string = str.replace(/\r\n/g, "\n");
		var utftext = "";

		for(var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);

			if(c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	};
	$.utf8_decode = function(str) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while(i < str.length) {
			c = str.charCodeAt(i);

			if(c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = str.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = str.charCodeAt(i + 1);
				c3 = str.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
})();