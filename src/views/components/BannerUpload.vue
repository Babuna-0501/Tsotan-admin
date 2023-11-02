<template>
    <div class="banner-list">
      <h2>Banner List</h2>
      <div class="image-list">
        <div v-for="(banner, index) in bannerImages" :key="index" class="image-item">
          <img :src="banner.url" alt="Banner" />
        </div>
      </div>
      <input type="file" ref="fileInput" @change="uploadBanner" accept="image/*" style="display: none" />
      <button @click="openFileInput">Upload</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bannerImages: [
          
        ],
      };
    },
    methods: {
      openFileInput() {
        this.$refs.fileInput.click();
      },
      uploadBanner(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.bannerImages.push({ url: e.target.result });
          };
          reader.readAsDataURL(file);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .banner-list {
    text-align: center;
  }
  
  .image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  
  .image-item {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
  }
  
  .image-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
  