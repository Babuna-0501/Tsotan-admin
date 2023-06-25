<template>
  <div class="card col-10 px-4">
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <!--                    <div class="form-group">-->
          <!--                    <select v-model="selectedCategory" class="my-2 text-sm font-weight-bold mb-0" @change="onCategoryChange">-->
          <!--                        <option value="">All Categories</option>-->
          <!--                        <option v-for="category in categories" :key="category.name">{{ category.name }}</option>-->
          <!--                    </select>-->
          <!--                    <select v-model="selectedSubCategory" class="my-2 text-sm font-weight-bold mb-0" @change="updateSub" :disabled="!selectedCategory">-->
          <!--                        <option value=""></option>-->
          <!--                        <option v-for="subcategory in subCategories" :key="subcategory.name">-->
          <!--                            {{ subcategory.name }}-->
          <!--                        </option>-->
          <!--                    </select>-->
          <!--                    </div>-->
          <div class="form-group">


<!--            <select class="my-2 text-sm font-weight-bold mb-0" v-model="selectedCategory"-->
<!--                    @change="onCategoryChange">-->
<!--              <option value="">&#45;&#45; Select a Category &#45;&#45;</option>-->
<!--              <option v-for="category in categories" :key="category.name">{{-->
<!--                  category.name-->
<!--                }}-->
<!--              </option>-->
<!--            </select>-->

<!--            <select class="my-2 text-sm font-weight-bold mb-0" v-model="selectedSubcategory" @change="updateSub"-->
<!--                    :disabled="!selectedCategory">-->
<!--              <option value="">&#45;&#45; Select a Subcategory &#45;&#45;</option>-->
<!--              <option v-for="subcategory in subCategories" :key="subcategory.name">-->
<!--                {{ subcategory.name }}-->
<!--              </option>-->
<!--            </select>-->



            <label for="Category">Category</label>
            <select class="form-control" v-model="selectedParentCategory"
                    @change="onSubChange">
              <!--                    <option value="">{{parentCategories.name}}</option>-->
              <option v-for="item in parentCategories" :key="item.name">
                {{ item.name }}
              </option>
            </select>

            <select class="form-control mt-4" v-if="subcategories.length" v-model="selectedSubcategory"
                    @change="onCatChange">
              <!--                          :disabled="!selectedParentCategory">-->
              <!--                    <option value="">&#45;&#45; Select a Subcategory &#45;&#45;</option>-->
              <option v-for="item in subcategories" :key="item.name">
                {{ item.name }}
              </option>
            </select>


            <select class="form-control mt-4" v-if="categories.length" v-model="selectedCategory" @change="onCategoryChange">
              <!--                          :disabled="!selectedSubcategory">-->
              <!--                    <option value="">&#45;&#45; Select a category &#45;&#45;</option>-->
              <option v-for="item in categories" :key="item.name">
                {{ item.name }}
              </option>
            </select>




          </div>
          <thead>
          <tr>
            <th></th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            ></th>
            <th class="text-secondary opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <li v-for="product in products" :key="product.id" class="d-flex list"
                style="align-items: center; gap: 1vw;">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img :src="getImg(product.img1)" style="width: 70%;"/>
                  </div>
                </div>

              </td>
              <td class="font-weight-bold mb-0 price">
                {{ product.name }}
              </td>
              <td class="align-middle text-center price">
                {{ product.price }} ₮
              </td>

              <td class="align-middle text-center text-sm">
                {{ product.category }} 
              </td>
              <td class="align-middle edit_prod">
                <a
                    :href=getEditUrl(product.id)
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                ><button class="edit_btn">Edit</button></a>
              </td>
              <td class="align-middle delete_prod">
                <button class="dlt_btn" @click="deleteProduct(product.id) ">Delete</button>
              </td>
            </li>
          </tr>
          </tbody>
          <div v-if="loading">Loading...</div>
          <ul v-else>

          </ul>
        </table>
      </div>
    </div>
  </div>

</template>

<script>

import api from "../../../../api/product";

export default {
  data() {
    return {
      products: [],
      parentCategories: [],
      selectedParentCategory: '',
      subcategories: [],
      selectedSubcategory: '',
      categories: [],
      selectedCategory: '',
      loading: true,
      categoryId: 0
    }
  },
  mounted() {
    this.fetchParent(0);
    this.fetchData();
  },
  methods: {

    async fetchParent(id) {
      const result = await api.getCategoriesByParent(id);
      this.parentCategories = result.data;
    },
    onSubChange(event) {
      this.selectedParentCategory = event.target.value;
      this.subcategories = [];
      this.categories = [];
      const sub = this.parentCategories.find(c => c.name === this.selectedParentCategory);
      if (sub) this.categoryId = sub.id;
      this.fetchData();
      this.updateSub(sub.id);
    },
    async updateSub(id) {
      const result = await api.getCategoriesByParent(id);
      this.subcategories = result.data;
    },
    onCatChange(event) {
      this.selectedSubcategory = event.target.value;
      this.categories = [];
      const sub = this.subcategories.find(c => c.name === this.selectedSubcategory);
      if (sub) this.categoryId = sub.id;
      this.fetchData();
      this.updateCat(sub.id)
    },
    async updateCat(id) {
      const result = await api.getCategoriesByParent(id);
      this.categories = result.data;
    },
    onCategoryChange(event) {
      this.selectedCategory = event.target.value;
      const sub = this.categories.find(c => c.name === this.selectedCategory);
      if (sub) this.categoryId = sub.id;
      this.fetchData();
    },


    async fetchData() {
      try {
        this.loading = true;
        const response = await api.getProductList(this.categoryId);
        this.products = response.data;
      } catch (error) {
        console.log(error)
      }
      this.loading = false;

    },

    async deleteProduct(id) {
      try {
        await api.deleteProduct(id);
        await this.fetchData();
      } catch (error) {
        console.log(error)
      }
    },

    getImg(imgUrl) {
      console.log(imgUrl)
      return imgUrl;
    },
    getEditUrl(id) {
      return "../edit/" + id;
    },
  }
}
</script>
  
<style>
.table-responsive {
  overflow-y: auto !important;
  overflow-x: hidden !important;
}
.list {
  height: 120px;
}
.list .price {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
}
.list td {
  width: 9vw;
  white-space: break-spaces !important;
}
.list .edit_prod {
  width:11vw;
  justify-content: center;
  display: flex;
}

.list .edit_btn {
  display: inline-block;
  background-color: #4CAF50; /* Green background */
  border: none;
  color: white;
  text-align: center;
  font-size: 16px;
  padding: 10px 24px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.list .dlt_btn {
  display: inline-block;
  background-color: #5342a1; /* Green background */
  border: none;
  color: white;
  text-align: center;
  font-size: 16px;
  padding: 10px 24px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}
</style>