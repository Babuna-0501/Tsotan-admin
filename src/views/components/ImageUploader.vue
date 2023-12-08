<template>
  <div class="row imageWrapper">
    <div class="col-xl-6 imgC">
      <img v-if="!updateImage1" :src="imageUrl1 || banner1.url" alt="Banner 1" class="shadow-sm border-radius-lg" />
      <img v-if="updateImage1" :src="imageUrl1" alt="Updated Banner 1" class="shadow-sm  border-radius-lg" />
      <button @click="updateImage1 = true" v-if="!updateImage1 && !imageUrl1">Update</button>
      <input v-if="updateImage1" id="image1" type="file" ref="image1" @change="onImageChange(1, $event)" />
      <button v-if="imageUrl1" @click="updateBanner(1)">Save</button>
    </div>

    <div class="col-xl-6 imgC">
      <img v-if="!updateImage2" :src="imageUrl2 || banner2.url" alt="Banner 2" class="shadow-sm border-radius-lg" />
      <img v-if="updateImage2" :src="imageUrl2" alt="Updated Banner 2" class="shadow-sm border-radius-lg" />
      <button @click="updateImage2 = true" v-if="!updateImage2 && !imageUrl2">Update</button>
      <input v-if="updateImage2" id="image2" type="file" ref="image2" @change="onImageChange(2, $event)" />
      <button v-if="imageUrl2" @click="updateBanner(2)">Save</button>
    </div>
  </div>
</template>

<script>
import s3 from "@/assets/s3config";
import axios from "axios";

export default {
  data() {
    return {
      banner1: '',
      banner2: '',
      imageUrl1: null,
      imageUrl2: null,
      file: null,
      bucketName: 'tsotanmn',
      updateImage1: false,
      updateImage2: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      console.log('fetch data')
      try {
        const result = await axios.get('https://rest.tsotan.mn/banner/list', {
          params: { type: 'slider' }
        });
        this.banner1 = result.data[0] || { url: null };
        this.banner2 = result.data[1] || { url: null };
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

    async onImageChange(index, event) {
      console.log('update image is called')
      if (!event || !event.target) {
        console.error('Invalid event object:', event);
        return;
      }

      const file = event.target.files[0];
      const updateImageKey = `updateImage${index}`;
      const imageUrlKey = `imageUrl${index}`;

      if (file) {
        try {
          const fileName = await this.uploadPhoto(file, this.bucketName);
          this[imageUrlKey] = `https://${this.bucketName}.s3.ap-southeast-1.amazonaws.com/${fileName}`;
          console.log(this.imageUrl1);
          this[updateImageKey] = false;
        } catch (error) {
          console.error('Error updating image:', error);
        }
      }
    },

    async updateBanner(index) {
      try {
        const banner = this[`banner${index}`];
        const id = banner.id;
        console.log(id);
        const updateDTO = {
          type: 'slider',
          url: this[`imageUrl${index}`],
        };
        const result = await axios.post(`https://rest.tsotan.mn/banner/update/${id}`, updateDTO);
        this[`banner${index}`] = result.data;
        this.imageUrl1 = null;
        this.imageUrl2 = null;
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
