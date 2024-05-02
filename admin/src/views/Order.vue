<template>
    <div class="mt-5 container">
         <!-- Search Input -->
         <div class="col-md-10 mb-3">
            <input-search v-model="searchText" />
        </div>
   


        <div class="card">
            <div class="card-header">
                <h4 class="">
                   Đơn hàng
                    <!-- <router-link to="/products/Add" class="btn btn-primary float-end">
                        Thêm Sách
                    </router-link> -->
                </h4>
            </div>
            <div class="card-body">
                <table class="table text-center ">
                    <thead class="table-dark text-white">
                        <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên khách hàng </th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Trạng thái</th>
                        <!-- <th scope="col">Số lượng</th>
                        <th scope="col">Mã nhà xuất bản</th> -->
                        <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <template v-if="displayedProducts.length === 0">
                            <tr>
                                <td colspan="8" class="text-center mt-3">Không có khách hàng!!!</td>
                            </tr>
                    </template>
                    <template v-else>
                    
                        <tbody v-for="(item, index) in displayedProducts
                        "       :key="item._id" class="">
                            <tr>
                            <th scope="row">{{ index+1 }}</th>
                            <td>{{ item.users.username }}</td>
                            <!-- <td>{{  shortenProductName(item.tensach) }}</td> -->
                            <td>{{ item.users.phone }}</td>
                            <td>{{ item.products.name }}</td>
                            <!-- <td> 
                                <img v-if="item.image" :src="item.image" alt="Product Image" class="img-fluid bg-light" style="width: 100px;">
                                <span v-else>Chưa có ảnh</span>
                            </td> -->
                            <td>{{ item.totalPrice}}</td>
                            <td class="text-success">
                                {{ item.orderStatus }}
                            </td>
                            <!-- <td>{{ item.manxb }}</td> -->
                            <td >
                                <router-link :to="{ name: 'editOrders', params: { id: item._id } }" class="btn btn-success btn-sm">Chi tiết</router-link>
                                <button type="button" class="btn btn-danger btn-sm ml-2" @click="deleteUser(item._id)">Xóa</button>
                            </td>
                            </tr>
                            
                        </tbody>
                    </template>
                    </table>

            </div>

        </div>

    </div>
 
    
</template>

<script>
import OrderService from '@/services/order.service';
import InputSearch from '@/components/InputSearch.vue';

export default {
    components: {
        InputSearch,

    },
    data() {
        return {
            orders: [],
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
        if (!searchTerm) return this.orders; // Return all products if search term is empty
            return this.orders.filter(product => {
                return (
                    product.users.username.toLowerCase().includes(searchTerm)
                    // product.tacgia.toLowerCase().includes(searchTerm)
                    // Add other relevant search criteria here
                );
            });
        },

    },

    methods: {
        
        async showProducts() {
            try {
                this.orders = await OrderService.getAll();
                this.displayedProducts = this.orders;

            } catch (error) {
                console.log(error);


            }
        },
        async deleteUser(id) {
            if (confirm("Bạn muốn xóa đơn hàng này không ?")) {
                try {
                    await OrderService.delete(id);
                    // Reload the current page after successful deletion
                    // this.$router.go(); // Navigate back to the current page
                } catch (error) {
                    console.log(error);
                }
                this.showProducts();
            }
        }
    }
}



</script>