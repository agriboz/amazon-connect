export const state = () => ({
  agents: [],
  queues: [],
  teamForScrollingMessages: []
})

export const mutations = {
  setShared(state, { key, data }) {
    if (key === 'agents') {
      const fullName = data.map((item, index) => {
        return {
          name: item.fName + ' ' + item.lName,
          id: index + 1,
          username: item.username
        }
      })
      state[key] = fullName
    }

    if (key === 'teamForScrollingMessages') {
      const result = []
      const map = new Map()
      for (const item of data) {
        if (!map.has(item.team)) {
          map.set(item.team, true) // set any value to Map
          result.push({
            id: item.id,
            name: item.team
          })
        }
      }
      state[key] = result
    }

    if (key === 'queues') {
      const queues = data.map(item => {
        return {
          name: item.name,
          id: item.id.split('queue/')[1],
          arn: item.id
        }
      })
      state[key] = queues
    }
  }
}

export const actions = {
  async getShared({ commit }, { endpoint, key }) {
    try {
      const { data } = await this.$axios.get(`${endpoint}`)
      return data.length ? commit('setShared', { key, data }) : []
    } catch (error) {
      console.log(error)
    }
  }
}
