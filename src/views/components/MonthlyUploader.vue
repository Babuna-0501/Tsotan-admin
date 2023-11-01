<template>
    <div class="monthly-upload">
      <input type="file" @change="uploadFile" accept="image/*" />
      <button @click="clearFile">Устгах</button>
      <a :href="fileUrl" target="_blank" v-if="fileUrl">Харах</a>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fileUrl: null,
        file: null,
      };
    },
    methods: {
      uploadFile(event) {
        const file = event.target.files[0];
        if (file) {
          this.file = file;
          this.fileUrl = URL.createObjectURL(file);
  
        }
      },
      clearFile() {
        this.fileUrl = null;
        this.file = null;
      },
    },
  };
  </script>
  
  <style>
.monthly-upload {
  text-align: center;
  margin: 20px;
  display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
}

.monthly-upload label.upload-button {
  background-color: #007BFF;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.monthly-upload label.upload-button:hover {
  background-color: #0056b3;
}

.monthly-upload a {
  width: 150px;
  display: block;
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  text-decoration: none;
  text-align: center;
}

.monthly-upload a:hover {
  background-color: #1e7e34;
}

.monthly-upload button {
  width: 150px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
}

.monthly-upload button.clear-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;

}

.monthly-upload button.clear-button:hover {
  background-color: #a61c29;
}
</style>