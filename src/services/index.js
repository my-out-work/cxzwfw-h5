import axios from 'axios'
import storage from '@/shared/storage'

// 浙江政务登陆接口

export { default as YH } from './zjzw'

// 办事大厅接口

const ajax = axios.create({
  baseURL: 'https://yc.huzhou.gov.cn:8088/wsdt/rest'
})

const APP_TOKEN = 'Epoint_WebSerivce_**##0601'

const defaultOptions = {
  centerguid: '6bef18db-f0b8-49fd-9d39-e406ad6d5bd5'
}

function post (url, options = {}) {
  const params = Object.assign({}, defaultOptions, options)
  const WX_USER_INFO = getWxUser()
  const USER_TOKEN = WX_USER_INFO ? WX_USER_INFO.token : ''
  return ajax({
    method: 'post',
    url,
    data: {
      token: APP_TOKEN,
      params
    },
    headers: {
      Accept: 'text/html;charset=utf-8',
      Authorization: 'Bearer ' + USER_TOKEN
    },
    dataType: 'json',
    contentType: 'application/json;charset=UTF-8'
  })
}

function handleZWResult (res) {
  console.log(res)
  if (res.status === 200 && res.data && res.data.status && res.data.status.code === 200) {
    return {
      code: 0,
      msg: 'success',
      data: res.data
    }
  }

  return {
    code: res.data.status.code || -1,
    msg: res.data.status.text || '第三方服务器出错了',
    data: ''
  }
}

/**
 * 查询办事事件详情
 * @param {String} FlowSN 订单号
 */
export async function getProjectByFlowSN (FlowSN) {
  const res = await post('hzqueueAppointment/getProjectByFlowSN', {
    FlowSN
  })
  return handleZWResult(res)
}

/**
 * 查询办事详情
 * @param {String} ProjectGuid 事件id
 */
export async function getProjectDetail (ProjectGuid) {
  const res = await post('hzqueueAppointment/getProjectDetail', {
    ProjectGuid
  })
  return handleZWResult(res)
}

/**
 * 获取浙报APP用户信息
 * @param {String} ticket 中心guid
 */
export async function getUserinfo (ticket) {
  const res = await post('hzqueueAppointment/getUserinfo', {
    ticket
  })
  return handleZWResult(res)
}

/**
 * 根据openid获取用户信息
 */
export async function wzUserDetailByOpenID (openid) {
  const res = await post('/hzzwfwWxUser/wzUserDetailByOpenID', {
    openid
  })
  return handleZWResult(res)
}

const WxUser = 'cxzwfw-wxuser'
/**
 * 设置本地用户token
 */
export function setWxUser (token) {
  return storage.set(WxUser, token)
}

/**
 * 获取本地用户token
 */
export function getWxUser () {
  return storage.get(WxUser)
}

/**
 * 注册微信用户
 * username, mobile, password, idnum
 */
export async function wxUserRegister (options) {
  const res = await post('/hzzwfwWxUser/wxUserRegister', options)
  return handleZWResult(res)
}

/**
 * 校验手机号是否绑定
 */
export async function checkPhoneExist (mobile) {
  const res = await post('/zwdtRegister/checkPhoneExist', {
    mobile
  })
  return handleZWResult(res)
}

/**
 * 用户绑定微信
 * idnumormobile, password, openid, encodepassword
 */
export async function wxUserBind (options) {
  const res = await post('/hzzwfwWxUser/wxUserBind', options)
  return handleZWResult(res)
}

/**
 * 获取部门列表
 */
export async function getHallList () {
  const res = await post('/hzqueueAppointment/getHallList')
  return handleZWResult(res)
}

/**
 * 获取大厅
 */
export async function getHallThemes (hallguid, shownum = 10) {
  const res = await post('/hzqueueAppointment/getHallThemes', {
    hallguid,
    shownum
  })
  return handleZWResult(res)
}

/**
 * 获取子大厅
 */
export async function getChildThemes (themeguid, shownum = 10) {
  const res = await post('/hzqueueAppointment/getChildThemes', {
    themeguid,
    shownum
  })
  return handleZWResult(res)
}

/**
 * 获取预约工作日
 */
export async function getAppointDate (showdays = 5) {
  const res = await post('/hzqueueAppointment/getAppointDate', {
    showdays
  })
  return handleZWResult(res)
}

/**
 * 获取预约时间段
 */
export async function getAppointTime (taskguid, appointdate) {
  const res = await post('/hzqueueAppointment/private/getAppointTime', {
    taskguid,
    appointdate
  })
  return handleZWResult(res)
}

/**
 * 创建预约订单
 * username, identitycardid, mobile
 */
export async function getAppointQno (options) {
  options = Object.assign(options, {
    appointtype: 3
  })
  const res = await post('/hzqueueAppointment/private/getAppointQno', options)
  return handleZWResult(res)
}

/**
 * 获取订单列表
 */
export async function getAppointList (currentpage, pagesize) {
  const res = await post('/hzqueueAppointment/private/getAppointList', {
    currentpage,
    pagesize,
    type: 2
  })
  return handleZWResult(res)
}

// 内部接口

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '//wx.minjs.cn/cxzwfw/api/' : '/api/cxzwfw/api/'
})

function handleResult (res) {
  if (res.status === 200 && res.data) {
    return res.data
  }
  return {
    code: 1,
    msg: '服务器出错了'
  }
}

/**
 * 获取首页区块内容
 * @param {String} type 区块类型
 */
export async function getMenuList (type) {
  const res = await request.get('getMenuList', {
    params: { type }
  })
  return handleResult(res)
}

/**
 * 获取首页新闻
 */
export async function getNewsList () {
  const res = await request.get('getNewsList')
  return handleResult(res)
}

/**
 * 登陆
 * @param {String} ticket 票据
 */
export async function login (ticket) {
  const res = await request.post('login', {
    ticket
  })
  return handleResult(res)
}

/**
 * 微信授权
 */
export async function wxouath () {
  const res = await request.get('wxoauth', {
    params: {
      from: window.location.href
    }
  })
  return handleResult(res)
}

/**
 * 微信授权
 */
export async function getWxUserInfo () {
  if (process.env.NODE_ENV === 'development') {
    return {
      code: 0,
      data: {
        openid: 'o9-y-0zpSkPbcDqRpUel0kK50Adc',
        nickname: 'test'
      }
    }
  }
  const res = await request.get('wxUserInfo')
  return handleResult(res)
}

/**
 * 用户是否登陆
 */
const UserKey = 'cxzwfw-user'

export function isLogin () {
  const token = storage.get(UserKey)

  if (token) {
    return token
  }

  return false
}

/**
 * 存储本地用户信息
 * @param {Object} data 用户信息
 */
export function setUserInfoToLocal (data) {
  if (data) {
    storage.set(UserKey, data)
  }
}

/**
 * 获取本地用户信息
 */
export function getUserInfoFromLocal () {
  return storage.get(UserKey)
}
