<template>
  <section class="h-100 d-flex flex-column">
    <b-form-input
      v-if="textSize.isToggled"
      v-model="textSize.header"
      class="w-25 m-auto d-flex"
      type="range"
      min="0"
      max="5"
      step="0.25"
      @input="++textSize.header"
    />
    <h4
      class="d-flex align-items-center justify-content-center text-uppercase"
      :style="{ fontSize: `${textSize.header}rem` }"
    >
      <i class="mdi mdi-settings icon-settings" @click="openModal" />
      <span
        v-b-tooltip.hover
        :title="
          !textSize.isToggled ? 'Click to Change Font Size' : 'Click to Hide'
        "
        @click="textSize.isToggled = !textSize.isToggled"
        >{{ item.title }}</span
      >
    </h4>
    <b-form-input
      v-if="textSize.isToggled"
      v-model="textSize.content"
      class="w-25 m-auto d-flex"
      type="range"
      min="0"
      max="9"
      step="0.25"
      @input="++textSize.content"
    />

    <div class="d-flex h-100">
      <div class="flex-fill align-items-stretch">
        <table class="table table-bordered text-white text-center">
          <thead>
            <tr>
              <th>Full Name</th>
              <th style="background-color: #e67e22">
                Status
              </th>
              <th style="background-color: #D24D57">
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, i) in data" :key="i">
              <td>{{ d.fName + ' ' + d.lName }}</td>
              <td class="font-weight-bold text-white">
                <span
                  v-if="d.statusType === 'Aux'"
                  class="bg-info d-flex justify-content-center"
                  >{{ d.statusName }}</span
                >
                <span
                  v-if="d.statusType === 'Offline'"
                  class="bg-danger d-flex justify-content-center"
                  >{{ d.statusName }}</span
                >
                <span
                  v-if="d.statusType === 'Routable'"
                  class="bg-success d-flex justify-content-center"
                  >{{ d.statusName }}</span
                >
              </td>
              <td>{{ d.RTAtimeStamp }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <settings-filter
      v-if="options.showModal"
      :options="options"
      :item.sync="item"
    />
  </section>
</template>

<script>
import SettingsFilter from '@/components/SettingsFilter'

export default {
  components: {
    SettingsFilter
  },

  data: () => ({
    textSize: { header: '1.125', content: '1', isToggled: false },
    options: {
      showModal: false
    },
    item: {
      title: 'Agent List 40',
      modalId: 'AgentList40',
      agents: []
    },
    data: []
  }),

  watch: {
    'textSize.header': newTextSize => {
      localStorage.textSizeAgentList20Header = newTextSize
    },
    'textSize.content': newTextSize => {
      localStorage.textSizeAgentList20Content = newTextSize
    },
    item: function() {
      this.$emit('updateData', this.item)
    }
  },

  mounted() {
    if (localStorage.textSizeAgentList20Header) {
      this.textSize.header = localStorage.textSizeAgentList20Header
    }
    if (localStorage.textSizeAgentList20Content) {
      this.textSize.content = localStorage.textSizeAgentList20Content
    }
  },

  beforeMount() {
    this.getData()
    this.$emit('updateData', this.item)
  },

  methods: {
    async getData() {
      const { data } = await this.$axios.get(`users/states`)
      this.data = await data.slice(0, 40)
    },

    async openModal() {
      this.options.showModal = true
    }
  }
}
</script>
