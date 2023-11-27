<template>
  <div class="image-uploader">

    <div>
      <img v-for="(image, index) in product.image" :src="getImg(image)" :key="index" alt="image"/>
    </div>

    <div id="uploadedImagesContainer"></div>

    <div class="col-xl-6">
      <input id="image" type="file" ref="image" multiple @change="onImageChange1"/>
    </div>


    <div class="col-xl-6">
      <input id="image" type="file" ref="image" multiple @change="onImageChange2"/>
    </div>
  </div>
<div>
  <input type="file" @change="uploadImage" accept="image/*" />
    <label class="upload-button" style="width: 150px;" @click="triggerFileInput">Upload</label>
    <button @click="clearImage">Арилгах</button>
    <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" />
  </div>
</template>

  
  <script>
  import s3 from "@/assets/s3config";

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
      onImageChange1(event) {
        const file = event.target.files[0];

        const fileName = this.uploadPhoto(file, this.bucketName);
        this.product.image[0] = "https://" + this.bucketName + ".s3.ap-southeast-1.amazonaws.com/" + fileName;
      },
      onImageChange2(event) {
        const file = event.target.files[0];
        const fileName = this.uploadPhoto(file, this.bucketName);
        this.product.image[1] = "https://" + this.bucketName + ".s3.ap-southeast-1.amazonaws.com/" + fileName;
      },
      uploadPhoto(file, bucketName) {
        const fileName = Date.now().toString();
        const params = {
          Bucket: bucketName,
          Key: fileName,
          Body: file,
        };
        s3.putObject(params, (err, data) => {
          if (err) {
            console.error('Error uploading image:', err);
          } else {
            console.log('Image uploaded successfully:', data);
          }
        });
        return fileName;

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
  