<template>
  <section class="h-100">
    <div class="row">
      <div class="col-md-4">
        <button class="btn btn-primary btn-sm mr-1" @click="goBack">
          Back
        </button>
        <button class="btn btn-primary btn-sm mr-1" @click="toggleEdit">
          {{ !isVisibleRemoveIcon ? 'Edit' : 'Cancel' }}
        </button>

        <b-dropdown text="Change Theme" size="sm" variant="primary">
          <b-dropdown-item href="#">White</b-dropdown-item>
          <b-dropdown-item href="#">Black</b-dropdown-item>
          <b-dropdown-item href="#">Navy Blue</b-dropdown-item>
          <b-dropdown-item href="#">Puprle</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="col-md-4 text-center">
        <h4 class="text-uppercase">{{ layoutTitle }}</h4>
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
        <!-- <component
          :is="component[index]"
          v-if="
            testComponent[index] ? testComponent[index].item.modalId : false
          "
          :key="index"
          @updateData="selectedWidgets[index] = $event"
        /> -->
        <i
          v-if="isVisibleRemoveIcon && testComponent[index]"
          v-b-tooltip.hover
          title="Remove Widget"
          class="mdi mdi-close"
          @click="removeWidget(index)"
        />
        <i
          v-if="isVisibleRemoveIcon && !component[index]"
          class="mdi mdi-plus mdi-48px d-flex justify-content-center align-items-center h-100 icon-settings"
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
import { mapMutations } from 'vuex'
// import { remove } from 'lodash'
import widgetList from '@/utils/widgets'

export default {
  data: () => ({
    isVisibleRemoveIcon: false,
    testComponent: [],
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

    layout: []
  }),

  layout: 'authenticated',
  middleware: 'auth',

  async beforeMount() {
    this.toggleFooter(false)
    await this.getLayout()
    await this.initChartsAndTables()
  },

  created() {
    this.getLayout()
  },

  methods: {
    ...mapMutations(['toggleFooter']),

    goBack() {
      this.$router.push(`/widget-view/`)
    },

    removeWidget(index) {
      this.component = this.component.splice(0, index)
      this.testComponent = this.testComponent.splice(0, index)
      this.selectedWidgets = this.selectedWidgets.splice(0, index)
    },

    toggleEdit() {
      this.isVisibleRemoveIcon = !this.isVisibleRemoveIcon
    },

    async saveLayout() {
      const data = {
        username: this.$store.state.user.username,
        title: this.layoutTitle,
        layout: this.layout,
        widgets: this.selectedWidgets
      }

      console.log(data)

      await this.$axios.put(`dashboards/${this.$route.params.id}`, data)
      this.modal.showSaveModal = false
    },

    async showWidgetsModal(index) {
      this.modal.showWidgets = await true
      this.currentIndexGrid = await index
    },

    setComponent(item, i) {
      if (item && item.item.modalId) {
        this.component[i] = () =>
          import(`@/components/Widgets/${item.item.modalId}`)
      } else {
        return false
      }
    },

    initChartsAndTables() {
      this.testComponent.forEach((item, i) => {
        console.log(item)
        return this.setComponent(item, i)
      })
    },

    async getLayout() {
      const { data } = await this.$axios.get(
        `dashboards/${this.$route.params.id}`
      )
      this.layoutTitle = await data.title
      this.layout = await data.layout
      this.testComponent = await data.widgets
    },

    async addWidget() {
      const index = this.currentIndexGrid
      const { compomentName } = this.selectedWidget

      this.component[index] = await widgetList[compomentName]
    }
  }
}
</script>

<style scoped>
.mdi-close {
  position: absolute;
  font-size: 1.125rem;
  top: 6px;
  left: 0;
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
