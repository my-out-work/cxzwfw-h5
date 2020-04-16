/* eslint-disable no-eval */
function encodeUtf8 (s1) {
  var s = escape(s1)
  var sa = s.split('%')
  var retV = ''
  if (sa[0] !== '') {
    retV = sa[0]
  }
  for (var i = 1; i < sa.length; i++) {
    if (sa[i].substring(0, 1) === 'u') {
      retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)))
      if (sa[i].length > 5) {
        retV += sa[i].substring(5)
      }
    } else retV += '%' + sa[i]
  }

  return retV
}

function Hex2Utf8 (s) {
  var retS = ''
  var tempS = ''
  var ss = ''
  if (s.length === 16) {
    tempS = '1110' + s.substring(0, 4)
    tempS += '10' + s.substring(4, 10)
    tempS += '10' + s.substring(10, 16)
    var sss = '0123456789ABCDEF'
    for (var i = 0; i < 3; i++) {
      retS += '%'
      ss = tempS.substring(i * 8, (eval(i) + 1) * 8)

      retS += sss.charAt(Dig2Dec(ss.substring(0, 4)))
      retS += sss.charAt(Dig2Dec(ss.substring(4, 8)))
    }
    return retS
  }
  return ''
}

function Dig2Dec (s) {
  var retV = 0
  if (s.length === 4) {
    for (var i = 0; i < 4; i++) {
      retV += eval(s.charAt(i)) * Math.pow(2, 3 - i)
    }
    return retV
  }
  return -1
}

function Str2Hex (str) {
  if (str === '') { return '' }
  var hexCharCode = []
  hexCharCode.push('0x')
  for (var i = 0; i < str.length; i++) {
    hexCharCode.push((str.charCodeAt(i)).toString(16))
  }
  return hexCharCode.join('')
}

export default function (input) {
  // 先进行utf-8编码,解决中文问题
  input = encodeUtf8(input)
  // 对%做replace替换
  input = input.replace(/%/g, '_PERCENT_')

  // 对所有字符做ascii码转换
  var output = ''
  var chr1 = ''
  var i = 0
  var l = input.length
  do {
    // 取字符的ascii码
    chr1 = input.charCodeAt(i++)
    // 偏移比较复杂，这里做个递减
    chr1 -= i
    // =分割便于后台解析
    output = output + '=' + (chr1)
  } while (i < l)

  return output
}
