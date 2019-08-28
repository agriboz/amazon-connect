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
      class="text-center text-uppercase"
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
      max="20"
      step="0.25"
      @input="++textSize.content"
    />
    <div
      class="text-center"
      :class="[setBackgroundColor]"
      :style="{ fontSize: `${textSize.content}rem` }"
    >
      {{
        data &&
          $moment
            .duration(data.oldestInQ, 'seconds')
            .format('mm:ss', { trim: false })
      }}
    </div>

    <settings-filter
      v-if="options.showModal"
      :options="options"
      :item.sync="item"
    />
  </section>
</template>

<script>
import { maxBy } from 'lodash'
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
      title: 'Oldest In Queue',
      modalId: 'OldestInQueue',
      thresholds: {
        type: 'second',
        threshold1: null,
        threshold2: null
      }
    },
    realTimeData: []
  }),

  computed: {
    data() {
      console.log(this.realTimeData)
      return maxBy(this.realTimeData, item => item.oldestInQ)
    },

    setBackgroundColor() {
      const { threshold1, threshold2 } = this.item.thresholds
      let backgroundColor = null
      let textColor = null

      if (this.data >= threshold2) {
        backgroundColor = `bg-danger transition`
        textColor = `text-white`
      }

      if (
        threshold1 >= 0 &&
        this.data >= threshold1 &&
        this.data < threshold2
      ) {
        backgroundColor = `bg-warning transition`
        textColor = `text-white`
      }

      if (!backgroundColor || !threshold1 || !threshold2) {
        backgroundColor = ``
        textColor = `text-success transition`
      }

      return [backgroundColor, textColor]
    }
  },

  watch: {
    'textSize.header': newTextSize => {
      localStorage.textSizeOldestInQueueHeader = newTextSize
    },
    'textSize.content': newTextSize => {
      localStorage.textSizeOldestInQueueContent = newTextSize
    },
    item: function() {
      this.$emit('updateData', this.item)
    }
  },

  beforeMount() {
    this.getRealTimeData()
    this.$emit('updateData', this.item)
  },

  mounted() {
    if (localStorage.textSizeOldestInQueueHeader) {
      this.textSize.header = localStorage.textSizeOldestInQueueHeader
    }
    if (localStorage.textSizeOldestInQueueContent) {
      this.textSize.content = localStorage.textSizeOldestInQueueContent
    }
  },

  methods: {
    async openModal() {
      this.options.showModal = true
      // this.$bvModal.show(this.item.modalId)
    },

    async getRealTimeData() {
      const { data } = await this.$axios.get(`realtime/all`)
      this.realTimeData = await data
      console.log(this.realTimeData)
    }
  }
}
</script>
