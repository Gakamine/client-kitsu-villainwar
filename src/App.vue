<template>
  <div id="app">
    <template v-if="!APIerror">

      <b-navbar shadow fixed-top>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <svg
              width="36"
              height="36"
              viewBox="0 0 260 260"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#E75E45">
                <path
                  d="M152.7 48.5c-6.8-2.5-14.1-4.1-21.8-4.4-12.7-.6-24.8 2.2-35.4 7.6-.6.3-1.3.6-2 1v36.4c0 .5 0 2.4-.3 4-.7 3.7-2.9 7-6 9.1-2.6 1.8-5.6 2.6-8.8 2.5-.6 0-1.3-.1-1.9-.2-1.6-.3-3.3-.9-3.8-1.1-1.4-.5-21.8-8.4-31.6-12.2-1.2-.5-2.2-.9-3-1.2-11.7 9.9-24 21.7-35.5 35.6-.1.1-.6.7-.7.8-1.5 2.1-1.6 5.1 0 7.4 1.2 1.7 3.1 2.7 5 2.8 1.3.1 2.7-.3 3.9-1.1.1-.1.2-.2.4-.3 12.2-8.8 25.6-15.9 39.8-21.6 1-.5 2.2-.8 3.3-.7 1.6.1 3.1.7 4.3 1.9 2.3 2.3 2.4 6 .5 8.5-.8 1.2-1.5 2.4-2.2 3.6-7.6 12.4-13.7 25.9-18.3 40-.1.4-.2.7-.3 1.1v.1c-.4 1.7-.1 3.5 1 5 1.2 1.7 3.1 2.7 5.1 2.8 1.4.1 2.7-.3 3.9-1.1.5-.4 1-.8 1.4-1.3.1-.2.3-.4.4-.6 5-7.1 10.5-13.8 16.4-20 26.3-28.2 61.2-48.1 100.3-55.9.3-.1.6-.1.9-.1 2.2.1 3.9 2 3.8 4.2-.1 1.9-1.4 3.3-3.2 3.7-36.3 7.7-101.7 50.8-78.8 113.4.4 1 .7 1.6 1.2 2.5 1.2 1.7 3.1 2.7 5 2.8 1.1 0 4.2-.3 6.1-3.7 3.7-7 10.7-14.8 30.9-23.2 56.3-23.3 65.6-56.6 66.6-77.7v-1.2c.9-31.4-18.6-58.8-46.6-69.2zm-56.5 165C91 198 91.5 183 97.6 168.7c11.7 18.9 32.1 20.5 32.1 20.5-20.9 8.7-29.1 17.3-33.5 24.3z"
                ></path>
                <path
                  d="M1.1 50.6c.1.2.3.4.4.5 5.3 7.2 11.3 13.5 17.8 19.1.1.1.2.1.2.2 4.2 3.6 12.2 8.8 18 10.9 0 0 36.1 13.9 38 14.7.7.3 1.7.6 2.2.7 1.6.3 3.3 0 4.8-1s2.4-2.5 2.7-4.1c.1-.6.2-1.6.2-2.3V48.5c.1-6.2-1.9-15.6-3.7-20.8 0-.1-.1-.2-.1-.3-2.8-8.1-6.6-16-11.4-23.5l-.3-.6-.1-.1c-2-2.8-6-3.5-8.9-1.5-.5.3-.8.7-1.2 1.1-.3.4-.5.7-.8 1.1-6.4 9.3-9 20.6-7.3 31.7-3.3 1.7-6.8 4-7.2 4.3-.4.3-3.9 2.7-6.6 5.2-9.7-5.5-21.3-7.2-32.2-4.6-.4.1-.9.2-1.3.3-.5.2-1 .4-1.4.7-2.9 2-3.7 5.9-1.8 8.9v.2zm63.5-40.1c3.4 5.7 6.3 11.6 8.6 17.8-4.6.8-9.1 2-13.5 3.6-.6-7.5 1.1-14.9 4.9-21.4zM31.5 51.3c-3.2 3.5-5.9 7.3-8.3 11.3-4.9-4.3-9.4-9.2-13.5-14.4 7.5-1.3 15-.2 21.8 3.1z"
                ></path>
              </g>
            </svg>
            <strong>Kitsu Villain War</strong>
          </b-navbar-item>
            <div class="buttons is-hidden-desktop">
              <a v-if="token" class="button is-primary" @click="Logout()">
                <strong>Logout</strong>
              </a>
              <a v-else class="button is-primary" @click="isComponentModalActive = true">
                <strong>Login</strong>
              </a>
            </div>
        </template>
        <template slot="start">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            Vote
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/results' }">
            Results
          </b-navbar-item>
        </template>
        <template slot="end">
          <b-navbar-item tag="div" class="is-hidden-mobile">
            <div class="buttons">
              <a v-if="token" class="button is-primary" @click="Logout()">
                <strong>Logout</strong>
              </a>
              <a v-else class="button is-primary" @click="isComponentModalActive = true">
                <strong>Login</strong>
              </a>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>

      <div id="router-view">
        <router-view :token="token" :data="currentRound" :checkvote="checkvote" />
      </div>

      <b-modal
        :active.sync="isComponentModalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal
        >
        <form @submit.prevent="Login">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">Login with Kitsu</p>
            </header>
            <section class="modal-card-body">
              <b-field label="Email">
                <b-input
                  type="text"
                  placeholder="Your email"
                  v-model="email"
                  required
                >
                </b-input>
              </b-field>

              <b-field label="Password">
                <b-input
                  type="password"
                  password-reveal
                  placeholder="Your password"
                  v-model="password"
                  required
                >
                </b-input>
              </b-field>
              <p>We do NOT store any of your credentials.</p>
            </section>
            <footer class="modal-card-foot">
              <b-button v-if="IsLogging" class="button is-primary" loading>
                Login
              </b-button>
              <button v-else class="button is-primary">Login</button>
            </footer>
          </div>
        </form>
      </b-modal>

      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            The <strong>Kitsu Villain War</strong> are hosted by
            <a href="https://kitsu.io/users/Madao">Madao_King</a>. The
            website was made by
            <a href="https://kitsu.io/users/Gakamine">Gakamine</a>, support him on
            <a href="https://liberapay.com/Gakamine">Liberapay</a>.
          </p>
          <p>
            All other trademarks and content not owned by the Kitsu Villain War
            that appear on the website are the property of their respective owners.
          </p>
        </div>
      </footer>

    </template>
    <template v-if="APIerror">
        <Error500/>
    </template>
  </div>
</template>

<script>
import Error500 from './components/Error500.vue'
import { FETCH_DATA_QUERY } from './gql/fetch_data';
const axios = require('axios').default;
export default {
  name: "App",
  components: {
    Error500
  },
  data() {
    return {
      isComponentModalActive: false,
      token: localStorage.token,
      IsLogging: false,
      email: "",
      password: "",
      APIerror: false,
      currentRound: null,
      checkvote: null
    }
  },
  methods: {
    Login: function() {
      this.IsLogging=true
      axios({
        method: "post",
        url: 'https://kitsu.io/api/oauth/token',
        data: {
          grant_type: 'password',
          username: this.email,
          password: this.password
        }
      })
      .then((response) => {
        localStorage.setItem('token', JSON.parse(JSON.stringify(response, null, 2)).data.access_token)
        this.checkToken()
        this.IsLogging=false
        this.isComponentModalActive=false
      })
      .catch(() => {
        this.IsLogging=false
        this.$buefy.notification.open({
            duration: 5000,
            message: 'Invalid username or password',
            type: 'is-danger'
        })           
      })
    },
    Logout: function() {
      localStorage.clear()
      this.token = ""
      this.checkvote = 0
    },
    checkToken: function() {
      axios({
        method: "get",
        url: 'https://kitsu.io/api/edge/users?filter[self]=true&include=userRoles.role,userRoles.user',
        headers: {
          Authorization: "Bearer "+localStorage.token
        }
      })
      .then((response) => {
        JSON.parse(JSON.stringify(response['data'])).data[0].id
        this.token=localStorage.token
        this.checkVote()
      })
      .catch(() => {
          this.token=""
          localStorage.clear()
      })
    },
    checkVote: function() {
      axios({
        method: "post",
        url: 'https://api.villainwar.madao-king.xyz',
        data: {
          query: `{checkVote(token:"`+this.token+`")}`
        }
      })
      .then((response) => {
        this.checkvote=response['data'].data.checkVote
      })   
    }
  },
  apollo: {
    currentRound: {
      query: FETCH_DATA_QUERY,
      error() {
        this.APIerror=true
      }
    }
  },
  mounted() {
    if(localStorage.token) {
      this.checkToken()
    }
  }
};
</script>

<style lang="scss">
  // Import Bulma's core
  @import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: #fd755c;
  $primary-invert: findColorInvert($primary);
  $twitter: #4099ff;
  $twitter-invert: findColorInvert($twitter);
  $navbar-background-color: #292631;
  $navbar-box-shadow-color: #282530;
  $text-strong: #868182;
  $navbar-burger-color: white;

  //Modal colors
  $modal-card-body-background-color: #3b3946;
  $modal-card-head-background-color: #292631;
  $modal-card-title-color: white;
  $modal-card-foot-border-top: #282530;
  $modal-card-head-border-bottom: #282530;
  $label-color: #c1c1c4;
  $message-body-pre-background-color: #292631;

  // Forms
  $input-color: white;
  $input-background-color: #24212c;
  $input-border-color: #555160;

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
    "white": (
      $white,
      $black,
    ),
    "black": (
      $black,
      $white,
    ),
    "light": (
      $light,
      $light-invert,
    ),
    "dark": (
      $dark,
      $dark-invert,
    ),
    "primary": (
      $primary,
      $primary-invert,
    ),
    "info": (
      $info,
      $info-invert,
    ),
    "success": (
      $success,
      $success-invert,
    ),
    "warning": (
      $warning,
      $warning-invert,
    ),
    "danger": (
      $danger,
      $danger-invert,
    ),
    "twitter": (
      $twitter,
      $twitter-invert,
    ),
  );

  // Links
  $link: $primary;
  $link-hover: #dd452a;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;
  $navbar-item-hover-background-color: #18161d;
  $navbar-item-hover-color: #bfbfbf;
  $navbar-item-color: #bfbfbf;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

  //Other
  #app {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: calc(100% - 52px);
    position: absolute;
    width: 100%;
  }

  #router-view {
    flex: 1 0 auto;
    background-color: #3b3946;
    color: #d8d8d9;
    text-align: center;
    display: flex;
  }

  .router-link-exact-active {
    color: #c1c1c4;
    background-color: #24212c;
  }

  .navbar-brand > .navbar-item {
    color: #fd755c !important;
    background-color: #292631;
  }

  .modal-card-body {
    color: #c1c1c4;
  }

  .checkbox:hover, .radio:hover {
    color: #a6a6a6;
  }

  .footer {
    padding: 1rem 1.5rem 1rem;
    flex-shrink: 0;
    background-color: #2a2832;
    color: #c1c1c4;
  }
  .is-hidden-desktop {
    margin-bottom: 0px !important;
    margin-left: auto;
  }
  .is-hidden-desktop .button {
    margin: 0px !important;
  }
  .navbar-burger {
    margin-left: 0px !important;
  }
  h1 {
    font-size: 24px;
  }

</style>
