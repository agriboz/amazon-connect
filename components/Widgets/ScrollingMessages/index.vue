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

    <div
      class="d-flex flex-column flex-fill s"
      @click="textSize.isToggled = false"
    >
      <b-carousel :interval="40000" controls class="font-weight-bold">
        <b-carousel-slide v-for="s in data" :key="s.id">
          <p
            :style="{
              color: setTextColor(s.priority.color),
              fontSize: `${textSize.content}rem`
            }"
          >
            {{ s.content }}
          </p>
        </b-carousel-slide>
      </b-carousel>

      <pre>{{ calcDataTest }}</pre>
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
      title: 'Scrolling Messages',
      modalId: 'ScrollingMessages',
      teamForScrollingMessages: []
    },
    scrollingMessagesData: []
  }),

  computed: {
    data() {
      if (!this.item.teamForScrollingMessages.length) {
        return this.scrollingMessagesData
      } else {
        const selectedTeamForScrollingMessages = this.scrollingMessagesData.filter(
          item => this.item.teamForScrollingMessages.some(j => j.id === item.id)
        )

        return selectedTeamForScrollingMessages
      }
    }
  },

  watch: {
    'textSize.header': newTextSize => {
      localStorage.textSizeScrollingMessagesHeader = newTextSize
    },
    'textSize.content': newTextSize => {
      localStorage.textSizeScrollingMessagesContent = newTextSize
    },
    item: function() {
      this.$emit('updateData', this.item)
    }
  },

  mounted() {
    if (localStorage.textSizeScrollingMessagesHeader) {
      this.textSize.header = localStorage.textSizeScrollingMessagesHeader
    }
    if (localStorage.textSizeScrollingMessagesContent) {
      this.textSize.content = localStorage.textSizeScrollingMessagesContent
    }
  },

  beforeMount() {
    this.getData()
    this.$emit('updateData', this.item)
  },

  methods: {
    setTextColor(color) {
      return color === 'Red'
        ? '#fa5c7c'
        : color === 'Yellow'
        ? '#ffbc00'
        : color === 'Green'
        ? '#0acf97'
        : '#000'
    },

    async getData() {
      const { data } = await this.$axios.get(
        `notifications/scrolling-messages/`
      )
      this.scrollingMessagesData = await data
    },

    async openModal() {
      this.options.showModal = true
      // this.$bvModal.show(this.item.modalId)
    }
  }
}
</script>

<style scoped>
.s >>> .carousel-caption {
  position: static;
  display: flex;
  justify-content: center;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0;
}
.s >>> .carousel-caption > p {
  margin: 0;
  align-items: center;
  display: flex;
}
.agent-states-widget > div {
  border-bottom: solid 1px #4f4f4f;
}
.agent-states-widget > div:last-child {
  border: 0;
}
</style>
