<template>
  <div class="container-fluid">
    <!-- start page title -->
    <page-title title="Widget View" />
    <!-- end page title -->
    <div class="row">
      {{ selectedWidget }}
      <select v-model="selectedWidget" class="form-control" @input="addWidget">
        <option v-for="w in widgetList" :key="w.id" :value="w">
          {{ w.name }}
        </option>
      </select>
      <b-form-select
        v-model="selectedWidget"
        plain
        :options="widgetList"
        @input="addWidget"
      />
    </div>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[5, 5]"
      :use-css-transforms="true"
    >
      {{ layout }}
      <grid-item
        v-for="(item, index) in layout"
        :key="index"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <component :is="hasComponent[index]" v-if="hasComponent[index]" />
        <i
          class="mdi mdi-trash"
          @click="removeWidget(index, hasComponent[index])"
        />
      </grid-item>
    </grid-layout>
  </div>
  <!-- container -->
</template>

<script>
import PageTitle from '@/components/PageTitle'
export default {
  layout: 'authenticated',
  components: {
    PageTitle
  },
  data: () => ({
    layout: [],
    hasComponent: [],
    selectedItems: [],
    selectedWidget: null,
    widgetList: [
      {
        id: 1,
        widgetName: 'AgentStates',
        name: 'Agent States'
      },
      {
        id: 2,
        widgetName: 'CallsInQueue',
        name: 'Calls In Queue'
      },
      {
        id: 3,
        widgetName: 'OldestInQueue',
        name: 'Oldest In Queue'
      }
    ]
  }),

  methods: {
    removeWidget() {
      console.log('removed')
    },
    addWidget() {
      console.log(this.selectedWidget)
      if (this.selectedWidget) {
        this.hasComponent[this.layout.length] = () => {
          return import(
            `@/components/Widgets/${this.selectedWidget.widgetName}`
          )
        }
        this.selectedItems.push(this.selectedWidget)
        this.layout.push({
          w: 4,
          h: 10,
          x: 0,
          y: 0,
          i: this.layout.length + 1
        })
      }
    }
  }
}
</script>
