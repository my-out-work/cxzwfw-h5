<template>
  <div>
    <router-link v-for="d in data" :key="d.hallguid" class="dpt" :to="'affair?id=' + d.hallguid">
      <div class="dpt-left">
        <i class="icon icon-md icon-danweitubiao"></i>
      </div>
      <div class="dpt-mid">
        <div class="name">{{d.hallname}}</div>
      </div>
      <div class="dpt-right">
        <i class="icon icon-sm icon-youjiantou"></i>
      </div>
    </router-link>
  </div>
</template>

<script>
import { getHallList } from '@/services'

export default {
  name: 'Department',
  components: {
  },

  data () {
    return {
      data: []
    }
  },

  mounted () {
    getHallList().then(res => {
      if (res.code === 0) {
        const { data } = res
        if (data.custom && data.custom.halllist) {
          this.data = data.custom.halllist
        }
      } else {
        this.$toast(res.msg)
      }
    })
  }
}
</script>

<style lang="less" scoped>

.dpt {
  display: block;
  height: 150/@rem;
  margin-bottom: 20/@rem;
  background-color: #fff;

  .dpt-left {
    box-sizing: border-box;
    display: inline-block;
    float: left;
    width: 150/@rem;
    height: 100%;
    padding-top: 45/@rem;
    text-align: center;
  }

  .dpt-mid {
    display: inline-block;
    float: left;
    width: 475/@rem;
    padding-top: 15/@rem;

    .name {
      padding: 15/@rem 0;
      overflow: hidden;
      font-size: 32/@rem;
      color: #000;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 2/@rem solid #ddd;
    }

    .intro {
      padding: 15/@rem 0;
      font-size: 26/@rem;
      color: #666;
    }
  }

  .dpt-right {
    box-sizing: border-box;
    display: inline-block;
    float: left;
    width: 125/@rem;
    padding-top: 60/@rem;
    text-align: center;
  }
}
</style>
