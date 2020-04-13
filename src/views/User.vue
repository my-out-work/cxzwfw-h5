<template>
  <div>
    <div class="user-hd">
      <div class="headimg" :style="{ backgroundImage: `url(${user.headimgurl || defaultImg})` }"></div>
      <div class="user-info">
        <div class="name j-name">{{user.nickname || user.username || user.loginname}}</div>
        <div class="number j-number">{{user.mobile}}</div>
      </div>
    </div>
    <div class="block">
      <router-link class="user-list" to="affairappointdetail">
        <i class="icon icon-sm icon-yuyuejilu i-l"></i>
        <span class="name">预约记录</span>
        <i class="icon icon-sm icon-youjiantou i-r"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import defaultImg from '../img/icon/gerentouxiang.png'
import { getWxUserInfo } from '@/services'

export default {
  name: 'User',
  components: {
  },

  data () {
    return {
      user: {
        nickname: '游客',
        headimgurl: defaultImg,
        mobile: ''
      },
      defaultImg
    }
  },

  async mounted () {
    const res = await getWxUserInfo()
    if (res.code === 0) {
      const { user, token } = res.data
      if (user) this.user = user
      if (token) this.token = token
    }
  }
}
</script>

<style lang="less" scoped>

.user-hd {
  position: relative;
  height: 200/@rem;
  background-color: @primary;

  .headimg {
    position: absolute;
    top: 35/@rem;
    left: 20/@rem;
    width: 127/@rem;
    height: 127/@rem;
    background-color: #eee;
    background-size: 100%;
    border-radius: 50%;
  }

  .user-info {
    position: absolute;
    top: 35/@rem;
    left: 200/@rem;
    padding: 15/@rem 0;
    font-size: 36/@rem;
    color: #fff;

    .name {
      margin-bottom: 35/@rem;
    }
  }
}

.user-list {
  position: relative;
  display: block;
  height: 75/@rem;
  text-decoration: none;
  background-color: #fff;

  .i-l {
    float: left;
    margin-top: 35/@rem/2;
    margin-left: 30/@rem;
  }

  .name {
    margin-left: 30/@rem;
    font-size: 36/@rem;
    line-height: 75/@rem;
    color: #000;
  }

  .i-r {
    position: absolute;
    top: 35/@rem/2;
    right: 30/@rem;
  }

  &:not(:last-child)::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 30/@rem;
    display: block;
    height: 2/@rem;
    content: '';
    background-color: #ddd;
  }
}

.block {
  margin-bottom: 15/@rem;
  border-top: 2/@rem solid #ddd;
  border-bottom: 2/@rem solid #ddd;
}

</style>
