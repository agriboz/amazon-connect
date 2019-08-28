<template>
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <button
      class="button-menu-mobile open-left disable-btn"
      @click.prevent="initMenu"
    >
      <i class="mdi mdi-menu"></i>
    </button>
  </div>
  <!-- end Topbar -->
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  },

  methods: {
    initMenu() {
      const body = document.getElementsByTagName('body')[0]
      const width = document.documentElement.clientWidth
      body.classList.toggle('sidebar-enable')

      if (width >= 768) {
        body.classList.toggle('enlarged')
      } else {
        body.classList.remove('enlarged')
      }
    }
  }
}
</script>
