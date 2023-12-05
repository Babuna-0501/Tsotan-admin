<template>
  <div class="card h-100 mb-4 p-5 w-50 card_category3">
    <h2>Категори 1</h2>

    <div style="display: flex; align-items: center; justify-content: space-between; gap: 50px; margin-bottom: 50px;">
      <label for="Category" style="font-size: 18px;">Үндсэн категори</label>
      <div style="margin-right: 10px;">
        <select class="form-control" v-model="selectedParentCategory" @change="onParentChange($event)">
          <option v-for="item in parentCategories" :key="item.name">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="selectedParentCategory" style="display: flex; justify-content: space-between; align-items: center; gap: 50px; margin-bottom: 50px;">
      <label for="Category" style="font-size: 18px;">Дэд категори</label>
      <div style="margin-right: 10px;">
        <select class="form-control" v-model="selectedCategory1" @change="onCatChange($event)">
          <option v-for="item in categories1" :key="item.name">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="selectedCategory1">
      <div class="register">
        <input class="ctg-input" type="text" v-model="add.name">
        <button class="btn-ctg" @click.prevent="addCategory()">Бүртгэх</button>
      </div>
    </div>

    <div v-if="categories2.length">
      <ul style="display: flex; gap: 40px; flex-direction: column; margin-top: 50px;">
        <li style="gap: 30px; display: flex; flex-wrap: wrap;" v-for="cat in categories2" :key="cat.id">
          <span v-if="!cat.isEditable">{{ cat.name }}</span>
          <input v-else v-model="cat.editableName"/>
          <span>
            <button class="edit-button" @click="toggleEdit(cat)">{{ cat.isEditable ? 'Хадгалах' : 'Нэр солих' }}</button>
            <button class="delete-button" @click="deleteCat(cat)">Устгах</button>
          </span>
        </li>
      </ul>
    </div>



  </div>
</template>

<script>
import axios from "axios";
import api from "../../../api/product";

export default {
  name: "category2",
  components: {},
  mounted() {
    this.fetch(0);
  },
  data() {
    return {
      parentCategories: [],
      selectedParentCategory: '',
      categories1: [],
      selectedCategory1: '',
      categories2: '',
      add: {
        parentId: 0,
        name: ''
      },
    };
  },
  methods: {
    async fetch(id) {
      const result = await api.getCategoriesByParent(id);
      this.parentCategories = result.data;
    },

    async fetchCategories1(id) {
      const result = await api.getCategoriesByParent(id);
      this.categories1 = result.data;
    },

    async fetchCategories2(id) {
      const result = await api.getCategoriesByParent(id);
      this.categories2 = result.data;
      this.categories2.forEach((category) => {
        category.editableName = category.name;
      });
    },


    onParentChange(event) {
      this.selectedParentCategory = event.target.value;

      const sub = this.parentCategories.find(c => c.name === this.selectedParentCategory);

      this.fetchCategories1(sub.id);
    },

    onCatChange(event) {
      this.selectedCategory1 = event.target.value;

      const sub = this.categories1.find(c => c.name === this.selectedCategory1);
      if (sub) this.add.parentId = sub.id;

      this.fetchCategories2(sub.id);
    },

    async deleteCat(cat) {
      try {
        const response = await axios.delete("https://rest.tsotan.mn/category/delete/" + cat.id);
        if (response.data === true) {
          await this.fetchCategories2(cat.parentId);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addCategory() {
      const categoryDTO = {
        'name': this.add.name,
        'parentId': this.add.parentId,
      }

      try {
        this.isLoading = true;
        console.log(categoryDTO.name, categoryDTO.parentId);
        if (categoryDTO.parentId) await api.addCategory(categoryDTO);
        await this.fetchCategories2(this.add.parentId);
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false;
      this.add.name = '';
    },

    toggleEdit(cat) {
      if (cat.isEditable) {
        cat.name = cat.editableName;
        cat.isEditable = false;
      } else {
        cat.isEditable = true;
      }
    },

  },
};
</script>


<style>
.card_category3 {
  font-size: 20px;
}


.card_category3 ul li {
  display: inherit;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}

.card_category3 ul li span {
  display: flex;
  gap: 20px;
}

.card_category3 .edit-button {
  border: none;
  background-color: #3498db;
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
}

.card_category3 .delete-button {
  border: none;
  background-color: #db347a;
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
}

.form-control {
  width: 150px !important;
  font-size: 17px !important;
}

.register {
  display: flex;
  justify-content: space-between;
}

.register .btn-ctg {
  width: 150px;
  margin-left: 0;
}
</style>