<template>
  <div class="row imageWrapper">
    <div class="col-xl-6 imgC">
      <img v-if="!updateImage" :src="imageUrl || banner.url" alt="" class="shadow-sm w-100 border-radius-lg" />
      <img v-if="updateImage" :src="imageUrl" alt="" class="shadow-sm w-100 border-radius-lg" />
      <button @click="updateImage = true" v-if="!updateImage && !imageUrl">Update</button>
      <input v-if="updateImage" id="image" type="file" ref="image" @change="onImageChange($event)" />
      <button v-if="imageUrl" @click="updateBanner">Save</button>
    </div>
  </div>
</template>

<script>
import s3 from "@/assets/s3config";
import axios from "axios";

export default {
  data() {
    return {
      banner: '',
      imageUrl: null,
      file: null,
      bucketName: 'tsotanmn',
      updateImage: false
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const result = await axios.get('https://rest.tsotan.mn/banner/list', {
          params: { type: 'monthly' }
        });
        this.banner = result.data[0] || { url: null };
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    },

    async uploadPhoto(file, bucketName) {
      const fileName = Date.now().toString();
      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: file,
      };
      return new Promise((resolve, reject) => {
        s3.putObject(params, (err, data) => {
          if (err) {
            console.error('Error uploading image:', err);
            reject(err);
          } else {
            console.log('Image uploaded successfully:', data);
            resolve(fileName);
          }
        });
      });
    },

    async onImageChange(event) {
      console.log('update image is called')
      if (!event || !event.target) {
        console.error('Invalid event object:', event);
        return;
      }
      const file = event.target.files[0];
      if (file) {
        try {
          const fileName = await this.uploadPhoto(file, this.bucketName);
          this.imageUrl = `https://${this.bucketName}.s3.ap-southeast-1.amazonaws.com/${fileName}`;
          this.updateImage = false;
        } catch (error) {
          console.error('Error updating image:', error);
        }
      }
    },

    async updateBanner() {
      try {
        const id = this.banner.id;
        console.log(id);
        const updateDTO = {
          type: 'monthly',
          url: this.imageUrl,
        };
        const result = await axios.post(`https://rest.tsotan.mn/banner/update/${id}`, updateDTO);
        this.banner= result.data;
        this.imageUrl = null;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.imageWrapper {
  display: flex;
    justify-content: center;
    align-items: center;
    /* flex-direction: column; */
    padding: 50px;
}

.imgC {
  display: flex;
  flex-direction: column;
}

.imgC img {
  width: 500px;
  height: auto;
}

.imgC button {
  background-color: #8093eb; 
  color: #fff; 
  padding: 5px; 
  border: none; 
  cursor: pointer; 
  border-radius: 5px;
  font-size: 13px;
  width: 80px;
  justify-content: center;
  margin-top: 50px;
}

</style>
