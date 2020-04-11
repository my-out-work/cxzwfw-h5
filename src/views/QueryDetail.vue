
<template>
  <div>
    <div class="nav-hd">办件查询</div>
    <div class="query">
      <div class="query-hd"></div>
      <div class="query-bd">
        <div class="query-detail">
          <span class="title">办件编号</span><span class="info">{{data.FLOWSN}}</span>
        </div>
        <div class="query-detail">
          <span class="title">申报事项</span><span class="info">{{data.TaskName}}</span>
        </div>
        <div class="query-detail">
          <span class="title">受理日期</span><span class="info">{{data.ApplyDate}}</span>
        </div>
        <div class="query-detail">
          <span class="title">办理状态</span><span class="info">{{data.Status}}</span>
        </div>
        <div class="query-detail">
          <span class="title">办理部门</span><span class="info">{{data.OUName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectDetail } from '@/services'

export default {
  name: 'QueryDetail',
  components: {
  },

  data () {
    return {
      data: {}
    }
  },

  mounted () {
    const { id } = this.$route.query
    if (id) {
      getProjectDetail(this.id).then(res => {
        if (res.ret) {
          this.data = res.data
        } else {
          this.$toast(res.msg)
        }
      })
    } else {
      this.$toast('发生错误，返回重试')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding-top: 60/@rem;
}

.query {
  .query-hd {
    padding: 15/@rem 0;
    background-color: @primary;
    border-top-left-radius: 10/@rem;
    border-top-right-radius: 10/@rem;
  }

  .query-bd {
    padding: 30/@rem 60/@rem;
    background-color: #fff;
    border-color: transparent #ddd #ddd;
    border-style: solid;
    border-width: 2/@rem;
  }

  .query-detail {
    height: 70/@rem;
    overflow: hidden;
    font-size: 30/@rem;
    line-height: 70/@rem;

    .title {
      float: left;
      color: #000;
    }

    .info {
      display: inline-block;
      float: right;
      max-width: 400/@rem;
      overflow: hidden;
      color: #666;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
