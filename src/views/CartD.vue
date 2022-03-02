
<template>
  <v-container>
    <div class="table">
      <h1>總熱量 {{ total }} 大卡 </h1>
      <v-divider class="mx-4"></v-divider>
      <v-simple-table class="elevation-1" >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Calories</th>
              <th class="text-left">image</th>
              <th class="text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="item.denny">
              <td>{{ item.product.name }}</td>
              <td>{{ item.product.price }}</td>
              <td><img :src="item.product.image" style="width: 100px" /></td>
              <td>
                <v-row>
                  <v-col>
                    <v-form ref="form">
                      <v-text-field
                        outlined
                        v-model="products[index].quantity"
                        type="number"
                        required
                        min="1"
                        @input="updateCart(index, products[index].quantity)"
                      >
                      </v-text-field>
                    </v-form>
                  </v-col>
                  <v-col>
                    <v-btn class="mt-5" @click="updateCart(index, 0)"
                      >刪除</v-btn
                    >
                  </v-col>
                </v-row>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    async updateCart (index, quantity) {
      try {
        await this.api.patch(
          '/users/me/cart',
          { product: this.products[index].product._id, quantity },
          {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          }
        )
        if (quantity === 0) {
          this.products.splice(index, 1)
          this.$store.commit('user/updateCart', this.user.cart - 1)
        }
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: '修改購物車失敗'
        })
      }
    }
  },
  computed: {
    total () {
      return this.products.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity * currentValue.product.price
      }, 0)
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/users/me/cart', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.products = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '失敗',
        text: '取得購物車失敗'
      })
    }
  }
}
</script>
<style scoped>
.table {
  border-radius: 10px ;
  width: 80%;
  margin: auto;
  margin-top: 200px;
}
.bb {
  width: 100%;
  padding: 151px;
  margin-right: auto;
  margin-left: auto;
}
</style>
