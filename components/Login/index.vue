<template>
  <div class="account-pages mt-5 mb-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <div>
            <!-- Logo -->
            <div class="pt-4 pb-2 text-center">
              <img
                class="img-fluid"
                src="../../assets/images/comstice-logo.png"
                alt="Comstice"
                title="Comstice"
              />
            </div>

            <div class="pt-0 pl-4 pr-4">
              <div class="text-center w-75 m-auto">
                <h4
                  class="text-dark-50 text-center mt-0 mb-2 font-weight-bold text-white"
                >
                  Welcome to Comstice Wallboard
                </h4>
                <p class="text-white">
                  Wallboard presents the real-time information about your Cisco
                  Contact Center
                </p>
                <p class="text-white">
                  Please login using your Windows Login or Cisco CUCM user
                  credentials.
                </p>
              </div>

              <form form @submit.prevent="handleSubmit">
                <div v-if="alert.message" :class="`alert ${alert.type}`">
                  {{ alert.message }}
                </div>
                <div class="form-group">
                  <label for="username" class="text-white">Username</label>
                  <input
                    id="username"
                    v-model="user.username"
                    v-validate="'required'"
                    name="username"
                    class="form-control"
                    :class="{
                      'is-invalid': submitted && errors.has('username')
                    }"
                    type="text"
                    placeholder="Enter your username"
                  />
                  <div
                    v-if="submitted && errors.has('username')"
                    class="invalid-feedback"
                  >
                    {{ errors.first('username') }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="password" class="text-white">Password</label>
                  <input
                    id="password"
                    v-model="user.password"
                    v-validate="{ required: true, min: 3 }"
                    class="form-control"
                    name="password"
                    :class="{
                      'is-invalid': submitted && errors.has('password')
                    }"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <div
                    v-if="submitted && errors.has('password')"
                    class="invalid-feedback"
                  >
                    {{ errors.first('password') }}
                  </div>
                </div>

                <div class="form-group mb-0 text-center">
                  <button class="btn btn-success btn-block" type="submit">
                    Log In
                  </button>
                </div>
              </form>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->

          <!-- end row -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    submitted: false,
    user: {
      username: '',
      password: ''
    }
  }),

  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },

  watch: {
    $route() {
      this.clearAlert()
    }
  },

  methods: {
    ...mapActions({
      login: 'login',
      clearAlert: 'alert/clear'
    }),

    handleSubmit() {
      this.submitted = true
      this.$validator.validate().then(valid => {
        if (valid) {
          this.login(this.user)
        }
      })
    }
  }
}
</script>
