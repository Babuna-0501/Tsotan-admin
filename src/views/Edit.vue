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
            <h1 class="text-white mb-2 mt-5">Welcome!</h1>
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
              <h5>Бараа засах</h5>
            </div>
            <div class="row px-xl-5 px-sm-4 px-3"></div>
            <div class="card-body">
              <form role="form">
                <div class="row">
                  <div class="col-xl-6">
                    <label for="name">Нэр</label>
                    <argon-input
                        v-model:value="product.name"
                        type="text"
                        :placeholder=product.name
                        aria-label="Name"
                        @change="onNameChange"/>
                  </div>
                  <div class="col-xl-6">
                    <label for="price">Үнэ</label>
                    <argon-input
                        v-model:value="product.price"
                        type="number"
                        :placeholder=product.price
                        aria-label="number"
                        @change="onPriceChange"/>
                  </div>
                </div>
                <div class="form-group">
                  <label for="Category">Category</label>
                  <div class="col-md-12 d-flex flex-row" style="gap: 5px;">
                    <select class="form-control" v-model="selectedParentCategory"
                            @change="onSubChange">
                      <!--                    <option value="">{{parentCategories.name}}</option>-->
                      <option v-for="item in parentCategories" :key="item.name">
                        {{ item.name }}
                      </option>
                    </select>

                    <select class="form-control" v-if="subcategories.length" v-model="selectedSubcategory"
                            @change="onCatChange">
                      <!--                          :disabled="!selectedParentCategory">-->
                      <!--                    <option value="">&#45;&#45; Select a Subcategory &#45;&#45;</option>-->
                      <option v-for="item in subcategories" :key="item.name">
                        {{ item.name }}
                      </option>
                    </select>


                    <select class="form-control" v-if="categories.length" v-model="selectedCategory"
                            @change="onCategoryChange">
                      <!--                          :disabled="!selectedSubcategory">-->
                      <!--                    <option value="">&#45;&#45; Select a category &#45;&#45;</option>-->
                      <option v-for="item in categories" :key="item.name">
                        {{ item.name }}
                      </option>
                    </select>
                  </div>


                </div>
                <div class="col-xl-8 col-lg-6 col-md-7">
                  <label for="Desc">Description</label>
                  <ArgonTextArea style="margin-top: -20px;" type="text"
                                 v-model:value="product.description"
                                 :placeholder=product.description
                                 @change="onDescriptionChange"/>
                </div>
                <div class="additional row">
                  <div class="col-xl-6">
                    <label for="Нэмэлт мэдээлэл">Барааны жин</label>
                    <argon-input
                        v-model:value="product.weight"
                        :placeholder=product.weight
                        type="text"
                        aria-label="Weight"
                        @change="onWeightChange"/>
                  </div>
                  <div class="material col-xl-6">
                    <label for="Нэмэлт мэдээлэл">Материал</label>
                    <argon-input
                        :placeholder="product.material"
                        v-model:value="product.material"
                        type="text"
                        aria-label="Weight"
                        @change="onMaterialChange"/>
                  </div>
                  <div class="col-xl-6">
                    <label for="Нэмэлт мэдээлэл">Угаах заавар</label>
                    <argon-input
                        v-model:value="product.instruction"
                        type="text"
                        aria-label="instruction"
                        :placeholder=product.instruction
                        @change="onInstructionChange"/>
                  </div>
                  <div class="col-xl-6">
                    <label for="Нэмэлт мэдээлэл">Хэмжээ</label>
                    <argon-input
                        v-model:value="product.size"
                        type="text"
                        aria-label="size"
                        :placeholder=product.size
                        @change="onSizeChange"/>
                  </div>
                </div>
                <div class="row flex">
                  <label for="file">Зураг</label>
                  <div class="pic1">
                    <span>
                      <img :src="product.image[0]" style="width: 200px" alt="image1"/>
                    </span>
                    <span>
                      <img :src="product.image[1]" style="width: 200px" alt="image2"/>
                    </span>
                  </div>
              

                  <div class="col-xl-6">
                    <input id="image" type="file" ref="image" multiple @change="onImageChange1"/>
                  </div>


                  <div class="col-xl-6">
                    <input id="image" type="file" ref="image" multiple @change="onImageChange2"/>
                  </div>
                  <div class="pic1">
                    <span>
                      <img :src="product.image[2]" style="width: 200px" alt="image3"/>
                    </span>
                    <span>
                      <img :src="product.image[3]" style="width: 200px" alt="image4"/>
                    </span>
                  </div>
               

                  <div class="col-xl-6">
                    <input id="image" type="file" ref="image" multiple @change="onImageChange3"/>
                  </div>
                  <div class="col-xl-6">
                    <input id="image" type="file" ref="image" multiple @change="onImageChange4"/>
                  </div>
                </div>
                <div class="text-center" @click="goToDestinationPage">
                  <argon-button
                      @click.prevent="submitForm"
                      fullWidth
                      color="dark"
                      variant="gradient"
                      class="my-4 mb-2"
                  >Бараа засах
                  </argon-button>
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
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonTextArea from "@/components/ArgonTextarea.vue"

import api from "../../api/product"
import s3 from "@/assets/s3config";

const body = document.getElementsByTagName("body")[0];


export default {
  name: "Edit",
  components: {
    ArgonInput,
    ArgonButton,
    ArgonTextArea,
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
    this.fetchData();
  },
  data() {
    return {
      id: this.$route.params.id,
      parentCategories: [],
      selectedParentCategory: '',
      subcategories: [],
      selectedSubcategory: '',
      categories: [],
      selectedCategory: '',
      product: {
        categoryId: null,
        price: 0,
        name: '',
        // img1: '',
        // img2: '',
        // img3: '',
        // img4: '',
        image: [],
        description: '',
        instruction: '',
        size: '',
        weight: '',
        material: '',
        isSpecial: ''
      },
      isLoading: false,
      // isClickable: false
    };
  },
  computed: {
    // computedImage3() {
    //   return this.product.image[3];
    // }
    // eslint-disable-next-line vue/return-in-computed-property
    // isClickable() {
    //   return (this.product.name && this.product.image1 && this.product.price && this.product.categoryId)
    // }
  },

  methods: {

    async fetchData() {

      try {
        const response = await api.detail(this.id);
        this.product = response.data;
        console.log("product: " + response);
      } catch (error) {
        console.log(error);
      }

    },

    async fetchParent(id) {
      const result = await api.getCategoriesByParent(id);
      this.parentCategories = result.data;
      console.log(this.parentCategories);
    },
    onSubChange(event) {
      this.selectedParentCategory = event.target.value;
      this.subcategories = [];
      this.categories = [];
      this.selectedSubcategory = null;
      this.selectedCategory = null;
      const sub = this.parentCategories.find(c => c.name === this.selectedParentCategory);
      if (sub) this.product.categoryId = sub.id;
      this.updateSub(sub.id);
    },
    async updateSub(id) {
      console.log("cat id " + id);
      const result = await api.getCategoriesByParent(id);
      this.subcategories = result.data;
    },
    onCatChange(event) {
      this.selectedSubcategory = event.target.value;
      this.categories = [];
      this.selectedCategory = null;
      const sub = this.subcategories.find(c => c.name === this.selectedSubcategory);
      if (sub) this.product.categoryId = sub.id;
      this.updateCat(sub.id)
    },
    async updateCat(id) {
      console.log(this.selectedCategory)
      const result = await api.getCategoriesByParent(id);
      this.categories = result.data;
    },
    onCategoryChange(event) {
      this.selectedCategory = event.target.value;
      const sub = this.categories.find(c => c.name === this.selectedCategory);
      if (sub) this.product.categoryId = sub.id;
    },
    onImageChange1(event) {
      const file = event.target.files[0];
      const bucketName = 'tsotan';
      const fileName = this.uploadPhoto(file, bucketName);
      this.product.image[0] = "https://" + bucketName + ".s3.ap-southeast-1.amazonaws.com/" + fileName;
      console.log("img1 change: " + this.product.image[0])
    },
    onImageChange2(event) {
      const file = event.target.files[0];
      const bucketName = 'tsotan';
      const fileName = this.uploadPhoto(file, bucketName);
      this.product.image[1] = "https://" + bucketName + ".s3.ap-southeast-1.amazonaws.com/" + fileName;
      console.log("img2 change: " + this.product.image[1])
    },

    onImageChange3(event) {
      const file = event.target.files[0];
      const bucketName = 'tsotan';
      const fileName = this.uploadPhoto(file, bucketName);
      this.product.image[2] = "https://" + bucketName + ".s3.ap-southeast-1.amazonaws.com/" + fileName;
      console.log("img3 change: " + this.product.image[2])
    },

    onImageChange4(event) {
      const file = event.target.files[0];
      const bucketName = 'tsotan';
      const fileName = this.uploadPhoto(file, bucketName);
      this.product.image[3] = "https://" + bucketName + ".s3.ap-southeast-1.amazonaws.com/" + fileName;
      console.log("img4 change: " + this.product.image[3])
    },


    uploadPhoto(file, bucketName) {
      const fileName = Date.now().toString();
      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: file,
      };
      s3.putObject(params, (err, data) => {
        if (err) {
          console.error('Error uploading image:', err);
        } else {
          console.log('Image uploaded successfully:', data);
        }
      });
      return fileName;

    },



    onNameChange(event) {
      this.product.name = event.target.value;
    },
    onPriceChange(event) {
      this.product.price = event.target.value;
    },
    onDescriptionChange(event) {
      this.product.description = event.target.value;
      console.log(this.product.description);
    },
    onInstructionChange(event) {
      this.product.instruction = event.target.value;
    },
    onSizeChange(event) {
      this.product.size = event.target.value;
    },
    onWeightChange(event) {
      this.product.weight = event.target.value;
    },
    onMaterialChange(event) {
      this.product.material = event.target.value;
    },
    async submitForm() {

      const productDTO = {
        'img1': this.product.image[0],
        'img2': this.product.image[1],
        'img3': this.product.image[2],
        'img4': this.product.image[3],
        'name': this.product.name,
        'price': this.product.price,
        'categoryId': this.product.categoryId,
        'description': this.product.description,
        'instruction': this.product.instruction,
        'size': this.product.size,
        'weight': this.product.weight,
        'material': this.product.material,
        'isSpecial': this.product.isSpecial
      }

      try {
        await api.updateProduct(this.id, productDTO);
      } catch (error) {
        console.log(error)
      }
      // this.isLoading = false;
    },
    goToDestinationPage() {
      this.$router.push('/tables');
    }
  },


};


</script>

<style>

.pic1 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>