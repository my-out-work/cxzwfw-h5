import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import rem from '@/shared/rem'
import './styles/common/index.less'
import Toast from './components/Toast'

rem()

Vue.use(Toast)
Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
