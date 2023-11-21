<template>
    <div class="card h-100 mb-4 p-5 w-50">
      <h2>Хэрэглэгчдийн жагсаалт</h2>
      <ul style="display: flex; gap: 40px; flex-direction: column; margin-top: 50px;">
        <li style="gap: 30px; display: flex; flex-wrap: wrap;" v-for="user in users" :key="user.id">
          {{ user.username}}
          <button class="delete-button" @click="confirmDelete(user.id)">Устгах</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
   import axios from 'axios';
  export default {
    data() {
      return {
        users: [],
      };
    },
    mounted() {
    this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
      try {
        const response = await axios.get('https://rest.tsotan.mn/user/list');
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    confirmDelete(userId) {
      const confirmMessage = `Та ${userId} хэрэглэгчийг устгах уу?`;

      if (window.confirm(confirmMessage)) {
        this.deleteUser(userId);
      } else {
        console.log('Delete action canceled');
      }
    },
    deleteUser(userId) {
      console.log(`Deleting user with ID ${userId}`);
    },
    },
  };
  </script>
<style scoped>

.delete-button {
  background-color: #ff0000; 
  color: #fff; 
  padding: 5px; 
  border: none; 
  cursor: pointer; 
  border-radius: 5px;
  font-size: 13px;
  width: 80px;
}


.delete-button:hover {
  background-color: #cc0000; 
}
.delete-button {
  float: right;
}

.card ul li {
  gap: 30px;
    display: flex;
    /* flex-wrap: wrap; */
    justify-content: space-between;
    width: 200px;
    font-size: 18px;
}
</style>