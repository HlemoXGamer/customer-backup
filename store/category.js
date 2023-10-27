  import { getField, updateField } from 'vuex-map-fields';
  
  export const state = () => ({
    selected_category: []
  });
  
  export const getters = {
    getField,
  };

  export const actions = {
    setCategory({ commit }, category) {
      commit('SET_CATEGORY', category);
    },
  };
  
  export const mutations = {
    SET_CATEGORY(state, category) {
        localStorage.setItem("selected_category", category);
      state.selected_category = [category];
    },
    updateField,
  };