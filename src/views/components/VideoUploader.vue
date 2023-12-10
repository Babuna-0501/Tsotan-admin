<template>
  <div class="row">
    <div class="col-xl-6">

      <video width="320" height="240">
        <source :src="banner.url" type="video/mp4">
      </video>
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
  },
};
</script>

<style>
</style>
