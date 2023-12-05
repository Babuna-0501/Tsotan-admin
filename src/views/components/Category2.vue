<template>
  <div class="card h-100 mb-4 p-5 w-50 card_category2">
    <h2>Категори 1</h2>

    <div style="display: flex; align-items: center; gap: 55px; margin-bottom: 50px;">
      <label for="Category" style="font-size: 18px;">Үндсэн категори</label>
      <div style="margin-right: 10px;">
        <select class="form-control" v-model="selectedParentCategory" @change="onParentChange($event)">
          <option v-for="item in parentCategories" :key="item.name">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="selectedParentCategory">
      <div>
        <input class="ctg-input" type="text" v-model="add.name">
        <button class="btn-ctg" @click.prevent="addCategory()">Бүртгэх</button>
      </div>
    </div>

    <div v-if="categories.length">
      <ul style="display: flex; gap: 40px; flex-direction: column; margin-top: 50px;">
        <li style="gap: 30px; display: flex; flex-wrap: wrap;" v-for="cat in categories" :key="cat.id">
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
      categories: [],
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

    async fetchCategories(id) {
      const result = await api.getCategoriesByParent(id);
      this.categories = result.data;
      this.categories.forEach((category) => {
        category.editableName = category.name;
      });
    },

    onParentChange(event) {
      this.selectedParentCategory = event.target.value;

      const sub = this.parentCategories.find(c => c.name === this.selectedParentCategory);
      if (sub) this.add.parentId = sub.id;

      this.fetchCategories(sub.id);
    },

    async deleteCat(cat) {
      try {
        const response = await axios.delete("https://rest.tsotan.mn/category/delete/" + cat.id);
        if (response.data === true) {
          await this.fetchCategories(cat.parentId);
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
        await api.addCategory(categoryDTO);
        await this.fetchCategories(this.add.parentId);
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
.card_category2 {
  font-size: 20px;
}


.card_category2 ul li {
  display: inherit;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}

.card_category2 ul li span {
  display: flex;
  gap: 20px;
}

.card_category2 .edit-button {
  border: none;
  background-color: #3498db;
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
}

.card_category2 .delete-button {
  border: none;
  background-color: #db347a;
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
}

</style>