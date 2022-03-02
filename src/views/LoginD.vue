<template>
  <div class="container d-flex">
    <div class="mr-10 mt-10">
      <h1 class="mb-5">基礎代謝率</h1>
      <h2>基礎代謝率 BMR（Basal Metabolic Rate）</h2>
      <v-card class="mt-5">
        <h3 class="mb-8">
          基礎代謝意思是身體為了要維持運作，在休息時消耗掉的熱量。基礎代謝率佔了總熱量消耗的一大部分，大約65-75%左右。會影響到基礎代謝率高低的有很多，像是總體重、肌肉量、賀爾蒙、年齡等。
        </h3>
      </v-card>

      <h2>總熱量消耗 TDEE ( Total Daily Energy Expenditure )</h2>
      <v-card class="mt-5">
        <h3>
          身體一整天所消耗掉的熱量。也有人稱為維持體重的熱量，因為當攝取的卡路里
          = TDEE，體重會維持。
        </h3>
      </v-card>
    </div>

    <!-- <v-card class="mt-5" max-width="800" height="150px" dark>
      <v-card-text> </v-card-text>
    </v-card> -->

    <v-row align="center" class="mt-9">
      <v-col col="12" sm="12">
        <h1>TDEE熱量計算機與BMR計算機</h1>
        <v-form ref="form">
          <v-select
            v-model="form.sex"
            :items="items"
            type="text"
            required
            placeholder="請輸入性別"
            outlined
          >
          </v-select>
        </v-form>
      </v-col>

      <v-col class="" cols="12" sm="12">
        <v-form ref="form">
          <v-text-field
            v-model="form.age"
            type="number"
            required
            placeholder="請輸入您的年齡"
            label="請輸入您的年齡"
            outlined
          >
          </v-text-field>
        </v-form>
      </v-col>

      <v-col cols="12" sm="12">
        <v-form ref="form">
          <v-text-field
            v-model="form.height"
            type="number"
            required
            placeholder="請輸入您的身高"
            label="請輸入您的身高"
            outlined
          >
          </v-text-field>
        </v-form>
      </v-col>

      <v-col cols="12" sm="12">
        <v-form ref="form">
          <v-text-field
            v-model="form.weight"
            type="number"
            required
            placeholder="請輸入您的體重"
            label="請輸入您的體重"
            outlined
          >
          </v-text-field>
        </v-form>
      </v-col>
      <v-col cols="12" sm="12">
        <v-form ref="form">
          <v-select
            v-model="form.exercise"
            :items="items2"
            type="text"
            required
            placeholder="請輸入您的運動頻率"
            outlined
          >
          </v-select>
        </v-form>
      </v-col>
      <v-col>
        <v-row align="center" justify="space-around">
          <v-btn @click="dd">計算</v-btn>
          <p>您的TDEE:{{ TDEE }}</p>
          <p>您的BMR:{{ BMR }}</p>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Metabolism } from '../../node_modules/tdee-calculator/src/index.js'

export default {
  data: () => ({
    BMR: '',
    form: {
      sex: '',
      age: 0,
      height: 0,
      weight: 0,
      exercise: ''
    },
    items: ['woman', 'man'],
    items2: [
      'Sedentary',
      'Light Exercise',
      'Moderate Exercise',
      'Heavy Exercise',
      'Athlete'
    ]
  }),
  // computed: {
  //   TD () {
  //     try {
  //       const woman = new Metabolism(
  //         'Harris–Benedict (1919)',
  //         'Imperial',
  //         this.form.exercise,
  //         this.form
  //         // { sex: 'woman', age: 20, height: 5.4, weight: 170.6 }
  //       )
  //       if (woman.TDEE()) {
  //         return woman.TDEE()
  //       } else {
  //         return 0
  //       }
  //     } catch (error) {
  //       return 0
  //     }
  //   }
  // },
  methods: {
    dd () {
      const woman = new Metabolism(
        'Harris–Benedict (1919)',
        'Imperial',
        this.form.exercise,
        this.form
        // { sex: 'woman', age: 20, height: 5.4, weight: 170.6 }
      )
      console.log(woman.BMR()) // Basal Metabolism Rate: 1616 calories per day
      console.log(woman.TDEE()) // Total Daily Energy Expenditure: 2222 calories per da
      this.TDEE = woman.TDEE()
      this.BMR = woman.BMR()
    }
  }
}
</script>
<style scoped>
.container {
  max-width: 1340px;
}
.count {
  height: 600px;
}
</style>
