<template>
  <div class="row">
    <div class="col-xl-6 videoWrapper">
        <iframe
          width="560"
          height="315"
          :src="banner.url"
          frameborder="0"
          allowfullscreen
        ></iframe>
      <button @click="updateVideo = true" v-if="!updateVideo && !videoUrl">Update</button>
      <input v-if="updateVideo" class="ctg-input" type="text" v-model="videoUrl">
      <button v-if="videoUrl" @click="updateBanner">Save</button>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      banner: '',
      videoUrl: null,
      updateVideo: false
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const result = await axios.get('https://rest.tsotan.mn/banner/list', {
          params: {type: 'video'}
        });
        this.banner = result.data[0] || {url: null};
        console.log(this.banner.url);
      } catch (error) {
        console.error(error);
      }
    },

    async updateBanner() {
      try {
        const id = this.banner.id;
        console.log(id);
        const updateDTO = {
          type: 'video',
          url: this.videoUrl,
        };
        const result = await axios.post(`https://rest.tsotan.mn/banner/update/${id}`, updateDTO);
        this.banner = result.data;
        this.videoUrl = null;
        this.updateVideo = false;
      } catch (error) {
        console.error(error);
      }
    },
    handleVideoError() {
      console.error('video:', this.banner.url);
    },
  },
};
</script>

<style>
.videoWrapper {
  display: flex;
  flex-direction: column;
  padding: 50px !important;
  gap: 20px
}

.videoWrapper button{
  background-color: #8093eb; 
  color: #fff; 
  padding: 5px; 
  border: none; 
  cursor: pointer; 
  border-radius: 5px;
  font-size: 13px;
  width: 80px;
}
</style>
