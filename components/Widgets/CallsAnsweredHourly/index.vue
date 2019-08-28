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

    <div class="d-flex h-100">
      <apexchart
        type="bar"
        height="100%"
        width="100%"
        :options="chartData().chartOptions"
        :series="chartData().series"
      />
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
    textSize: { header: '1.125', isToggled: false },
    options: {
      showModal: false
    },
    item: {
      title: 'Calls Answered Hourly',
      modalId: 'CallsAnsweredHourly',
      queues: []
    },
    data: []
  }),

  watch: {
    'textSize.header': newTextSize => {
      localStorage.textSizeCallsAnsweredHourlyHeader = newTextSize
    },

    'item.queues': function() {
      this.getData()
    },
    item: function() {
      this.$emit('updateData', this.item)
    }
  },

  mounted() {
    if (localStorage.textSizeCallsAnsweredHourlyHeader) {
      this.textSize.header = localStorage.textSizeCallsAnsweredHourlyHeader
    }
  },

  beforeMount() {
    this.getData()
    this.$emit('updateData', this.item)
  },

  methods: {
    chartData() {
      return {
        series: [
          {
            name: 'Answered',
            data: this.data.map(item => item.data[0].callsHandled)
          }
        ],
        chartOptions: {
          chart: {
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: 'top'
              }
            }
          },

          yaxis: {
            forceNiceScale: true,
            labels: {
              style: {
                color: '#fff'
              }
            }
          },

          xaxis: {
            categories: this.data.map(item => item.hour),
            labels: {
              style: {
                colors: '#fff'
              }
            },
            title: {
              text: 'Hour',
              style: {
                color: '#fff'
              }
            }
          }
        }
      }
    },
    async getData() {
      if (this.item.queues.length) {
        const queues = this.item.queues
          .map(item => `&queueId=${item.arn}`)
          .join('')

        const { data } = await this.$axios.get(
          `historical/hourly?compound=true${queues}`
        )

        this.data = await data
      } else {
        const { data } = await this.$axios.get(
          `historical/hourly?compound=true`
        )
        this.data = await data
      }
    },

    async openModal() {
      this.options.showModal = true
      // this.$bvModal.show(this.item.modalId)
    }
  }
}
</script>
