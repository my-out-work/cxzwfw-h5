
<template>
  <div>
    <div class="nav-hd">办件查询</div>
    <form class="form">
      <div class="form-item">
        <label>流水号：</label>
        <input v-model="id" type="number" name="flowSN">
      </div>
      <div class="error"></div>
      <button @click="getProjectByFlowSN" class="form-btn" type="button">查询</button>
    </form>
    <div class="copyright">长兴县政务服务中心</div>
  </div>
</template>

<script>
import { getProjectByFlowSN } from '@/services'

export default {
  name: 'Query',
  components: {
  },

  data () {
    return {
      id: ''
    }
  },

  methods: {
    getProjectByFlowSN () {
      getProjectByFlowSN(this.id).then(res => {
        if (res.code === 0) {
          this.$route.push('querydetail?id=' + res.data.ProjectGuid)
        } else {
          this.$toast(res.msg)
        }
      })
    }
  }
}
</script>
