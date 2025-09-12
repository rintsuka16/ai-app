import axios from "axios";

export default {
  namespaced: true,
  state: {
    UserId: 0,
    currentEventId: null,
    currentSeq: 0,
    lines: []
  },
  getters: {
    currentLine(state) {
      return state.lines[state.currentSeq] || null;
    },
    isEnd(state) {
      return state.currentSeq >= state.lines.length;
    }
  },
  mutations: {
    setEvent(state, { eventId, lines }) {
      state.currentEventId = eventId;
      state.currentSeq = 0;
      state.lines = lines;
    },
    nextLine(state) {
      if (state.currentSeq < state.lines.length) {
        state.currentSeq++;
      }
    },
    setSeq(state, seq) {
      state.currentSeq = seq;
    }
  },
  actions: {
    async fetchEvent({ commit }, eventId) {
      try {
        const res = await axios.get(
          `https://m3h-rintarootsuka-0730.azurewebsites.net/api/SELECTEVENT?event_id=${eventId}`
        );
        // APIは { EventId, Seq, Text } の配列を返す想定
        const lines = res.data.map(r => r.Text);
        commit("setEvent", { eventId, lines });
      } catch (err) {
        console.error("イベント取得失敗:", err);
      }
    },
    async saveProgress({ state }) {
      try {
        await axios.post("https://m3h-rintarootsuka-0730.azurewebsites.net/api/UPDATEsaver", {
          UserId: "ユーザーID", // 実際はVuexのstatusから取得
          EventId: state.currentEventId,
          Seq: state.currentSeq
        });
      } catch (err) {
        console.error("進行保存失敗:", err);
      }
    }
  }
};
