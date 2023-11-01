<template>
  <div class="image-uploader"> 
    <input type="file" @change="uploadImage" accept="image/*" />
    <label class="upload-button" style="width: 150px;" @click="triggerFileInput">Upload</label>
    <button @click="clearImage">Арилгах</button>
    <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" />
  </div>
</template>

  
  <script>
  export default {
    data() {
      return {
        imageUrl: null,
        file: null,
      };
    },
    methods: {
      uploadImage(event) {
        const file = event.target.files[0];
        if (file) {
          this.file = file;
          this.imageUrl = URL.createObjectURL(file);
        }
      },
      clearImage() {
        this.imageUrl = null;
        this.file = null;
      },
    },
  };
  </script>

<style>
.image-uploader {
  text-align: center;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
}


.image-uploader label {
  background-color: #007BFF;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.image-uploader label:hover {
  background-color: #0056b3;
}

.image-uploader img {
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
}

.image-uploader button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
  width: 150px;
}

.image-uploader button:hover {
  background-color: #a61c29;
}
</style>
  