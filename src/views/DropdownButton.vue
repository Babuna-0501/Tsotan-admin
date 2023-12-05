<template>
  <div class="drop-mode">
    <button @click="toggleDropdown">Төлөв солих</button>
    <div v-if="isDropdownOpen" class="dropdown">
      <button style="background-color: rgb(45, 92, 92);" @click="handleDropdownItem('PAID')">Төлөгдсөн</button>
      <button style="background-color: rgb(44, 84, 145);" @click="handleDropdownItem('TRANSFERRED')">Шилжүүлсэн</button>
      <button style="background-color: rgb(226, 191, 36);" @click="handleDropdownItem('DELIVERED')">Хүргүүлсэн</button>
      <button style="background-color: rgb(161, 51, 102);" @click="handleDropdownItem('CANCELLED')">Цуцлагдсан</button>
      <button style="background-color: rgb(85, 92, 84);" @click="checkPayment()">Төлбөр шалгах</button>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  props: {
    orderId: String,
  },
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleDropdownItem(item) {
      this.updateStatus(item);
    },

    async updateStatus(state) {
      try {
        await axios.get(`https://rest.tsotan.mn/order/update-state/${this.orderId}`, {
              params: {
                state: state,
              },
            }
        );
        this.isDropdownOpen = false;
        this.$emit("fetch");
      } catch (error) {
        console.log(error)
      }
    },
    async checkPayment() {
      try {
        await axios.get(`https://rest.tsotan.mn/order/check-payment/${this.orderId}`);
        this.isDropdownOpen = false;
        this.$emit("fetch");
      } catch (error) {
        console.log(error)
      }

    }
  },
};
</script>

<style scoped>
.dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px;
  gap: 10px;
}

.drop-mode button {
  width: 100px !important;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: #fff;
  font-size: 15px;
  background-color: #36d1a0;
  height: 50px;
  line-height: normal;
}
</style>
