import { add, get, remove, removeAll, update } from '@/apis/cart';
import { jsonToFormData } from '@/utils/json';
import { reorder } from '~/apis/orders';

export const state = () => ({
  items: [],
  total: 0,
  delivery_fee: null,
  delivery_cost: null,
  minimum_charge: null,
  loading: false,
  loading_reorder: false,
  branch_start: '',
  branch_en: '',
  itemNotes: []
});

export const getters = {
  count(state) {
    return state.items.reduce((acc, item) => acc + item.quantity, 0);
  },
  totalPrice(state) {
    return state.items.reduce((acc, item) => {
      return acc + item.product.compare_at_price * item.quantity;
    }, 0);
  },
  loading_reorder(state) {
    return state.loading_reorder
  },
  getItems(state) {
    return state.items
  },
  getItemNotes(state) {
    return state.itemNotes
  },
  total(state) {
    return state.total
  },
  delivery_fee(state) {
    return state.delivery_fee
  },
  delivery_cost(state) {
    return state.delivery_cost
  },
   minimum_charge(state) {
    return state.minimum_charge
  },
};

// TODO: clean it
let timer;

export const actions = {
  setItemNotes({ commit }, payload) {
    commit('SET_ITEM_NOTES', payload)
  },
  add({ commit, dispatch }, item) {
    commit('SET_LOADING', true)

    const form_data = jsonToFormData(item)
    return add.call(this, item.product_id, form_data)
      .then(data => {
        // only call get once
        clearTimeout(timer)
        timer = setTimeout(() => {
          dispatch('get')
        }, 1000)
      })
  },
  reOrder({ commit, dispatch }, payload) {
    commit('SET_LOADING_REORDER', true)
    return reorder.call(this, payload).then((data) => {
      dispatch('get')
      this.$toast.success(data.message);
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      commit('SET_LOADING_REORDER', false)
    })
  },
  get({ commit }, area) {
    commit('SET_LOADING', true)
    let area_id;
    const defaultLocation = localStorage.getItem(`default_location`);
    if(!area){
      if(defaultLocation == "area"){
        area_id = JSON.parse(localStorage.getItem('default_area')).id;
      }else if(defaultLocation == "address"){
        area_id = JSON.parse(localStorage.getItem(`default_address`)).area_id;
      }
    }
    console.log(defaultLocation)
    return get.call(this, !area ? area_id : area.branch).then((data) => {
      commit("SET_ITEMS", data.data?.items || []);
      commit("SET_TOTAL", data.data?.total || 0);
      commit("SET_DELIVERY_FEE", data.delivery_fee || 0);
      commit("SET_DELIVERY_COST", data.delivery_cost || 0);
      commit("SET_MINIMUM_CHARGE", data.minimum_charge || 0);
      commit("SET_BRANCH_START", data.start || 0);
      commit("SET_BRANCH_END", data.end || 0);
      commit("SET_EST_TIME", data.data.est_time || 0);
    }).then(() => {
      commit('SET_LOADING', false)
    })
  },
  remove({ commit, dispatch }, id) {
    commit("REMOVE_ITEM", id);

    return remove.call(this, id).then(() => {
      dispatch('get')
    });
  },
  updateQuantity({ commit }, { id, quantity }) {
    commit("UPDATE_QUANTITY", {
      id,
      quantity,
    });

    return update.call(this, id, {
      quantity,
    });
  },
  clear({ commit }) {
    commit("CLEAR_ALL");

    return removeAll.call(this);
  },
  setAll({ commit }, items) {
    commit('SET_ITEMS', items)
  }
};
export const mutations = {
  SET_ITEM_NOTES(state, payload) {
    state.itemNotes = payload.itemNotes
    // const index = state.items.findindex(item=>{
    //   return item.product_id === payload.productId;
    // })
    // state.items[index].notes = payload.itemNotes
  },
  SET_LOADING(state, boolean) {
    state.loading = boolean
  },
  SET_LOADING_REORDER(state, boolean) {
    state.loading_reorder = boolean
  },
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_EST_TIME(state, payload) {
    state.est_time = payload
  },
  SET_TOTAL(state, total) {
    state.total = total
  },
  SET_DELIVERY_FEE(state, delivery_fee) {
    state.delivery_fee = delivery_fee
  },
  SET_DELIVERY_COST(state, delivery_cost) {
    state.delivery_cost = delivery_cost
  },
  SET_MINIMUM_CHARGE(state, minimum_charge) {
    state.minimum_charge = minimum_charge
  },
  SET_BRANCH_START(state, payload) {
    state.branch_start = payload
  },
  SET_BRANCH_END(state, payload) {
    state.branch_end = payload
  },
  UPDATE_QUANTITY(state, { id, quantity }) {
    const index = state.items.findIndex((item) => item.id == id);

    state.items[index].quantity = quantity;
  },
  REMOVE_ITEM(state, id) {
    const index = state.items.findIndex((item) => item.id == id);

    state.items.splice(index, 1);
  },
  CLEAR_ALL(state) {
    state.items = [];
  },
};
