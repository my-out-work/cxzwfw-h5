let _isSupported

/**
 * 是否支持 localStorage
 */
function isSupported () {
  if (_isSupported !== undefined) {
    return _isSupported
  }

  const key = '_ls_test'

  try {
    window.localStorage.setItem(key, 1)
    window.localStorage.removeItem(key)
    _isSupported = true
  } catch (e) {
    _isSupported = false
    // https://stackoverflow.com/questions/21159301/quotaexceedederror-dom-exception-22-an-attempt-was-made-to-add-something-to-st
  }

  return _isSupported
}

// prefix to void key conflict (when use cookie as polyfill)
export default {
  get: function (key) {
    if (isSupported()) {
      const data = window.localStorage.getItem(key)
      if (data) return JSON.parse(data)
      return null
    }

    return null
  },

  set: function (key, value) {
    if (isSupported()) {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    }

    return false
  },

  remove: function (key) {
    if (isSupported()) {
      window.localStorage.removeItem(key)
      return true
    }

    return false
  }
}
