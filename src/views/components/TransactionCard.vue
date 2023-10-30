
<template>
  <div>
    <form @submit.prevent="search">
      <input v-model="query.phoneNumber" placeholder="Утас" />
      <input v-model="query.orderedProducts" placeholder="Захиалга" />
      <input v-model="query.address" placeholder="Хаяг" />
      <input v-model="query.info" placeholder="Гүйлгээний утга" />
      <input v-model="query.minPrice" placeholder="Доод үнэ" />
      <input v-model="query.maxPrice" placeholder="Дээд үнэ" />
      <input v-model="query.from" placeholder="Эхлэх огноо" />
      <input v-model="query.to" placeholder="Дуусах огноо" />
      <button type="submit">Хайх</button>
    </form>

    <div class="card h-100 mb-4">


      <div class="card h-100 mb-4">
            <div class="card-header pb-0 px-3">
              <div class="row">
                <div class="col-md-6">
                  <h6 class="mb-0">Захиалгын түүх</h6>
                </div>
              </div>
            </div>
            <div class="card-body pt-4 p-3">
              <table class="mb-4">
                <thead>
                  <tr>
                    <th>Захиалгын код</th>
                    <th>Утас</th>
                    <th>Бүтээгдэхүүн</th>
                    <th>Үнэ</th>
                    <th>Хаяг</th>
                    <th>Тайлбар</th>
                    <th>Гүйлгээний утга</th>
                    <th>Төлөв</th>
                    <th>Огноо</th>
                    <th>Фб</th>
                    <th>Мэйл</th>
                  </tr>
                </thead>
                <tbody>

                  <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.phoneNumbers }}</td>
                    <td>{{ order.orderedProducts }}</td>
                    <td>{{ order.price }}</td>
                    <td>{{ order.address }}</td>
                    <td>{{ order.comment }}</td>
                    <td>{{ order.transactionInfo }}</td>
                    <td>{{ order.orderState }}</td>
                    <td>{{ order.createdAt }}</td>
                    <td>{{ order.fb }}</td>
                    <td>{{ order.email }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">өмнөх</button>
                <span>{{ currentPage }} / {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">
                  дараах
                </button>
              </div>
            </div>
          </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
      currentPage: 1,
      itemsPerPage: 20,
      query: {
        phoneNumber: null,
        address: null,
        orderedProducts: null,
        state: null,
        info: null,
        minPrice: null,
        maxPrice: null,
        from: null,
        to: null,
        page: 1, // Default to page 1
        size: 20, // Default to 10 items per page
      },
    };
  },
  computed: {
    // paginatedOrders() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   const endIndex = startIndex + this.itemsPerPage;
    //   return this.orders.slice(startIndex, endIndex);
    // },
    totalPages() {
      return Math.ceil(this.orders.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchData() {
      try {
        const result = await axios.get('https://rest.tsotan.mn/order/search', {...this.query});
        this.orders = result.data.content;

        this.currentPage = this.query.page;
      } catch (error) {
        console.log(error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.query.page = this.currentPage - 1;
        this.fetchData();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.query.page = this.currentPage + 1;
        this.fetchData();
      }
    },
    async search() {
      this.query.page = 1;
      await this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>



table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.pagination {
  margin-top: 10px;
  text-align: center;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-size: 13px;
}

.pagination button[disabled] {
  opacity: 0.8;
  cursor: not-allowed;
}
</style>



