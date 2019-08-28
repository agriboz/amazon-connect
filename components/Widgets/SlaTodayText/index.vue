<template>
  <section class="h-100">
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
      max="15"
      step="0.25"
      @input="++textSize.content"
    />
    <div
      class="d-flex justify-content-center text-white"
      :style="{ fontSize: `${textSize.content}rem` }"
    >
      <span :style="{ color: data && setBackgroundColor }"
        >{{ data && data[item.selectedSla] }}%</span
      >
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
    textSize: { header: '1.125', content: '5', isToggled: false },
    options: {
      showModal: false
    },
    item: {
      title: 'SLA Today',
      modalId: 'SlaTodayText',
      thresholds: {
        type: 'number',
        threshold1: null,
        threshold2: null
      },
      selectedSla: '30',
      slaList: [],
      queues: []
    },
    data: null
  }),

  computed: {
    setBackgroundColor() {
      const { selectedSla } = this.item
      const { threshold1, threshold2 } = this.item.thresholds
      let textColor = null

      if (
        this.data[selectedSla] <= threshold1 &&
        this.data[selectedSla] >= threshold2
      ) {
        textColor = `#ffbc00`
      }

      if (
        this.data[selectedSla] <= threshold1 &&
        this.data[selectedSla] <= threshold2
      ) {
        textColor = `#fa5c7c`
      }

      if (
        this.data[selectedSla] >= threshold1 &&
        this.data[selectedSla] >= threshold2
      ) {
        textColor = `#0acf97`
      }

      if (!+threshold1 || !+threshold2) {
        textColor = `#0acf97`
      }

      return textColor
    }
  },

  watch: {
    'textSize.header': newTextSize => {
      localStorage.textSizeSlaTodayTextHeader = newTextSize
    },

    'textSize.content': newTextSize => {
      localStorage.textSizeSlaTodayTextContent = newTextSize
    },

    item: function() {
      this.$emit('updateData', this.item)
    },

    'item.queues': function() {
      this.getData()
    }
  },

  mounted() {
    if (localStorage.textSizeSlaTodayTextHeader) {
      this.textSize.header = localStorage.textSizeSlaTodayTextHeader
    }

    if (localStorage.textSizeSlaTodayTextContent) {
      this.textSize.content = localStorage.textSizeSlaTodayTextContent
    }
  },

  beforeMount() {
    this.getData()
    this.$emit('updateData', this.item)
  },

  methods: {
    async getData() {
      if (!this.item.queues.length) {
        const { data } = await this.$axios.get(`historical/all?compound=true`)
        this.data = await data.serviceLevel
        this.item.slaList = Object.keys(data.serviceLevel)
      } else {
        const queues = this.item.queues
          .map(item => `&queueId=${item.arn}`)
          .join('')

        const { data } = await this.$axios.get(
          `historical/all?compound=true${queues}`
        )

        this.data = await data.serviceLevel
        this.item.slaList = Object.keys(data.serviceLevel)
      }
    },

    async openModal() {
      this.options.showModal = true
    }
  }
}
</script>
