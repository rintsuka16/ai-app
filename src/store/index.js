import Vue from 'vue'
import Vuex from 'vuex'
import items from './modules/items' // 商品管理モジュールをインポート
import incomes from './modules/incomes' // 商品管理モジュールをインポート
import expenses from './modules/expenses' // 商品管理モジュールをインポート
import player from './modules/player';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    items,
    incomes,
    expenses, // productモジュールを登録
    player
  }
})