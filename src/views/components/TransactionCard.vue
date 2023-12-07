
<template>
  <div>
    <form @submit.prevent="search" class="form-order">
      <input v-model="query.phoneNumber" placeholder="Утас" />
      <input v-model="query.orderedProducts" placeholder="Захиалга" />
      <input v-model="query.address" placeholder="Хаяг" />
      <input v-model="query.info" placeholder="Гүйлгээний утга" />
      <input v-model="query.minPrice" placeholder="Доод үнэ" />
      <input v-model="query.maxPrice" placeholder="Дээд үнэ" />
      <input v-model="from" placeholder="Эхлэх огноо"/>
      <input v-model="to" placeholder="Дуусах огноо"/>
      <button type="submit">Хайх</button>
      <div class="col-md-6" style="display: flex; justify-content: space-between;">
        <h5 class="mb-0">Захиалгын түүх</h5>
        <button class="download-btn" @click="download">Excel татах</button>
      </div>
    </form>

    <div class="card h-100 mb-4 mt-5">
      <div class="card h-100 mb-4">
            <div class="card-header pb-0 px-3">
              <div class="row">

              </div>
            </div>
            <div class="card-body pt-4 p-3">
              <table class="mb-4">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Утас</th>
                    <th>Захиалсан бүтээгдэхүүн</th>
                    <th>Үнэ</th>
                    <th>Хаяг</th>
                    <th>Тайлбар</th>
                    <th>Гүйлгээний утга</th>
                    <th>Төлөв</th>
                    <th>Огноо</th>
                    <th>Фб</th>
                    <th>Мэйл</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>

                  <tr v-for="order in paginatedOrders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.phoneNumbers }}</td>
                    <td>{{ order.orderedProducts }}</td>
                    <td>{{ order.price }}</td>
                    <td>{{ order.address }}</td>
                    <td>{{ order.comment }}</td>
                    <td>{{ order.transactionInfo }}</td>
                    <td>{{ getOrderStateText(order.orderState)  }}</td>
                    <td>{{ order.createdAt }}</td>
                    <td>{{ order.fb }}</td>
                    <td>{{ order.email }}</td>
                    <td><dropdown-button :order-id="order.id" @fetch="fetchData" class="mode" style="border: none;"></dropdown-button></td>
                  </tr>
                </tbody>
              </table>
              <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">өмнөх</button>
                <span>{{ currentPage }} / {{ getTotalPage }}</span>
                <button @click="nextPage" :disabled="currentPage >= getTotalPage">
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
import DropdownButton from "@/views/DropdownButton.vue";

export default {
  components: {
    'dropdown-button': DropdownButton,
  },
  data() {
    const orderStates = [
      {value: 'CREATED', text: 'Хүлээгдэж буй'},
      {value: 'PAID', text: 'Төлөгдсөн'},
      {value: 'TRANSFERRED', text: 'Дансаар шилжүүлсэн'},
      {value: 'DELIVERED', text: 'Хүргэлтэнд өгсөн'},
      {value: 'RECEIVED', text: 'Хүлээн авсан'},
      {value: 'CANCELLED', text: 'Төлөгдөөгүй'}
    ];

    // paginatedOrders() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   const endIndex = startIndex + this.itemsPerPage;
    //   return this.orders.slice(startIndex, endIndex);
    // },
    return {
      orderStates,
      orders: [],
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
      },
      page: 0,
      size: 20,
      from: null,
      to: null,
      totalPages: 0,
    };
  },
  computed: {
    paginatedOrders() {
      // const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      // const endIndex = startIndex + this.itemsPerPage;
      // return this.orders.slice(startIndex, endIndex);
      return this.orders;
    },
    currentPage() {
      return this.page + 1;
    },

    getTotalPage() {
      return this.totalPages;
    },

    getOrderStateText() {
      return (orderState) => {
        const stateObject = this.orderStates.find((state) => state.value === orderState);
        return stateObject ? stateObject.text : '';
      };
    },

  },
  methods: {

    async fetchData() {
      try {
        if (this.to) this.query.to = this.formatDate(this.to, 23, 59, 59);
        if (this.from) this.query.from = this.formatDate(this.from, 0, 0, 0);

        this.orders = await this.getOrderList({...this.query, ...this.page, ...this.size});
        this.currentPage = this.page;
      } catch (error) {
        console.error(error);
      }
    },


    async getOrderList(data = {}) {
      try {
        const result =  await axios.get('https://rest.tsotan.mn/order/search', {params: data});
        console.log(result.data.content);
        this.totalPages = result.data.totalPages;
        return result.data.content;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    
    async download() {
      try {
        const constructedURL = 'https://rest.tsotan.mn/order/download/?' +
            Object.entries(this.query)
                .filter(([_key, value]) => {
                  console.info('_key:', _key);
                  return value !== null;
                })
                .map(([param, value]) => `${param}=${encodeURIComponent(value)}`)
                .join('&');

        window.location.href = constructedURL;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },


    formatDate(date, h, m, s) {
      const formattedInput = date.replace(/[-:\s]/g, '-');

      const parts = formattedInput.split('-');
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const day = parseInt(parts[2]);

      return this.formatDateToServerFormat(new Date(year, month, day, h, m, s));


    },

    formatDateToServerFormat(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Adjust month (0-11) to (1-12)
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.page = this.currentPage - 2;
        this.fetchData();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.page = this.currentPage;
        this.fetchData();
      }
    },
    async search() {
      this.page = 0;
      await this.fetchData();
    },
  },
  mounted() {
    this.page = 0;
    this.fetchData();
    // this.fetchData2();
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

.form-order {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.form-order input {
  border-radius: 10px;
  padding: 5px 10px;
  border: none;
}
.form-order button {
  width: 140px;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #27a8c2;
  color: #fff;
}


.download-btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  background-color: #83b385;
  color: #ffffff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

</style>



