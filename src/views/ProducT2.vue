<template>
  <div id="section01">
    <v-row>
      <v-col cols="6" class="content1 mt-3" align="center" justify="center">
        <iframe
          width="600"
          height="400"
          src="https://www.youtube.com/embed/ByqsbaXgX3U"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-col>
      <v-col cols="6" class="worktext">
        <h1>訓練說明</h1>
        <v-card>
          <h1>{{ description }}</h1>
        </v-card>
      </v-col>
      <v-col cols="6" align="center" justify="center">
        <v-btn to="/">回去訓練頁</v-btn>
      </v-col>
    </v-row>
  </div>
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
      const { data } = await this.api.get('/products2/' + this.$route.params.id)
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
#section01 {
  margin-top: 100px;
  width: 90%;
}
</style>
