<template>
  <div>
    <div v-for="d in data" :key="d.themeguid" class="affair">
      <div class="affair-hd">
        {{d.themename}}
      </div>
      <div class="affair-bd">
        <div class="affair-btns">
          <router-link class="btn-l" :to="'affairchild?id=' + d.themeguid">选择主题</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHallThemes } from '@/services'

export default {
  name: 'Affair',
  components: {
  },

  data () {
    return {
      data: []
    }
  },

  mounted () {
    const { id } = this.$route.query
    if (id) {
      getHallThemes(id).then(res => {
        if (res.custom && res.custom.themelist) {
          this.data = res.custom.themelist
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
  padding-top: 120/@rem;
}

.affair-title {
  padding: 30/@rem 0;
  font-size: 30/@rem;
  color: #666;
}

.affair {
  margin-bottom: 30/@rem;
  background-color: #fff;
  border: 2/@rem solid #ddd;

  .affair-hd {
    padding: 30/@rem 20/@rem;
    font-size: 32/@rem;
    line-height: 1.42;
    color: #000;
    border-bottom: 2/@rem solid #ddd;
  }

  .affair-bd {
    padding: 30/@rem 20/@rem;
  }

  .affair-detail {
    margin-bottom: 30/@rem;
    overflow: hidden;
    font-size: 26/@rem;

    .name {
      display: inline-block;
      float: left;
      width: 150/@rem;
      color: #000;
    }

    .info {
      display: inline-block;
      float: left;
      margin-right: 50/@rem;
      color: #666;

      address {
        margin-top: 20/@rem;
        margin-bottom: 15/@rem;
      }
    }
  }

  .affair-btns {
    box-sizing: border-box;
    width: 628/@rem;
    height: 60/@rem;
    border: 2/@rem solid @primary;
    border-radius: 10/@rem;

    a {
      display: inline-block;
      float: left;
      width: 50%;
      height: 100%;
      font-size: 26/@rem;
      line-height: 60/@rem;
      text-align: center;
      text-decoration: none;

      &.btn-l {
        color: #fff;
        background-color: @primary;
        border-top-left-radius: 10/@rem;
        border-bottom-left-radius: 10/@rem;
      }

      &.btn-r {
        color: @primary;
        background-color: #fff;
        border-top-right-radius: 10/@rem;
        border-bottom-right-radius: 10/@rem;
      }
    }
  }
}

</style>
