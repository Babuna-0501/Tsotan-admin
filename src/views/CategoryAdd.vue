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
            <h1 class="text-white mb-2 mt-5">Тавтай морил!</h1>
            <p class="text-lead text-white">Tsotan</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-8 col-lg-6 col-md-7 mx-auto" style="margin-bottom: 100px;">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5> Категори бүртгэх</h5>
            </div>
            <div class="row px-xl-5 px-sm-4 px-3"></div>
            <div class="card-body">
              <form role="form">
                <div class="form-group">


                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 50px;">
                      <label for="Category">Үндсэн категори</label>
                      <div style="margin-right: 10px;">
                        <select class="form-control" v-model="selectedParentCategory"  @change="onSubChange">
                          <option v-for="item in parentCategories" :key="item.name">
                            {{ item.name }}
                          </option>
                        </select>
                      </div>

                      <div  v-if="!selectedParentCategory">
                        <input class="ctg-input" type="text" v-model="add.name">
                        <button class="btn-ctg" @click.prevent="addCategory()">Хадгалах</button>
                      </div>

                    </div>

                    <div  style="display: flex; align-items: center; gap: 10px; margin-bottom: 50px;">
                      <label for="Category">Дэд категори 1 </label>
                      <div v-if="subcategories.length" style="margin-right: 10px;">
                        <select class="form-control" v-model="selectedSubcategory" @change="onCatChange">
                          <option v-for="item in subcategories" :key="item.name">
                            {{ item.name }}
                          </option>
                        </select>
                      </div>

                      <div v-if="selectedParentCategory && !selectedSubcategory">
                        <input class="ctg-input" type="text" v-model="add.name">
                        <button class="btn-ctg" @click.prevent="addCategory()">Хадгалах</button>
                      </div>
                    </div>


                    <div  style="display: flex; align-items: center; gap: 10px;">
                      <label for="Category">Дэд категори 2 </label>


<!--                      <div v-if="categories.length" style="margin-right: 10px;">-->
<!--                        <select class="form-control" v-model="selectedCategory" @change="onCategoryChange">-->
<!--                          <option v-for="item in categories" :key="item.name">-->
<!--                            {{ item.name }}-->
<!--                          </option>-->
<!--                        </select>-->
<!--                      </div>-->


                      <div v-if="selectedSubcategory && !selectedCategory">
                        <input class="ctg-input" type="text" v-model="add.name">
                        <button class="btn-ctg" @clickв.prevent="addCategory()">Хадгалах</button>
                      </div>

                    </div>



                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>


import api from "../../api/product"
// import ArgonInput from "@/components/ArgonInput.vue";

const body = document.getElementsByTagName("body")[0];


export default {
  name: "categoryAdd",
  components: {
    // ArgonInput
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
  mounted() {
    // this.categories = categoryList.categories;
    this.fetchParent(0);
  },
  data() {
    return {
      parentCategories: [],
      selectedParentCategory: '',
      subcategories: [],
      selectedSubcategory: '',
      categories: [],
      selectedCategory: '',
      add: {
        parentId: 0,
        name: ''
      },
      showInputField: false,
    };
  },
  methods: {

    getImg(imgUrl) {
      console.log("getImg: " + imgUrl);
      return imgUrl;
    },
    async fetchParent(id) {
      const result = await api.getCategoriesByParent(id);
      this.parentCategories = result.data;
    },
    onSubChange(event) {
      this.selectedParentCategory = event.target.value;
      this.subcategories = [];
      this.categories = [];
      this.selectedSubcategory = null;
      this.selectedCategory = null;
      const sub = this.parentCategories.find(c => c.name === this.selectedParentCategory);
      if (sub) this.add.parentId = sub.id;
      this.updateSub(sub.id);
    },
    async updateSub(id) {
      const result = await api.getCategoriesByParent(id);
      this.subcategories = result.data;
    },
    onCatChange(event) {
      this.selectedSubcategory = event.target.value;
      this.categories = [];
      this.selectedCategory = null;
      const sub = this.subcategories.find(c => c.name === this.selectedSubcategory);
      if (sub) this.add.parentId = sub.id;
      this.updateCat(sub.id)
    },
    async updateCat(id) {
      const result = await api.getCategoriesByParent(id);
      this.categories = result.data;
    },
    onCategoryChange(event) {
      this.selectedCategory = event.target.value;
      const sub = this.categories.find(c => c.name === this.selectedCategory);
      if (sub) this.add.parentId = sub.id;
    },

    async addCategory() {
     
      const categoryDTO = {
        'name': this.add.name,
        'parentId': this.add.parentId,
      }

      try {
        this.isLoading = true;
        console.log(categoryDTO.name, categoryDTO.parentId);
        await api.addCategory(categoryDTO);
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false;
      this.showInputField = false;
      window.alert(`Adding category: ${this.add.name}`);
    },

  },


};


</script>

<style>
.btn-ctg {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  margin-left: 10px;
}

.btn-ctg {
  background-color: #3498db;
  color: #ffffff;
}

.ctg-input {
    width: 50%;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.4rem;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d2d6da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.5rem;
    transition: box-shadow 0.15s ease, border-color 0.15s ease;
}

</style>