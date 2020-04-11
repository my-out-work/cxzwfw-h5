let rem

/**
 * 初始化 rem (设置基准值)
 */
export default function init () {
  const el = document.documentElement

  // 避免重复初始化
  if (el.getAttribute['data-dpr']) {
    return
  }

  // 非苹果设备因为兼容性问题，统一认为 dpr 为 1
  const dpr = navigator.userAgent.match(/iPhone|iPad|iPod/i)
    ? Math.min(window.devicePixelRatio || 1, 3)
    : 1

  el.setAttribute('data-dpr', dpr)

  function setRem (callback) {
    let width = el.clientWidth

    // 方便 pc 开发
    if (!navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) && width > 1024) {
      width = 640
      if (typeof callback === 'function') {
        setTimeout(() => {
          callback(width)
        }, 0)
      }
    }

    // 兼容旧组件(可能会用到这个值)
    window.remScale = width / 640

    // 由于历史原因，以 iphone5 为基准，即：
    // 屏宽为 320px，dpr 为 2
    const newRem = (width / 640) * 2 * 100

    if (newRem !== rem) {
      rem = newRem
      // 设置根节点 font-size (基准)
      el.style.fontSize = `${rem}px`
    }
  }

  // 第一次初始化
  setRem((width) => {
    document.body.style.margin = '0 auto'
    document.body.style.maxWidth = `${width}px`
  })

  // 事件监听
  window.addEventListener('pageshow', setRem, false)
  window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', setRem, false)
}

/**
 * px -> rem 转换
 * @param { number | string} v 如：200 或 '200px'
 */
export function px2rem (v) {
  return parseFloat(v) / ((200 / 640) * 750)
}

/**
 * rem -> px 转换
 * @param { number | string} v 如：5 或 '5rem'
 */
export function rem2px (v) {
  return parseFloat(v) * rem * 2
}
