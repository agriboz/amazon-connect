<template>
  <section>
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
      class="text-center text-uppercase cursor-pointer"
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
    <div class="text-center mt-3" @click="textSize.isToggled = false">
      <h1 class="text-white" :style="{ fontSize: `${textSize.content}rem` }">
        {{ data.callsReceived ? data.callsReceived : 0 }}
      </h1>
      <h1 class="text-success" :style="{ fontSize: `${textSize.content}rem` }">
        {{ data.callsHandled ? data.callsHandled : 0 }}
      </h1>
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
    options: {
      showModal: false
    },
    textSize: { header: '1.5', content: '5', isToggled: false },
    item: {
      title: 'Calls Received & Answered',
      modalId: 'CallsReceivedAnswered',
      queues: []
    },
    historicalData: []
  }),

  computed: {
    data() {
      if (!this.item.queues.length) {
        return this.setFilteredData(this.historicalData)
      } else {
        const selectedQueuesData = this.historicalData.filter(item =>
          this.item.queues.some(j => j.id === item.queueId)
        )

        return this.setFilteredData(selectedQueuesData)
      }
    }
  },

  watch: {
    'textSize.header': newTextSize => {
      localStorage.textSizeCallsReceivedAnsweredHeader = newTextSize
    },
    'textSize.content': newTextSize => {
      localStorage.textSizeCallsReceivedAnsweredContent = newTextSize
    },
    item: function() {
      this.$emit('updateData', this.item)
    }
  },

  mounted() {
    if (localStorage.textSizeCallsReceivedAnsweredHeader) {
      this.textSize.header = localStorage.textSizeCallsReceivedAnsweredHeader
    }
    if (localStorage.textSizeCallsReceivedAnsweredContent) {
      this.textSize.content = localStorage.textSizeCallsReceivedAnsweredContent
    }
  },

  beforeMount() {
    this.getHistoricalData()
    this.$emit('updateData', this.item)
  },

  methods: {
    async openModal() {
      this.options.showModal = true
    },

    setFilteredData(data) {
      const mappedData = data.map(
        ({ callsAbandoned, callsHandled, callsReceived }) => ({
          callsAbandoned: callsAbandoned ? callsAbandoned : 0,
          callsHandled: callsHandled ? callsHandled : 0,
          callsReceived: callsReceived ? callsReceived : 0
        })
      )

      return mappedData.reduce(
        (sum, { callsAbandoned, callsHandled, callsReceived }) => {
          return {
            callsAbandoned: sum.callsAbandoned + callsAbandoned,
            callsHandled: sum.callsHandled + callsHandled,
            callsReceived: sum.callsReceived + callsReceived
          }
        },
        { callsAbandoned: 0, callsHandled: 0, callsReceived: 0 }
      )
    },

    async getHistoricalData() {
      const { data } = await this.$axios.get(`historical/all`)
      this.historicalData = await data
    }
  }
}
</script>
