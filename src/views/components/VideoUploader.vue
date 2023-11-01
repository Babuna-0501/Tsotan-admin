<template>
    <div class="video-uploader">
      <input type="file" @change="uploadVideo" accept="video/*" />
      <button @click="clearVideo">Устгах</button>
      <video v-if="videoUrl" controls>
        <source :src="videoUrl" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        videoUrl: null,
        videoFile: null,
      };
    },
    methods: {
      uploadVideo(event) {
        const file = event.target.files[0];
        if (file) {
          this.videoFile = file;
          this.videoUrl = URL.createObjectURL(file);
        }
      },
      clearVideo() {
        this.videoUrl = null;
        this.videoFile = null;
      },
    },
  };
  </script>
  <style>
  .video-uploader {
    text-align: center;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
  }
  
  
  .video-uploader label.upload-button {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .video-uploader label.upload-button:hover {
    background-color: #0056b3;
  }
  
  .video-uploader video {
    width: 100%;
    max-height: 300px;
    margin-top: 10px;
  }

  .video-uploader button {
    width: 150px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  }
  
  .video-uploader button.clear-button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .video-uploader button.clear-button:hover {
    background-color: #a61c29;
  }
  </style>
  