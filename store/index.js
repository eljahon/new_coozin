export const state = () => ({
  userList: [],
  currentUser: {}
});
export const mutations = {
  SET_USER: (state, payload) => {
    state.userList = payload;
  },
  SET_CURRENT_USER: (state, payload) => {
    state.currentUser = payload
  }
};
export const actions = {
  set_user_list({ commit }, payload) {
    commit("SET_USER", payload);
  },
  async setUser ({commit}, res) {
    try {
      let token = res.token
      this.$auth.setUserToken(token)
      const info = await this.$axios.get('/front/auth/user')
      await this.$auth.setUser(info)
      this.$cookies.set('userInfo', info)
    } catch (err) {
      console.log(err)
    }
  },
  async Login ({commit, dispatch}, payload) {
    dispatch('setUser', payload)
  },
  async nuxtServerInit({ commit }) {
    const userInfo = this.$cookies.get('userInfo')
    this.$auth.setUser(userInfo)
    commit('SET_CURRENT_USER', userInfo)
  }
};
export const getters = {
  get_user_lit: (state) => state.userList,
};
