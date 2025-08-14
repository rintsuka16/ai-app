import axios from "axios";

export default {
  namespaced: true,
  state: {
    Items: [
      {
        Date: " 2025-08-06",
        Inout: "支出",
        Category: "食費",
        Amount: "3,500"
      }
    ]
  },
  getters: {
    SumIn(state) {

      const sumin = state.Items.reduce((Sum, item) => Sum + item.Amount*1, 0);
      return sumin;
    },  
  },
  mutations: {
    setApi(state, data) {
      state.Items = data.map((item) => ({
        Date: item.Date,
        Inout: item.Inout,
        Category: item.Category,
        Amount: item.Amount
      }));
    }
  },
  actions: {
    async API({ commit }) {
      try {
        const response = await axios.get(
          "https://m3h-rintarootsuka-0730.azurewebsites.net/api/SELECTINCOME?"
        );
        const KakeiboList = response.data.List;
        const Items = KakeiboList.map((kakeibo) => ({
          Date: kakeibo.Date.slice(0,10),
          Inout: kakeibo.Inout,
          Category: kakeibo.Category,
          Amount: kakeibo.Amount
        }));
        commit("setApi", Items);
      } catch (error) {
        console.error("API取得できませんでした:", error);
      }
    }
  }
};
