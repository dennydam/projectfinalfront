<template>
  <div>
    <!-- <v-data-table class="table" :items="products2" :fields='fields' :items-per-page="5">
    </v-data-table> -->
    <v-dialog id="modal-product" v-model="dialog1" persistent max-width="1000">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="additem"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          width="250px"
        >
          我要發問
        </v-btn>
      </template>
      <div class="container01">
        <v-card>
          <v-container>
            <v-form ref="form">
              <v-text-field
                v-model="form.name"
                type="text"
                required
                placeholder="請輸入討論主題"
                :state="state.name"
                outlined
              >
              </v-text-field>
            </v-form>

            <v-form ref="form">
              <v-textarea
                class="mt-10"
                v-model="form.description"
                :state="state.description"
                required
                rows="3"
                max-rows="6"
                placeholder="請描述問題"
                color="teal"
              >
              </v-textarea>
            </v-form>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="submitModal"
                :disabled="modalSubmitting"
              >
                送出
              </v-btn>
              <v-btn color="green darken-1" text @click="dialog1 = false">
                取消
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </div>
    </v-dialog>

    <!-- card -->
    <!-- <v-btn align="left" class="flex " v-for="item in products2" :key="item._id" :value="item" @click="discussOpen(item)">
          <div class="border">
            <div class="row col-6 justify-between ">

              <p class="col-12 title">{{ item.name }}</p>

              <p class="des">{{ item.name }}</p>
            </div>
            <div class="flex row col-12 qus_card_bottom">
              <p class="name" style="margin-right:auto">{{ products2.name  }}</p>
              <p class="fb_length">{{ products2.name }}</p>
            </div>
          </div>
        </v-btn> -->
    <!-- table -->
    <v-container mt-16>
      <v-row>
        <v-col
          align="center"
          justify="center"
          cols="12"
          lg="4"
          sm="6"
          v-for="item in products2"
          :key="item._id"
        >
          <v-card
            elevation="12"
            outlined
            shaped
            class="discuss"
            max-width="344"
          >
            <h1>主題:{{ item.name }}</h1>
            <v-card-text> </v-card-text>
            <v-card-text>{{ item.description }} </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-actions>
              <v-icon>mdi-account</v-icon>
              <p class="mt-4">{{ user.account }}</p>
              <v-spacer></v-spacer>
              <v-btn @click="discussopen(item)">cc </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- 對話視窗 -->
      <v-dialog max-width="900" v-model="discuss">
        <v-card mt-10>
          <v-container>
            <v-toolbar color="primary" dark>
              <h1>主題:{{ form.name }}</h1>
            </v-toolbar>
            <v-card-text>
              <v-card-text>描述: {{ form.description }}</v-card-text>
              <v-divider class="mx-4 my-4"></v-divider>
              <v-card-text d-flex v-for="mes in form.messages" :key="mes._D">
                <v-row class="d-flex">
                  <v-icon>mdi-account</v-icon>
                  <p class="my-5">{{ mes.account }}:{{ mes.text }}</p>
                  <v-spacer></v-spacer>
                  <p class="my-5">{{ mes.date }}</p>
                </v-row>
                <v-divider class="mx-4 my-4"></v-divider>
              </v-card-text>
            </v-card-text>

            <v-text-field
              v-model="text"
              outlined
              append-outer-icon="mdi-send"
              @click:append-outer="sendmessage()"
            >
            </v-text-field>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>

    <!-- <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
          <th class="text-left">
            image
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in products"
          :key="item.denny"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td><img :src="item.image" style="width:100px"></td>
          <td> </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      number: -1,
      sending: false,
      text: '',
      modalSubmitting: false,
      products2: [],

      form: {
        user: '',
        name: '',
        description: '',
        _id: '',
        message: ''
      },
      // editProduct (index) {
      //   this.form = {
      //     name: this.products[index].name,
      //     price: this.pooducts[index].price,
      //     image: null,
      //     sell: false,
      //     description: '',
      //     category: '',
      //     _id: ''
      //   }
      //   this.$bvModal.show('modal-product')
      // },
      discuss: false,
      dialog: false,
      dialog1: false,
      dialogDelete: false,
      editedIndex: -1
    }
  },
  computed: {
    state () {
      return {
        name: this.form.name.length === 0 ? null : true
      }
    }
  },

  created1 () {
    this.initialize()
  },

  methods: {
    async submitModal () {
      if (!this.state.name) {
        return
      }
      this.modalSubmitting = true

      const fd = new FormData()
      for (const key in this.form) {
        if (key !== '_id') {
          fd.append(key, this.form[key])
        }
      }

      try {
        if (this.form._id.length === 0) {
          const { data } = await this.api.post('/board', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          console.log(data.result)
          this.products2.push(data.result)
          this.dialog1 = false
        }
        this.modalSubmitting = false
        this.form = {
          name: '',
          description: '',
          _id: ''
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    async discussopen (item) {
      this.discuss = true
      this.form.name = item.name
      this.form.user = this.form._id = item._id
      this.form.description = item.description
      this.form.messages = item.messages
      this.number = this.products2.indexOf(item)
    },
    async sendmessage () {
      try {
        const { data } = await this.api.post(
          '/board/' + this.form._id,
          { text: this.text, account: this.user.account },
          {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          }
        )
        this.products2[this.number].messages.push(
          data.result.messages[data.result.messages.length - 1]
        )
        // this.discuss = false
      } catch (error) {
        console.log(error)
      }
      this.sending = false
      this.text = ''
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/board/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.products2 = data.result
    } catch (error) {
      console.log(error)
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
}
</script>
<style scoped>
.table {
  margin-top: 500px;
}

.container01 {
  margin: auto;
}

.container {
  max-width: 1000px;
}

.additem {
  position: absolute;
  left: 100px;
  top: 120px;
  z-index: 22;
  margin-right: 100px;
}

.discuss {
  border: 2px solid black;
}

/* @media screen and (max-width: 500px) {
  #section01 {
    height: 1800px;
    background-color: #dde0d9;
  }
} */
@media screen and (max-width: 1700px) {
  .additem {
    position: relative;
    left: 100px;
    top: 50px;
    z-index: 22;
  }
}

@media screen and (max-width: 600px) {
  .additem {
    position: relative;
    left: 115px;
    margin: auto;
  }
}
</style>
