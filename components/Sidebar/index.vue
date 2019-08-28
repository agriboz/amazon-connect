<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="left-side-menu">
    <div
      id="left-side-menu-container"
      v-slimscroll="scrollOptions"
      class="slimscroll-menu"
    >
      <button
        class="btn-menu m-2"
        title="Toggle Menu"
        @click.prevent="initMenu"
      >
        <i class="mdi mdi-menu"></i>
      </button>

      <!--- Sidemenu -->
      <ul class="metismenu side-nav">
        <li class="side-nav-item">
          <n-link :to="'/scheduled-reports'" class="side-nav-link">
            <i class="mdi mdi-grid"></i>
            <span>Box View</span>
          </n-link>
        </li>

        <li class="side-nav-item">
          <a href="#" class="side-nav-link">
            <i class="mdi mdi-chart-pie"></i>
            <span>Dashboard</span>
            <span class="menu-arrow"></span>
          </a>
          <ul class="side-nav-second-level" aria-expanded="false">
            <li>
              <n-link :to="'/dashboard/team-view'">Team View</n-link>
            </li>
          </ul>
        </li>

        <li class="side-nav-item">
          <a href="#" class="side-nav-link">
            <i class="mdi mdi-desktop-mac"></i>
            <span>Widget View</span>
            <span v-if="widgetViewMenu.length" class="menu-arrow" />
          </a>
          <ul
            v-show="widgetViewMenu.length"
            class="side-nav-second-level"
            aria-expanded="false"
          >
            <li v-for="w in widgetViewMenu" :key="w.id">
              <div class="d-flex align-items-center">
                <n-link :to="`/widget-view/template/${w.id}`">{{
                  w.title
                }}</n-link>
                <i
                  class="mdi mdi-close icon-settings flex-fill text-right pr-3"
                  @click="deleteWidget(w.id)"
                ></i>
              </div>
            </li>
          </ul>
        </li>

        <li class="side-nav-item">
          <a href="#" class="side-nav-link">
            <i class="mdi mdi-settings" />
            <span>Notification Center</span>
            <span class="menu-arrow"></span>
          </a>
          <ul class="side-nav-second-level" aria-expanded="false">
            <li>
              <n-link :to="'/notification-center/scrolling-messages'"
                >Scrolling Messages</n-link
              >
            </li>
          </ul>
        </li>

        <li class="side-nav-item">
          <n-link :to="'/reason-code'" class="side-nav-link">
            <i class="mdi mdi-settings" />
            <span>Reason Code</span>
          </n-link>
        </li>
        <li class="side-nav-item">
          <n-link :to="'/incoming-code'" class="side-nav-link">
            <i class="mdi mdi-settings" />
            <span>Incoming Code</span>
          </n-link>
        </li>
        <li class="side-nav-item">
          <n-link :to="'/create-called'" class="side-nav-link">
            <i class="mdi mdi-settings" />
            <span>Create Called</span>
          </n-link>
        </li>

        <li class="side-nav-item">
          <n-link :to="'/logout'" class="side-nav-link">
            <i class="mdi mdi-logout" />
            <span>Log Out</span>
          </n-link>
        </li>
      </ul>
      <!-- End Sidebar -->

      <div class="clearfix"></div>
    </div>
    <!-- Sidebar -left -->
  </div>
  <!-- Left Sidebar End -->
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MetisMenu from 'metismenujs'

export default {
  data: () => ({
    scrollOptions: {
      width: 'auto',
      height: 'auto',
      size: '7px',
      color: '#000',
      position: 'right',
      distance: '1px',
      start: 'top',
      opacity: 0.4,
      alwaysVisible: false,
      disableFadeOut: true,
      railVisible: false,
      railColor: '#333',
      railOpacity: 0.2,
      railDraggable: false,
      railClass: 'slimScrollRail',
      barClass: 'slimScrollBar',
      wrapperClass: 'slimScrollDiv',
      allowPageScroll: false,
      wheelStep: 20,
      touchScrollStep: 200,
      borderRadius: '7px',
      railBorderRadius: '7px'
    }
  }),

  computed: {
    ...mapState(['widgetViewMenu', 'user'])
  },

  beforeMount() {
    this.getWidgetViewMenu()
  },

  mounted() {
    this.$refs.metismenu = new MetisMenu('.side-nav')
  },

  methods: {
    ...mapActions(['getWidgetViewMenu']),

    async deleteWidget(id) {
      const confirmed = confirm('Are you sure you want to delete this layout?')
      if (confirmed) {
        await this.$axios.delete(`dashboards/${id}`)
        await this.getWidgetViewMenu()
      }
    },

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

<style scoped>
.btn-menu {
  border: none;
  padding-left: 9px;
  color: #cedce4;
  background-color: transparent;
  font-size: 24px;
}
.enlarged .side-nav .side-nav-item:hover > ul {
  width: 300px;
}
</style>
