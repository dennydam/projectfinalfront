<template>
  <v-app id="app">
    <v-app-bar color="primary" dark app>
      <v-toolbar-title
        ><v-img src="./assets/logo.svg" width="180px" alt=""
      /></v-toolbar-title>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
       <v-app-bar-nav-icon
          class="hamburger"
          color="white"
          dark
          @click.stop="drawer = !drawer"
        >
        </v-app-bar-nav-icon>

         <!-- <v-navigation-drawer v-model="drawer" temporary>
       <v-list>
          <v-list-group
            v-for="(n, index) in menu"
            :key="index"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <router-link :to="n.link">{{ n.title }}</router-link>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
    </v-navigation-drawer> -->

      <v-navigation-drawer
            height="100vh"
            v-model="drawer"
            absolute
            temporary
            color="primary"

          >
          <v-list>

      <v-list-item :to="menu[0].url" class="my-6">
        <v-list-item-title>{{ menu[0].title }}</v-list-item-title>
      </v-list-item>

      <v-list-group class="my-6"
       color="white"
      no-action
        >
            <template v-slot:activator>
          <v-list-item-title>Let go</v-list-item-title>
        </template>
         <v-list-item
            v-for="(item, index) in menu[1].submenu"
              :key="index"
              :to="item.url">
            <v-list-item-content>
              <v-list-item-title>{{ item.itemTitle }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
            <v-list-item>
          </v-list-item>

              <!-- <v-list-title
              v-for="sub in submenu"
              :key="sub.title"
            >
              <v-list-title-content>
                <v-list-title-title>777777</v-list-title-title>
              </v-list-title-content>
            </v-list-title> -->

      </v-list-group>

      <v-list-item :to="menu[2].url" class="my-6">
        <v-list-item-title>{{ menu[2].title }}</v-list-item-title>
      </v-list-item>
      </v-list>

      <v-divider></v-divider>

    </v-navigation-drawer>
      <v-spacer></v-spacer>

      <!-- <v-tabs
      dark
      background-color="teal darken-3"
      show-arrows
    >
      <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

      <v-tab
        v-for="(n, index) in menu"
        :key="index"
        :to="n.url"
      >
        {{ n.title }}

      </v-tab>
    </v-tabs> -->

      <v-toolbar-items class="hidden-sm-and-down">
        <v-menu
          v-for="(n, index) in menu"
          :key="index"
          open-on-hover
          offset-y
          allow-overflow
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn :to="n.url" text v-bind="attrs" v-on="on">
              {{ n.title }}</v-btn
            >
          </template>
          <v-list v-if="n.submenu">
            <v-list-item
              v-for="(item, index) in n.submenu"
              :key="index"
              :to="item.url"
            >
              <v-list-item-title> {{ item.itemTitle }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <!-- 註冊 -->
      <div>
        <v-dialog v-model="dialog" persistent max-width="350" color="primary">
          <template v-slot:activator="{ on, attrs2 }">
            <v-btn color="primary" dark v-bind="attrs2" v-on="on"> 註冊 </v-btn>
          </template>
          <v-card color="primary">
            <v-form v-model="valid" @submit.prevent="register" ref="form">
              <v-col cols="12" class="text-center">
                <h4 class="register">註冊</h4>

                <v-text-field
                  dark
                  v-model="form.account"
                  label="帳號"
                  required
                ></v-text-field>
                <v-text-field
                  dark
                  v-model="form.password"
                  label="密碼"
                  type="password"
                  required
                  :rules="inputRules"
                ></v-text-field>
              </v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit">註冊</v-btn>
                <v-btn color="green darken-1" text @click="dialog = false">
                  Disagree
                </v-btn>
                <v-btn color="green darken-1" text @click="dialog = false">
                  Agree
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </div>
      <!-- 登入 -->
      <div>
        <v-dialog v-model="dialog2" persistent max-width="350">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-if="!user.isLogin"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Log in
            </v-btn>
            <v-btn color="primary" v-else @click="logout"
              >Log out</v-btn
            >

          </template>
          <v-card color="primary">
            <v-form v-model="valid" @submit.prevent="login" ref="form2">
              <v-col cols="12" class="text-center">
                <h4 class="register">登入</h4>

                <v-text-field
                  dark
                  v-model="form2.account"
                  label="帳號"
                  required
                ></v-text-field>
                <v-text-field
                  dark
                  v-model="form2.password"
                  label="密碼"
                  type="password"
                  required
                  :rules="inputRules"
                ></v-text-field>
              </v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit">登入</v-btn>
                <v-btn color="green darken-1" text @click="dialog2 = false">
                  Disagree
                </v-btn>
                <v-btn color="green darken-1" text @click="dialog2 = false">
                  Agree
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </div>

      <!-- <v-btn to="/About">註冊</v-btn> -->
    </v-app-bar>

    <v-main>
      <!-- <div class="cc">
        <video
          class="dd"
          src="./assets/pexels-mikhail-nilov-7699870.mp4"
          autoplay="autoplay"
          muted="muted"
          loop="loop"
        ></video>
      </div> -->

      <router-view />
    </v-main>
    <v-footer padless>
      <v-card
        color="primary"
        flat
        tile
        class="indigo lighten-1 white--text text-center"
        width="100%"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Copyright © 2020 TAIWAN reserved.
        </v-card-text>

        <v-divider></v-divider>

      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ],
    menu: [
      // { index: "1", title: "Home", url:"/about" },
      // {
      //   index: "2",
      //   title: "Let GO",
      //   submenu: [{ itemIndex: "2-1", itemTitle: "Tranning",url:"/about" },
      //             { itemIndex: "2-2", itemTitle: "Tran",url:"/" }
      //            ],

      // },
      // {
      //   index: "3",
      //   title: "count",
      // },
      { index: '1', icon: 'home', title: 'HOME', url: '/' },
      {
        index: '2',
        icon: 'info',
        title: 'Let GO',
        submenu: [
          { itemIndex: '2-1', itemTitle: 'TDEE&BMR', url: '/login' },
          { itemIndex: '2-1', itemTitle: 'Tranning', url: '/about' },
          { itemIndex: '2-1', itemTitle: '飲食清單', url: '/cart' },
          { itemIndex: '2-1', itemTitle: '討論區', url: '/board' }
        ]
      },
      { index: '3', icon: 'warning', title: '管理者', url: '/admin' }
    ],
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
    dialog: false,
    dialog2: false,
    valid: true,
    form: {
      account: '',
      password: ''
    },
    form2: {
      account: '',
      password: ''
    },
    inputRules: [(v) => !!v || '必填']
  }),
  methods: {
    async register () {
      const valid = this.$refs.form.validate()
      if (!valid) return
      console.log(this.form)
      try {
        await this.api.post('/users', this.form)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '註冊成功'
        })
        this.dialog = false
        this.$router.push('/')
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: '註冊失敗'
        })
      }
    },
    login () {
      const valid = this.$refs.form2.validate()
      if (!valid) return
      // console.log(this.form2);
      this.$store.dispatch('user/login2', this.form2)
      this.dialog2 = false
    },
    logout () {
      this.$store.dispatch('user/logout')
    },
    menuItems () {
      return this.menu
    }
  },
  created () {
    this.$store.dispatch('user/getInfo')
  }
}

</script>
<style lang="scss" scoped>

@import "@/scss/variable.scss";
@import "@/scss/mixins/rwd.scss";

@include lg {
   .hamburger{
     display: none;
   }
}

</style>
