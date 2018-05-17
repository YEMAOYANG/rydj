var plus = {};
(function (plus) {
    // 获取url传参
    plus.getRequest = function () {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
            }
        }
        return theRequest;
    }
    /* 删除url多个参数
        name:Object ex:['form','isappinstalled']
    */
    plus.delRequest = function (name) {
        var loca = window.location;
        var baseUrl = loca.origin + loca.pathname + "?";
        var query = plus.getRequest();
        name.forEach(function(item){
                delete query[item]
            }
        )
        var _str = "";
        for (var o in query) {
            if (query[o] != -1) {
                _str += o + "=" + query[o] + "&";
            }
        }
        var _str = _str.substring(0, _str.length - 1);
        baseUrl = baseUrl + _str;
        return baseUrl

    }

    /*
      信息弹层
    */
    plus.message = function (text) {
//      $("#jsMeeageS").remove();
//      var BodyWidth = $("body").width();
//      var html = "<div style='width:" + BodyWidth + "px;position: fixed;font-size:14px !important;top: 0;left: 0;background: transparent;z-index: 999;height: 100%;overflow: hidden;display: flex;align-items: center;justify-content: center;' id='jsMeeageS'><div style='background: rgba(0,0,0,0.7);color: #fff;border-radius: 100px;padding: 10px 20px;'><p>" + text + "</p></div></div></div>";
//      $("body").append(html);
//      setTimeout(function () {
//          $("#jsMeeageS").remove();
//      }, 1500);
		var message = document.getElementById('jsMeeageS');
		if(message){
			document.body.removeChild(message);
		}
		var BodyWidth = document.body.offsetWidth;
        var parentNode = document.createElement('div');
        parentNode.style.width = BodyWidth + 'px';
        parentNode.style.position = 'fixed';
        parentNode.style.fontSize = '14px !important';
        parentNode.style.top = '0';
        parentNode.style.left = '0';
        parentNode.style.background = 'transparent';
        parentNode.style.zIndex = '999';
        parentNode.style.height = '100%';
        parentNode.style.overflow = 'hidden';
        parentNode.style.display = 'flex';
        parentNode.style.alignItems = 'center';
        parentNode.style.justifyContent = 'center';
        parentNode.id = 'jsMeeageS';
        document.body.appendChild(parentNode);

        var childDIV = document.createElement('div');
        childDIV.style.background = 'rgba(0,0,0,0.7)';
        childDIV.style.color = '#FFFFFF';
        childDIV.style.borderRadius = '100px';
        childDIV.style.padding = '10px 20px';
        parentNode.appendChild(childDIV);

        var p = document.createElement('p');
        p.innerText = text;
        childDIV.appendChild(p);
        setTimeout(function () {
        	document.body.removeChild(parentNode);
        }, 1500);
    }

    // 手机验证码
    plus.getjump = function (count,elid) {
      timeout = window.setTimeout(function(){
        count--;
        if(count > -1) {
            elid.attr('disabled',"true")
            elid.text(count+"s");
            plus.getjump(count,elid);

        }else{
            elid.text('重新获取');
            elid.removeAttr("disabled");
        }
      }, 1000);
    }
})(plus)
