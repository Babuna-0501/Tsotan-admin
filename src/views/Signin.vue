<template>
  <div class="container top-0 position-sticky z-index-sticky"></div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Нэвтрэх</h4>
                  <!-- <p class="mb-0">Enter your email and password to sign in</p> -->
                </div>
                <div class="card-body">
                  <form role="form">
                    <div class="mb-3">
                      <argon-input
                        v-model:value="username"
                        type="text"
                        placeholder="Нэр"
                        name="email"
                        size="lg"
                        @change="onName"
                      />
                    </div>
                    <div class="mb-3">
                      <argon-input
                        v-model:value="password"
                        type="password"
                        placeholder="Нууц үг"
                        name="password"
                        size="lg"
                        @change="onPassword"
                      />
                    </div>
                    <!-- <argon-switch id="rememberMe">Remember me</argon-switch> -->

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        @click.prevent="login"
                        >Нэвтрэх</argon-button
                      >
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
                  background-size: cover;
                "
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  "Тавтай морилно уу"
                </h4>
                <p class="text-white position-relative">
                  Цотан дэлгүүрийн удирдлагын дэлгэц.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

// import { mapActions } from "vuex";
import axios from "axios";
// import api from "@/assets/api/product";
// import axios from "axios";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    ArgonInput,
    ArgonButton,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },

  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  mounted() {},
  methods: {
    onName(event) {
      this.username = event.target.value;
    },
    onPassword(event) {
      this.password = event.target.value;
    },
    async login() {
      console.log("login is called")
      this.loading = true;

      const data = {username: this.username, password: this.password};

      try {
        const res = await axios.post("https://rest.tsotan.mn/auth/public/login", data);

        const token = res.data;

        localStorage.setItem('jwtToken', token);

        if (res.status === 200) {
          await this.$router.push("/dashboard-default");
        } else {
          console.error("Login failed");
        }
        this.loading = false;
      } catch (e) {
        console.error(e);
        this.loading = false;
      }

    },
  }
};
</script>
