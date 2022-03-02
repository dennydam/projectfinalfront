<template>
  <div class="top">
    <!-- <v-data-table class="table" :items="products" :fields='fields' :items-per-page="5">
    </v-data-table> -->
    <v-dialog
      id="modal-product"
      v-model="dialog1"
      persistent
      @click="resetForm"
      max-width="600"
      hide-overlay="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="additem"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          width="200px"
        >
          請新增
        </v-btn>
      </template>
      <v-card>
        <v-container>
          <v-form ref="form">
            <v-text-field
              label="商品名稱"
              v-model="form.name"
              type="text"
              required
              placeholder="請輸入商品名稱"
              :state="state.name"
              outlined
            >
            </v-text-field>
          </v-form>
          <v-form ref="form">
            <v-text-field
              v-model.number="form.price"
              type="number"
              min="0"
              required
              placeholder="請輸入商品價格"
              :state="state.price"
              outlined
            >
            </v-text-field>
          </v-form>

          <v-form ref="form">
            <v-textarea
              v-model="form.description"
              :state="state.description"
              required
              rows="3"
              max-rows="6"
              placeholder="請輸入商品說明"
              color="teal"
            >
            </v-textarea>
          </v-form>
        </v-container>

        <v-radio-group v-model="form.sell" mandatory>
          <v-radio :value="true" label="上架">上架</v-radio>
          <v-radio label="下架" :value="false">下嫁</v-radio>
        </v-radio-group>
        <v-row align="center" justify="center" no-gutters>
          <img-inputer
            class="inputer"
            v-model="form.image"
            accept="image/*"
            theme="light"
            size="large"
            bottom-text="點選或拖拽圖片以修改"
            hover-text="點選或拖拽圖片以修改"
            placeholder="點選或拖拽選擇圖片"
            :max-size="1000"
            exceed-size-text="檔案大小不能超過"
          />
        </v-row>

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
      </v-card>
    </v-dialog>
    <!-- table -->
    <v-container>
      <v-data-table
        ref="table"
        :headers="headers"
        :items="products"
        sort-by="calories"
        class="elevation-1 mt-16"
      >
        <template v-slot:[`item.imag`]="{ item }">
          <img :src="item.image" style="width: 100px" />
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>請編輯商品</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <!-- <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template> -->
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Dessert name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.price"
                          label="price"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.price"
                          label="Fat (g)"
                        ></v-text-field>
                      </v-col>
                      <!-- <v-col>
                     <img :src="item.image" style="width:100px">
                    </v-col> -->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.image"
                          label="Carbs (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.protein"
                          label="Protein (g)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
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
      modalSubmitting: false,
      products: [],
      form: {
        name: '',
        price: null,
        image: null,
        sell: false,
        description: '',
        category: '',
        _id: ''
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
      dialog: false,
      dialog1: false,
      dialogDelete: false,
      headers: [
        {
          text: '菜單',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'price' },
        { text: 'Carbs (g)', value: 'imag' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        price: 0,
        category: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        price: 0,
        category: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }
  },
  computed: {
    state () {
      return {
        name: this.form.name.length === 0 ? null : true,
        price: this.form.price === null ? null : this.form.price >= 0
      }
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created1 () {
    this.initialize()
  },

  methods: {
    async submitModal () {
      if (!this.state.name || !this.state.price) {
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
          const { data } = await this.api.post('/products', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.products.push(data.result)
          this.dialog1 = false
        } else {
          const { data } = await this.api.patch(
            '/products/' + this.form._id,
            fd,
            {
              headers: {
                authorization: 'Bearer ' + this.user.token
              }
            }
          )
          this.products[this.form.index] = {
            ...this.form,
            image: data.result.image
          }
          this.$refs.table.refresh()
        }
        this.modalSubmitting = false
        this.form = {
          name: '',
          price: 0,
          description: '',
          image: null,
          sell: false,
          _id: '',
          index: ''
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    // resetForm (event) {
    //   console.log('8888')
    //   if (this.modalSubmitting) {
    //     event.preventDefault()
    //   }
    // },
    // initialize () {
    //   this.desserts = [
    //     {
    //       name: 'Frozen Yogurt',
    //       calories: 159,
    //       fat: 6.0,
    //       carbs: 24,
    //       protein: 4.0
    //     },
    //     {
    //       name: 'Ice cream sandwich',
    //       calories: 237,
    //       fat: 9.0,
    //       carbs: 37,
    //       protein: 4.3
    //     },
    //     {
    //       name: 'Eclair',
    //       calories: 262,
    //       fat: 16.0,
    //       carbs: 23,
    //       protein: 6.0
    //     },
    //     {
    //       name: 'Cupcake',
    //       calories: 305,
    //       fat: 3.7,
    //       carbs: 67,
    //       protein: 4.3
    //     },
    //     {
    //       name: 'Gingerbread',
    //       calories: 356,
    //       fat: 16.0,
    //       carbs: 49,
    //       protein: 3.9
    //     },
    //     {
    //       name: 'Jelly bean',
    //       calories: 375,
    //       fat: 0.0,
    //       carbs: 94,
    //       protein: 0.0
    //     },
    //     {
    //       name: 'Lollipop',
    //       calories: 392,
    //       fat: 0.2,
    //       carbs: 98,
    //       protein: 0
    //     },
    //     {
    //       name: 'Honeycomb',
    //       calories: 408,
    //       fat: 3.2,
    //       carbs: 87,
    //       protein: 6.5
    //     },
    //     {
    //       name: 'Donut',
    //       calories: 452,
    //       fat: 25.0,
    //       carbs: 51,
    //       protein: 4.9
    //     },
    //     {
    //       name: 'KitKat',
    //       calories: 518,
    //       fat: 26.0,
    //       carbs: 65,
    //       protein: 7
    //     }
    //   ]
    // },
    async editItem (item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    deleteItem (item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm () {
      console.log(this.products)
      this.closeDelete()
      // const fd = new FormData()
      // for (const key in this.products[this.editedIndex]) {
      //   if (key !== '_id') {
      //     fd.append(key, this.products[this.editedIndex][key])
      //   }
      // }
      try {
        await this.api.delete(
          '/products/' + this.products[this.editedIndex]._id,
          {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          }
        )
      } catch (error) {
        console.log(error)
        alert('刪除失敗')
      }
      this.products.splice(this.editedIndex, 1)
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async save () {
      console.log(this.products)
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem)
      } else {
        this.products.push(this.editedItem)
      }
      const fd = new FormData()
      console.log(this.products[this.editedIndex])
      for (const key in this.products[this.editedIndex]) {
        if (key !== '_id') {
          fd.append(key, this.products[this.editedIndex][key])
        }
      }
      const { data } = await this.api.patch(
        '/products/' + this.products[this.editedIndex]._id,
        fd,
        {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        }
      )
      this.products[this.form.index] = {
        ...this.form,
        image: data.result.image
      }
      console.log('55')
      this.$refs.table.refresh()
      this.close()
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/products/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.products = data.result
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
.container {
  max-width: 1500px;
}

.top {
  position: absolute;
  left: 25%;
  width: 60%;
}

.additem {
  left: 300px;
  top: 130px;
  z-index: 22;
}
</style>
