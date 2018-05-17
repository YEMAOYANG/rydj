var native = {};
(function (native) {
    /**
     * 判断手机设备
     */
    var userAgent = navigator.userAgent;
    native.os = {
        isIphone: userAgent.indexOf('iPhone') > -1 ? true : false,
        isIpad: userAgent.indexOf('iPad') > -1 ? true : false,
        isIOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? true : false,
        isAndroid: (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) ? true : false
    }
    /**
     * 社交分享 native.share({})
     * @param options
     * {
     *  url:'',
     *  title:'',
     *  logo:'',
     *  content:''
     * }
     */
    native.share = function (options) {
        if (native.os.isAndroid) {
            var json = {LinkData:options}
            android.link(JSON.stringify(json))
        } else {
            console.log('ios share')
            var json = {
                action: 'Link',
                model: options
            }
            window.webkit.messageHandlers.AppJS2OC.postMessage(json)
        }
    }
    /*
      APP跳转H5
      Link:string
    */
    native.jumpLink=function (Link) {
        if (native.os.isAndroid) {
            var json = {LinkData:{url:Link}}
            try {
              android.jumplink(JSON.stringify(json))
              return false
            }catch (e) {}
        } else if(native.os.isIphone || native.os.isIpad || native.os.isIOS) {
            var json = {
                action: 'jumpLink',
                model: {url:Link}
            }
            try {
              window.webkit.messageHandlers.AppJS2OC.postMessage(json)
              return false
            }catch (e) {}
        }else{
            window.location.href=Link
        }
    }
    /*
      APP调用原生
      Link:string
    */
    native.openAppView=function (Link) {
        if (native.os.isAndroid) {
            var json = {openAppView:{view:Link}}
            try{
              android.openAppView(JSON.stringify(json))
              return false
            }catch (e) {}
        } else if(native.os.isIphone || native.os.isIpad || native.os.isIOS) {
            var json = {
                action: 'openAppView',
                model: {view:Link}
            }
            try{
              window.webkit.messageHandlers.AppJS2OC.postMessage(json)
              return false
            }catch (e) {}
        }
    }
    /*
      新闻回复
      replyData:object
      {
        comment_id:评论id,
        parent_reply_id:被回复的回复id ：回复评论时为0,
        receiver_uid:被回复的用户id
      }
    */
    native.commentReply=function (replyData) {
        if (native.os.isAndroid) {
            var json = {commentReply:replyData}
            try{
              android.commentReply(JSON.stringify(json))
              return false
            }catch (e) {}
        } else if(native.os.isIphone || native.os.isIpad || native.os.isIOS) {
            var json = {
                action: 'commentReply',
                model: replyData
            }
            try{
              // alert('ios');
              window.webkit.messageHandlers.AppJS2OC.postMessage(json)
              return false
            }catch (e) {}
        }
    }
    /*
      APP跳转H5
      Link:string
    */
    native.seeMore=function (Link) {
        if (native.os.isAndroid) {
            var json = {LinkData:{url:Link}}
            try {
                android.seeMore(JSON.stringify(json))
                return false
            }catch (e) {}
        } else if(native.os.isIphone || native.os.isIpad || native.os.isIOS) {
            var json = {
                action: 'seeMore',
                model: {url:Link}
            }
            try {
                window.webkit.messageHandlers.AppJS2OC.postMessage(json)
                return false
            }catch (e) {}
        }else{
            window.location.href=Link
        }
    }
})(native)
