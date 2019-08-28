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
        <div
          v-for="(d, i) in initWidgetPercentageBlock"
          :key="i"
          v-b-tooltip.hover
          placement="righttop"
          :title="`${calcDataTest[i].name}:  %${d.toFixed()}`"
          :style="{ height: `${d}%`, backgroundColor: calcDataTest[i].color }"
        ></div>
      </div>
      <div
        class="flex-fill text-center font-weight-bold text-large agent-states-widget ml-3"
      >
        <div
          v-for="(d, i) in calcDataTest"
          :key="i"
          class="h-20 d-flex align-items-center justify-content-center"
          :style="{
            color: calcDataTest[i].color
          }"
        >
          <h4 :style="{ fontSize: `${textSize.content}rem` }">{{ d.count }}</h4>
        </div>
      </div>
      <div class="flex-fill font-weight-bold agent-states-widget ml-3">
        <div
          v-for="(d, i) in calcDataTest"
          :key="i"
          class="h-20 d-flex align-items-center justify-content-start"
          :style="{
            color: calcDataTest[i].color
          }"
        >
          <h4 :style="{ fontSize: `${textSize.content}rem` }">{{ d.name }}</h4>
        </div>
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
    textSize: { header: '1.125', content: '1.125', isToggled: false },
    options: {
      showModal: false
    },
    item: {
      title: 'Agent States',
      modalId: 'AgentStates',
      agents: []
    },
    data: []
  }),

  computed: {
    calcDataTest() {
      if (!this.item.agents.length) {
        return this.calcData(this.data)
      } else {
        const selectedAgentsData = this.data.filter(item =>
          this.item.agents.some(j => j.username === item.username)
        )

        return this.calcData(selectedAgentsData)
      }
    },

    initWidgetPercentageBlock() {
      const total = this.calcDataTest.reduce((acc, item) => {
        return item.count + acc
      }, 0)

      const mapped = this.calcDataTest.map(item => {
        return (item.count * 100) / total
      })

      return mapped
    }
  },

  watch: {
    'textSize.header': newTextSize => {
      localStorage.textSizeAgentStatesHeader = newTextSize
    },
    'textSize.content': newTextSize => {
      localStorage.textSizeAgentStatesContent = newTextSize
    },

    item: function() {
      this.$emit('updateData', this.item)
    }
  },

  mounted() {
    if (localStorage.textSizeAgentStatesHeader) {
      this.textSize.header = localStorage.textSizeAgentStatesHeader
    }
    if (localStorage.textSizeAgentStatesContent) {
      this.textSize.content = localStorage.textSizeAgentStatesContent
    }
  },

  beforeMount() {
    this.getData()
    this.$emit('updateData', this.item)
  },

  methods: {
    async getData() {
      const { data } = await this.$axios.get(`users/states`)
      this.data = await data
    },

    calcData(data) {
      var missedCall = 0
      var ready = 0
      var acw = 0
      var talking = 0
      var notReady = 0

      data.forEach(item => {
        const status = item.currentStatus

        if (status === 'Missed Call') {
          missedCall++
        } else if (status === 'Available') {
          ready++
        } else if (status === 'ACW') {
          acw++
        } else if (
          status.indexOf('Inbound') > -1 ||
          status.indexOf('Outbound') > -1
        ) {
          talking++
        } else {
          notReady++
        }
      })

      return [
        { name: 'Missed Call', color: '#bf55ec', count: missedCall },
        { name: 'Ready', color: '#acc531', count: ready },
        { name: 'ACW', color: '#0c6ccf', count: acw },
        { name: 'Talking', color: '#ff9c41', count: talking },
        { name: 'Not Ready', color: '#d5355b', count: notReady }
      ].sort((a, b) => a.count - b.count)
    },

    async openModal() {
      this.options.showModal = true
      // this.$bvModal.show(this.item.modalId)
    }
  }
}
</script>

<style scoped>
.agent-states-widget > div {
  border-bottom: solid 1px #4f4f4f;
}
.agent-states-widget > div:last-child {
  border: 0;
}
</style>
