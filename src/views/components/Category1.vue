<template>
  <div class="card h-100 mb-4 p-5 w-50 card_wrapper">
    <h2>Үндсэн категори</h2>
    <div>
      <input class="ctg-input" type="text" v-model="add.name">
      <button class="btn-ctg" @click.prevent="addCategory()">Бүртгэх</button>
    </div>

    <ul style="display: flex; gap: 40px; flex-direction: column; margin-top: 50px;">
      <li style="gap: 30px; display: flex; flex-wrap: wrap;" v-for="cat in categories" :key="cat.id">
        <span v-if="!cat.isEditable">{{ cat.name }}</span>
        <input v-else v-model="cat.editableName" />
        <span>
          <button class="edit-button" @click="toggleEdit(cat)">{{ cat.isEditable ? 'Хадгалах' : 'Нэр солих' }}</button>
          <button class="delete-button" @click="deleteCat(cat)">Устгах</button>
        </span>
      </li>
    </ul>

  </div>
</template>

<script>
import axios from "axios";
import api from "../../../api/product";

export default {
  name: "category1",
  components: {},
  mounted() {
    this.fetch(0);
  },
  data() {
    return {
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
      this.categories = result.data;
      this.categories.forEach((category) => {
        category.isEditable = false;
        category.editableName = category.name;
      });
    },
    async addCategory() {
      if (this.add.name) {
        const categoryDTO = {
          'name': this.add.name,
          'parentId': this.add.parentId,
        }
        try {
          this.isLoading = true;
          await api.addCategory(categoryDTO);
          await this.fetch(this.add.parentId);
        } catch (error) {
          console.log(error)
        }
        this.isLoading = false;
        this.add.name = '';
      }
    },
    async deleteCat(cat) {
      try {
        const response = await axios.delete("https://rest.tsotan.mn/category/delete/" + cat.id);
        if (response.data === true) {
          await this.fetch(0);
        }
      } catch (error) {
        console.log(error);
      }
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

.card_wrapper {
  width: 100%;
  min-width: 550px;
  height: auto;
}

.card_wrapper ul li {
  display: inherit;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}

.card_wrapper ul li span {
  display: flex;
  gap: 20px;
}

.card_wrapper .edit-button {
  border: none;
  background-color: #3498db;
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
}

.card_wrapper .delete-button {
  border: none;
  background-color: #db347a;
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
}


</style>