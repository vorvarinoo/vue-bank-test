import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartItems: JSON.parse(sessionStorage.getItem("cartItems") || "[]"),
    buttonStates: JSON.parse(sessionStorage.getItem("buttonStates") || "{}"),
  },
  mutations: {
    addToCart(state, id) {
      if (!state.cartItems.includes(id)) {
        state.cartItems.push(id);
        sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    updateButtonState(state, { id, stateValue }) {
      Vue.set(state.buttonStates, id, stateValue);
      sessionStorage.setItem("buttonStates", JSON.stringify(state.buttonStates));
    },
  },
  actions: {
    addToCart({ commit }, id) {
      commit("addToCart", id);
      commit("updateButtonState", { id, stateValue: "btn--in-cart" });
    },
    processButton({ commit }, { id }) {
      commit("updateButtonState", { id, stateValue: "processing" });
      setTimeout(() => {
        commit("updateButtonState", { id, stateValue: "btn--in-cart" });
      }, 2000);
    },
  },
  getters: {
    isInCart: (state) => (id) => {
      return state.cartItems.includes(id);
    },
    buttonState: (state) => (id) => {
      return state.buttonStates[id] || "default";
    },
  },
});
