<template>
  <div>
    <button @click="toggleDropdown">Төлөв солих</button>
    <div v-if="isDropdownOpen" class="dropdown">
      <button @click="handleDropdownItem('PAID')">Төлөгдсөн</button>
      <button @click="handleDropdownItem('TRANSFERRED')">Шилжүүлсэн</button>
      <button @click="handleDropdownItem('DELIVERED')">Хүргүүлсэн</button>
      <button @click="handleDropdownItem('CANCELLED')">Цуцлагдсан</button>
      <button @click="checkPayment()">Төлбөр шалгах</button>
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
}
</style>
