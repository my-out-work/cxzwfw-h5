const YH = {}
const url = 'https://puser.zjzwfw.gov.cn/sso'
const servicecode = 'cxwxgz'
const baseURL = `${url}/usp.do?servicecode=${servicecode}`

const jsonp = function (src) {
  var scriptElement = document.getElementById('_ssoedit')
  if (scriptElement) {
    scriptElement = scriptElement.parentNode.removeChild(scriptElement)
  }
  if (src.indexOf('?') === -1) {
    src += '?1=1'
  }
  src += '&rd=' + Math.random()
  var script
  script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  script.id = '_ssoedit'
  document.getElementsByTagName('HEAD')[0].appendChild(script)
}

YH.url = 'https://puser.zjzwfw.gov.cn/sso'
YH.servicecode = servicecode

YH.ajax = function (action, options) {
  let url = baseURL + `&action=${action}&orgcoding=001003076`
  Object.keys(options).forEach(key => {
    url += `&${key}=${options[key]}`
  })
  jsonp(url)
}

YH.config = {
  loginForJsUrl: YH.url + '/js.do?action=login&js=true&servicecode=' + YH.servicecode,
  logoutUrl: YH.url + '/js.do?action=logout&servicecode=' + YH.servicecode
}

YH.method = {

  loginForJs: function (loginname, loginpwd, orgcoding) {
    jsonp(YH.config.loginForJsUrl + '&loginname=' + loginname + '&loginpwd=' + loginpwd + '&orgcoding=' + orgcoding)
  },

  logout: function () {
    YH.cookie.del(YH.cookie.loginSign, true)
    jsonp(YH.config.logoutUrl)
  }

}

YH.callback = {
  loginApp: function (ticket, isjs, isfirst) {
    if (YH.cookie.islogin() === false) {
      YH.cookie.set(YH.cookie.loginSign, true)
      if (isjs) {
        YH.callback.loginAppForJs(ticket)
      } else {
        var url = YH.config.loginAppUrl
        if (isfirst) {
          url = url + '&isfirst=true'
        }
        window.location.href = url + '&ticket=' + ticket
      }
    }
  }
}

YH.cookie = {
  loginSign: 'yh_app_islogin',
  islogin: function () {
    var value = YH.cookie.get(YH.cookie.loginSign)
    if (value && (value === true || value === 'true')) {
      return true
    }
    return false
  },
  set: function (name, value, time) {
    value = name + '=' + escape(value)
    if (time) { // 小时
      var exp = new Date() // new Date("December 31, 9998");
      exp.setTime(exp.getTime() + time * 60 * 60 * 1000)
      value = value + ';expires=' + exp.toGMTString()
    }
    document.cookie = value
  },
  get: function (name) {
    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
    if (arr != null) return unescape(arr[2]); return null
  },
  del: function (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.get(name)
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

window.YH = YH
export default YH
