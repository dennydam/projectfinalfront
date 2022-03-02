<template>
  <div class="section">
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(carousel, i) in carousels"
        :key="i"
        :src="carousel.src"
      ></v-carousel-item>
    </v-carousel>
    <div id="section01">
      <div class="container01">
        <v-container class="aaa">
          <div class="d-flex">
            <h1>訓練清單</h1>
            <v-icon class="ml-6" color="black darken-2" size="50">
              mdi-weight-lifter</v-icon
            >
          </div>
          <v-divider class="mx-4 my-4"></v-divider>

          <!-- <v-tabs v-model="tab" class="mb-4 tab" background-color="#dde0d9">
            <v-tab v-for="item in items" :key="item.tab">
              {{ item.tab }}
            </v-tab>
          </v-tabs> -->
          <v-row>
            <v-col
              cols="12"
              md="6"
              lg="3"
              xl="3"
              v-for="product in products2"
              :key="product._id"
            >
              <v-card max-width="250">
                <v-img
                  :src="product.image"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="250px"
                >
                  <v-card-title v-text="product.name"></v-card-title>
                </v-img>
                <v-btn icon @click="show = !show">
                  <v-icon>{{
                    show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  }}</v-icon>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text v-text="product.description"></v-card-text>
                  </div>
                </v-expand-transition>
                <v-divider class="mx-4"></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn>
                    <router-link
                      color="deep-purple lighten-2"
                      text
                      :to="'/product2/' + product._id"
                      >Start
                    </router-link>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="container01">
        <v-container fluid class="aaa">
          <h1>飲食清單</h1>
          <v-divider class="mx-4 my-4"></v-divider>
          <v-row>
            <v-col
              class="mt-5"
              v-for="product in products"
              :key="product._id"
              cols="12"
              md="6"
              lg="3"
              xl="3"
            >
              <v-card max-width="250">
                <v-img
                  :src="product.image"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="250px"
                >
                </v-img>
                <v-btn icon @click="show = !show">
                  <v-icon>{{
                    show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  }}</v-icon>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text v-text="product.description"></v-card-text>
                  </div>
                </v-expand-transition>
                <v-divider class="mx-4"></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn>
                    <router-link
                      color="deep-purple lighten-2"
                      text
                      :to="'/product/' + product._id"
                      >Start
                    </router-link>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <!-- <div class="container01">

        <v-container fluid class="card">
          <h1>飲食菜單</h1>
        <template v-slot:extension></template>
        <v-tabs
          v-model="tabs"
          centered
        >
          <v-tab
            v-for="n in 3"
            :key="n"
          >
            Item {{ n }}
          </v-tab>
        </v-tabs>

        <v-divider class="mx-4 my-4"></v-divider>
          <v-row>
        <v-col
          v-for="food in foods"
          :key="food.text"
          :cols="food.flex"
        >
          <v-tabs-items v-model="tabs">
      <v-tab-item>
          <v-card flat max-width="250">
                <v-img
                  :src="food.src"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="250px"
                    >
              <v-card-title v-text="food.title"></v-card-title>
                </v-img>
                <v-card-text v-text="food.text">
                </v-card-text>
                <v-divider class="mx-4"></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  absolute
                  color="#0D1E25"
                  class="white--text"
                  fab
                  large
                  right
                  top
                >
                <v-icon>mdi-cart</v-icon>
              </v-btn>

               <v-btn
                  color="deep-purple lighten-2"
                  text
                >
                  START
                </v-btn>
            </v-card-actions>
          </v-card>
          <v-card flat>
          <v-card-title class="text-h5">
            An even better title
          </v-card-title>
          <v-card-text>
            <p>
              Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed hendrerit. Maecenas malesuada. Vestibulum ullamcorper mauris at ligula. Proin faucibus arcu quis ante.
            </p>

            <p class="mb-0">
              Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Aliquam lobortis. Suspendisse potenti.
            </p>
          </v-card-text>
        </v-card>
            </v-tab-item>
    </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
    </div> -->
      <!-- test -->
    </div>
  </div>
</template>
<script>
// import ProductCard from '../components/ProductCard.vue'
export default {
  // components: {
  //   ProductCard
  // },
  data () {
    return {
      show: false,
      products2: [],
      products: [],
      tab: null,
      items: [
        { tab: 'One', content: 'Tab 1 Content' },
        { tab: 'Two', content: 'Tab 2 Content' },
        { tab: 'Three', content: 'Tab 3 Content' }
      ],
      carousels: [
        {
          src: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ],
      // cards: [
      //   {
      //     title: '胸部訓練',
      //     text: 'dddd',
      //     src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
      //     flex: 3
      //   },
      //   {
      //     title: '腿部訓練',
      //     src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
      //     flex: 3
      //   },
      //   {
      //     title: '肩部訓練',
      //     src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya291dHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      //     flex: 3
      //   },
      //   {
      //     title: '背部訓練',
      //     src: 'https://images.unsplash.com/photo-1611841315886-a8ad8d02f179?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTM1fHx3b3Jrb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      //     flex: 3
      //   },
      //   { text: 'eeeeeee' }
      // ],
      icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/products')
      this.products = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '商品取得失敗'
      })
    }
    try {
      const { data } = await this.api.get('/products2')
      this.products2 = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '商品取得失敗'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// .card {
//   max-width: 20%;
// }

.tab {
  width: 70%;
}

.aaa {
  max-width: 70%;
}

#section01 {
  height: 1200px;
  background-color: #dde0d9;
}

.container01 {
  background-image: url(https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzF8fHdvcmslMjBvdXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60);
  background-position: right top;
  background-color: #dde0d9;
  margin: auto;
}

.ccc {
  background-color: #dde0d9;
  z-index: 11;
}

.footer {
  padding: 22px;
}

// .v-main__wrap {
//     flex: 1 1 auto;
//     max-width: 200%;
//     position: relative;
// }

@media screen and (max-width: 500px) {
  #section01 {
    height: 1800px;
    background-color: #dde0d9;
  }
}
</style>
