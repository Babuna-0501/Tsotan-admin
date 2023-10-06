import axios from "axios";

const state = {
  user: null,
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = null;
  },
};

const actions = {
  async login({ commit }, { email, password }) {
    const response = await axios.post("https://rest.tsotan.mn/login", {
      email,
      password,
    });
    commit("setUser", response.data.user);
    this.$router.push("/dashboard-default");
  },
  logout({ commit }) {
    commit("clearUser");
  },
};

const getters = {
  isAuthenticated: (state) => !!state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
