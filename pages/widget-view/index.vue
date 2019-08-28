<template>
  <div class="container-fluid">
    <!-- start page title -->
    <h3 class="text-center m-4">Layouts</h3>
    <!-- end page title -->
    <div class="layout-wrapper">
      <a
        v-for="c in createLayouts()"
        :key="c.id"
        class="btn btn-layout"
        @click="navigateToTemplate(c.label)"
        @mouseover="showThumbnail(c.thumbnail)"
        @mouseleave="thumbnailSource = null"
        >{{ c.name }}</a
      >
    </div>
    <div class="justify-content-center d-flex">
      <img v-if="thumbnailSource" :src="thumbnailSource" />
    </div>
  </div>
  <!-- container -->
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'authenticated',
  middleware: 'auth',

  data: () => ({
    thumbnailSource: null,
    selectedTemplate: null
  }),

  computed: {
    ...mapState('widgetView', ['templates'])
  },
  methods: {
    createLayouts() {
      return Array.from({ length: 24 }, (x, i) => {
        return {
          id: i + 1,
          name: `Layout ${i + 1}`,
          label: `layout${i + 1}`,
          thumbnail: require(`@/assets/images/layout${i + 1}.jpg`)
        }
      })
    },

    showThumbnail(source) {
      this.thumbnailSource = source
    },

    async navigateToTemplate(templateName) {
      await this.$router.push(`/widget-view/${templateName}`)
    }
  }
}
</script>

<style scoped>
.layout-wrapper {
  justify-content: center;
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-gap: 10px;
  align-items: center;
  grid-column: 1 20px;
}
.btn-layout {
  cursor: pointer;
  padding: 6px 12px;
  color: #333 !important;
  background-color: #fff;
  border-color: #ccc;
  margin: 0 0 15px 0;
  transition: all 0.3s linear;
}
.btn-layout:hover {
  color: #000;
  border-color: #313a46;
}
</style>
