export const state = () => ({
  time: "",
  timePeriod: 5000,
  days: [],
  hours: [],
  minutes: [],
  ampm: [],
  payment: true
});

export const actions = {
  setTime({ commit }, time) {
    commit('SET_TIME', time);
  },
  setData({ commit }, { days, hours, minutes, ampm, isPaymentTimeValid }){
    commit("SET_DAYS", days);
    commit("SET_HOURS", hours);
    commit("SET_MINUTES", minutes);
    commit("SET_AMPM", ampm);
    commit("SET_PAYMENT", isPaymentTimeValid);
  }
};

export const mutations = {
  SET_TIME(state, time) {
    state.time = time;
  },
  SET_DAYS(state, days) {
    state.days = days;
  },
  SET_HOURS(state, hours) {
    state.hours = hours;
  },
  SET_MINUTES(state, minutes) {
    state.minutes = minutes;
  },
  SET_AMPM(state, ampm) {
    state.ampm = ampm;
  },
  SET_PAYMENT(state, payment) {
    state.payment = payment;
  }
};