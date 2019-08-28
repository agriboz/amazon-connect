<template>
  <section class="h-100">
    <div class="row">
      <div class="col-md-4">
        <button class="btn btn-primary btn-sm mr-1" @click="goBack">
          Back
        </button>

        <b-dropdown text="Change Theme" size="sm" variant="primary">
          <b-dropdown-item href="#">White</b-dropdown-item>
          <b-dropdown-item href="#">Black</b-dropdown-item>
          <b-dropdown-item href="#">Navy Blue</b-dropdown-item>
          <b-dropdown-item href="#">Puprle</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="col-md-4 text-center">
        <h4 class="text-uppercase">{{ $route.params.id }}</h4>
      </div>
      <div class="col-md-4 text-right">
        <button
          class="btn btn-primary btn-sm"
          @click="modal.showSaveModal = true"
        >
          Save Layout
        </button>
      </div>
    </div>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="isDraggable"
      :is-resizable="isResizeable"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[5, 5]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(item, index) in layout"
        :key="index"
        :class="{
          'border-layout': component[index] ? '' : 'border-layout rounded'
        }"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <component
          :is="component[index]"
          v-if="component[index]"
          :key="index"
          @updateData="selectedWidgets[index] = { item: $event }"
        />
        <i
          v-if="!component[index]"
          class="mdi mdi-plus mdi-48px d-flex justify-content-center align-items-center h-100"
          @click="showWidgetsModal(index)"
        />
      </grid-item>
    </grid-layout>

    <b-modal v-model="modal.showWidgets" title="Select Charts" @ok="addWidget">
      <div class="form-group">
        <select v-model="selectedWidget" class="form-control">
          <optgroup v-for="(group, name) in widgets" :key="name" :label="name">
            <option v-for="(c, i) in group" :key="i" :value="c">
              {{ c.name }}
            </option>
          </optgroup>
        </select>
      </div>
    </b-modal>

    <b-modal
      v-model="modal.showSaveModal"
      title="Save Page Name"
      @ok="saveLayout"
    >
      <div class="form-group">
        <input
          v-model="layoutTitle"
          type="text"
          class="form-control"
          autofocus
        />
      </div>
    </b-modal>
  </section>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import widgetList from '@/utils/widgets'

export default {
  data: () => ({
    layoutTitle: null,
    selectedWidgets: [],
    currentIndexGrid: null,
    component: [],
    widgets: {
      Agents: [
        {
          name: 'Agent States',
          compomentName: 'AgentStates'
        },
        {
          name: 'Agent List Ten',
          compomentName: 'AgentList10'
        },
        {
          name: 'Agent List Twenty',
          compomentName: 'AgentList20'
        },
        {
          name: 'Agent List Fourthy',
          compomentName: 'AgentList40'
        }
      ],
      Queues: [
        {
          name: 'Calls In Queue',
          compomentName: 'CallsInQueue'
        },
        {
          name: 'Oldest In Queue',
          compomentName: 'OldestInQueue'
        },
        {
          name: 'Calls Received',
          compomentName: 'CallsReceived'
        },
        {
          name: 'Calls Received & Answered',
          compomentName: 'CallsReceivedAnswered'
        },
        {
          name: 'Calls Received & Answered & Abandoned',
          compomentName: 'CallsReceivedAnsweredAbandoned'
        },
        {
          name: 'Calls Answered Hourly',
          compomentName: 'CallsAnsweredHourly'
        },
        {
          name: 'SLA Today ',
          compomentName: 'SlaTodayText'
        },
        {
          name: 'SLA Today (Chart)',
          compomentName: 'SlaTodayChart'
        }
      ],
      Other: [
        {
          name: 'Scrolling Messages',
          compomentName: 'ScrollingMessages'
        }
      ]
    },
    selectedWidget: null,
    modal: {
      showWidgets: false,
      showSaveModal: false
    },
    isDraggable: false,
    isResizeable: false,
    layoutOptions: [
      {
        id: 1,
        name: 'layout1',
        layout: [
          { x: 0, y: 0, w: 6, h: 30, i: '0' },
          { x: 6, y: 18, w: 3, h: 15, i: '1' },
          { x: 9, y: 18, w: 3, h: 15, i: '2' },
          { x: 6, y: 0, w: 6, h: 15, i: '3' }
        ]
      }
    ],
    layout: []
  }),

  layout: 'authenticated',
  middleware: 'auth',

  beforeMount() {
    this.toggleFooter(false)
    this.setLayout()
  },

  methods: {
    ...mapMutations(['toggleFooter']),
    ...mapActions(['getWidgetViewMenu']),

    goBack() {
      this.$router.push(`/widget-view/`)
    },

    async saveLayout() {
      const { username } = this.$store.state.user
      const data = {
        username,
        title: this.layoutTitle,
        layout: this.layout,
        widgets: this.selectedWidgets
      }

      await this.$axios.post(`dashboards`, data)

      await this.getWidgetViewMenu()

      this.modal.showSaveModal = false
    },

    async showWidgetsModal(index) {
      this.modal.showWidgets = await true
      this.currentIndexGrid = await index
    },

    setLayout() {
      const id = this.$route.params.name
      this.layout = this.layoutOptions.filter(
        item => item.name === id
      )[0].layout
    },

    async addWidget() {
      console.log('clicked')
      const index = this.currentIndexGrid
      const { compomentName } = this.selectedWidget

      this.component[index] = await widgetList[compomentName]
      console.log(this.component)
    }
  }
}
</script>

<style scoped>
.mdi-plus {
  cursor: pointer;
}
.border-layout {
  border: 1px solid black;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
