/**
* 获取cookie
* */
export const getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

/**
* 设置cookie
* */
export const setCookie = (name,value) =>{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
/**
* 删除cookie
* */
export const removeCookie(name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
/**
* 存储localStorage
*/
export const setLocalStorage = (name, content) => {
    if(!name) return;
    if(typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    localStorage.setItem(name, content);
}

/**
* 获取localStorage
*/
export const getLocalStorage = name => {
    if(!name) return;
    return localStorage.getItem(name);
}

/**
* 删除localStorage
*/
export const removeLocalStorage = name => {
    if(!name) return;
    localStorage.removeItem(name);
}

/**
* 存储sessionStorage
*/
export const setSessionStorage = (name, content) => {
    if(!name) return;
    if(typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    sessionStorage.setItem(name, content);
}

/**
* 获取sessionStorage
*/
export const getSessionStorage = name => {
    if(!name) return;
    return sessionStorage.getItem(name);
}

/**
* 删除sessionStorage
*/
export const removeSessionStorage = name => {
    if(!name) return;
    sessionStorage.removeItem(name);
}
