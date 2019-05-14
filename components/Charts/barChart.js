import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    options: {
      handler() {
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    }
  }
}
