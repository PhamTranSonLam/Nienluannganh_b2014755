<template>
    <div class="mt-5 container">
         <!-- Search Input -->
         <div class="col-md-10 mb-3">
            <input-search v-model="searchText" />
        </div>
   

    <!-- Sorting Options
    <div class="mb-3">
      <label for="sortSelect" class="form-label">Sort by:</label>
      <select id="sortSelect" class="form-select" v-model="sortOption" @change="sortProducts">
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="quantity">Quantity</option>
      </select>
    </div> -->

        <div class="card">
            <div class="card-header">
                <h4>
                    Quản lý sản phẩm
                    <router-link to="/products/Add" class="btn btn-primary float-end">
                        Thêm sản phẩm
                    </router-link>
                </h4>
            </div>
            <div class="card-body">
                <table class="table text-center ">
                    <thead class="table-warning">
                        <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên sản phẩm </th>
                        <th scope="col">Danh mục</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Số lượng</th>
                        <!-- <th scope="col">Số lượng</th>
                        <th scope="col">Mã nhà xuất bản</th> -->
                        <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <div v-if="displayedProducts.length === 0" class="text-center mt-3">
                        No products found.
                    </div>
                    <tbody v-for="(item, index) in displayedProducts
                    "       :key="item._id" class="">
                        <tr>
                        <th scope="row">{{ index+1 }}</th>
                        <td>{{ item.name }}</td>
                        <!-- <td>{{  shortenProductName(item.tensach) }}</td> -->
                        <td>{{ item.category }}</td>
                        <td> 
                            <img v-if="item.image" :src="item.image" alt="Product Image" class="img-fluid bg-light" style="width: 100px;">
                            <span v-else>Chưa có ảnh</span>
                        </td>
                        <td>{{ item.price}}</td>
                        <td>{{ item.quantity }}</td>
                        <!-- <td>{{ item.manxb }}</td> -->
                        <td >
                            <router-link :to="{ name: 'editProduct', params: { id: item._id } }" class="btn btn-success btn-sm">Chỉnh sửa</router-link>
                            <button type="button" class="btn btn-danger btn-sm ml-2" @click="deleteProduct(item._id)">Xóa</button>
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>

            </div>

        </div>

    </div>
 
    
</template>

<script>
import ProductService from '@/services/product.service';
import InputSearch from '@/components/InputSearch.vue';

export default {
    components: {
        InputSearch,

    },
    data() {
        return {
            products: [],
            searchText: '',
        displayedProducts: [],
            
        };
    },
    created() {
        this.showProducts();
        
    },
    watch: {
        searchText() {
            this.displayedProducts = this.filteredProducts;
        },
    },

    computed: {
        filteredProducts() {
        const searchTerm = this.searchText.toLowerCase().trim(); // Normalize and trim search term
        if (!searchTerm) return this.products; // Return all products if search term is empty
            return this.products.filter(product => {
                return (
                    product.name.toLowerCase().includes(searchTerm)
                    // product.tacgia.toLowerCase().includes(searchTerm)
                    // Add other relevant search criteria here
                );
            });
        },

    },

    methods: {
        shortenProductName(name) {
        // You can adjust the length of the product name as needed
            const maxLength = 20; // Maximum length of the product name
            if (name.length > maxLength) {
                return name.substring(0, maxLength) + '...'; // Truncate the name if it exceeds maxLength
            }
            return name;
        },
        async showProducts() {
            try {
                this.products = await ProductService.getAll();
                this.displayedProducts = this.products;

            } catch (error) {
                console.log(error);


            }
        },
        async deleteProduct(id) {
           
            if (confirm("Bạn muốn xóa sản phẩm này không ?")) {
                try {
                    await ProductService.delete(id);

                    this.showProducts();
                    // Find the index of the deleted product in the sach array
                    // const index = this.sach.findIndex(item => item._id === id);
                    //  if (index !== -1) {
                    //      // Remove the deleted product from the sach array
                    //     this.sach.splice(index, 1);
                    // }

                    // this.retrieveCarts();
                    // Load lại trang hiện tại sau khi xóa thành công
                    // this.$router.go(); // Điều hướng trang lại về trang hiện tại
                  
                } catch (error) {
                    console.log(error);
                }

                this.showProducts();
            }
        }
    }
}



</script>