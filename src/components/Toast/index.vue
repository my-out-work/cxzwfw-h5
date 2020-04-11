<template>
  <div class="toast show">{{msg}}</div>
</template>

<script>
export default {
  name: 'toast',
  props: ['msg']
}
</script>

<style lang="less" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  display: none;
  min-width: 100px;
  max-width: 80%;
  padding: 15px 10px;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 6px;
  transform: translate(-50%, -50%);

  &.show {
    display: block;
  }
}
</style>
