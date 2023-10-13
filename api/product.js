import axios from 'axios';

// const url = "https://rest.tsotan.mn";
const url = "http://localhost:8443"

const token = localStorage.getItem('jwtToken');
export default {


    async addCategory(data) {
        console.log(token);

      return axios.post(`${url}/category/create`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

    },

    async createProduct(data) {
        return axios.post(`${url}/product/create`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        // return axios.post(`${url}/product/create-with-img`, data);
    },

    async updateProduct(id, data) {
        // return axios.post(`${url}/product/update/${id}`, data,  {headers: {'Content-Type': 'multipart/form-data'}});
        // console.log("update", id, data);
        console.log(token);
        return axios.post(`${url}/product/update/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    },

    async getProductList(id) {
        return axios.get(`${url}/product/list/${id}`);
    },

    async login(data) {
        return axios.post(`${url}/auth/login`, data);
    },

    async view(id) {
        return axios.get(`${url}/product/view/${id}`);
    },

    async detail(id) {
        return axios.get(`${url}/product/detail/${id}`);
    },

    async deleteProduct(id) {
        return axios.delete(`${url}/product/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    },

    async getCategories(){
        return axios.get(`${url}/category/list-names`);
    },

    async getCategoriesByParent(id){
        return axios.get(`${url}/category/list/${id}`);
    }

};