<template>
  <default-dashboard />
  <ImageUploader />
</template>

<script>
import DefaultDashboard from "@/views/dashboards/Default.vue";
import ImageUploader from '@/views/components/ImageUploader.vue';


export default {
  name: "Home",
  components: {
    DefaultDashboard,
    ImageUploader,
  },
};
</script>
