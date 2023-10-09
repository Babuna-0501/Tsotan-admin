<template>
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
            <th>Он сар</th>
            <th>Бүтээгдэхүүн</th>
            <th>Тоо хэмжээ</th>
            <th>Нийт</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in paginatedOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.product }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.total }}</td>
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
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    paginatedOrders() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.orders.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.orders.length / this.itemsPerPage);
    },
  },
  methods: {
    fetchData() {
      this.orders = [
        {
          id: 1,
          date: "2023-10-01",
          product: "Product A",
          quantity: 3,
          total: 150.0,
        },
        {
          id: 2,
          date: "2023-09-25",
          product: "Product B",
          quantity: 2,
          total: 90.0,
        },
        {
          id: 3,
          date: "2023-09-20",
          product: "Product C",
          quantity: 1,
          total: 30.0,
        },
        {
          id: 4,
          date: "2023-09-20",
          product: "Product C",
          quantity: 1,
          total: 30.0,
        },
        {
          id: 5,
          date: "2023-09-20",
          product: "Product C",
          quantity: 1,
          total: 30.0,
        },
        {
          id: 6,
          date: "2023-09-20",
          product: "Product C",
          quantity: 1,
          total: 30.0,
        },
        {
          id: 7,
          date: "2023-09-20",
          product: "Product C",
          quantity: 1,
          total: 30.0,
        },
        {
          id: 8,
          date: "2023-09-20",
          product: "Product C",
          quantity: 1,
          total: 30.0,
        },
        {
          id: 9,
          date: "2023-09-20",
          product: "Product C",
          quantity: 1,
          total: 30.0,
        },
        {
          id: 10,
          date: "2023-09-20",
          product: "Product C",
          quantity: 1,
          total: 30.0,
        },
        {
          id: 11,
          date: "2023-09-20",
          product: "Product C",
          quantity: 1,
          total: 30.0,
        },
        {
          id: 12,
          date: "2023-09-20",
          product: "Product C",
          quantity: 1,
          total: 30.0,
        },
      ];
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
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
