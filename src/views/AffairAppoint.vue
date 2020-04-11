<template>
  <div>
    <div class="nav-hd">网上预约</div>
    <ul id="j-main" class="date"></ul>
    <div class="main">
      <div id="j-wrap-0" class="time-wrap">无数据</div>
      <div id="j-wrap-1" class="time-wrap" style="display: none;">无数据</div>
      <div id="j-wrap-2" class="time-wrap" style="display: none;">无数据</div>
      <div id="j-wrap-3" class="time-wrap" style="display: none;">无数据</div>
      <div id="j-wrap-4" class="time-wrap" style="display: none;">无数据</div>
    </div>
    <div class="main mh">
      <div class="title">注意事项</div>
      <div class="content"><br>
        1.申请人可在前往长兴县政务服务中心办事前申请网上预约（国家法定节假日除外）。<br><br>
        2. 预约采用实名制，预约人请注册并填写真实身份信息，否则无法进行预约。<br><br>
        3. 在预约时段内成功预约后，会收到通知短信，在预约日期当天，凭短信和身份证到相关窗口取号办事。<br><br>
        4. 申请人在约定日期、约定时间段未取号的，视为放弃预约，需重新预约。
      </div>
    </div>
    <button class="btn appoint-btn" type="button">同意并预约</button>
  </div>
</template>

<script>
import { getAppointDate } from '@/services'

export default {
  name: 'AffairAppoint',
  components: {
  },

  data () {
    return {
      appointdatelist: []
    }
  },

  mounted () {
    const { id } = this.$route.query
    if (id) {
      getAppointDate(id).then(res => {
        if (res.custom && res.custom.appointdatelist) {
          this.appointdatelist = res.custom.appointdatelist
        }
      })
    } else {
      this.$toast('发生错误，返回重试')
    }
  }
}
</script>

<style lang="less" scoped>

.date {
  //width: 1000/@rem;
  height: 70/@rem;
  padding: 0;
  margin: 0;
  margin-bottom: 25/@rem;
  list-style-type: none;
  background-color: #fff;

  li {
    display: inline-block;
    float: left;
    //width: 200/@rem;
    width: 150/@rem;
    font-size: 30/@rem;
    line-height: 70/@rem;
    color: #000;
    text-align: center;
    border-bottom: 10/@rem solid #fff;

    &.active {
      border-color: @primary;
    }
  }
}

.main {
  padding: 30/@rem 25/@rem;
  margin-bottom: 15/@rem;
  background-color: #fff;

  .address-detail {
    font-size: 28/@rem;
    color: #666;
  }

  .title {
    margin-bottom: 20/@rem;
    font-size: 30/@rem;
    color: #000;
  }

  .content {
    padding-left: 40/@rem;
    font-size: 28/@rem;
    color: #000;
  }
}

.mh {
  min-height: 400/@rem;
}

.appoint-btn {
  position: fixed;
  bottom: 58/@rem;
  left: 50%;
  width: 538/@rem;
  height: 70/@rem;
  margin-left: -538/@rem/2;
  font-size: 30/@rem;
  line-height: 70/@rem;
}

.time-wrap {
  overflow: hidden;
}

.time-picker {
  box-sizing: border-box;
  display: inline-block;
  float: left;
  width: 220/@rem;
  height: 100/@rem;
  padding-top: 10/@rem;
  margin-right: 10/@rem;
  margin-bottom: 20/@rem;
  font-size: 28/@rem;
  color: #000;
  text-align: center;
  background-color: #fff;
  border: 2/@rem solid #ddd;
  border-radius: 10/@rem;

  &.active {
    color: #fff;
    background-color: @primary;
    border-color: @primary;
  }

  span {
    display: block;
  }

  .time {
    margin-bottom: 12/@rem;
  }
}

</style>
