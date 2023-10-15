<template>
  <main class="main-content mt-0">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg');
        background-position: top;
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Тавтай морилно уу!</h1>
            <p class="text-lead text-white">Хэрэглэгч нэмэх хуудас.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Бүртгүүлэх</h5>
            </div>
            <div class="card-body">
              <form role="form">
                <argon-input type="text" placeholder="Нэвтрэх нэр" v-model:value="username" @change="onNameChange"/>
                <argon-input type="text" placeholder="Имэйл" v-model:value="email" @change="onMailChange" />
                <argon-input type="password" placeholder="Нууц үг" v-model:value="password" @change="onPassChange"/>
                <select class="form-control" v-if="roles.length" v-model="role" @change="onRoleChange()">
                  <option v-for="item in roles" :key="item"> {{ item }}</option>
                </select>
                <div class="text-center">
                  <argon-button
                    fullWidth
                    color="dark"
                    variant="gradient"
                    class="my-4 mb-2"
                    @click.prevent="signUp()"
                    >Бүртгэх</argon-button
                  >
                </div>
                <p class="text-sm mt-3 mb-0">
                  Нэвтрэх хуудас руу буцах
                  <a href="javascript:;" class="text-dark font-weight-bolder"
                    >Нэвтрэх</a
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

<script>
import AppFooter from "@/examples/PageLayout/Footer.vue";
import ArgonInput from "@/components/ArgonInput.vue";
// import api from "../api/product"
// import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import axios from "axios";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signup",
  components: {
    AppFooter,
    ArgonInput,
    // ArgonCheckbox,
    ArgonButton,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  data() {
    return {
      username: "",
      password: "",
      email:"",
      role:"USER",
      roles: ["ADMIN", "USER"],
      isRegistered: false,
    };
  },
  methods: {
    onRoleChange(event) {
      this.role = event.target.value;
    },
    onNameChange(event) {
      this.username = event.target.value;
    },
    onPassChange(event) {
      this.password = event.target.value;
    },
    onMailChange(event) {
      this.email = event.target.value;
    },

    async signUp() {
      console.log(this.username);
      if (this.username && this.password && this.email) {
        try {
           const data = {username: this.username, password: this.password, role: this.role, email: this.email};
           await axios.post('https://rest.tsotan.mn/user/create', data);
          // await api.createUser({username: this.username, password: this.password, role: this.role, email: this.email});
          alert("Хэрэглэгч амжилттай үүсгэлээ.");
        } catch (error) {
          alert("Хэрэглэгч бүртгэхэд алдаа гарлаа.")
          console.log(error)
        }
      }
    },
  },
};
</script>
