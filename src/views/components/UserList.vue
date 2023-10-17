<template>
    <div class="card h-100 mb-4 p-5 w-50">
      <h2>Админы жагсаалт</h2>
      <ul style="display: flex; gap: 40px; flex-direction: column; margin-top: 50px;">
        <li style="gap: 30px; display: flex; flex-wrap: wrap;" v-for="user in users" :key="user.id">
          {{ user.name }}
          <button class="delete-button" @click="deleteUser(user.id)">Устгах</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
          { id: 3, name: 'User 3' },
        ],
      };
    },
    methods: {
      deleteUser(userId) {
        const index = this.users.findIndex(user => user.id === userId);
  
        if (index !== -1) {
          this.users.splice(index, 1);
        }
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
  font-size: 11px;
}


.delete-button:hover {
  background-color: #cc0000; 
}
</style>