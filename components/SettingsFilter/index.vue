<template>
  <b-modal
    v-if="options.showModal"
    v-model="options.showModal"
    title="Configuration"
    lazy
    ok-variant="info"
    ok-title="Save Changes"
    @ok="test"
  >
    <div class="form-group">
      <label for="title">Title</label>
      <input
        id="title"
        v-model="cloneItem.title"
        type="text"
        class="form-control"
        :placeholder="cloneItem.title"
        @blur="checkTitle"
      />
    </div>

    <duallist-box
      v-if="item.agents"
      class="mb-2"
      :base-list="
        optionsAgents.hasSelected.length
          ? optionsAgents.hasSelected
          : optionsAgents.baseList
      "
      :selected-list="cloneItem.agents"
      :title="optionsAgents.title"
      @updateSelected="cloneItem.agents = $event"
      @updateBase="optionsAgents.baseList = $event"
    />

    <duallist-box
      v-if="item.teamForScrollingMessages"
      class="mb-2"
      :base-list="
        optionsTeamForScrollingMessages.hasSelected.length
          ? optionsTeamForScrollingMessages.hasSelected
          : optionsTeamForScrollingMessages.baseList
      "
      :selected-list="cloneItem.teamForScrollingMessages"
      :title="optionsTeamForScrollingMessages.title"
      @updateSelected="cloneItem.teamForScrollingMessages = $event"
      @updateBase="optionsTeamForScrollingMessages.baseList = $event"
    />

    <duallist-box
      v-if="item.queues"
      class="mb-2"
      :base-list="
        optionsQueues.hasSelected.length
          ? optionsQueues.hasSelected
          : optionsQueues.baseList
      "
      :selected-list="cloneItem.queues"
      :title="optionsQueues.title"
      @updateSelected="cloneItem.queues = $event"
      @updateBase="optionsQueues.baseList = $event"
    />

    <div v-if="item.slaList.length" class="form-group">
      <label for="sla">Service Level</label>
      <select v-model="cloneItem.selectedSla" class="form-control">
        <option v-for="s in item.slaList" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>

    <div v-if="item.thresholds && item.thresholds.type === 'number'">
      <div class="form-group row mb-2">
        <label
          for="threshold1"
          class="col-4 col-form-label d-flex justify-content-between"
          ><span>Threshold 1</span> <span class="bg-warning threshold-size"
        /></label>
        <div class="col-8 pl-0">
          <input
            id="threshold1"
            v-model="cloneItem.thresholds.threshold1"
            type="number"
            class="form-control"
            placeholder="Enter Threshold Value"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label
          for="threshold2"
          class="col-4 col-form-label d-flex justify-content-between"
          ><span>Threshold 2</span> <span class="bg-danger threshold-size"
        /></label>
        <div class="col-8 pl-0">
          <input
            id="threshold2"
            v-model="cloneItem.thresholds.threshold2"
            type="number"
            class="form-control"
            placeholder="Enter Threshold Value"
          />
        </div>
      </div>
    </div>
    <div v-if="item.thresholds && item.thresholds.type === 'second'">
      <div class="form-group row mb-2">
        <label
          for="threshold1"
          class="col-4 col-form-label d-flex justify-content-between"
          ><span>Threshold 1</span> <span class="bg-warning threshold-size"
        /></label>
        <div class="col-8 pl-0">
          <input
            id="threshold1"
            v-model="cloneItem.thresholds.threshold1"
            type="text"
            class="form-control"
            placeholder="Enter Threshold Value"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label
          for="threshold2"
          class="col-4 col-form-label d-flex justify-content-between"
          ><span>Threshold 2</span> <span class="bg-danger threshold-size"
        /></label>
        <div class="col-8 pl-0">
          <input
            id="threshold2"
            v-model="cloneItem.thresholds.threshold2"
            type="text"
            class="form-control"
            placeholder="Enter Threshold Value"
          />
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import { cloneDeep } from 'lodash'

import DuallistBox from '@/components/DuallistBox'

export default {
  components: {
    DuallistBox
  },
  props: {
    item: {
      default: () => ({}),
      required: true,
      type: Object
    },
    options: {
      required: false,
      default: null,
      type: Object
    }
  },

  data: () => ({
    cloneItem: null
  }),

  computed: {
    ...mapState('shared', ['agents', 'queues', 'teamForScrollingMessages']),

    optionsAgents() {
      return {
        hasSelected: this.agents.filter(
          item => !this.cloneItem.agents.some(j => j.id === item.id)
        ),
        baseList: this.agents,
        selectedList: [],
        title: 'Agents'
      }
    },

    optionsTeamForScrollingMessages() {
      return {
        hasSelected: this.teamForScrollingMessages.filter(
          item =>
            !this.cloneItem.teamForScrollingMessages.some(
              j => j.name === item.name
            )
        ),
        baseList: this.teamForScrollingMessages,
        selectedList: [],
        title: 'Teams'
      }
    },

    optionsQueues() {
      return {
        hasSelected: this.queues.filter(
          item => !this.cloneItem.queues.some(j => j.id === item.id)
        ),
        baseList: this.queues,
        selectedList: [],
        title: 'Queues'
      }
    }
  },

  async beforeMount() {
    this.cloneItem = JSON.parse(JSON.stringify(this.item))

    if (this.cloneItem.agents) {
      await this.getShared({
        endpoint: 'users/states',
        key: 'agents'
      })
    }

    if (this.cloneItem.teamForScrollingMessages) {
      await this.getShared({
        endpoint: 'notifications/scrolling-messages',
        key: 'teamForScrollingMessages'
      })
    }

    if (this.cloneItem.queues) {
      await this.getShared({
        endpoint: 'queues',
        key: 'queues'
      })
    }
  },

  methods: {
    checkTitle() {
      if (!this.cloneItem.title) {
        this.cloneItem.title = this.item.title
      }
    },

    test() {
      this.$emit('update:item', this.cloneItem)
      console.log(this.cloneItem)
    },

    ...mapActions({
      getShared: 'shared/getShared'
    })
  }
}
</script>
