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
                        v-model:value="email"
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
                        @click="login"
                        >Нэвтрэх</argon-button
                      >
                    </div>
                  </form>
                </div>
                <!-- <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="javascript:;"
                      class="text-success text-gradient font-weight-bold"
                    >Sign up</a>
                  </p>
                </div> -->
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

import { mapActions } from "vuex";
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
      email: "",
      password: "",
      loading: false,
    };
  },
  mounted() {},
  methods: {
    onName(event) {
      this.email = event.target.value;
    },
    onPassword(event) {
      this.password = event.target.value;
    },
    ...mapActions("auth", ["login"]),
    async login() {
      await this.login({ email: this.email, password: this.password });
    },
    // async login() {
    //   this.loading = true;

    //   // const headers = { 'Authorization': 'Bearer <token>', 'Content-Type': 'application/json' };
    //   // const headers = { 'Content-Type': 'application/json' };

    //   // const data = { userName: this.username, password: this.password };

    //   // try {
    //   //    const res = await api.login(data);
    //   //    console.log("res: " + res.data);
    //   //    this.loading=false
    //   // } catch (e) {
    //   //     console.error(e);
    //   //     this.loading=false
    //   // }

    //   // axios
    //   //   .post(`https://api.tsotan.mn/user/login`, data)
    //   //   .then((response) => {
    //   //     console.log("response: " + response.data);

    //   //     if (response.data === true) {
    //   //       this.$router.push("/dashboard-default");
    //   //     }

    //   //     this.loading = false;
    //   //   })
    //   //   .catch((error) => {
    //   //     console.log(error);
    //   //     this.loading = false;
    //   //   });
    // },
    // login() {
    //   if (this.username === "admin" && this.password === "TsotanUser2023") {
    //     localStorage.setItem(
    //       "user",
    //       JSON.stringify({ username: this.username })
    //     );
    //     this.$router.push("/dashboard-default");
    //   } else {
    //     alert("Админы нэр, нууц үг буруу байна");
    //   }
    // },
  },
};
</script>
