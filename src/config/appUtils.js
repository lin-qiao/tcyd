/**
 * @description js 调用app 登陆 兼容  安卓 苹果  isAndroid,isiOS
 * @param{String} type  ddt (大德通)  other[xqt|tt] ...
 */
export const appLogin = (type="ddt") => {
	if(getPlatform()!='wx'){
		if(isAndroid){//安卓 环境
			window.android.toLogin();
		}else{ //苹果
			window.location.href="ddt://JSDLogin/loginWithCompletion";
		}
	}else{
		 window.$router.replace("/login?url="+window.location.pathname+window.location.search)
	}
}

/**
 * @description js 调用app 分享 兼容  安卓 苹果  isAndroid,isiOS
 */
export const appShare = (title,content,link,img) => {
	if(isAndroid){//安卓 环境
		window.android.setInviteFriendDialog(title,content,link,img);
	}else{ //苹果
		window.location.href=`ddt://action/share?title=${title}&content=${content}&link=${link}&img=${img}`;
	}
}

/**
 * @description app 下载
 */
export const appDownLoad = () => {
	if (isAndroid) { //安卓
		window.location.href = 'http://apkinstall.ddtkj.com/tcyd/tcyd_102.apk'
	} else { //苹果
		window.location.href = ''
	}
}