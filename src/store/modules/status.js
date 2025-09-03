import axios from "axios";

export default {
  namespaced: true,
  state: {
    status: {
      UserId: "fromState",
      CharId: "fromState",
      Exp: "fromState",
      Parameter1: "fromState",
      Parameter2: "fromState",
      Parameter3: "fromState"
    }
  },
  getters: {
    Total(state) {
      const Sum = state.Items.reduce((Sum, item) => Sum + item.Amount, 0);
      return Sum;
    }
  },

  mutations: {
    setStatus(state, data) {
      state.status = {
        UserId: data.UserId,
        CharId: data.CharId,
        Exp: data.Exp,
        Parameter1: data.Parameter1,
        Parameter2: data.Parameter2,
        Parameter3: data.Parameter3
      };
    },
    addParameters(state, addParam) {
      state.status.Parameter1 += addParam.Parameter1;
      state.status.Parameter2 += addParam.Parameter2;
      state.status.Parameter3 += addParam.Parameter3;
      state.status.Exp =
        state.status.Exp +
        addParam.Parameter1 +
        addParam.Parameter2 +
        addParam.Parameter3;
    }
  },
  actions: {
    async setSavedData({ commit }) {
      try {
        const response = await axios.get(
          "https://m3h-rintarootsuka-0730.azurewebsites.net/api/SELECTPLAYER"
        );

        const playerData = response.data;
        const status = {
          UserId: playerData.PlayerDataList[0].UserId,
          CharId: playerData.PlayerDataList[0].CharId,
          Exp: playerData.PlayerDataList[0].Exp,
          Parameter1: playerData.PlayerDataList[0].Parameter1,
          Parameter2: playerData.PlayerDataList[0].Parameter2,
          Parameter3: playerData.PlayerDataList[0].Parameter3
        };
        commit("setStatus", status);
      } catch (error) {
        console.error("API取得できませんでした:", error);
      }
    },
    async saveData({ state }) {
      const sendParam = {
        UserId: state.status.UserId,
        CharId: state.status.CharId,
        Exp: state.status.Exp,
        Parameter1: state.status.Parameter1,
        Parameter2: state.status.Parameter2,
        Parameter3: state.status.Parameter3
      };

      const response = await axios.post(
        "https://m3h-rintarootsuka-0730.azurewebsites.net/api/UPDATE",
        sendParam
      );
      console.log(response.data);
      console.log(state.status.UserId);
    }
  }
};
