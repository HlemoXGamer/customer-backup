export const state = () => ({
  time: "",
  timePeriod: 5 * 60000,
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
  setData({ commit }, data){
    commit("SET_DATA", data);
  }
};

export const mutations = {
  SET_DATA(state, data){
    state.days = data?.days || [];
    state.hours = data?.hours || [];
    state.minutes = data?.minutes || [];
    state.apmpm = data?.apmpm || [];
    state.payment = data?.isPaymentTimeValid;
    console.log(data)
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
  },
  SET_TIME(state, time){
    state.time = time
  }
};