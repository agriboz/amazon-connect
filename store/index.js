// import jwt_decode from 'jwt-decode'
const user = JSON.parse(localStorage.getItem('user'))

export const state = () => ({
  widgetViewMenu: [],
  isFooterVisible: true,
  loading: false,
  user: user || {}
})

export const mutations = {
  loginSuccess(state, user) {
    state.user = user
  },

  loginFailure(state) {
    state.user = null
  },

  logout(state) {
    state.user = null
    localStorage.clear()
  },

  setLoading(state, payload) {
    state.loading = payload
  },

  setWidgetMenu(state, payload) {
    state.widgetViewMenu = payload
  },

  toggleFooter(state, payload) {
    state.isFooterVisible = payload
  }
}

export const actions = {
  async login({ commit, dispatch }, { username, password }) {
    try {
      const { data } = await this.$axios.post('authentication/login', {
        username,
        password
      })
      await commit('loginSuccess', data)
      /* localStorage.setItem(
        'user',
        JSON.stringify({ ...jwt_decode(data.token), token: data.token })
      ) */
      localStorage.setItem('user', JSON.stringify(data))
      await dispatch('alert/success', 'Login successful. Redirecting...', {
        root: true
      })

      setTimeout(() => {
        this.$router.push({
          path: '/home'
        })
      }, 1000)
    } catch (error) {
      await commit('loginFailure')
      await dispatch('alert/error', error.message, { root: true })
    }
  },

  logout({ commit }) {
    commit('logout')
  },

  async getWidgetViewMenu({ commit, state }) {
    const { username } = state.user
    const { data } = await this.$axios.get(`dashboards/user/${username}`)
    await commit('setWidgetMenu', data)
  }
}
