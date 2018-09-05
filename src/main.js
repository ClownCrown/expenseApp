// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from './store/store';
import App from './App';
import VModal from 'vue-js-modal';

Vue.config.productionTip = false;

Vue.use(VModal, {
  dialog: true,
  dynamic: true,
})

export const serverBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: {
    App
  },
  template: '<App/>',
});
