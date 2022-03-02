<template>
  <v-main>
    <div id="section01">
      <div class="content1">
        <video
          class="dd"
          src="../assets/pexels-tima-miroshnichenko-6388436.mp4"
          autoplay="autoplay"
          muted="muted"
          loop="loop"
        ></video>
      </div>
      <div class="worktext">
        <h1>Sow nothing reap nothing</h1>
      </div>
    </div>
    <div id="section02">
      <v-row>
        <v-hover v-slot="{ hover }">
          <v-col cols="6" sm="4">
            <v-img
              src="https://go180.nl/app/uploads/2021/05/GO180-Groningen_36.jpg"
              gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              width="500px"
              heigh="300px"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="
                    d-flex
                    transition-fast-in-fast-out
                    orange
                    darken-2
                    v-card--reveal
                    text-h2
                    white--text
                  "
                  style="height: 100%"
                >
                  $14.99
                </div>
              </v-expand-transition>
            </v-img>
          </v-col>
        </v-hover>

        <v-col cols="6" sm="4" class="img1">
          <v-img
            class="animate__animated animate__bounce animate__delay-1s"
            src="https://images.unsplash.com/photo-1598136490941-30d885318abd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHdvcmtvdXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            width="300px"
          >
            <div class="fill-height bottom-gradient"></div>
          </v-img>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="text">
            <p>
              Our goal is to make health and fitness attainable, affordable and
              approachable.
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
    <div id="section04">
      <v-row align-content="center" justify="center" class="mb-10">
        <p class="abouttext">About us</p>
      </v-row>
      <v-row>
        <v-col>
          <v-parallax
            dark
            src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
          >
            <v-row align="center" justify="center">
              <v-col class="text-center" cols="12">
                <h1 class="text-h4 font-weight-thin mb-4">
                  ABOUT FITNESS BLENDER
                </h1>
                <h4 class="subheading">Build your application today!</h4>
              </v-col>
            </v-row>
          </v-parallax>
        </v-col>
      </v-row>
    </div>
    <section id="section03">
      <v-container>
        <div class="form row">
          <div class="col-6 dddd">
            <h1>CONTACT US</h1>
            <p>Address：台北市大同區塔城街39號4樓</p>
            <p>TEL：02-25589193</p>
            <p>FAX: 02-2558955</p>
          </div>
          <div class="col-6">
            <v-form class="text text--lighten">
              <v-text-field
                color="white"
                dark
                :counter="10"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                color="white"
                dark
                label="E-mail"
                required
              ></v-text-field>
              <v-container fluid>
                <v-textarea
                  dark
                  shaped
                  filled
                  autocomplete="email"
                  label="建議"
                  color="white"
                ></v-textarea>
              </v-container>
            </v-form>
          </div>
        </div>
      </v-container>
    </section>

    <router-view />
  </v-main>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lobster&family=Pacifico&display=swap');
#section01 {
  position: relative;
  height: 60vh;
}
.dddd {
  text-align: left;
  padding-left: 10%;
}

.container {
  margin-top: 50px;
}
.dd {
  position: absolute;
  left: 0;
  top: -80px;
  width: 100%;
  height: 110%;
  object-fit: cover;
}

#section02 {
  margin: auto;
  color: white;
  margin-top: 20px;
  width: 80%;
  height: 500px;
  font-family: 'Lobster', cursive;
  font-size: 2rem;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

.img1 {
  text-align: center;
  padding-left: 100px;
}

.v-main {
  background-color: #0d1e25;
}

.worktext {
  font-size: 2.5rem;
  width: 100%;
  position: absolute;
  text-align: center;
  left: 0;
  color: white;
}

#section03 {
  text-align: center;
  color: white;
}

.text-white {
  color: white !important;
}

.text-green {
  color: white !important;
}

.container2 {
  width: 80%;
  min-width: 450px;
  margin: 0 auto;
}

.abouttext {
  font-size: 5rem;
  color: white;
}
#section04 {
  margin-bottom: 200px;
}
</style>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
  })
}
</script>
