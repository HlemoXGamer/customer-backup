import { get, update } from '@/apis/notification';
import { LocalNotifications } from '@capacitor/local-notifications';
import Pusher from 'pusher-js';

// import { update } from '~/apis/addresses';

const state = () => {
  return {
    items: [],
    total: 0,
    init: false,
    last_item: null,
  };
};

const getters = {
  items(state) {
    return state.items;
  },
  total(state) {
    return state.total;
  },
  last_item (state) {
    return state.last_item
  }
};

const mutations = {
  INCREAMENT_NOTIFICATION(state) {
    state.total += 1;
  },
  DECREAMENT_NOTIFICATION(state) {
    state.total -= 1;
  },
  SET_TOTAL(state, total) {
    state.total = total;
  },
  SET_NOTIFICATION(state, payload) {
    state.items = payload;
  },
  SET_INIT(state, payload) {
    state.init = payload;
  },
  PUSH_NOTIFICATION(state, payload) {
    state.items = [payload, ...state.items];
    state.last_item = payload
  },
  DELETE_NOTIFICATION(state) {
    state.items = []
    state.last_item = null
  }
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
          commit("INCREAMENT_NOTIFICATION");
          LocalNotifications.schedule({
            notifications: [
              {
                title: "Notification",
              },
            ],
          });
          commit("PUSH_NOTIFICATION", {...notification_data, status : notification_data.order_status});
        });
        commit("SET_INIT", true);
      }
    }
  },
  getNotifications({ commit, dispatch }) {
    get().then(({ data }) => {
      commit("SET_NOTIFICATION", data);
      commit('SET_TOTAL', data.filter(item => item.is_active === 1)?.length || 0); 
      dispatch("initPusher");
    });
  },
  updateNotifications({commit, state}) {
      update().then(() => {
        commit('SET_TOTAL', 0); 
      })
  },
  setNewStatus ({commit}) {
    const notification_data = {"id": 13, "user_id": 13, "order_id": 1, "order_status" : "on_the_way"}
    commit("PUSH_NOTIFICATION", {...notification_data, status : notification_data.order_status});
  },
  deleteNotification({ commit }) {
    commit('DELETE_NOTIFICATION')
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
