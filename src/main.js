import Vue from 'vue'
import App from './App.vue'
import router from './router'
import rem from '@/shared/rem'
import './styles/common/index.less'
import Toast from './components/Toast'
// import * as Sentry from '@sentry/browser'
// import * as Integrations from '@sentry/integrations'

if (window.Sentry) {
  // 错误监控
  window.Sentry.init({
    dsn: 'https://aab8f460ebae4c8e91d4b08b906c9a00@o377377.ingest.sentry.io/5199438',
    integrations: [new window.Sentry.Integrations.Vue({ Vue, attachProps: true })]
  })
}

rem()

Vue.use(Toast)
Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
