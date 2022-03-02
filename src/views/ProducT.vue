<template>
  <v-main>
    <v-container mt-15>
      <div id="section01">
        <v-row>
          <v-col cols="6" class="content1" align="center" justify="center">
           <v-card
               width="600">
            <v-img
              width="600"
              height="400"
              :src="image"
              title="YouTube video player"
            ></v-img>
            </v-card>
          </v-col>
          <v-col cols="6" class="worktext" align="center" justify="center">
            <h1 class="mt-4">飲食說明</h1>
              <v-card class="card1" >
                <h1>{{ description }}</h1>
              </v-card>

              <v-card class="card2">
                <h1>熱量:{{ price }}大卡</h1>
              </v-card>

          </v-col>
          </v-row>
          <v-row class="mt-10">
          <v-col cols="1"></v-col>
          <v-col cols="3" align="center" justify="center" >
            <v-form ref="form" >
              <v-text-field
               outlined
                v-model.number="quantity"
                type="number"
                required
                :state="quantityState"
                min="0"
              >
              </v-text-field>
              <v-btn class="mr-10" @click="addCart">加入訓練菜單</v-btn>
              <v-btn @click="addCart" >回去訓練頁</v-btn>
            </v-form>
          </v-col>
          </v-row>

      </div>
    </v-container>
  </v-main>
</template>
<script>
export default {
  data () {
    return {
      icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
      name: '',
      price: 0,
      description: '',
      image: '',
      sell: false,
      video: '',
      category: '',
      quantity: 0
    }
  },
  methods: {
    addCart () {
      this.$store.dispatch('user/addCart', {
        product: this.$route.params.id,
        quantity: this.quantity
      })
    }
  },
  computed: {
    quantityState () {
      return this.quantity === 0 ? null : this.quantity > 0
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/products/' + this.$route.params.id)
      this.name = data.result.name
      this.price = data.result.price
      this.description = data.result.description
      this.image = data.result.image
      this.video = data.result.video
      this.sell = data.result.sell
      this.category = data.result.category
      document.title = `${this.name} | 購物網`
      console.log('555')
    } catch (error) {
      console.log(error)
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.v-main {
  padding: 123px 0px 0px;
}

.youtube {
  margin-left: 100px;
}

.card1{
  margin-top:100px;
}

.card2{
  margin-top:100px;
}
</style>
