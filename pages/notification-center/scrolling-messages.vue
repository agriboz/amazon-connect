<template>
  <div class="container-fluid text-dark">
    <div class="row bg-white mt-3 pl-3 pt-2">
      <h4>Scrolling Messages</h4>
    </div>
    <div class="row bg-white p-2">
      <div class="col-md-3">
        <div class="form-group">
          <label>Team Name</label>
          <input
            v-model="item.team"
            type="text"
            class="form-control"
            placeholder="Team name"
          />
        </div>
        <div class="form-group">
          <label>Content</label>
          <input
            v-model="item.content"
            type="text"
            class="form-control"
            placeholder="Content"
          />
        </div>
        <div class="form-group">
          <label>Priority</label>
          <select v-model="item.priority" class="form-control">
            <option v-for="p in priorities" :key="p.id" :value="p">
              {{ p.color }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Expire Date</label>
          <vue-ctk-date-time-picker
            v-model="item.expiryDate"
            no-button-now
            only-date
            label="Select Date"
            formatted="YYYY-MM-DD"
            format="YYYY-MM-DD"
            color="#2c8ef8"
            :auto-close="true"
            no-header
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="createScrollingMessage">
            Create
          </button>
        </div>
      </div>
      <div class="col-md-9">
        <b-table
          class="text-dark"
          :items="data"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :sort-by.sync="sortBy"
          :sort-direction="sortDirection"
          :sort-desc.sync="sortDesc"
          striped
          hover
          show-empty
        >
          <template slot="actions" slot-scope="row">
            <button class="btn btn-primary" @click="openModal(row.item)">
              Edit
            </button>
            <button
              class="btn btn-danger"
              @click="removeScrollingMessage(row.item)"
            >
              Delete
            </button>
          </template>
        </b-table>
        <b-col v-if="data.length" md="12" class="my-1 pl-0">
          <b-pagination
            v-model="currentPage"
            :total-rows="data.length"
            :per-page="perPage"
            class="my-0"
            align="right"
          />
        </b-col>
      </div>
    </div>

    <b-modal
      v-if="editItem"
      v-model="showModal"
      title="Edit"
      ok-title="Edit"
      lazy
      @shown="focusMyElement"
      @ok="updateScrollingMessage"
    >
      <div class="form-group">
        <label>Team Name</label>
        <input
          ref="teamName"
          v-model="editItem.team"
          type="text"
          class="form-control"
          placeholder="Team name"
        />
      </div>
      <div class="form-group">
        <label>Content</label>
        <input
          v-model="editItem.content"
          type="text"
          class="form-control"
          placeholder="Content"
        />
      </div>
      <div class="form-group">
        <label>Priority</label>
        <select v-model="editItem.priority" class="form-control">
          <option v-for="p in priorities" :key="p.id" :value="p">
            {{ p.color }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Expire Date</label>
        <vue-ctk-date-time-picker
          v-model="editItem.expiryDate"
          no-button-now
          only-date
          label="Select Date"
          formatted="YYYY-MM-DD"
          format="YYYY-MM-DD"
          color="#2c8ef8"
          :auto-close="true"
          no-header
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  layout: 'authenticated',

  data: () => ({
    data: [],
    showModal: false,
    priorities: [
      {
        id: 1,
        color: 'Red'
      },
      {
        id: 2,
        color: 'Yellow'
      },
      {
        id: 3,
        color: 'Green'
      }
    ],
    item: {},
    editItem: null,
    sortDesc: true,
    sortBy: 'expiryDate',
    sortDirection: 'asc',
    currentPage: 1,
    perPage: 10,
    pageOptions: [5, 10, 15],
    fields: [
      { key: 'team', sortable: true, label: 'Team Name' },
      { key: 'content', sortable: true, label: 'Content' },
      { key: 'priority.color', sortable: true, label: 'Priority' },
      {
        key: 'expiryDate',
        sortable: true,
        label: 'Expire Date'
      },
      { key: 'actions', label: 'Actions' }
    ]
  }),

  computed: {},

  beforeMount() {
    this.toggleFooter(true)
    this.getScrollingMessages()

    this.item.priority = this.priorities[0]
  },

  methods: {
    ...mapMutations(['toggleFooter']),

    openModal(item) {
      this.editItem = JSON.parse(JSON.stringify(item))
      this.showModal = true
    },

    focusMyElement() {
      this.$refs.teamName.focus()
    },

    openScrollingMessageModal(id) {
      console.log(id)
      this.openModal = true
      this.editItem = id
    },

    async createScrollingMessage() {
      const messageType = 0
      const username = ''

      const data = { ...this.item, username, messageType }

      await this.$axios.post(`notifications/scrolling-messages`, data)
      await this.getScrollingMessages()
    },

    async getScrollingMessages() {
      const { data } = await this.$axios.get(
        `notifications/scrolling-messages/`
      )
      this.data = await data
    },

    async removeScrollingMessage(item) {
      await this.$axios.delete(`/scrolling-messages/${item.id}`)
      await this.getScrollingMessages()
    },

    async updateScrollingMessage() {
      await this.$axios.put(
        `notifications/scrolling-messages/${this.editItem.id}`,
        this.editItem
      )
      await this.getScrollingMessages()
    }
  }
}
</script>
