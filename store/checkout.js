import {
  add as addCheckout,
  applyCoupon,
  complete as completeCheckout,
  get as getCheckout,
  removeDiscount,
} from '@/apis/checkout';
import { getField, updateField } from 'vuex-map-fields';

export const state = () => ({
  type: "",
  step: 1,
  selectedTip: 3,
  checkout_loading: false,
  loading: false,
  order: {},
  checkout: {
    id: null,
    discount: 0,
    discounts: [],
  },
  coupon: "",
  payment_methods: {
    1: "Cash On Delivery",
    3: "Pay Online",
    2: "Cash At Office",
  },
  form: {
    to_send: {
    },
    payment_method_code: 0,
    delivery_date: null,
    // pickup_time: null,
    notes: "",
    tipping: 0,
    is_separate: 0,
    is_pickup: 0,
    address_id: null,
    user_data: {
      name: "",
      phone: "",
      email: "",
      v_code: "",
      address: {
        address_phone: 0,
        address_floor: 0,
        address_country: 1,
        address_city: 1,
        address_building_no: "",
        address_apartment: "",
        block_no: "",
      },
    },
  },
});

export const getters = {
  getField,
  sub_total: (state, getters, rootState, rootGetters) => {
    return state.checkout.id
      ? state.checkout.sub_total
      : rootGetters["cart/totalPrice"];
  },
  shipping: (state) => {
    return state.checkout.id ? state.checkout.shipping : 0;
  },
  total: (state, getters) => {
    return getters.sub_total + getters.shipping - state.checkout.discount;
  },
};
export const actions = {
  get({ commit }) {
    return getCheckout
      .call(this)
      .then((data) => {
        commit("SET_CHECKOUT", data.data);
      })
      .catch(() => {
        commit("SET_CHECKOUT", {
          id: null,
          discount: 0,
          discounts: [],
        });
      });
  },

  init({ state, commit }) {
    const data = { ...state.form };

    if (this.$auth.loggedIn) {
      delete data["user_data"];
    }
    return addCheckout.call(this, data).then((data) => {
      commit("SET_CHECKOUT", data.data);
    });
  },
  checkout({ state, commit }, address) {
    commit('SET_LOADING', true)

    const data = mapFields([
      ["address_phone", address.phone],
      ["address_floor", address.floor],
      ["address_country", address.country_name],
      ["address_city", address.city_name],
      ['address_area', address.area_name],
      ["address_building_no", address.building_num],
      ["address_apartment", address.apartment],
      ['address_street_name', address.street_name]
      ['is_pickedup', localStorage.getItem('order_type') == 'pick-up' ? 1 : 0],
      ['lat', address.lat],
      ['lng', address.lng],
      ["block_no", address.block_no],
      this.$auth.loggedIn ? "" :
        ["name", address.name],
      this.$auth.loggedIn ? "" :
        ["email", address.email],
      this.$auth.loggedIn ? "" :
        ["branch_id", JSON.parse(localStorage.getItem("guest_branch"))]

    ]);

    commit('SET_ADDRESS', data)
    commit('SHOW_PAYMENT')
    commit('SET_LOADING', false)

  },
  confirm({ state, commit }) {
    commit('SET_LOADING', true)
    const methods = ["knet", "Bookeey", "credit", "Applepay"]
    const _to_send = { ...state.form.to_send }
    if (_to_send.address_phone && _to_send.address_phone.length === 8) {
      _to_send.address_phone = '965' + _to_send.address_phone
    }
    const to_send = { ..._to_send, payment_method: methods[state.form.payment_method_code || 0], v_code: state.form.user_data.v_code }
    if (state.form.delivery_date && state.form.delivery_date !== null) {
      to_send.delivery_date = state.form.delivery_date;
    }
    return completeCheckout.call(this, to_send).then(({ data }) => {
      commit("cart/CLEAR_ALL", null, { root: true });
      commit('SET_LOADING', false)
      // 
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    });
  },
  applyCoupon({ state, commit }) {
    commit("SET_CHECKOUT_LOADING", true);
    return applyCoupon
      .call(this, state.checkout.id, state.coupon)
      .then((data) => {
        commit("SET_CHECKOUT", data.data.checkout);
      })
      .finally(() => {
        commit("SET_CHECKOUT_LOADING", false);
        commit("SET_COUPON", "");
      });
  },
  removeDiscount({ state, commit }, { id, index }) {
    commit("SET_CHECKOUT_LOADING", true);

    return removeDiscount
      .call(this, state.checkout.id, id)
      .then((data) => {
        commit("SET_CHECKOUT", data.data.checkout);
      })
      .finally(() => {
        commit("SET_CHECKOUT_LOADING", false);
      });
  },
};

export const mutations = {
  SET_IS_PICKUP(state, is_pickup) {
    state.form.is_pickup = is_pickup;
  },
  SET_DELIVERY_DATE(state, delivery_date) {
    state.form.delivery_date = delivery_date;
  },
  SET_V_CODE(state, v_code) {
    state.form.user_data.v_code = v_code;
  },
  SHOW_SHIPPING(state) {
    state.step = 1;
  },
  SHOW_TIME(state) {
    state.step = 2;
  },
  SHOW_SUMMARY(state) {
    state.step = 3;
  },
  SHOW_PAYMENT(state) {
    state.step = 4;
  },
  SHOW_REVIEW(state) {
    state.step = 4;
  },
  SHOW_SUCCESS(state) {
    state.step = 5;
  },
  SET_TYPE(state, type){
    state.type = type;
  },
  SET_TIP(state, tip) {
    state.form.tipping = tip;
  },
  SET_ORDER(state, order) {
    state.order = order;
  },
  SET_ADDRESS(state, data) {
    state.form.to_send = { ...state.form.to_send, ...data }
  },
  SET_CHECKOUT(state, checkout) {
    state.checkout = checkout;

    const user = checkout.user;
    const address = checkout.address;
    if (!user) return;

    state.form.user_data = {
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: {
        country_id: address.country.id,
        city_id: address.city.id,
        address: address.address,
        apartment: address.apartment,
      },
    };
  },
  SET_COUPON(state, coupon) {
    state.coupon = coupon;
  },
  SET_LOADING(state, boolean) {
    state.loading = boolean
  },
  SET_CHECKOUT_LOADING(state, bool) {
    state.checkout_loading = bool;
  },
  updateField,
};

function mapFields(array) {
  const data = {};
  debugger;

  for (const item of array) {
    const first = item[0];
    const last = item[1];
    data[first] = last;
  }

  return data;
}
