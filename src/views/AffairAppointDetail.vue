<template>
  <div>
    <div class="nav-hd">预约记录</div>
    <div id="j-main" class="container">
      <div v-for="d in data" :key="d.queueguid" class="at-wrap">
        <div class="at-detail">
          <div class="name">票码</div>
          <div class="info">{{d.queueguid}}</div>
        </div>
        <div class="at-detail">
          <div class="name">取号时间</div>
          <div class="info">{{d.createdate}}</div>
        </div>
        <div class="at-detail">
          <div class="name">部门</div>
          <div class="info">{{d.ouname}}</div>
        </div>
        <div class="at-detail">
          <div class="name">业务</div>
          <div class="info">{{d.taskname}}</div>
        </div>
        <div class="at-detail">
          <div class="name">预约开始时间</div>
          <div class="info">{{d.appointtimestart}}</div>
        </div>
        <div class="at-detail">
          <div class="name">预约结束时间</div>
          <div class="info">{{d.appointtimeend}}</div>
        </div>
        <div class="at-detail">
          <div class="name">状态</div>
          <div class="info">{{d.status == 1 ? '已取号' : '过号'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAppointList } from '@/services'

export default {
  name: 'AffairApponitDetail',

  data () {
    return {
      data: [],
      currentpage: 1,
      pagesize: 10,
      isLoaded: false,
      isLoading: false
    }
  },

  mounted () {
    window.addEventListener('scroll', this.scroll)
    this.loadData()
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.scroll)
  },

  methods: {
    scroll () {
      const totalheight = Math.ceil(window.screen.height) + Math.ceil(window.scrollTop)
      if (document.documentElement.height <= totalheight) {
        if (!this.isLoaded && !this.isLoading) {
          this.loadData(this.currentpage, this.pagesize)
        } else if (this.isLoaded) {
          console.log('没有更多数据了')
        }
      }
    },

    async loadData (currentpage, pagesize) {
      const res = await getAppointList(currentpage, pagesize)
      if (res.code === 0) {

      } else {
        this.$toast(res.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>

.container {
  padding: 60/@rem 30/@rem;
}

.at-wrap {
  margin-bottom: 20px;
  border-color: #ddd #ddd transparent;
  border-style: solid;
  border-width: 2/@rem;

  .at-detail {
    // height: 95/@rem;
    padding: 0 20/@rem;
    overflow: hidden;
    font-size: 30/@rem;
    line-height: 95/@rem;
    border-bottom: 2/@rem dotted #ddd;

    .name {
      display: inline-block;
      float: left;
      color: #000;
    }

    .info {
      display: inline-block;
      float: right;
      max-width: 500/@rem;
      text-align: right;
    }
  }
}
</style>
