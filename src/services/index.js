import axios from 'axios'
import storage from '@/shared/storage'

// 浙江政务登陆接口

export { default as YH } from './zjzw'

// 办事大厅接口

const ajax = axios.create({
  baseURL: 'https://yc.huzhou.gov.cn:8088/wsdt/rest'
})

const token = 'Epoint_WebSerivce_**##0601'

const defaultOptions = {
  centerguid: '6bef18db-f0b8-49fd-9d39-e406ad6d5bd5'
}

function post (url, options = {}) {
  return ajax.post(url, {
    token,
    params: Object.assign(defaultOptions, options)
  })
}

function handleZWResult (res) {
  if (res.status === 200 && res.data && res.data.status && res.status === 200) {
    return res.data
  }
  return {
    ret: 0,
    msg: '服务器出错了'
  }
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
 */
export async function getAppointQno (username, identitycardid, mobile, token) {
  const res = await post('/hzqueueAppointment/private/getAppointQno', {
    username,
    identitycardid,
    mobile,
    token,
    appointtype: 3
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
 * 查询办事事件详情
 */
export async function getProjectByFlowSN (flowSN) {
  const res = await request.get('getProjectByFlowSN', {
    params: {
      flowSN
    }
  })
  return handleResult(res)
}

/**
 * 查询办事详情
 * @param {String} projectGuid 事件id
 */
export async function getProjectDetail (projectGuid) {
  const res = await request.get('getProjectDetail', {
    params: {
      projectGuid
    }
  })
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
 * 用户是否登陆
 */
const UserKey = 'cxzwfw-user'
export function isLogin () {
  const user = storage.get(UserKey)

  if (user) {
    return user
  }

  return false
}

/**
 * 存储用户信息
 * @param {Object} user 用户信息
 */
export function cacheUserInfo (user) {
  return storage.set(UserKey, user)
}
