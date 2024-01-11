import axios from 'axios';

const url = "https://rest.tsotan.mn";
// const url = "http://localhost:8443"
//
const token = localStorage.getItem('jwtToken');
export default {


    async addCategory(data) {
      return axios.post(`${url}/category/create`, data);
    },

    async createProduct(data) {
        return axios.post(`${url}/product/create`, data);
    },

    async updateProduct(id, data) {
        return axios.post(`${url}/product/update/${id}`, data);
    },

    async getProductList(id) {
        return axios.get(`${url}/product/list/${id}`);
    },

    async login(data) {
        return axios.post(`${url}/auth/login`, data);
    },

    async createUser(data) {
        return axios.post(`${url}/user/create`, data);
    },

    async view(id) {
        return axios.get(`${url}/product/view/${id}`);
    },

    async detail(id) {
        return axios.get(`${url}/product/detail/${id}`);
    },

    async deleteProduct(id) {
        return axios.delete(`${url}/product/delete/${id}`);
    },

    async getCategories(){
        return axios.get(`${url}/category/list-names`);
    },

    async getCategoriesByParent(id){
        return axios.get(`${url}/category/list/${id}`);
    },

    async getUserList(){
        return axios.get(`${url}/user/list`);
    },

};