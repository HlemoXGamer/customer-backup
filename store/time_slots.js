import Pusher from "pusher-js";

const state = () => {
  return {
    init: false,
    dialog: false,
  };
};

const getters = {
  dialog(state) {
    return state.dialog;
  },
};

const mutations = {
  SET_INIT(state, payload) {
    state.init = payload;
  },
  APPEAR_DIALOG(state) {
    state.dialog = true;
  },
};

const actions = {
  initPusher({ commit, state }) {
    if (!state.init) {
      const pusher = new Pusher("269cf0af26cc414b447e", { cluster: "eu" });
      const user = window.localStorage.getItem("user");
      if (user) {
        const data = JSON.parse(user);
        pusher.subscribe(`customer.${data.id}`);
        pusher.bind("customer", (notification_data) => {
            // 
        });
        commit("SET_INIT", true);
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
