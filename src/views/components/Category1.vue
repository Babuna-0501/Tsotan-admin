<template>
  <div class="card h-100 mb-4 p-5 w-50">
    <h2>Категори 1</h2>
    <ul style="display: flex; gap: 40px; flex-direction: column; margin-top: 50px;">
      <li style="gap: 30px; display: flex; flex-wrap: wrap;" v-for="cat in categories" :key="cat.id">
        <span v-if="!cat.isEditable">{{ cat.name }}</span>
        <input v-else v-model="cat.editableName" />

        <button class="edit-button" @click="toggleEdit(cat)">{{ cat.isEditable ? 'Хадгалах' : 'Нэр солих' }}</button>
        <button class="delete-button" @click="deleteCat(cat)">Устгах</button>
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
