<template>
  <div>
    <img class="login-hd" src="../img/login_hd.png" />
    <div id="j-chageLoginType" class="login-change">
      <a class="active" href="javascript:;">个人登陆</a>
      <a href="javascript:;">法人登陆</a>
    </div>
    <div class="line"></div>
    <form class="form login-form">
      <div class="form-item">
        <label>手机号：</label>
        <input v-model="loginname" type="text" name="mobile" />
      </div>
      <div class="form-item">
        <label>密码：</label> <input v-model="loginpwd" type="password" name="pwd" />
      </div>
      <div class="error"></div>
      <div class="btn-groups">
        <button @click="login" class="form-btn" type="button">登陆</button>
        <a
          class="l"
          href="https://puser.zjzwfw.gov.cn/sso/usp.do?action=mobileRegisterUser&type=2&servicecode=cxwxgz&goto=http://wechat.nextdog.cc/partyjo/online-administration/register.html"
          title=""
          >我要注册</a
        >
        <a
          class="r"
          href="https://puser.zjzwfw.gov.cn/sso/usp.do?action=findPwd&type=2&servicecode=cxwxgz&goto=http://wechat.nextdog.cc/partyjo/online-administration/register.html"
          title=""
          >忘记密码</a
        >
      </div>
    </form>
    <div class="copyright">长兴县政务服务中心</div>
  </div>
</template>

<script>
import { YH, login, getWxUser, setWxUser, wxUserRegister, wxUserBind, wzUserDetailByOpenID, setUserInfoToLocal, wxouath, getWxUserInfo, checkPhoneExist, getUserInfoFromLocal } from '@/services'
// import encode from '@/shared/encode'

export default {
  name: 'Home',
  components: {
  },

  data () {
    return {
      loginname: '',
      loginpwd: '',
      wxUserInfo: null
    }
  },

  mounted () {
    getWxUserInfo().then(res => {
      if (res.code === 0) {
        this.wxUserInfo = res.data
        const wxUser = getWxUser()
        if (wxUser) {
          this.back()
          return
        }

        wzUserDetailByOpenID(this.wxUserInfo.openid).then(res => {
          if (res.code === 0) {
            setWxUser(res.data.custom)
            this.back()
          }
        })
      } else {
        wxouath()
      }
    })
    this.from = this.$route.query.from
    YH.callback.loginAppForJs = ticket => {
      this.autoLogin(ticket)
    }
    YH.callback.loginApp = ticket => {
      this.autoLogin(ticket)
    }
    YH.callback.showErrcode = (errorMsg, errorcode) => {
      this.$toast(errorMsg)
    }
  },

  methods: {
    login () {
      if (!this.loginname || !this.loginpwd) return
      YH.method.loginForJs(this.loginname, this.loginpwd, '001003076')
    },
    back () {
      if (this.from) {
        location.replace(this.from)
      }
    },
    autoLogin (ticket) {
      login(ticket).then(res => {
        if (res.code === 0) {
          setUserInfoToLocal(res.data.user)
          this.checkPhoneExist(res.data.mobile)
        } else {
          this.$toast(res.msg)
        }
      })
    },
    checkPhoneExist (mobile) {
      checkPhoneExist(mobile).then(res => {
        if (res.code === 0) {
          if (res.data.custom.code !== 0) {
            const appUser = getUserInfoFromLocal()
            wxUserRegister({
              username: appUser.username,
              mobile: this.loginname,
              password: this.loginpwd,
              idnum: appUser.idnum
            }).then(res => {
              console.log(res)
              if (res.code === 0) {
                wxUserBind({
                  idnumormobile: this.loginname,
                  openid: this.wxUserInfo.openid,
                  password: this.loginpwd,
                  encodepassword: encodeURI(this.loginpwd)
                }).then(res => {
                  console.log(res)
                })
              }
            })
          }
        } else {
          this.$toast(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-hd {
  width: 100%;
  font-size: 0;
}

.login-change {
  height: 75/@rem;
  background-color: #fff;

  a {
    display: inline-block;
    float: left;
    width: 50%;
    height: 100%;
    font-size: 30/@rem;
    line-height: 75/@rem;
    color: #000;
    text-align: center;
    text-decoration: none;

    &.active {
      color: @primary;
    }
  }
}

.line {
  height: 10/@rem;
  background-color: #f2f2f2;
}

.form.login-form {
  padding: 0;
  background-color: #fff;

  .form-item {
    border: none;
    border-bottom: 2/@rem solid #eee;
  }

  .btn-groups {
    padding: 0 20/@rem 100/@rem;

    .form-btn {
      margin-bottom: 15px;
    }

    .bind {
      opacity: 0.7;
    }

    a {
      font-size: 24/@rem;
      color: #000;
      text-decoration: none;

      &.l,
      &.r {
        margin-top: 20/@rem;
      }

      &.l {
        float: left;
      }

      &.r {
        float: right;
      }
    }
  }
}
</style>
