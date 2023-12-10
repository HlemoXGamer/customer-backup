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
  APPEAR_DIALOG(state, payload) {
    state.dialog = payload;
  },
};

const actions = {
  initPusher({ commit, state, rootState }) {
    if (!state.init) {
      const pusher = new Pusher("269cf0af26cc414b447e", { cluster: "eu" });
      let cartId = rootState.cart.id;
      let channel = pusher.subscribe(`timeSlot.${cartId}`);

      channel.bind("timeSlot", (timeSlotData) => {
        console.log("Received timeSlot data:", timeSlotData);
        commit('APPEAR_DIALOG', timeSlotData.is_active);  // Commit the mutation to update the dialog state
      });
      
      commit("SET_INIT", true);
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
